import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  HeartHandshake,
  CreditCard,
  ChevronDown,
  Sparkles,
  Plane,
  Building2,
  Tag,
} from 'lucide-react';
import { SearchHero } from '../features/search/SearchHero';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatINR } from '../lib/utils';
import { DestinationCard } from '../types';

const POPULAR_DESTINATIONS: DestinationCard[] = [
  {
    id: 'goa',
    name: 'Goa',
    state: 'Western Coast',
    tagline: 'Sun-kissed beaches, Portuguese villas & vibrant seafood shacks',
    startingPrice: 3899,
    tag: 'Beach & Nightlife',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    airportCode: 'GOI',
    cityQuery: 'Goa',
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'The iconic Pink City, royal Amer fort & opulent palace hotels',
    startingPrice: 3200,
    tag: 'Heritage & Culture',
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    airportCode: 'JAI',
    cityQuery: 'Jaipur',
  },
  {
    id: 'kerala',
    name: 'Alleppey & Munnar',
    state: 'Kerala',
    tagline: 'Serene backwaters, emerald tea gardens & Ayurvedic retreats',
    startingPrice: 5499,
    tag: 'Nature & Wellness',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    airportCode: 'COK',
    cityQuery: 'Kerala',
  },
  {
    id: 'kashmir',
    name: 'Srinagar & Gulmarg',
    state: 'Jammu & Kashmir',
    tagline: 'Snowy alpine ridges, pristine Dal lake houseboats & shikaras',
    startingPrice: 6200,
    tag: 'Snow & Adventure',
    imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    airportCode: 'SXR',
    cityQuery: 'Kashmir',
  },
  {
    id: 'manali',
    name: 'Manali & Shimla',
    state: 'Himachal Pradesh',
    tagline: 'Pine forests, Solang valley adventures & cozy mountain chalets',
    startingPrice: 2800,
    tag: 'Hill Station',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    airportCode: 'DEL',
    cityQuery: 'Manali',
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    tagline: 'Timeless spiritual ghats, evening Ganga Aarti & silk weavers',
    startingPrice: 3100,
    tag: 'Spiritual Circuit',
    imageUrl: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=800&q=80',
    airportCode: 'DEL',
    cityQuery: 'Varanasi',
  },
];

const FAQS = [
  {
    q: 'How does TravelMitra ensure zero hidden convenience charges?',
    a: 'Unlike legacy portals that add surprise processing fees on the final payment screen, TravelMitra calculates all applicable airport taxes, GST, and gateway fees upfront. What you see on the search screen is the exact total you pay in Indian Rupees (₹).',
  },
  {
    q: 'Can I pay using UPI, RuPay cards, or Netbanking?',
    a: 'Yes! TravelMitra supports all major Indian payment methods through our secure Razorpay integration, including Google Pay, PhonePe, Paytm, BHIM UPI, Netbanking across 50+ Indian banks, and all domestic credit/debit cards.',
  },
  {
    q: 'How do I access or reschedule my bookings?',
    a: 'Navigate to "My Trips" from the top navigation bar. With your booking reference or registered account, you can download official airline PDF tickets, request seat changes, or initiate cancellations with instant real-time refund status tracking.',
  },
  {
    q: 'What is the "Mitra Guarantee" on hotel check-ins?',
    a: 'Every hotel listed on TravelMitra is vetted for verified guest check-in, transparent cancellation policies, and hygiene standards. If you ever face check-in disputes at the front desk, our 24/7 Mitra support team intervenes immediately or relocates you to a higher-category partner property.',
  },
  {
    q: 'Are flight bookings real-time and confirmed instantly?',
    a: 'Yes, TravelMitra connects directly with airline reservation systems, providing live schedules and confirmed PNRs for IndiGo, Air India, Vistara, Akasa Air, and SpiceJet.',
  },
];

