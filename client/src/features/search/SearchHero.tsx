import React, { useState } from 'react';
import { Plane, Building2, Palmtree, Sparkles, Shield, Clock, Award } from 'lucide-react';
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
    <div className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Background soft gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/60 via-slate-50 to-white -z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-sky-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero headline & value proposition */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 text-brand-800 text-xs font-bold mb-4 shadow-sm border border-brand-200">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Plan Your Next Journey With Confidence</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Discover Incredible India & The World with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-orange-600">
              TravelMitra
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Compare domestic flights, verified heritage resorts, and curated all-inclusive holiday
            packages with transparent INR pricing and 24/7 dedicated Mitra support.
          </p>

          {/* Micro trust indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Zero Hidden Convenience Fees</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-600" />
              <span>Instant Confirmation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-sky-600" />
              <span>Best Domestic Fares</span>
            </div>
          </div>
        </div>

        {/* Search Panel Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-elevation border border-slate-200/90 overflow-hidden">
          {/* Tab Headers */}
          <div className="flex items-center border-b border-slate-200 bg-slate-50/70 p-2 sm:p-3 gap-2 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm transition-all shrink-0 ${
                    isActive
                      ? 'bg-white text-brand-600 shadow-md shadow-slate-200/80 border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
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
