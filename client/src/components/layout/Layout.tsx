import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle } from 'lucide-react';

export const Layout: React.FC = () => {
  const { isFirebaseConfigured } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Informational banner when Firebase is unconfigured in development */}
      {!isFirebaseConfigured && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 px-4 py-2.5 text-xs text-amber-900 flex items-center justify-between">
          <div className="max-w-7xl mx-auto flex items-center gap-2 w-full justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>TravelMitra Phase 1 Mode:</strong> Firebase Auth is currently in development
                preview mode. To activate real user accounts, configure{' '}
                <code className="bg-amber-100/80 px-1 py-0.5 rounded text-[11px] font-mono">
                  VITE_FIREBASE_*
                </code>{' '}
                keys in <code className="bg-amber-100/80 px-1 py-0.5 rounded text-[11px] font-mono">client/.env</code>.
              </span>
            </div>
            <Link
              to="/login"
              className="hidden md:inline font-semibold text-brand-600 hover:text-brand-700 underline text-xs shrink-0"
            >
              Learn More →
            </Link>
          </div>
        </div>
      )}

      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
