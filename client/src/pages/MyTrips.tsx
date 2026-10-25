import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Luggage, Calendar, Plane, Building2, Download, Plus, Printer, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatINR } from '../lib/utils';

export const MyTrips: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

  const [userBookings] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem('travelmitra_user_bookings');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const sampleTrips = [
    {
      id: 'TM-2026-9812',
      pnr: '6E-IND78X',
      title: 'New Delhi to Goa Beach Holiday',
      type: 'Flight + Stay',
      dates: '12 Nov 2026 - 16 Nov 2026',
      status: 'Confirmed',
      airline: 'IndiGo (6E-204)',
      hotel: 'The Grand Palace Heritage Resort',
      totalCost: 19499,
      passenger: 'Aarav Sharma',
      seat: '12F (Window)',
      terminal: 'T3 Indira Gandhi Intl',
    },
    {
      id: 'TM-2026-4421',
      pnr: 'AI-BLR99Q',
      title: 'Bengaluru to Jaipur Royal Getaway',
      type: 'Flight',
      dates: '28 Dec 2026 - 02 Jan 2027',
      status: 'Upcoming',
      airline: 'Air India (AI-502)',
      totalCost: 10998,
      passenger: 'Aarav Sharma',
      seat: '08A (Aisle)',
      terminal: 'T2 Kempegowda Intl',
    },
  ];

  const allTrips = [...userBookings, ...sampleTrips];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Luggage className="w-6 h-6 text-brand-500" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                My Trips & Bookings
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Manage your upcoming travel itineraries, passenger details, and airline e-tickets
            </p>
          </div>

          <Link to="/">
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Plan a New Journey
            </Button>
          </Link>
        </div>

        {/* Trips List */}
        <div className="space-y-4">
          {allTrips.map(trip => (
            <Card key={trip.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="primary">{trip.type}</Badge>
                    <Badge variant="success">{trip.status}</Badge>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      Ref: {trip.id}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{trip.title}</h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                      <Calendar className="w-4 h-4 text-slate-400" /> {trip.dates}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Plane className="w-4 h-4 text-slate-400" /> {trip.airline}
                    </span>
                    {trip.hotel && (
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-slate-400" /> {trip.hotel}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <div className="lg:text-right">
                    <span className="text-[10px] text-slate-400 block font-medium">Total Paid</span>
                    <span className="text-xl font-extrabold text-brand-600">
                      {formatINR(trip.totalCost)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTicket(trip)}
                      leftIcon={<Download className="w-3.5 h-3.5" />}
                    >
                      E-Ticket
                    </Button>
                    <Link to="/contact">
                      <Button variant="ghost" size="sm">
                        Support
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Luxury E-Ticket Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-150">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="TravelMitra" className="h-8 w-auto object-contain" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Official E-Ticket</span>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-5 text-white shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-orange-100 block font-semibold">Airline PNR</span>
                  <span className="text-2xl font-black font-mono tracking-widest">{selectedTicket.pnr}</span>
                </div>
                <Badge variant="success" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  {selectedTicket.status}
                </Badge>
              </div>
              <p className="text-sm font-semibold text-orange-50 mt-2">{selectedTicket.title}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 uppercase tracking-wider block font-semibold text-[10px]">Primary Passenger</span>
                <span className="font-bold text-slate-900 text-sm block">{selectedTicket.passenger}</span>
                <span className="text-slate-500 text-[11px]">Seat: {selectedTicket.seat}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 uppercase tracking-wider block font-semibold text-[10px]">Flight / Operator</span>
                <span className="font-bold text-slate-900 text-sm block">{selectedTicket.airline}</span>
                <span className="text-slate-500 text-[11px]">{selectedTicket.terminal}</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Web check-in available 24h before departure</span>
              </div>
              <span className="font-bold">15 kg check-in</span>
            </div>

            <div className="flex items-center justify-between border-t border-slate-150 pt-4">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Total Paid</span>
                <span className="text-xl font-black text-slate-900">{formatINR(selectedTicket.totalCost)}</span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Printer className="w-4 h-4" />}
                  onClick={() => window.print()}
                >
                  Print
                </Button>
                <Button variant="primary" size="sm" onClick={() => setSelectedTicket(null)}>
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
