import React, { useState, useEffect } from 'react';
import { User as UserIcon, Mail, Phone, Settings, Save, CheckCircle2, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const Profile: React.FC = () => {
  const { user, updateUserProfile } = useAuth();

  const [displayName, setDisplayName] = useState(
    user?.displayName || (user?.email ? user.email.split('@')[0] : 'Mitra Traveler')
  );
  const [phone, setPhone] = useState('+91 98765 43210');
  const [seatPreference, setSeatPreference] = useState('window');
  const [mealPreference, setMealPreference] = useState('Vegetarian Hindu Meal (AVML)');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.displayName) {
        setDisplayName(user.displayName);
      } else if (user.email) {
        setDisplayName(user.email.split('@')[0]);
      }
      try {
        const key = `travelmitra_user_prefs_${user.uid || 'guest'}`;
        const savedPrefs = localStorage.getItem(key);
        if (savedPrefs) {
          const parsed = JSON.parse(savedPrefs);
          if (parsed.phone) setPhone(parsed.phone);
          if (parsed.seatPreference) setSeatPreference(parsed.seatPreference);
          if (parsed.mealPreference) setMealPreference(parsed.mealPreference);
          if (parsed.displayName) setDisplayName(parsed.displayName);
        }
      } catch (e) {
        console.warn('Could not read user preferences:', e);
      }
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateUserProfile({ displayName, phoneNumber: phone });
      const key = `travelmitra_user_prefs_${user?.uid || 'guest'}`;
      localStorage.setItem(
        key,
        JSON.stringify({ displayName, phone, seatPreference, mealPreference })
      );
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    } catch (err) {
      console.warn('Failed saving preferences:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Traveller Profile & Account Details
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Your personal contact info, flight seat tastes, and dining choices stay saved until you log out.
            </p>
          </div>
          {user && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Session Active: {user.displayName || user.email}</span>
            </div>
          )}
        </div>

        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-brand-500" /> Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name / Display Name"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                leftIcon={<UserIcon className="w-4 h-4" />}
                helperText="Displayed across all tickets and hotel reservations"
              />
              <Input
                label="Email Address"
                value={user?.email || 'guest.traveler@travelmitra.com'}
                disabled
                helperText="Email is bound to your persistent account session"
                leftIcon={<Mail className="w-4 h-4" />}
              />
              <Input
                label="Mobile Phone (for SMS / WhatsApp Ticket Updates)"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                leftIcon={<Phone className="w-4 h-4" />}
                helperText="Active for PNR alerts and check-in reminders"
              />
              <div>
                <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase mb-1.5">
                  Default Currency
                </label>
                <div className="py-2.5 px-3 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold border border-slate-200">
                  INR (₹) — Indian Rupee
                </div>
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 pt-4 flex items-center gap-2">
              <Settings className="w-4 h-4 text-brand-500" /> Travel Preferences
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase mb-1.5">
                  Flight Seat Preference
                </label>
                <select
                  value={seatPreference}
                  onChange={e => setSeatPreference(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-sm text-slate-900 focus:ring-2 focus:ring-brand-500"
                >
                  <option value="window">Window Seat (Preferred)</option>
                  <option value="aisle">Aisle Seat</option>
                  <option value="middle">Middle Seat</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase mb-1.5">
                  Flight Meal Preference
                </label>
                <select
                  value={mealPreference}
                  onChange={e => setMealPreference(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-sm text-slate-900 focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Vegetarian Hindu Meal (AVML)">Vegetarian Hindu Meal (AVML)</option>
                  <option value="Jain Vegetarian Meal (VJML)">Jain Vegetarian Meal (VJML)</option>
                  <option value="Non-Vegetarian Indian Meal">Non-Vegetarian Indian Meal</option>
                  <option value="Diabetic Meal (DBML)">Diabetic Meal (DBML)</option>
                  <option value="Fruit Platter (FPML)">Fruit Platter (FPML)</option>
                </select>
              </div>
            </div>

            {savedSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Profile details and travel preferences saved successfully. Persistent across browser visits.</span>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSaving}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save Preferences
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
