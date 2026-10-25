import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';
import { Card } from '../components/ui/Card';

interface FaqItem {
  q: string;
  a: string;
  category: 'Flights' | 'Hotels' | 'Payments' | 'Cancellations';
}

const FAQ_LIST: FaqItem[] = [
  {
    category: 'Flights',
    q: 'How do I complete web check-in for domestic Indian flights?',
    a: 'Web check-in opens 48 hours prior to scheduled departure for all domestic airlines (IndiGo, Air India, Akasa Air). You can use your 6-character airline PNR from your TravelMitra e-ticket directly on the airline portal or let our Mitra Concierge team assist you.',
  },
  {
    category: 'Flights',
    q: 'What are the baggage allowances on domestic flights?',
    a: 'Standard domestic economy tickets allow 15 kg of check-in baggage per passenger and 7 kg of cabin/hand baggage. Pre-purchasing excess baggage is up to 30% cheaper on TravelMitra during booking than paying at the airport counter.',
  },
  {
    category: 'Hotels',
    q: 'What documents are required during hotel check-in in India?',
    a: 'All Indian citizens must present a valid government-issued photo ID (Aadhaar Card, Passport, Voter ID, or Driving License). Please note PAN cards are not accepted by most hotels as address proof. Foreign guests must present a valid Passport and Indian Visa.',
  },
  {
    category: 'Payments',
    q: 'Which payment methods are accepted on TravelMitra?',
    a: 'We accept all major Indian payment methods through Razorpay: Google Pay, PhonePe, Paytm, BHIM UPI, Netbanking across 50+ Indian banks, Visa, Mastercard, RuPay, and American Express cards.',
  },
  {
    category: 'Cancellations',
    q: 'How long do refunds take to reflect in my bank account?',
    a: 'Once an airline or hotel approves a cancellation, TravelMitra processes the refund within 24 hours. Depending on your bank or UPI provider, the amount typically reflects in your original payment method within 3 to 5 business days.',
  },
  {
    category: 'Cancellations',
    q: 'Can I cancel or reschedule my flight within 24 hours of departure?',
    a: 'Yes, but airline-mandated cancellation or date-change charges will apply as per the respective fare class rules. Non-refundable promotional fares may only return government airport passenger fees.',
  },
];

export const Faq: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['All', 'Flights', 'Hotels', 'Payments', 'Cancellations'];

  const filtered = FAQ_LIST.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs text-slate-500">
            Clear, transparent answers to help you navigate your journey with TravelMitra
          </p>

          <div className="pt-4 max-w-md mx-auto relative">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search help topics..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-500 text-white shadow'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {filtered.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Card key={item.q} className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:text-brand-600 transition-colors"
                >
                  <span className="text-sm pr-4">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {item.a}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
