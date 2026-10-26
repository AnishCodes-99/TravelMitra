import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Heart, Shield, Compass, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { firestoreService, BookingRecord } from '../services/firestoreService';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [tripCount, setTripCount] = useState<number>(0);
  const [recentTrips, setRecentTrips] = useState<BookingRecord[]>([]);
  const [wishlistCount, setWishlistCount] = useState<number>(0);

  useEffect(() => {
    async function loadStats() {
      try {
        if (!user) {
          setTripCount(0);
          setRecentTrips([]);
          setWishlistCount(0);
          return;
        }
        const bookings = await firestoreService.getUserBookings(user.uid, user.email || undefined);
        setTripCount(bookings.length);
        setRecentTrips(bookings.slice(0, 3));

        try {
          const saved = localStorage.getItem(`travelmitra_saved_${user.uid}`);
          if (saved) {
            const parsed = JSON.parse(saved);
            setWishlistCount(Array.isArray(parsed) ? parsed.length : 0);
          } else {
            setWishlistCount(0);
          }
        } catch {
          setWishlistCount(0);
        }
      } catch (err) {
        console.warn('Error loading dashboard stats:', err);
        setTripCount(0);
        setRecentTrips([]);
        setWishlistCount(0);
      }
    }
    loadStats();
  }, [user]);

  const loyaltyCoins = tripCount * 500;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white flex items-center justify-center font-bold text-2xl uppercase shadow-md shadow-brand-500/20">
              {user?.displayName ? user.displayName.slice(0, 2) : (user?.email ? user.email.slice(0, 2) : 'TM')}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Namaste, {user?.displayName || (user?.email ? user.email.split('@')[0] : 'Traveller')}!
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Welcome to your TravelMitra Traveller Account
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <Shield className="w-3.5 h-3.5" />
                <span>Tier: {tripCount > 2 ? 'Gold Mitra Member' : 'Silver Mitra Member'}</span>
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
            <div className="text-3xl font-extrabold text-slate-900">{tripCount}</div>
            <Link to="/my-trips" className="text-xs text-brand-600 font-semibold hover:underline block">
              {tripCount > 0 ? 'View upcoming itineraries →' : 'Book your first journey →'}
            </Link>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Saved Wishlists</span>
              <Heart className="w-5 h-5 text-rose-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{wishlistCount}</div>
            <Link to="/saved" className="text-xs text-brand-600 font-semibold hover:underline block">
              Manage saved destinations →
            </Link>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Mitra Loyalty Coins</span>
              <Shield className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{loyaltyCoins}</div>
            <span className="text-xs text-slate-500 block">
              {loyaltyCoins > 0 ? `Worth ₹${loyaltyCoins} on future bookings` : 'Earn 500 coins per flight or hotel booking'}
            </span>
          </Card>
        </div>

        {/* Quick Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Recent Booking References</h3>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                Firestore DB Live
              </span>
            </div>
            <div className="space-y-2 text-xs">
              {recentTrips.length > 0 ? (
                recentTrips.map(trip => (
                  <div key={trip.id} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 block">{trip.title}</span>
                      <span className="text-slate-400">
                        {trip.dates} • {trip.status} ({trip.pnr})
                      </span>
                    </div>
                    <Link to="/my-trips" className="text-brand-600 font-bold hover:underline">
                      Manage
                    </Link>
                  </div>
                ))
              ) : (
                <div className="p-6 bg-slate-50 rounded-xl text-center space-y-2">
                  <p className="text-xs text-slate-500 font-medium">No trips booked yet.</p>
                  <Link to="/" className="inline-block text-xs font-bold text-brand-600 hover:underline">
                    Search Flights & Hotels →
                  </Link>
                </div>
              )}
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
