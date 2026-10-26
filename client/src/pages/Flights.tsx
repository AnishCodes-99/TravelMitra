import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Plane,
  Calendar,
  Users,
  ArrowRight,
  Filter,
  AlertCircle,
  RotateCcw,
  SlidersHorizontal,
  Clock,
  Search,
} from 'lucide-react';
import { api } from '../services/api';
import { FlightItem } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { formatINR } from '../lib/utils';
import { RazorpayModal, BookingPaymentItem } from '../components/payment/RazorpayModal';

const POPULAR_AIRPORTS = [
  { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi Intl (DEL)' },
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Intl (BOM)' },
  { code: 'BLR', city: 'Bengaluru', name: 'Kempegowda Intl (BLR)' },
  { code: 'GOI', city: 'Goa', name: 'Dabolim / Mopa (GOI)' },
  { code: 'CCU', city: 'Kolkata', name: 'Netaji Subhash Chandra Bose (CCU)' },
  { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi Intl (HYD)' },
  { code: 'MAA', city: 'Chennai', name: 'Chennai Intl (MAA)' },
  { code: 'JAI', city: 'Jaipur', name: 'Jaipur Intl (JAI)' },
  { code: 'COK', city: 'Kochi', name: 'Cochin Intl (COK)' },
  { code: 'SXR', city: 'Srinagar', name: 'Sheikh ul-Alam Intl (SXR)' },
];

export const Flights: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const origin = searchParams.get('origin') || 'DEL';
  const destination = searchParams.get('destination') || 'GOI';
  const departureDate = searchParams.get('departureDate') || new Date().toISOString().split('T')[0];
  const returnDate = searchParams.get('returnDate') || '';
  const passengers = parseInt(searchParams.get('passengers') || '1', 10);
  const cabinClass = (searchParams.get('cabinClass') || 'ECONOMY').toUpperCase() as
    | 'ECONOMY'
    | 'PREMIUM_ECONOMY'
    | 'BUSINESS'
    | 'FIRST';

  // Live sidebar modification form state
  const [modOrigin, setModOrigin] = useState(origin);
  const [modDestination, setModDestination] = useState(destination);
  const [modDepartureDate, setModDepartureDate] = useState(departureDate);
  const [modPassengers, setModPassengers] = useState(passengers);
  const [modCabinClass, setModCabinClass] = useState(cabinClass);

  // Sync modification state when URL searchParams change
  useEffect(() => {
    setModOrigin(origin);
    setModDestination(destination);
    setModDepartureDate(departureDate);
    setModPassengers(passengers);
    setModCabinClass(cabinClass);
  }, [origin, destination, departureDate, passengers, cabinClass]);

  const [rawFlights, setRawFlights] = useState<FlightItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentItem, setPaymentItem] = useState<BookingPaymentItem | null>(null);

  // Filter states
  const [selectedStops, setSelectedStops] = useState<number[]>([0, 1]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'duration' | 'departure'>('price-asc');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    document.title = `${origin} to ${destination} Flights (${cabinClass}) — TravelMitra`;

    async function loadFlights() {
      try {
        setLoading(true);
        setError(null);
        const res = await api.searchFlights({
          origin,
          destination,
          departureDate,
          ...(returnDate ? { returnDate } : {}),
          passengers,
          cabinClass,
        });
        setRawFlights(res.data);

        // Initialize price slider ceiling to highest returned price + 1000
        if (res.data.length > 0) {
          const highest = Math.max(...res.data.map(f => f.price));
          setMaxPrice(highest + 500);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadFlights();
  }, [origin, destination, departureDate, returnDate, passengers, cabinClass]);

  // Extract unique airlines available in the result
  const availableAirlines = useMemo(() => {
    const set = new Set<string>();
    rawFlights.forEach(f => set.add(f.airline));
    return Array.from(set);
  }, [rawFlights]);

  // Handle live search update from the sidebar search box
  const handleApplySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (modOrigin === modDestination) {
      alert('Origin and destination cannot be identical!');
      return;
    }
    const params = new URLSearchParams({
      origin: modOrigin,
      destination: modDestination,
      departureDate: modDepartureDate,
      ...(returnDate ? { returnDate } : {}),
      passengers: String(modPassengers),
      cabinClass: modCabinClass,
    });
    setSearchParams(params);
  };

  // Quick class toggle handler
  const handleClassChange = (newClass: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST') => {
    setModCabinClass(newClass);
    const params = new URLSearchParams(searchParams);
    params.set('cabinClass', newClass);
    setSearchParams(params);
  };

  // Filtered & sorted flights
  const filteredFlights = useMemo(() => {
    return rawFlights
      .filter(flight => {
        // Stops filter
        if (selectedStops.length > 0 && !selectedStops.includes(flight.stops)) {
          return false;
        }
        // Airlines filter
        if (selectedAirlines.length > 0 && !selectedAirlines.includes(flight.airline)) {
          return false;
        }
        // Price filter
        if (flight.price > maxPrice) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
        if (sortBy === 'departure') return a.departureTime.localeCompare(b.departureTime);
        return 0;
      });
  }, [rawFlights, selectedStops, selectedAirlines, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSelectedStops([0, 1]);
    setSelectedAirlines([]);
    if (rawFlights.length > 0) {
      const highest = Math.max(...rawFlights.map(f => f.price));
      setMaxPrice(highest + 500);
    }
    setSortBy('price-asc');
  };

  // Cabin Class Badges helper
  const renderClassBadge = (cls: string) => {
    switch (cls) {
      case 'FIRST':
        return <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300">👑 First Class</span>;
      case 'BUSINESS':
        return <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-300">💼 Business Class</span>;
      case 'PREMIUM_ECONOMY':
        return <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-sky-100 text-sky-800 border border-sky-300">✨ Premium Economy</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">🎫 Economy</span>;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Search Query Summary Header Bar with subtle travel theme */}
        <div className="relative overflow-hidden bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-brand-50/60 to-transparent pointer-events-none" />
          
          <div className="flex flex-wrap items-center gap-3 z-10">
            <div className="flex items-center gap-2 text-xl sm:text-2xl font-black text-slate-900">
              <Plane className="w-6 h-6 text-brand-500" />
              <span>{origin}</span>
              <ArrowRight className="w-5 h-5 text-brand-500" />
              <span>{destination}</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{departureDate}</span>
              {returnDate && <span> - {returnDate}</span>}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>
                {passengers} {passengers === 1 ? 'Adult' : 'Adults'}
              </span>
            </div>
            {renderClassBadge(cabinClass)}
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
              Showing {filteredFlights.length} {filteredFlights.length === 1 ? 'flight' : 'flights'}
            </span>
          </div>
        </div>

        {/* Main Content: Sidebar (Search + Filter) + Flight Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Sidebar (Search Modification & Live Filters) */}
          <div className={`space-y-5 lg:block ${mobileFilterOpen ? 'block' : 'hidden'}`}>
            {/* 1. SIDEBAR SEARCH MODIFIER: Visible immediately right beside the results */}
            <Card className="p-5 border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Search className="w-4 h-4 text-brand-500" /> Modify Route & Class
                </h4>
              </div>

              <form onSubmit={handleApplySearch} className="space-y-3.5">
                {/* Origin */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">From (Origin)</label>
                  <select
                    value={modOrigin}
                    onChange={e => setModOrigin(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500"
                  >
                    {POPULAR_AIRPORTS.map(apt => (
                      <option key={`side-orig-${apt.code}`} value={apt.code}>
                        {apt.city} ({apt.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">To (Destination)</label>
                  <select
                    value={modDestination}
                    onChange={e => setModDestination(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500"
                  >
                    {POPULAR_AIRPORTS.map(apt => (
                      <option key={`side-dest-${apt.code}`} value={apt.code}>
                        {apt.city} ({apt.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Departure Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={modDepartureDate}
                    onChange={e => setModDepartureDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Passengers */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Passengers</label>
                  <select
                    value={modPassengers}
                    onChange={e => setModPassengers(parseInt(e.target.value, 10))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                      <option key={`side-pax-${num}`} value={num}>
                        {num} {num === 1 ? 'Adult' : 'Adults'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cabin Class Selection with live price tier indicator */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Cabin Class</label>
                  <select
                    value={modCabinClass}
                    onChange={e => setModCabinClass(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="ECONOMY">Economy (Standard Fare)</option>
                    <option value="PREMIUM_ECONOMY">Premium Economy (Extra Legroom)</option>
                    <option value="BUSINESS">Business Class (Lie-Flat & Lounge)</option>
                    <option value="FIRST">First Class (VIP Royal Suite)</option>
                  </select>
                </div>

                <Button type="submit" variant="primary" size="sm" className="w-full font-bold shadow-md shadow-brand-500/20">
                  Update Live Search
                </Button>
              </form>
            </Card>

            {/* 2. LIVE SIDEBAR FILTERS */}
            <Card className="p-5 border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-brand-500" /> Filter Results
                </h4>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Class Switcher Pills for Instant Comparison */}
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Compare Cabin Class
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'] as const).map(cls => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => handleClassChange(cls)}
                      className={`px-2 py-1.5 rounded-lg text-[11px] font-bold text-left transition-all ${
                        cabinClass === cls
                          ? 'bg-brand-500 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {cls === 'ECONOMY' && 'Economy'}
                      {cls === 'PREMIUM_ECONOMY' && 'Prem. Economy'}
                      {cls === 'BUSINESS' && 'Business'}
                      {cls === 'FIRST' && 'First Class'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stops Filter */}
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Flight Stops
                </span>
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-slate-900">
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedStops.includes(0)}
                        onChange={e => {
                          if (e.target.checked) setSelectedStops([...selectedStops, 0]);
                          else setSelectedStops(selectedStops.filter(s => s !== 0));
                        }}
                        className="rounded text-brand-500 focus:ring-brand-500"
                      />
                      <span>Non-Stop Only</span>
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600">Fastest</span>
                  </label>
                  <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-slate-900">
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedStops.includes(1)}
                        onChange={e => {
                          if (e.target.checked) setSelectedStops([...selectedStops, 1]);
                          else setSelectedStops(selectedStops.filter(s => s !== 1));
                        }}
                        className="rounded text-brand-500 focus:ring-brand-500"
                      />
                      <span>1 Stop</span>
                    </span>
                    <span className="text-[11px] text-slate-400">Connecting</span>
                  </label>
                </div>
              </div>

              {/* Airline Filter */}
              {availableAirlines.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    Airlines ({availableAirlines.length})
                  </span>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {availableAirlines.map(airline => {
                      const isChecked = selectedAirlines.length === 0 || selectedAirlines.includes(airline);
                      return (
                        <label
                          key={airline}
                          className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-slate-900"
                        >
                          <span className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={e => {
                                if (e.target.checked) {
                                  setSelectedAirlines([...selectedAirlines, airline]);
                                } else {
                                  if (selectedAirlines.length === 0) {
                                    setSelectedAirlines(availableAirlines.filter(a => a !== airline));
                                  } else {
                                    setSelectedAirlines(selectedAirlines.filter(a => a !== airline));
                                  }
                                }
                              }}
                              className="rounded text-brand-500 focus:ring-brand-500"
                            />
                            <span>{airline}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Max Price Range Slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Max Price</span>
                  <span className="text-xs font-extrabold text-brand-600">{formatINR(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={3000}
                  max={80000}
                  step={500}
                  value={maxPrice}
                  onChange={e => setMaxPrice(parseInt(e.target.value, 10))}
                  className="w-full accent-brand-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>₹3,000</span>
                  <span>₹80,000</span>
                </div>
              </div>

              {/* Sort By */}
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Sort Flights By
                </span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500"
                >
                  <option value="price-asc">Price: Lowest First</option>
                  <option value="price-desc">Price: Highest First</option>
                  <option value="duration">Fastest Duration</option>
                  <option value="departure">Earliest Departure</option>
                </select>
              </div>
            </Card>
          </div>

          {/* Results List */}
          <div className="lg:col-span-3 space-y-4">
            {loading ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
                <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-base font-bold text-slate-900">
                  Searching Live Flights for {origin} → {destination}...
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Connecting to TravelMitra Indian Aviation Engine & calculating {cabinClass.toLowerCase().replace('_', ' ')} fares
                </p>
              </div>
            ) : error ? (
              <div className="bg-white rounded-3xl p-8 border border-rose-200 text-center space-y-3 shadow-sm">
                <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
                <h4 className="font-bold text-slate-900">Failed to fetch flight offers</h4>
                <p className="text-xs text-slate-500">{error}</p>
              </div>
            ) : filteredFlights.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
                <Plane className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-900 text-lg">No flights matching active filters</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try adjusting the price slider, enabling more airlines, or resetting your filters to view all available flights.
                </p>
                <Button variant="primary" size="sm" onClick={handleResetFilters} className="mt-2">
                  Reset All Filters
                </Button>
              </div>
            ) : (
              filteredFlights.map(flight => (
                <Card key={flight.id} hoverEffect className="p-5 sm:p-6 transition-all border border-slate-200/90">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    {/* Airline & Flight Number & Class Badge */}
                    <div className="flex items-center gap-4 sm:w-1/4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center font-bold text-brand-600 text-sm shrink-0 border border-brand-100">
                        <Plane className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">{flight.airline}</h4>
                        <span className="text-xs text-slate-400 font-mono">{flight.flightNumber}</span>
                        <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                          {renderClassBadge(cabinClass)}
                          {flight.seatsAvailable && flight.seatsAvailable <= 6 && (
                            <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded">
                              {flight.seatsAvailable} left
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Flight Times & Duration */}
                    <div className="flex items-center justify-between sm:justify-center gap-6 sm:w-1/2">
                      <div className="text-left">
                        <span className="text-xl font-extrabold text-slate-900 block tracking-tight">
                          {flight.departureTime}
                        </span>
                        <span className="text-xs font-bold text-slate-500">{flight.origin}</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-[11px] font-bold text-slate-500 mb-1 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {flight.duration}
                        </span>
                        <div className="w-24 sm:w-32 h-[2px] bg-slate-300 relative flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-brand-500 absolute shadow-sm" />
                        </div>
                        <span className="text-[10px] text-emerald-600 font-extrabold mt-1">
                          {flight.stops === 0 ? 'Non-Stop' : `${flight.stops} Stop`}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-xl font-extrabold text-slate-900 block tracking-tight">
                          {flight.arrivalTime}
                        </span>
                        <span className="text-xs font-bold text-slate-500">{flight.destination}</span>
                      </div>
                    </div>

                    {/* Price & Booking Action */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:w-1/4 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div>
                        <span className="text-2xl font-black text-brand-600 block tracking-tight">
                          {formatINR(flight.price)}
                        </span>
                        <span className="text-[10px] text-slate-400 block sm:text-right font-medium">
                          {passengers > 1 ? `total for ${passengers} passengers` : 'per adult, incl. all taxes'}
                        </span>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setPaymentItem({
                            id: flight.id,
                            type: 'flight',
                            title: `${flight.origin} → ${flight.destination} (${flight.airline})`,
                            subtitle: `${flight.airline} (${flight.flightNumber}) • ${cabinClass.replace('_', ' ')} • ${flight.stops === 0 ? 'Non-Stop' : '1 Stop'}`,
                            price: flight.price,
                            details: [
                              { label: 'Airline', value: flight.airline },
                              { label: 'Flight Number', value: flight.flightNumber },
                              { label: 'Class', value: cabinClass.replace('_', ' ') },
                              { label: 'Departure', value: `${flight.origin} (${flight.departureTime})` },
                              { label: 'Arrival', value: `${flight.destination} (${flight.arrivalTime})` },
                              { label: 'Travel Date', value: departureDate },
                              { label: 'Passengers', value: `${passengers} Passenger(s)` },
                            ],
                          });
                        }}
                        className="mt-2.5 shadow-md shadow-brand-500/20"
                      >
                        Book {cabinClass === 'BUSINESS' || cabinClass === 'FIRST' ? 'Class' : 'Flight'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Razorpay Interactive Checkout Modal */}
      <RazorpayModal
        isOpen={!!paymentItem}
        onClose={() => setPaymentItem(null)}
        bookingItem={paymentItem}
      />
    </div>
  );
};
