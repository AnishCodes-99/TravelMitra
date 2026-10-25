import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, Plane, Palmtree } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { formatINR } from '../lib/utils';

const ALL_DESTINATIONS = [
  {
    id: 'goa',
    name: 'Goa',
    region: 'West',
    category: 'Beach',
    price: 3899,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
    description: 'Vibrant beaches, Portuguese architecture, water sports, and beach shacks.',
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    region: 'North',
    category: 'Heritage',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
    description: 'Hawa Mahal, Amer Fort, City Palace, and traditional Rajasthani cuisine.',
  },
  {
    id: 'kerala',
    name: 'Munnar & Alleppey',
    region: 'South',
    category: 'Backwaters & Nature',
    price: 5499,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80',
    description: 'Tea plantations, misty hills, traditional houseboats, and backwater lagoons.',
  },
  {
    id: 'kashmir',
    name: 'Srinagar & Gulmarg',
    region: 'North',
    category: 'Mountains',
    price: 6200,
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80',
    description: 'Dal Lake shikara rides, snow peaks, pine forests, and Gondola cable cars.',
  },
  {
    id: 'manali',
    name: 'Manali & Rohtang',
    region: 'North',
    category: 'Mountains',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80',
    description: 'High-altitude passes, rafting in Beas river, cafes in Old Manali.',
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    region: 'North',
    category: 'Spiritual',
    price: 3100,
    image: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=600&q=80',
    description: 'Ancient ghats of the Ganges, evening Ganga Aarti, and centuries of tradition.',
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    region: 'West',
    category: 'Heritage',
    price: 3900,
    image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=600&q=80',
    description: 'Lake Pichola, romantic sunset boat rides, and magnificent marble palaces.',
  },
  {
    id: 'andaman',
    name: 'Andaman & Havelock',
    region: 'Islands',
    category: 'Beach & Coral',
    price: 11999,
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=600&q=80',
    description: 'Radhanagar beach, scuba diving among coral reefs, and crystal azure waters.',
  },
];

export const Destinations: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Beach', 'Heritage', 'Mountains', 'Backwaters & Nature', 'Spiritual'];

  const filtered = ALL_DESTINATIONS.filter(d => {
    const matchesQuery =
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Indian Destinations
          </h1>
          <p className="text-sm text-slate-600">
            From the tranquil backwaters of Kerala to the majestic snowpeaks of Kashmir, find your
            perfect Indian holiday.
          </p>

          <div className="pt-2 relative max-w-md mx-auto">
            <Search className="w-5 h-5 absolute left-3 top-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by city, theme or experience..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Destination grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(dest => (
            <Card key={dest.id} hoverEffect className="flex flex-col justify-between">
              <div>
                <div className="h-44 w-full relative overflow-hidden">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[10px] font-bold bg-white/90 text-slate-900 px-2 py-0.5 rounded shadow">
                      {dest.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-1.5">
                  <h3 className="font-bold text-base text-slate-900">{dest.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {dest.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">From</span>
                  <span className="text-sm font-extrabold text-brand-600">
                    {formatINR(dest.price)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Link
                    to={`/flights?origin=DEL&destination=${dest.id.slice(0, 3).toUpperCase()}`}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-brand-50 text-slate-600 hover:text-brand-600 transition-colors"
                    title="Find Flights"
                  >
                    <Plane className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/packages?destination=${encodeURIComponent(dest.name)}`}
                    className="p-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-600 transition-colors"
                    title="View Packages"
                  >
                    <Palmtree className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
