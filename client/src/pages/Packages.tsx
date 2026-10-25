import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Palmtree, Clock, Check, Star, Info } from 'lucide-react';
import { api } from '../../services/api';
import { PackageItem } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatINR } from '../../lib/utils';

export const Packages: React.FC = () => {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('destination') || '';
  const departureCity = searchParams.get('departureCity') || 'New Delhi';

  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = `${destination || 'All'} Holiday Packages — TravelMitra`;

    async function loadPackages() {
      try {
        setLoading(true);
        setError(null);
        const res = await api.searchPackages({
          ...(destination ? { destination } : {}),
          departureCity,
        });
        setPackages(res.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadPackages();
  }, [destination, departureCity]);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xl font-extrabold text-slate-900">
              <Palmtree className="w-5 h-5 text-brand-500" />
              <span>
                {destination ? `Curated ${destination} Holiday Packages` : 'All Holiday Packages'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Departing from <span className="font-semibold text-slate-700">{departureCity}</span> •
              All packages include hotel stay, private transfers, and breakfast.
            </p>
          </div>

          <Link to="/">
            <Button variant="outline" size="sm">
              Search Other Destinations
            </Button>
          </Link>
        </div>

        <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 flex items-start gap-3 text-xs text-brand-900">
          <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
          <div>
            <strong>Phase 1 Holiday Catalog:</strong> Complete day-wise itineraries, private chauffeur bookings, and customized meal preferences will be configurable in Phase 3.
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-semibold text-slate-700">Loading holiday packages...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl p-8 border border-rose-200 text-center">
            <p className="text-sm text-rose-600 font-semibold">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <Card key={pkg.id} hoverEffect className="flex flex-col justify-between">
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={pkg.imageUrl}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="primary">{pkg.destination}</Badge>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-brand-500" /> {pkg.duration}
                      </span>
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" /> {pkg.rating}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 leading-snug">{pkg.title}</h3>

                    <div className="space-y-1.5 pt-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Package Inclusions
                      </span>
                      {pkg.inclusions.map(inc => (
                        <div key={inc} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">per person</span>
                    <span className="text-lg font-extrabold text-brand-600">
                      {formatINR(pkg.pricePerPerson)}
                    </span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() =>
                      alert(`Inquired about "${pkg.title}". Customization concierge will connect in Phase 3!`)
                    }
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
