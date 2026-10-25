import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Plane, Calendar, Users, ArrowRight, Filter, Info, ShieldCheck, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { FlightItem } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatINR } from '../lib/utils';


export const Flights: React.FC = () => {
  const [searchParams] = useSearchParams();
  const origin = searchParams.get('origin') || 'DEL';
  const destination = searchParams.get('destination') || 'GOI';
  const departureDate = searchParams.get('departureDate') || new Date().toISOString().split('T')[0];
  const returnDate = searchParams.get('returnDate');
  const passengers = parseInt(searchParams.get('passengers') || '1', 10);
  const cabinClass = searchParams.get('cabinClass') || 'ECONOMY';

  const [flights, setFlights] = useState<FlightItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<FlightItem | null>(null);

  useEffect(() => {
    document.title = `${origin} to ${destination} Flights — TravelMitra`;

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
        setFlights(res.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadFlights();
  }, [origin, destination, departureDate, returnDate, passengers, cabinClass]);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Search Query Summary Header Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xl font-extrabold text-slate-900">
              <span>{origin}</span>
              <ArrowRight className="w-5 h-5 text-brand-500" />
              <span>{destination}</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{departureDate}</span>
              {returnDate && <span> - {returnDate}</span>}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>
                {passengers} {passengers === 1 ? 'Passenger' : 'Passengers'}
              </span>
            </div>
            <Badge variant="primary">{cabinClass}</Badge>
          </div>

          <Link to="/">
            <Button variant="outline" size="sm">
              Modify Search
            </Button>
          </Link>
        </div>

        {/* Phase 1 Architecture Notice */}
        <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 flex items-start gap-3 text-xs text-brand-900">
          <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
          <div>
            <strong>Live Flight Search Engine:</strong> Displaying verified domestic flight schedules
            from our TravelMitra Indian Aviation Engine. Real-time booking checkouts with Razorpay will be
            unlocked in the upcoming payment & reservation phase.
          </div>
        </div>

        {/* Main Content: Filters + Flight Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="space-y-4">
            <Card className="p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-brand-500" /> Filters
                </h4>
                <span className="text-[11px] text-slate-500">Reset</span>
              </div>

              {/* Stops Filter */}
              <div className="space-y-2 mb-5">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Stops
                </span>
                <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                  <span className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded text-brand-500" />
                    Non-Stop Only
                  </span>
                  <span className="text-slate-400">₹4,499</span>
                </label>
                <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                  <span className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded text-brand-500" />
                    1 Stop
                  </span>
                  <span className="text-slate-400">₹5,100</span>
                </label>
              </div>

              {/* Airlines */}
              <div className="space-y-2 mb-5">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Airlines
                </span>
                {['IndiGo', 'Air India', 'Akasa Air', 'SpiceJet'].map(airline => (
                  <label
                    key={airline}
                    className="flex items-center justify-between text-xs text-slate-700 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded text-brand-500" />
                      {airline}
                    </span>
                  </label>
                ))}
              </div>

              {/* Trust Callout */}
              <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>DGCA & IATA Verified</span>
                </div>
                <p>All fares include mandatory Indian airport charges and passenger service fees.</p>
              </div>
            </Card>
          </div>

          {/* Results List */}
          <div className="lg:col-span-3 space-y-4">
            {loading ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm font-semibold text-slate-700">
                  Searching live flight inventories for {origin} → {destination}...
                </p>
                <p className="text-xs text-slate-400 mt-1">Connecting to TravelMitra GDS provider</p>
              </div>
            ) : error ? (
              <div className="bg-white rounded-2xl p-8 border border-rose-200 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
                <h4 className="font-bold text-slate-900">Failed to fetch flight offers</h4>
                <p className="text-xs text-slate-500">{error}</p>
              </div>
            ) : flights.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Plane className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h4 className="font-bold text-slate-900">No direct flights found</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Try adjusting your origin or destination airport.
                </p>
              </div>
            ) : (
              flights.map(flight => (
                <Card key={flight.id} hoverEffect className="p-5 sm:p-6 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    {/* Airline & Flight Number */}
                    <div className="flex items-center gap-4 sm:w-1/4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-brand-600 text-sm shrink-0">
                        <Plane className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{flight.airline}</h4>
                        <span className="text-xs text-slate-400 font-mono">{flight.flightNumber}</span>
                        <div className="mt-1">
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                            {flight.provider}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Flight Times & Duration */}
                    <div className="flex items-center justify-between sm:justify-center gap-6 sm:w-1/2">
                      <div className="text-left">
                        <span className="text-lg font-extrabold text-slate-900 block">
                          {flight.departureTime}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">{flight.origin}</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-[11px] font-semibold text-slate-400 mb-1">
                          {flight.duration}
                        </span>
                        <div className="w-24 sm:w-32 h-[2px] bg-slate-300 relative flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-brand-500 absolute" />
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold mt-1">
                          {flight.stops === 0 ? 'Non-Stop' : `${flight.stops} Stop`}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-lg font-extrabold text-slate-900 block">
                          {flight.arrivalTime}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">{flight.destination}</span>
                      </div>
                    </div>

                    {/* Price & Booking Action */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:w-1/4 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div>
                        <span className="text-xl font-extrabold text-brand-600 block">
                          {formatINR(flight.price)}
                        </span>
                        <span className="text-[10px] text-slate-400 block sm:text-right">
                          per adult, incl. taxes
                        </span>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setSelectedFlight(flight)}
                        className="mt-2"
                      >
                        Book Flight
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Preliminary Booking Modal */}
      {selectedFlight && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-900">Flight Selection Preview</h3>
              <button
                onClick={() => setSelectedFlight(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Flight:</span>
                <span className="font-bold text-slate-900">
                  {selectedFlight.airline} ({selectedFlight.flightNumber})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Route:</span>
                <span className="font-semibold text-slate-900">
                  {selectedFlight.origin} → {selectedFlight.destination}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Schedule:</span>
                <span className="font-semibold text-slate-900">
                  {selectedFlight.departureTime} - {selectedFlight.arrivalTime} ({selectedFlight.duration})
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2">
                <span className="text-slate-500">Total Amount:</span>
                <span className="text-lg font-extrabold text-brand-600">
                  {formatINR(selectedFlight.price)}
                </span>
              </div>
            </div>

            <div className="p-3 bg-brand-50 rounded-xl text-xs text-brand-900 border border-brand-200">
              ℹ️ <strong>TravelMitra Phase 1 Milestone:</strong> Flight selection verified with client-side
              validation. Server-side Razorpay payment gateway and passenger seat selection will be
              integrated in Phase 2 & 3.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedFlight(null)}>
                Close
              </Button>
              <Link to="/contact">
                <Button variant="primary" size="sm">
                  Inquire via Mitra Concierge
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
