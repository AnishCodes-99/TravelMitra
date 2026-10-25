import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight, Info } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const Saved: React.FC = () => {
  const sampleSaved = [
    {
      id: 'goa',
      name: 'Goa Coast & Palolem Beach',
      notes: 'Planning a 4-day winter vacation with friends in November',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 'kashmir',
      name: 'Gulmarg Snow Valley',
      notes: 'Gondola ride and ski lessons in January',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=500&q=80',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-current" />
            <span>Saved Wishlists & Destinations</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Keep track of destinations you dream of exploring across India
          </p>
        </div>

        <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 flex items-start gap-3 text-xs text-brand-900">
          <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
          <div>
            <strong>Phase 1 Architecture Note:</strong> Wishlists will sync to the{' '}
            <code className="bg-brand-100 font-mono px-1 py-0.5 rounded">SavedDestination</code>{' '}
            Mongoose collection once user accounts are signed in.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleSaved.map(item => (
            <Card key={item.id} hoverEffect className="overflow-hidden">
              <div className="h-44 w-full relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-base text-slate-900">{item.name}</h3>
                <p className="text-xs text-slate-500 italic">"{item.notes}"</p>
              </div>
              <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                <Link
                  to={`/flights?origin=DEL&destination=${item.id.slice(0, 3).toUpperCase()}`}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
                >
                  <span>Search Flights</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => alert(`Remove "${item.name}" from wishlist.`)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
