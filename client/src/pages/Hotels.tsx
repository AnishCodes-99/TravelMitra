import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Building2, Calendar, Users, Star, MapPin, Check, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { HotelItem } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatINR } from '../lib/utils';


import { RazorpayModal, BookingPaymentItem } from '../components/payment/RazorpayModal';

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
  const [selectedHotel, setSelectedHotel] = useState<HotelItem | null>(null);
  const [paymentItem, setPaymentItem] = useState<BookingPaymentItem | null>(null);

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
                      {hotel.amenities.map((amenity: string) => (
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
                      onClick={() => setSelectedHotel(hotel)}
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

      {/* Luxury Hotel Reservation Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-900">Hotel Reservation Summary</h3>
              <button
                onClick={() => setSelectedHotel(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <img
                  src={selectedHotel.imageUrl}
                  alt={selectedHotel.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{selectedHotel.name}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-brand-500" /> {selectedHotel.city}, India
                  </p>
                  <span className="text-[10px] bg-brand-50 text-brand-700 font-bold px-2 py-0.5 rounded-full inline-block mt-1">
                    {selectedHotel.starRating}-Star Luxury Stay
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl text-xs">
                <div>
                  <span className="text-slate-500 block">Check-In / Out:</span>
                  <span className="font-semibold text-slate-800">{checkInDate} → {checkOutDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Rooms & Guests:</span>
                  <span className="font-semibold text-slate-800">{rooms} Room, {adults} Adults</span>
                </div>
              </div>

              <div className="flex justify-between border-t border-slate-200 pt-3">
                <span className="text-slate-600">Total Price ({rooms} room, incl. GST):</span>
                <span className="text-xl font-extrabold text-brand-600">
                  {formatINR(selectedHotel.totalPrice || selectedHotel.pricePerNight * rooms)}
                </span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 border border-emerald-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Mitra Guarantee: Free cancellation & verified front-desk check-in guaranteed.</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedHotel(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const hotelToBook = selectedHotel;
                  setSelectedHotel(null);
                  setPaymentItem({
                    id: hotelToBook.id,
                    type: 'hotel',
                    title: hotelToBook.name,
                    subtitle: `${hotelToBook.city}, India • ${hotelToBook.starRating}-Star Luxury Stay`,
                    price: hotelToBook.totalPrice || hotelToBook.pricePerNight * rooms,
                    details: [
                      { label: 'Hotel Name', value: hotelToBook.name },
                      { label: 'City', value: hotelToBook.city },
                      { label: 'Dates', value: `${checkInDate} to ${checkOutDate}` },
                      { label: 'Rooms & Guests', value: `${rooms} Room, ${adults} Adults` },
                      { label: 'Inclusions', value: 'Buffet Breakfast & High-Speed WiFi' },
                    ],
                  });
                }}
              >
                Proceed to Razorpay Payment
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Razorpay Interactive Checkout Modal */}
      <RazorpayModal
        isOpen={!!paymentItem}
        onClose={() => setPaymentItem(null)}
        bookingItem={paymentItem}
      />
    </div>
  );
};
