import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HeartHandshake, PhoneCall, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      {/* Trust bar */}
      <div className="border-b border-slate-850 bg-slate-900/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-base">100% Secure Bookings</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Direct airline tickets, verified partner hotels, zero hidden convenience fees.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-base">Dedicated Mitra Support</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  24/7 live assistance across flights, hotel check-ins, and emergency rescheduling.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-base">Transparent INR Pricing</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  All fares shown in Indian Rupees (₹) inclusive of GST. Pay via UPI, Cards & Netbanking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block bg-white px-3 py-1.5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <img src="/logo.png" alt="TravelMitra" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              TravelMitra is an Indian travel platform built for effortless domestic and international
              bookings. Discover flights, heritage retreats, and curated holiday itineraries with
              peace of mind.
            </p>
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                <span>India</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-brand-400 shrink-0" />
                <span>+91 1800 200 4567 (Toll-Free, 24x7)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>support@travelmitra.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider">Explore Services</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/flights" className="hover:text-white transition-colors">
                  Flight Booking
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-white transition-colors">
                  Hotel Reservations
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-white transition-colors">
                  Holiday Packages
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-white transition-colors">
                  Explore Destinations
                </Link>
              </li>
              <li>
                <Link to="/my-trips" className="hover:text-white transition-colors">
                  Track Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="space-y-3">
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider">Top Indian Destinations</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/flights?origin=DEL&destination=GOI" className="hover:text-white transition-colors">
                  Flights to Goa (GOI)
                </Link>
              </li>
              <li>
                <Link to="/hotels?city=Jaipur" className="hover:text-white transition-colors">
                  Heritage Hotels in Jaipur
                </Link>
              </li>
              <li>
                <Link to="/packages?destination=Kerala" className="hover:text-white transition-colors">
                  Kerala Backwaters Tours
                </Link>
              </li>
              <li>
                <Link to="/hotels?city=Manali" className="hover:text-white transition-colors">
                  Manali Mountain Resorts
                </Link>
              </li>
              <li>
                <Link to="/packages?destination=Kashmir" className="hover:text-white transition-colors">
                  Kashmir Valley Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-3">
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider">Help & Legal</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About TravelMitra
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Customer Support
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/faq#cancellation" className="hover:text-white transition-colors">
                  Cancellation & Refund
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Privacy Policy & Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} TravelMitra Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Prices displayed in Indian Rupees (₹ INR)</span>
            <span>•</span>
            <span>Timezone: Asia/Kolkata (IST)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
