import React from 'react';
import { Link } from 'react-router-dom';
import { Luggage, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Bookings: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center space-y-4 bg-white p-8 rounded-2xl border border-slate-200/90 shadow-card">
        <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto">
          <Luggage className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Manage Your Bookings</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Looking for your flights, hotel stays, or holiday package itineraries? View all active and
          past reservations in your Trips center.
        </p>
        <div className="pt-2">
          <Link to="/my-trips">
            <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Go to My Trips & Itineraries
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
