import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Heart, Shield, Compass, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white flex items-center justify-center font-bold text-2xl uppercase shadow-md shadow-brand-500/20">
              {user?.displayName ? user.displayName.slice(0, 2) : 'TM'}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Namaste, {user?.displayName || user?.email || 'Traveller'}!
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Welcome to your TravelMitra Traveller Account
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <Shield className="w-3.5 h-3.5" />
                <span>Tier: Silver Mitra Member</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/profile">
              <Button variant="outline" size="sm" leftIcon={<Settings className="w-4 h-4" />}>
                Account Settings
              </Button>
            </Link>
            <Link to="/">
              <Button variant="primary" size="sm" leftIcon={<Compass className="w-4 h-4" />}>
                Book Travel
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Booked Trips</span>
              <Plane className="w-5 h-5 text-brand-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">2</div>
            <Link to="/my-trips" className="text-xs text-brand-600 font-semibold hover:underline block">
              View upcoming itineraries →
            </Link>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Saved Wishlists</span>
              <Heart className="w-5 h-5 text-rose-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">4</div>
            <Link to="/saved" className="text-xs text-brand-600 font-semibold hover:underline block">
              Manage saved destinations →
            </Link>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Mitra Loyalty Coins</span>
              <Shield className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">1,250</div>
            <span className="text-xs text-slate-500 block">Worth ₹1,250 on future bookings</span>
          </Card>
        </div>

        {/* Quick Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-3">
            <h3 className="font-bold text-base text-slate-900">Recent Booking References</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">DEL → GOI (IndiGo 6E-204)</span>
                  <span className="text-slate-400">12 Nov 2026 • Confirmed</span>
                </div>
                <Link to="/my-trips" className="text-brand-600 font-bold hover:underline">
                  Manage
                </Link>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">BLR → JAI (Air India AI-502)</span>
                  <span className="text-slate-400">28 Dec 2026 • Upcoming</span>
                </div>
                <Link to="/my-trips" className="text-brand-600 font-bold hover:underline">
                  Manage
                </Link>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-3">
            <h3 className="font-bold text-base text-slate-900">Need Assistance with a Booking?</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our Mitra Concierge team is available 24 hours a day to assist with web check-ins, meal
              requests, excess baggage, or flight reschedule requests.
            </p>
            <div className="pt-2">
              <Link to="/contact">
                <Button variant="primary" size="sm">
                  Connect with Mitra Support
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
