import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

export interface FirebaseConfigValidation {
  isConfigured: boolean;
  missingKeys: string[];
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
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

if (firebaseStatus.isConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (error) {
    console.warn('Failed to initialize Firebase App:', error);
  }
} else {
  // Graceful notification without throwing or breaking the frontend
  console.info(
    'Firebase Authentication is running in unconfigured mode. Set VITE_FIREBASE_* variables in client/.env to enable live authentication.'
  );
}

export { app, auth };
