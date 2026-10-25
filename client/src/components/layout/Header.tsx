import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Plane,
  Building2,
  Palmtree,
  MapPin,
  Luggage,
  HelpCircle,
  User,
  Menu,
  X,
  Compass,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, logout, isFirebaseConfigured } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUserDropdownOpen(false);
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navLinks = [
    { name: 'Flights', href: '/flights', icon: Plane },
    { name: 'Hotels', href: '/hotels', icon: Building2 },
    { name: 'Holiday Packages', href: '/packages', icon: Palmtree },
    { name: 'Destinations', href: '/destinations', icon: MapPin },
    { name: 'My Trips', href: '/my-trips', icon: Luggage },
    { name: 'Help', href: '/contact', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top micro bar for Indian context */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-brand-400 font-medium">
              🇮🇳 Dedicated to Indian Travellers
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-400">Default Currency: INR (₹)</span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-400">Asia/Kolkata (IST)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <Link to="/contact" className="hover:text-white transition-colors">
              24/7 Mitra Helpdesk
            </Link>
            <Link to="/faq" className="hover:text-white transition-colors">
              Baggage & Refund Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                  Travel<span className="text-brand-500">Mitra</span>
                </span>
                <span className="text-[10px] bg-brand-100 text-brand-700 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  India
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 -mt-1 tracking-wide">
                Your Trusted Journey Companion
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map(link => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-brand-600 bg-brand-50/80 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action: Auth & Support */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 transition-colors text-slate-800 text-sm font-semibold"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-xs uppercase">
                    {user.displayName ? user.displayName.slice(0, 2) : 'TM'}
                  </div>
                  <span className="max-w-[120px] truncate">{user.displayName || user.email}</span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 text-xs text-slate-500">
                      Signed in as <p className="font-semibold text-slate-800 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/my-trips"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      My Bookings & Trips
                    </Link>
                    <Link
                      to="/saved"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Saved Destinations
                    </Link>
                    <div className="border-t border-slate-100 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" leftIcon={<User className="w-4 h-4" />}>
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Create Account
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4 space-y-2">
            {navLinks.map(link => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold ${
                      isActive ? 'text-brand-600 bg-brand-50' : 'text-slate-700 hover:bg-slate-100'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
            <div className="border-t border-slate-200 pt-3 mt-3 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="px-4 text-xs text-slate-500">
                    Logged in as <span className="font-semibold text-slate-800">{user.email}</span>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg"
                  >
                    User Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 px-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full">
                      Create Account
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            {!isFirebaseConfigured && (
              <div className="mx-2 mt-2 p-2.5 bg-amber-50 rounded-lg text-[11px] text-amber-800 border border-amber-200">
                ⚠️ Firebase Auth is pending configuration. Authentication is available in local preview mode.
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
