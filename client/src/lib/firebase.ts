import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

export interface FirebaseConfigValidation {
  isConfigured: boolean;
  missingKeys: string[];
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCC2nr-dPHMTOqbzjmks2_C7EaUE4Am2ps',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'travelmitra-46cbd.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'travelmitra-46cbd',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:184548343474:web:90c6f131e8b2088b5813ab',
};

export function checkFirebaseConfig(): FirebaseConfigValidation {
  const missingKeys: string[] = [];
  if (!firebaseConfig.apiKey) missingKeys.push('VITE_FIREBASE_API_KEY');
  if (!firebaseConfig.authDomain) missingKeys.push('VITE_FIREBASE_AUTH_DOMAIN');
  if (!firebaseConfig.projectId) missingKeys.push('VITE_FIREBASE_PROJECT_ID');
  if (!firebaseConfig.appId) missingKeys.push('VITE_FIREBASE_APP_ID');

  return {
    isConfigured: missingKeys.length === 0,
    missingKeys,
  };
}

export const firebaseStatus = checkFirebaseConfig();

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (firebaseStatus.isConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.warn('Failed to initialize Firebase App / Firestore:', error);
  }
} else {
  // Graceful notification without throwing or breaking the frontend
  console.info(
    'Firebase Authentication & Firestore are running in unconfigured mode. Set VITE_FIREBASE_* variables in client/.env to enable live services.'
  );
}

export { app, auth, db };
