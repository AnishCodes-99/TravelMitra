import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 bg-slate-50">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/90 shadow-card">
        <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} />
        </div>

        <div>
          <span className="text-5xl font-black text-brand-500 tracking-tight block">404</span>
          <h2 className="text-xl font-extrabold text-slate-900 mt-2">Looks like you've wandered off the map!</h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            The page or travel route you are searching for does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2 space-y-3">
          <Link to="/" className="w-full block">
            <Button variant="primary" size="lg" leftIcon={<Home className="w-4 h-4" />} className="w-full">
              Return to Homepage
            </Button>
          </Link>

          <div className="flex items-center justify-center gap-2 pt-2 text-xs text-slate-500">
            <span>Or explore:</span>
            <Link to="/flights" className="font-bold text-brand-600 hover:underline">
              Flights
            </Link>
            <span>•</span>
            <Link to="/hotels" className="font-bold text-brand-600 hover:underline">
              Hotels
            </Link>
            <span>•</span>
            <Link to="/packages" className="font-bold text-brand-600 hover:underline">
              Packages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
