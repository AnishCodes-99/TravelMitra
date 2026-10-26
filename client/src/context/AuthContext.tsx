import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { authService } from '../services/authService';
import { firestoreService } from '../services/firestoreService';
import { auth, firebaseStatus } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isFirebaseConfigured: boolean;
  missingConfigKeys: string[];
  login: (email: string, pass: string) => Promise<User>;
  register: (email: string, pass: string, displayName: string) => Promise<User>;
  loginWithGoogle: () => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  getIdToken: () => Promise<string | null>;
  updateUserProfile: (data: { displayName?: string; photoURL?: string; phoneNumber?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'travelmitra_persistent_user';
const LOCAL_STORAGE_EXPLICIT_LOGOUT = 'travelmitra_explicit_logout';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Immediately hydrate authenticated user from persistent storage so details are instantly visible on page load
  const [user, setUser] = useState<User | null>(() => {
    try {
      const explicitLogout = localStorage.getItem(LOCAL_STORAGE_EXPLICIT_LOGOUT);
      if (explicitLogout === 'true') {
        return null;
      }
      const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && (parsed.email || parsed.uid)) {
          return {
            uid: parsed.uid || 'usr_' + Date.now(),
            email: parsed.email || null,
            displayName: parsed.displayName || parsed.email?.split('@')[0] || 'Mitra Traveler',
            photoURL: parsed.photoURL || null,
            phoneNumber: parsed.phoneNumber || null,
            getIdToken: async () => 'persistent_cached_token_' + parsed.uid,
          } as User;
        }
      }
    } catch (e) {
      console.warn('Error reading saved user session:', e);
    }
    return null;
  });

  const [loading, setLoading] = useState<boolean>(true);

  // Helper to persist user object locally and sync to Firestore
  const saveUserSession = async (userToSave: User) => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_EXPLICIT_LOGOUT);
      const serializable = {
        uid: userToSave.uid,
        email: userToSave.email,
        displayName: userToSave.displayName || userToSave.email?.split('@')[0] || 'Mitra Traveler',
        photoURL: userToSave.photoURL,
        phoneNumber: userToSave.phoneNumber,
      };
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(serializable));
      setUser(userToSave);
      await firestoreService.saveUserProfile(userToSave);
    } catch (e) {
      console.warn('Could not cache user session locally:', e);
    }
  };

  useEffect(() => {
    if (!firebaseStatus.isConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser: User | null) => {
      if (currentUser) {
        // User confirmed signed in by Firebase: update persistent session
        await saveUserSession(currentUser);
      } else {
        // Only if explicit logout was triggered do we discard the user
        const explicitLogout = localStorage.getItem(LOCAL_STORAGE_EXPLICIT_LOGOUT);
        if (explicitLogout === 'true') {
          setUser(null);
          localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    localStorage.removeItem(LOCAL_STORAGE_EXPLICIT_LOGOUT);
    const loggedInUser = await authService.signInWithEmail(email, pass);
    await saveUserSession(loggedInUser);
    return loggedInUser;
  };

  const register = async (email: string, pass: string, displayName: string) => {
    localStorage.removeItem(LOCAL_STORAGE_EXPLICIT_LOGOUT);
    const registeredUser = await authService.signUpWithEmail(email, pass, displayName);
    await saveUserSession(registeredUser);
    return registeredUser;
  };

  const loginWithGoogle = async () => {
    localStorage.removeItem(LOCAL_STORAGE_EXPLICIT_LOGOUT);
    const googleUser = await authService.signInWithGoogle();
    await saveUserSession(googleUser);
    return googleUser;
  };

  const logout = async () => {
    localStorage.setItem(LOCAL_STORAGE_EXPLICIT_LOGOUT, 'true');
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    setUser(null);
    try {
      await authService.signOutUser();
    } catch (err) {
      console.warn('Signout notice:', err);
    }
  };

  const resetPassword = async (email: string) => {
    return authService.sendPasswordReset(email);
  };

  const getIdToken = async () => {
    return authService.getIdToken();
  };

  const updateUserProfile = async (data: { displayName?: string; photoURL?: string; phoneNumber?: string }) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      displayName: data.displayName !== undefined ? data.displayName : user.displayName,
      photoURL: data.photoURL !== undefined ? data.photoURL : user.photoURL,
      phoneNumber: data.phoneNumber !== undefined ? data.phoneNumber : user.phoneNumber,
    } as User;

    await saveUserSession(updatedUser);

    try {
      await authService.updateUserProfile(data.displayName, data.photoURL);
    } catch (e) {
      console.warn('Could not update Firebase user profile:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isFirebaseConfigured: firebaseStatus.isConfigured,
        missingConfigKeys: firebaseStatus.missingKeys,
        login,
        register,
        loginWithGoogle,
        logout,
        resetPassword,
        getIdToken,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