export const Home: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero with integrated Search Box */}
      <SearchHero />

      {/* 2. Popular Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="primary" className="mb-2">
              Curated Escapes
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Indian Destinations
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Handpicked destinations loved by travellers across India this season.
            </p>
          </div>
          <Link
            to="/destinations"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
          >
            <span>Explore All 50+ Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_DESTINATIONS.map(dest => (
            <Card key={dest.id} hoverEffect className="group flex flex-col justify-between">
              <div>
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 text-slate-900 shadow-sm backdrop-blur-md">
                      {dest.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-xl font-bold tracking-tight">{dest.name}</h3>
                    <p className="text-xs text-slate-200">{dest.state}</p>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {dest.tagline}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div>
                  <span className="text-[11px] text-slate-500 block font-medium">Starting from</span>
                  <span className="text-lg font-extrabold text-brand-600">
                    {formatINR(dest.startingPrice)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                  <Link
                    to={`/flights?origin=DEL&destination=${dest.airportCode || 'GOI'}`}
                    className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    Flights
                  </Link>
                  <Link
                    to={`/hotels?city=${encodeURIComponent(dest.cityQuery || dest.name)}`}
                    className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors"
                  >
                    Stays
                  </Link>
                  <Link
                    to={`/packages?destination=${encodeURIComponent(dest.cityQuery || dest.name)}`}
                    className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white transition-colors"
                  >
                    Tours
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. Featured Travel Inspiration & Promotional Offers */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-charcoal-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold mb-3 border border-brand-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mitra Privilege Deals</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Special Travel Offers & Coupons
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                Exclusive benefits on domestic flights, heritage palace resorts, and mountain stays.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Offer 1 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-brand-500/40 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl group-hover:bg-brand-500/20 transition-all pointer-events-none" />
              <div className="flex items-center gap-2 text-brand-400 text-xs font-bold mb-3">
                <Plane className="w-4 h-4" />
                <span>DOMESTIC FLIGHTS</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Save up to ₹1,500 on Flights</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Valid on all one-way and round-trip bookings with IndiGo, Air India, and Akasa Air.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Use Code</span>
                  <span className="font-mono font-bold text-sm text-brand-400 bg-brand-950/60 px-2.5 py-1 rounded border border-brand-500/30">
                    MITRAFLY
                  </span>
                </div>
                <Link to="/flights">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-slate-800">
                    Book Now →
                  </Button>
                </Link>
              </div>
            </div>

            {/* Offer 2 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-brand-500/40 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-3">
                <Building2 className="w-4 h-4" />
                <span>HERITAGE HOTELS</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Flat 25% Off Royal Stays</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Complimentary palace tour and Rajasthani dinner in Jaipur, Udaipur & Jodhpur.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Use Code</span>
                  <span className="font-mono font-bold text-sm text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-500/30">
                    ROYAL25
                  </span>
                </div>
                <Link to="/hotels?city=Jaipur">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-slate-800">
                    Explore →
                  </Button>
                </Link>
              </div>
            </div>

            {/* Offer 3 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-brand-500/40 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all pointer-events-none" />
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold mb-3">
                <Tag className="w-4 h-4" />
                <span>HOLIDAY PACKAGES</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Weekend Himalayan Gateways</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Free cabin upgrades and private transfers for Shimla, Manali & Dharamshala packages.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Use Code</span>
                  <span className="font-mono font-bold text-sm text-sky-400 bg-sky-950/60 px-2.5 py-1 rounded border border-sky-500/30">
                    HILLS2026
                  </span>
                </div>
                <Link to="/packages?destination=Manali">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-slate-800">
                    View Trips →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Benefits / Why Choose TravelMitra Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="primary" className="mb-2">
            Why TravelMitra
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Crafted for the Modern Indian Traveller
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            We solve the biggest frustrations of online travel booking with absolute clarity and
            unmatched customer support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-500 flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">100% Upfront Pricing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No sneaky convenience fees or surprise airport surcharges added at the final checkout.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">24/7 Mitra Assistance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Reach real travel experts on phone or WhatsApp without navigating automated chatbots.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Instant Airline PNRs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct API integrations ensure official e-tickets are generated within 30 seconds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Verified Partner Hotels</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Zero check-in surprises. Every property is strictly audited for comfort, safety, and hygiene.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="primary" className="mb-2">
            Got Questions?
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Everything you need to know about booking with TravelMitra.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq.q}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:text-brand-600 transition-colors"
                >
                  <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h4 className="font-bold text-slate-900 text-sm">Still have a question?</h4>
          <p className="text-xs text-slate-500 mt-1">
            Our 24/7 dedicated support team in Bengaluru is ready to assist you anytime.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Link to="/contact">
              <Button variant="primary" size="sm">
                Contact Mitra Helpdesk
              </Button>
            </Link>
            <Link to="/faq">
              <Button variant="outline" size="sm">
                View Full FAQ Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Travel Newsletter / Mitra Club CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-500 to-orange-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold tracking-wider uppercase bg-white/20 px-3 py-1 rounded-full">
              Join TravelMitra Club
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Get secret flight alerts and weekend retreat deals
            </h3>
            <p className="text-xs sm:text-sm text-orange-100 leading-relaxed">
              Receive curated travel recommendations, flash fare drops from Delhi, Mumbai & Bengaluru,
              and special holiday perks straight to your inbox.
            </p>
          </div>

          {subscribed ? (
            <div className="bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-2xl px-6 py-4 flex items-center gap-3">
              <span className="text-xl">✨</span>
              <div>
                <p className="font-bold text-sm">Welcome to the TravelMitra Club!</p>
                <p className="text-xs text-orange-100">You will now receive secret airfare drops and holiday packages.</p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={e => {
                e.preventDefault();
                setSubscribed(true);
              }}
              className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="px-4 py-3 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-white min-w-[280px]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm shadow-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
