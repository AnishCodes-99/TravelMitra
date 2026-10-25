import React from 'react';
import { Link } from 'react-router-dom';
import { Luggage, Calendar, Plane, Building2, Download, Info, Plus } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatINR } from '../lib/utils';

export const MyTrips: React.FC = () => {
  const sampleTrips = [
    {
      id: 'TM-2026-9812',
      title: 'New Delhi to Goa Beach Holiday',
      type: 'Flight + Stay',
      dates: '12 Nov 2026 - 16 Nov 2026',
      status: 'Confirmed (Demo)',
      airline: 'IndiGo (6E-204)',
      hotel: 'The Grand Palace Heritage Resort',
      totalCost: 19499,
    },
    {
      id: 'TM-2026-4421',
      title: 'Bengaluru to Jaipur Royal Getaway',
      type: 'Flight',
      dates: '28 Dec 2026 - 02 Jan 2027',
      status: 'Upcoming (Demo)',
      airline: 'Air India (AI-502)',
      totalCost: 10998,
    },
  ];

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

        {/* Phase 1 Architecture Notice */}
        <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 flex items-start gap-3 text-xs text-brand-900">
          <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
          <div>
            <strong>Phase 1 Preliminary Interface:</strong> Displaying sample trip architectures.
            Persistent database synchronization with your MongoDB Atlas account and real Razorpay receipts will be activated in Phase 2 & 3.
          </div>
        </div>

        {/* Trips List */}
        <div className="space-y-4">
          {sampleTrips.map(trip => (
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
                      onClick={() =>
                        alert(
                          `Official PDF e-ticket generation for booking ${trip.id} will be connected in Phase 2.`
                        )
                      }
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
    </div>
  );
};
