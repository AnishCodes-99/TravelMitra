import React, { useState } from 'react';
import { Plane, Building2, Palmtree } from 'lucide-react';
import { TravelTab } from '../../types';
import { FlightSearchForm } from './FlightSearchForm';
import { HotelSearchForm } from './HotelSearchForm';
import { PackageSearchForm } from './PackageSearchForm';

export const SearchHero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TravelTab>('flights');

  const tabs: { id: TravelTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Building2 },
    { id: 'packages', label: 'Holiday Packages', icon: Palmtree },
  ];

  return (
    <div className="relative pt-8 pb-16 md:pt-12 md:pb-20 overflow-hidden">
      {/* Background subtle ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/50 via-slate-50 to-white -z-10" />
      <div className="absolute top-0 right-10 w-96 h-96 bg-brand-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-sky-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sleek Minimalist Hero Headline */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Book Flights, Hotels & Packages
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-slate-500 font-medium">
            Search, compare and reserve your next trip across India and beyond
          </p>
        </div>

        {/* Premium Search Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 overflow-hidden">
          {/* Tab Headers */}
          <div className="flex items-center border-b border-slate-150 bg-slate-50/80 px-4 pt-3 gap-2 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-6 py-3.5 rounded-t-2xl font-bold text-sm transition-all shrink-0 ${
                    isActive
                      ? 'bg-white text-brand-600 shadow-sm border-t-2 border-brand-500 border-x border-slate-200/80 -mb-[1px]'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
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

          {/* Form Content */}
          <div className="p-5 sm:p-8">
            {activeTab === 'flights' && <FlightSearchForm />}
            {activeTab === 'hotels' && <HotelSearchForm />}
            {activeTab === 'packages' && <PackageSearchForm />}
          </div>
        </div>
      </div>
    </div>
  );
};
