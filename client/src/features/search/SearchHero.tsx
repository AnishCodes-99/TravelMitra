import React, { useState } from 'react';
import { Plane, Building2, Palmtree, Sparkles, ShieldCheck } from 'lucide-react';
import { TravelTab } from '../../types';
import { FlightSearchForm } from './FlightSearchForm';
import { HotelSearchForm } from './HotelSearchForm';
import { PackageSearchForm } from './PackageSearchForm';

export const SearchHero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TravelTab>('flights');

  const tabs: {
    id: TravelTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    tagline: string;
  }[] = [
    {
      id: 'flights',
      label: 'Flights',
      icon: Plane,
      tagline: 'Lowest domestic airfares with zero hidden convenience fees',
    },
    {
      id: 'hotels',
      label: 'Hotels & Resorts',
      icon: Building2,
      tagline: 'Handpicked verified luxury resorts, heritage palaces & villas',
    },
    {
      id: 'packages',
      label: 'Holiday Packages',
      icon: Palmtree,
      tagline: 'All-inclusive curated vacation packages with private transfers',
    },
  ];

  // Dynamic subtle travel imagery corresponding to active tab
  const getTabBackgroundImage = () => {
    switch (activeTab) {
      case 'hotels':
        return 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=80';
      case 'packages':
        return 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=80';
      default:
        return 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=2000&q=80';
    }
  };

  return (
    <div className="relative pt-10 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Background authentic travel image with subtle light overlay and soft atmospheric blur */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <img
          src={getTabBackgroundImage()}
          alt="TravelMitra Scenic Backdrop"
          className="w-full h-full object-cover object-center opacity-15 scale-105 transition-all duration-700 ease-out"
        />
        {/* Soft elegant gradient overlays for perfect text contrast and modern polish */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-50/70 to-slate-50" />
        <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-brand-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-10 w-[450px] h-[450px] bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sleek, High-Converting Hero Headline */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-slate-800 text-xs font-bold mb-4 shadow-sm border border-slate-200/80 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-brand-600 font-extrabold">TravelMitra Direct GDS</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">Zero Convenience Fees on Domestic Flights & Stays</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none">
            Explore India with <span className="text-brand-600">TravelMitra</span>
          </h1>

          <p className="mt-3 text-sm sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Instant airline bookings across IndiGo, Air India & Vistara, plus handpicked stays with verified front-desk check-in.
          </p>
        </div>

        {/* Premium Search Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-200/90 overflow-hidden transition-all">
          {/* Tab Headers */}
          <div className="flex items-center border-b border-slate-200/80 bg-slate-50/90 px-4 pt-3.5 gap-2 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-6 py-3.5 rounded-t-2xl font-extrabold text-sm transition-all shrink-0 ${
                    isActive
                      ? 'bg-white text-brand-600 shadow-sm border-t-2 border-brand-500 border-x border-slate-200/80 -mb-[1px]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? 'text-brand-500' : 'text-slate-400'
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content with clean padding */}
          <div className="p-5 sm:p-8">
            {activeTab === 'flights' && <FlightSearchForm />}
            {activeTab === 'hotels' && <HotelSearchForm />}
            {activeTab === 'packages' && <PackageSearchForm />}
          </div>
        </div>

        {/* Floating Mitra Trust Badges */}
        <div className="max-w-4xl mx-auto mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official DGCA & IATA Partner Inventories</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Instant Confirmed PNRs in 30 Seconds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-brand-500 font-bold">₹</span>
            <span>All Fares Inclusive of GST & Airport Taxes</span>
          </div>
        </div>
      </div>
    </div>
  );
};
