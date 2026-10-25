import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const Saved: React.FC = () => {
  const [savedItems, setSavedItems] = useState([
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
  ]);

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

        {savedItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <Heart className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">Your wishlist is currently empty</p>
            <p className="text-xs text-slate-400 mt-1">Explore destinations to save your favorite holiday escapes.</p>
            <Link to="/destinations" className="inline-block mt-4">
              <span className="text-xs font-bold text-brand-600 hover:underline">Explore Destinations →</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedItems.map(item => (
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
                    onClick={() => setSavedItems(prev => prev.filter(i => i.id !== item.id))}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
