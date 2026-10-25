import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { authService } from '../services/authService';
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!firebaseStatus.isConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    return authService.signInWithEmail(email, pass);
  };

  const register = async (email: string, pass: string, displayName: string) => {
    return authService.signUpWithEmail(email, pass, displayName);
  };

  const loginWithGoogle = async () => {
    return authService.signInWithGoogle();
  };

  const logout = async () => {
    return authService.signOutUser();
  };

  const resetPassword = async (email: string) => {
    return authService.sendPasswordReset(email);
  };

  const getIdToken = async () => {
    return authService.getIdToken();
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
