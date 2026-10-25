import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Building2, Calendar, Users, Star, MapPin, Check, Info } from 'lucide-react';
import { api } from '../../services/api';
import { HotelItem } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatINR } from '../../lib/utils';

export const Hotels: React.FC = () => {
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city') || 'Goa';
  const checkInDate = searchParams.get('checkInDate') || new Date().toISOString().split('T')[0];
  const checkOutDate = searchParams.get('checkOutDate') || new Date().toISOString().split('T')[0];
  const rooms = parseInt(searchParams.get('rooms') || '1', 10);
  const adults = parseInt(searchParams.get('adults') || '2', 10);
  const children = parseInt(searchParams.get('children') || '0', 10);

  const [hotels, setHotels] = useState<HotelItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = `Hotels in ${city} — TravelMitra`;

    async function loadHotels() {
      try {
        setLoading(true);
        setError(null);
        const res = await api.searchHotels({
          city,
          checkInDate,
          checkOutDate,
          rooms,
          adults,
          children,
        });
        setHotels(res.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadHotels();
  }, [city, checkInDate, checkOutDate, rooms, adults, children]);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Search Query Summary Header Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xl font-extrabold text-slate-900">
              <Building2 className="w-5 h-5 text-brand-500" />
              <span>Stays in {city}</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>
                {checkInDate} to {checkOutDate}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>
                {rooms} {rooms === 1 ? 'Room' : 'Rooms'}, {adults} Adults
              </span>
            </div>
            <Badge variant="primary">Verified Partner Stays</Badge>
          </div>

          <Link to="/">
            <Button variant="outline" size="sm">
              Change Dates / City
            </Button>
          </Link>
        </div>

        {/* Phase 1 Architecture Notice */}
        <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 flex items-start gap-3 text-xs text-brand-900">
          <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
          <div>
            <strong>Phase 1 Preliminary Search Mode:</strong> Displaying audited boutique & heritage
            stays. Direct room inventory booking and hotelier confirmation codes will be activated in
            Phase 3.
          </div>
        </div>

        {/* Hotels list */}
        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-semibold text-slate-700">Searching handpicked stays in {city}...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl p-8 border border-rose-200 text-center">
            <p className="text-sm text-rose-600 font-semibold">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotels.map(hotel => (
              <Card key={hotel.id} hoverEffect className="flex flex-col sm:flex-row overflow-hidden">
                <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                  <img
                    src={hotel.imageUrl}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-white backdrop-blur-sm">
                      {hotel.starRating}-Star Hotel
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:w-3/5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-1">
                      {Array.from({ length: hotel.starRating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900">{hotel.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-brand-500" /> {hotel.city}, India
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {hotel.amenities.map(amenity => (
                        <span
                          key={amenity}
                          className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                        >
                          <Check className="w-3 h-3 text-emerald-600" />
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">per night</span>
                      <span className="text-lg font-extrabold text-brand-600">
                        {formatINR(hotel.pricePerNight)}
                      </span>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        alert(
                          `Selected ${hotel.name} in ${hotel.city}. Room booking will be active in Phase 3!`
                        )
                      }
                    >
                      Reserve Room
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
