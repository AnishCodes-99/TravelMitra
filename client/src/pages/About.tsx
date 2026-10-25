import React from 'react';
import { Compass, ShieldCheck, HeartHandshake, Eye, Award } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const About: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Intro Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-md shadow-brand-500/20">
            <Compass className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About TravelMitra
          </h1>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            TravelMitra ("Mitra" meaning <em>friend and trusted companion</em> in Sanskrit and Hindi)
            was founded with a single mission: to provide Indian travellers with a genuinely
            transparent, reliable, and premium travel booking platform.
          </p>
        </div>

        {/* Story */}
        <Card className="p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Our Story & Philosophy</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            For years, booking domestic flights and hotels in India has been fraught with deceptive
            fees added on the final screen, confusing cancellation fine print, and frustrating
            customer support queues.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Inspired by the extensive domestic connectivity of platforms like MakeMyTrip, but built
            from the ground up with clean, minimal aesthetics, modern TypeScript architecture, and
            uncompromising price honesty, TravelMitra guarantees what you see is what you pay.
          </p>
        </Card>

        {/* Three Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">100% Price Honesty</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every tax, airport fee, and GST amount is shown upfront. No convenience charge shock at checkout.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Hospitality First</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              True to Indian hospitality (<em>Atithi Devo Bhava</em>), our dedicated Mitra team
              personally assists every traveller with round-the-clock support.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Direct Airline Inventory</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct GDS connections ensure instant PNR generation and official airline e-tickets.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
