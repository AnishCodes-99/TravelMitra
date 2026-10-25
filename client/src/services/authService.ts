import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth, firebaseStatus } from '../lib/firebase';

function ensureFirebaseReady() {
  if (!firebaseStatus.isConfigured || !auth) {
    throw new Error(
      `Firebase Authentication is not configured. Missing environment variables: ${firebaseStatus.missingKeys.join(', ')}. Please update client/.env to enable live authentication.`
    );
  }
  return auth;
}

export const authService = {
  isConfigured: () => firebaseStatus.isConfigured,
  getMissingKeys: () => firebaseStatus.missingKeys,

  signInWithEmail: async (email: string, pass: string): Promise<User> => {
    const firebaseAuth = ensureFirebaseReady();
    const cred = await signInWithEmailAndPassword(firebaseAuth, email, pass);
    return cred.user;
  },

  signUpWithEmail: async (email: string, pass: string, displayName: string): Promise<User> => {
    const firebaseAuth = ensureFirebaseReady();
    const cred = await createUserWithEmailAndPassword(firebaseAuth, email, pass);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    return cred.user;
  },

  signInWithGoogle: async (): Promise<User> => {
    const firebaseAuth = ensureFirebaseReady();
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(firebaseAuth, provider);
    return cred.user;
  },

  signOutUser: async (): Promise<void> => {
    const firebaseAuth = ensureFirebaseReady();
    await signOut(firebaseAuth);
  },

  sendPasswordReset: async (email: string): Promise<void> => {
    const firebaseAuth = ensureFirebaseReady();
    await sendPasswordResetEmail(firebaseAuth, email);
  },

  getIdToken: async (): Promise<string | null> => {
    if (!firebaseStatus.isConfigured || !auth || !auth.currentUser) {
      return null;
    }
    return auth.currentUser.getIdToken();
  },
};
