import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db, firebaseStatus } from '../lib/firebase';

export interface UserProfileData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  phoneNumber?: string | null;
  lastLoginAt: string;
  createdAt: string;
  role: 'traveler' | 'admin';
}

export interface BookingRecord {
  id: string;
  pnr: string;
  userId?: string;
  userEmail?: string;
  title: string;
  type: 'Flight' | 'Hotel' | 'Holiday Package';
  dates: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  airline?: string;
  hotel?: string;
  totalCost: number;
  currency: string;
  passenger: string;
  paymentId: string;
  bookedAt: string;
  createdAt: string;
  details?: { label: string; value: string }[];
}

const LOCAL_STORAGE_BOOKINGS_KEY = 'travelmitra_user_bookings';
const LOCAL_STORAGE_USER_KEY = 'travelmitra_active_user_profile';

export const firestoreService = {
  isConfigured: () => Boolean(firebaseStatus.isConfigured && db),

  /**
   * Save or update user profile information in Firestore 'users' collection
   */
  saveUserProfile: async (user: User): Promise<UserProfileData | null> => {
    const profile: UserProfileData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email?.split('@')[0] || 'Mitra Traveler',
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      lastLoginAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      role: 'traveler',
    };

    // Cache locally
    try {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Could not cache user profile locally:', e);
    }

    if (!db) {
      return profile;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      const existing = await getDoc(userRef);

      if (existing.exists()) {
        const data = existing.data() as Partial<UserProfileData>;
        await setDoc(
          userRef,
          {
            ...profile,
            createdAt: data.createdAt || profile.createdAt,
            lastLoginAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } else {
        await setDoc(userRef, profile);
      }
      return profile;
    } catch (error) {
      console.warn('Failed to sync user profile to Firestore (using local session):', error);
      return profile;
    }
  },

  /**
   * Save booked flight, hotel, or package directly into Firestore 'bookings' collection
   */
  saveBooking: async (booking: BookingRecord): Promise<BookingRecord> => {
    // 1. Cache to localStorage as resilient offline backup
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
      const existing: BookingRecord[] = stored ? JSON.parse(stored) : [];
      const updated = [booking, ...existing.filter(b => b.id !== booking.id)];
      localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not cache booking locally:', e);
    }

    // 2. Persist to Firestore if configured
    if (!db) {
      return booking;
    }

    try {
      const bookingRef = doc(db, 'bookings', booking.id);
      await setDoc(bookingRef, {
        ...booking,
        updatedAt: new Date().toISOString(),
      });
      return booking;
    } catch (error) {
      console.warn('Failed to save booking to Firestore (stored in local backup):', error);
      return booking;
    }
  },

  /**
   * Retrieve all bookings for the currently authenticated user from Firestore
   */
  getUserBookings: async (userId?: string, userEmail?: string): Promise<BookingRecord[]> => {
    // Read local cache first
    let localBookings: BookingRecord[] = [];
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
      if (stored) {
        localBookings = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed reading local bookings:', e);
    }

    if (!db) {
      return localBookings;
    }

    try {
      const bookingsRef = collection(db, 'bookings');
      let firestoreBookings: BookingRecord[] = [];

      if (userId) {
        const q = query(
          bookingsRef,
          where('userId', '==', userId),
          orderBy('createdAt', 'desc'),
          limit(50)
        );
        const snapshot = await getDocs(q);
        snapshot.forEach((docSnap: any) => {
          firestoreBookings.push(docSnap.data() as BookingRecord);
        });
      } else if (userEmail) {
        const q = query(
          bookingsRef,
          where('userEmail', '==', userEmail),
          orderBy('createdAt', 'desc'),
          limit(50)
        );
        const snapshot = await getDocs(q);
        snapshot.forEach((docSnap: any) => {
          firestoreBookings.push(docSnap.data() as BookingRecord);
        });
      } else {
        // If no user signed in, return local cache
        return localBookings;
      }

      // Merge firestore and local bookings uniquely by id
      const combinedMap = new Map<string, BookingRecord>();
      firestoreBookings.forEach(b => combinedMap.set(b.id, b));
      localBookings.forEach(b => {
        if (!combinedMap.has(b.id)) combinedMap.set(b.id, b);
      });

      return Array.from(combinedMap.values());
    } catch (error) {
      console.warn('Error fetching bookings from Firestore, returning local data:', error);
      return localBookings;
    }
  },
};
