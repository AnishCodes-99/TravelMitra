import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Building2,
  Calendar,
  Users,
  Star,
  MapPin,
  Check,
  ShieldCheck,
  Filter,
  RotateCcw,
  SlidersHorizontal,
  Search,
} from 'lucide-react';
import { api } from '../services/api';
import { HotelItem } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatINR } from '../lib/utils';
import { RazorpayModal, BookingPaymentItem } from '../components/payment/RazorpayModal';

const POPULAR_DESTINATIONS = [
  'Goa',
  'Delhi',
  'Mumbai',
  'Jaipur',
  'Udaipur',
  'Kashmir',
  'Manali',
  'Kerala',
  'Bengaluru',
  'Varanasi',
  'Kolkata',
  'Chennai',
  'Hyderabad',
  'Agra',
  'Amritsar',
  'Ooty',
  'Andaman',
  'Rishikesh',
];

const POPULAR_AMENITIES = [
  'Swimming Pool',
  'Private Beach',
  'Luxury Jiva Spa',
  'Buffet Breakfast',
  'Free WiFi',
  'Airport Shuttle',
];

export const Hotels: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const city = searchParams.get('city') || 'Goa';
  const checkInDate = searchParams.get('checkInDate') || new Date().toISOString().split('T')[0];
  const checkOutDate = searchParams.get('checkOutDate') || new Date().toISOString().split('T')[0];
  const rooms = parseInt(searchParams.get('rooms') || '1', 10);
  const adults = parseInt(searchParams.get('adults') || '2', 10);
  const children = parseInt(searchParams.get('children') || '0', 10);

  // Live sidebar modification form state
  const [modCity, setModCity] = useState(city);
  const [modCheckIn, setModCheckIn] = useState(checkInDate);
  const [modCheckOut, setModCheckOut] = useState(checkOutDate);
  const [modRooms, setModRooms] = useState(rooms);
  const [modAdults, setModAdults] = useState(adults);

  // Sync state if URL changes
  useEffect(() => {
    setModCity(city);
    setModCheckIn(checkInDate);
    setModCheckOut(checkOutDate);
    setModRooms(rooms);
    setModAdults(adults);
  }, [city, checkInDate, checkOutDate, rooms, adults]);

  const [rawHotels, setRawHotels] = useState<HotelItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<HotelItem | null>(null);
  const [paymentItem, setPaymentItem] = useState<BookingPaymentItem | null>(null);

  // Filters state
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(35000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating-desc'>('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    document.title = `Hotels & Resorts in ${city} — TravelMitra`;

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
        setRawHotels(res.data);

        // Adjust initial max price ceiling based on highest rate
        if (res.data.length > 0) {
          const highest = Math.max(...res.data.map(h => h.pricePerNight));
          setMaxPrice(highest + 1000);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadHotels();
  }, [city, checkInDate, checkOutDate, rooms, adults, children]);

  // Handle Search Modification from the sidebar
  const handleApplySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modCity.trim()) return;
    const params = new URLSearchParams({
      city: modCity.trim(),
      checkInDate: modCheckIn,
      checkOutDate: modCheckOut,
      rooms: String(modRooms),
      adults: String(modAdults),
      children: String(children),
    });
    setSearchParams(params);
  };

  // Filter & sort hotels
  const filteredHotels = useMemo(() => {
    return rawHotels
      .filter(hotel => {
        // Star rating filter
        if (selectedStars.length > 0 && !selectedStars.includes(hotel.starRating)) {
          return false;
        }
        // Price filter
        if (hotel.pricePerNight > maxPrice) {
          return false;
        }
        // Amenities filter
        if (selectedAmenities.length > 0) {
          const hasAll = selectedAmenities.every(reqAmenity =>
            hotel.amenities.some(a => a.toLowerCase().includes(reqAmenity.toLowerCase()))
          );
          if (!hasAll) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight;
        if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight;
        if (sortBy === 'rating-desc') return b.starRating - a.starRating;
        return 0; // recommended
      });
  }, [rawHotels, selectedStars, maxPrice, selectedAmenities, sortBy]);

  const handleResetFilters = () => {
    setSelectedStars([]);
    setSelectedAmenities([]);
    if (rawHotels.length > 0) {
      const highest = Math.max(...rawHotels.map(h => h.pricePerNight));
      setMaxPrice(highest + 1000);
    }
    setSortBy('recommended');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Search Query Summary Header Bar */}
        <div className="relative overflow-hidden bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-amber-50/60 to-transparent pointer-events-none" />

          <div className="flex flex-wrap items-center gap-3 z-10">
            <div className="flex items-center gap-2 text-xl sm:text-2xl font-black text-slate-900">
              <Building2 className="w-6 h-6 text-brand-500" />
              <span>Stays in {city}</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>
                {checkInDate} → {checkOutDate}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>
                {rooms} {rooms === 1 ? 'Room' : 'Rooms'}, {adults} Adults
              </span>
            </div>
            <Badge variant="primary">Verified Partner Stays</Badge>
          </div>

          <div className="flex items-center gap-2 z-10 w-full sm:w-auto justify-between sm:justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-1.5 text-xs font-bold"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-500" />
              <span>Filters & Search</span>
            </Button>

            <span className="text-xs font-bold text-slate-500">
              Showing {filteredHotels.length} of {rawHotels.length} properties
            </span>
          </div>
        </div>

        {/* Main Grid: Sidebar (Search & Filter) + Hotels List */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* SIDEBAR: SEARCH MODIFIER & LIVE FILTERS */}
          <div className={`space-y-5 lg:block ${mobileFilterOpen ? 'block' : 'hidden'}`}>
            {/* 1. SIDEBAR SEARCH MODIFIER: Direct on-page modification */}
            <Card className="p-5 border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Search className="w-4 h-4 text-brand-500" /> Modify Destination
                </h4>
              </div>

              <form onSubmit={handleApplySearch} className="space-y-3.5">
                {/* Destination / City */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    City or Destination
                  </label>
                  <input
                    type="text"
                    list="destinations-list"
                    value={modCity}
                    onChange={e => setModCity(e.target.value)}
                    placeholder="e.g. Goa, Jaipur, Mumbai..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500"
                  />
                  <datalist id="destinations-list">
                    {POPULAR_DESTINATIONS.map(d => (
                      <option key={d} value={d} />
                    ))}
                  </datalist>
                </div>

                {/* Check In */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Check-In</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={modCheckIn}
                    onChange={e => setModCheckIn(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Check Out */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Check-Out</label>
                  <input
                    type="date"
                    min={modCheckIn || new Date().toISOString().split('T')[0]}
                    value={modCheckOut}
                    onChange={e => setModCheckOut(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Rooms & Adults */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Rooms</label>
                    <select
                      value={modRooms}
                      onChange={e => setModRooms(parseInt(e.target.value, 10))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500"
                    >
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={`room-${n}`} value={n}>
                          {n} Room{n > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Adults</label>
                    <select
                      value={modAdults}
                      onChange={e => setModAdults(parseInt(e.target.value, 10))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500"
                    >
                      {[1, 2, 3, 4, 6, 8, 10].map(n => (
                        <option key={`adult-${n}`} value={n}>
                          {n} Adult{n > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button type="submit" variant="primary" size="sm" className="w-full font-bold shadow-md shadow-brand-500/20">
                  Update Hotels Search
                </Button>
              </form>
            </Card>

            {/* 2. LIVE SIDEBAR FILTERS */}
            <Card className="p-5 border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-brand-500" /> Filter Stays
                </h4>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Star Rating Filter */}
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Star Category
                </span>
                <div className="space-y-2">
                  {[5, 4, 3].map(stars => {
                    const isChecked = selectedStars.includes(stars);
                    return (
                      <label
                        key={stars}
                        className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-slate-900"
                      >
                        <span className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={e => {
                              if (e.target.checked) setSelectedStars([...selectedStars, stars]);
                              else setSelectedStars(selectedStars.filter(s => s !== stars));
                            }}
                            className="rounded text-brand-500 focus:ring-brand-500"
                          />
                          <span className="font-semibold">{stars}-Star Luxury & Comfort</span>
                        </span>
                        <div className="flex items-center text-amber-500">
                          {Array.from({ length: stars }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Per Night Slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Max / Night</span>
                  <span className="text-xs font-extrabold text-brand-600">{formatINR(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={1500}
                  max={35000}
                  step={500}
                  value={maxPrice}
                  onChange={e => setMaxPrice(parseInt(e.target.value, 10))}
                  className="w-full accent-brand-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>₹1,500</span>
                  <span>₹35,000+</span>
                </div>
              </div>

              {/* Popular Amenities Filter */}
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Popular Amenities
                </span>
                <div className="space-y-2">
                  {POPULAR_AMENITIES.map(amenity => {
                    const isChecked = selectedAmenities.includes(amenity);
                    return (
                      <label
                        key={amenity}
                        className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-slate-900"
                      >
                        <span className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={e => {
                              if (e.target.checked) setSelectedAmenities([...selectedAmenities, amenity]);
                              else setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                            }}
                            className="rounded text-brand-500 focus:ring-brand-500"
                          />
                          <span>{amenity}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Sort Hotels By
                </span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500"
                >
                  <option value="recommended">Recommended by Mitra</option>
                  <option value="price-asc">Price: Lowest to Highest</option>
                  <option value="price-desc">Price: Highest to Lowest</option>
                  <option value="rating-desc">Star Rating: Highest First</option>
                </select>
              </div>
            </Card>
          </div>

          {/* HOTELS RESULTS LIST */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
                <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-base font-bold text-slate-900">Searching handpicked stays in {city}...</p>
                <p className="text-xs text-slate-500 mt-1">Checking live room availability & partner discounts</p>
              </div>
            ) : error ? (
              <div className="bg-white rounded-3xl p-8 border border-rose-200 text-center shadow-sm">
                <p className="text-sm text-rose-600 font-semibold">{error}</p>
              </div>
            ) : filteredHotels.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
                <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-900 text-lg">No stays matching active filters</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try widening your price range, unchecking strict amenities, or resetting filters to see all verified properties in {city}.
                </p>
                <Button variant="primary" size="sm" onClick={handleResetFilters} className="mt-2">
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredHotels.map(hotel => (
                  <Card key={hotel.id} hoverEffect className="flex flex-col overflow-hidden border border-slate-200/90 group">
                    {/* Hotel Image with Badges */}
                    <div className="h-52 relative overflow-hidden bg-slate-100">
                      <img
                        src={hotel.imageUrl}
                        alt={hotel.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-slate-950/80 text-white backdrop-blur-md shadow-sm">
                          {hotel.starRating}-Star Hotel
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/95 text-brand-700 shadow-sm backdrop-blur-md">
                          Verified Partner
                        </span>
                      </div>
                    </div>

                    {/* Hotel Content */}
                    <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                      <div>
                        <div className="flex items-center gap-1 text-amber-500 mb-1.5">
                          {Array.from({ length: hotel.starRating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <h3 className="font-extrabold text-base text-slate-900 leading-snug line-clamp-1">
                          {hotel.name}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" /> {hotel.city}, India
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {hotel.amenities.slice(0, 4).map((amenity: string) => (
                            <span
                              key={amenity}
                              className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                            >
                              <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                              {amenity}
                            </span>
                          ))}
                          {hotel.amenities.length > 4 && (
                            <span className="text-[10px] font-bold text-slate-400 py-0.5 px-1">
                              +{hotel.amenities.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">per night</span>
                          <span className="text-xl font-black text-brand-600">
                            {formatINR(hotel.pricePerNight)}
                          </span>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setSelectedHotel(hotel)}
                          className="shadow-md shadow-brand-500/20"
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
      </div>

      {/* Luxury Hotel Reservation Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-lg text-slate-900">Hotel Reservation Summary</h3>
              <button
                onClick={() => setSelectedHotel(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <img
                  src={selectedHotel.imageUrl}
                  alt={selectedHotel.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-base leading-tight">{selectedHotel.name}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-brand-500" /> {selectedHotel.city}, India
                  </p>
                  <span className="text-[10px] bg-brand-50 text-brand-700 font-extrabold px-2 py-0.5 rounded-full inline-block mt-1">
                    {selectedHotel.starRating}-Star Luxury Stay
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl text-xs">
                <div>
                  <span className="text-slate-500 block">Check-In / Out:</span>
                  <span className="font-bold text-slate-800">{checkInDate} → {checkOutDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Rooms & Guests:</span>
                  <span className="font-bold text-slate-800">{rooms} Room, {adults} Adults</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline border-t border-slate-200 pt-3">
                <div>
                  <span className="text-slate-600 block text-xs">Total Stay Price ({rooms} room, incl. GST):</span>
                  <span className="text-[10px] text-slate-400">Zero hidden convenience fees</span>
                </div>
                <span className="text-2xl font-black text-brand-600">
                  {formatINR(selectedHotel.totalPrice || selectedHotel.pricePerNight * rooms)}
                </span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl text-xs text-emerald-900 border border-emerald-200 flex items-center gap-2">
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
