import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      {/* Authentic Luxury Hotel Atmosphere - Ultra-light opacity background ensuring 100% text readability */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2400&q=80"
          alt=""
          className="w-full h-full object-cover object-center opacity-[0.05] filter saturate-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/95 to-slate-50/95" />
      </div>

      <Header />
      <main className="flex-1 relative z-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
