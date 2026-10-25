/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_FIREBASE_API_KEY?: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string;
  readonly VITE_FIREBASE_PROJECT_ID?: string;
  readonly VITE_FIREBASE_APP_ID?: string;
  readonly VITE_APP_NAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '@hookform/resolvers/zod' {
  export function zodResolver(schema: any, schemaOptions?: any, resolverOptions?: any): any;
}

declare module 'firebase/app' {
  export interface FirebaseApp {
    name: string;
    options: Record<string, any>;
  }
  export function initializeApp(options: Record<string, any>, name?: string): FirebaseApp;
  export function getApps(): FirebaseApp[];
  export function getApp(name?: string): FirebaseApp;
}

declare module 'firebase/auth' {
  export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL?: string | null;
    getIdToken(forceRefresh?: boolean): Promise<string>;
  }
  export interface Auth {
    currentUser: User | null;
    app: any;
  }
  export class GoogleAuthProvider {
    constructor();
  }
  export function getAuth(app?: any): Auth;
  export function signInWithPopup(auth: Auth, provider: any): Promise<{ user: User }>;
  export function signInWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<{ user: User }>;
  export function createUserWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<{ user: User }>;
  export function signOut(auth: Auth): Promise<void>;
  export function sendPasswordResetEmail(auth: Auth, email: string): Promise<void>;
  export function updateProfile(user: User, profile: { displayName?: string; photoURL?: string }): Promise<void>;
  export function onAuthStateChanged(auth: Auth, nextOrObserver: (user: User | null) => any): () => void;
}

declare module 'vitest' {
  export const describe: (name: string, fn: () => void) => void;
  export const it: (name: string, fn: () => void | Promise<void>) => void;
  export const test: (name: string, fn: () => void | Promise<void>) => void;
  export const expect: any;
  export const vi: any;
  export const beforeEach: (fn: () => void) => void;
  export const afterEach: (fn: () => void) => void;
}

