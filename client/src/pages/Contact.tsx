import React, { useState } from 'react';
import { PhoneCall, Mail, MapPin, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bookingRef: '',
    category: 'Booking Assistance',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            24/7 Mitra Helpdesk & Customer Support
          </h1>
          <p className="text-sm text-slate-600">
            Have questions about an upcoming flight, hotel check-in, or holiday itinerary? We are here
            to help around the clock.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details Card */}
          <div className="space-y-4">
            <Card className="p-6 space-y-6">
              <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
                Direct Channels
              </h3>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-600 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Toll-Free Helpline (24x7)</h4>
                  <p className="text-xs text-slate-500 mt-0.5">+91 1800 200 4567</p>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                    Average wait time &lt; 45 seconds
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">WhatsApp Travel Assistance</h4>
                  <p className="text-xs text-slate-500 mt-0.5">+91 99000 12345</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Instant booking status & updates</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Email Inquiries</h4>
                  <p className="text-xs text-slate-500 mt-0.5">support@travelmitra.in</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Response within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Headquarters</h4>
                  <p className="text-xs text-slate-500 mt-0.5">India</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Support Ticket Created!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, {formData.name || 'Traveller'}. A dedicated Mitra support officer has
                    received your inquiry and will contact you via email or phone within 15 minutes.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    Submit Another Query
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Send Us a Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name"
                      required
                      placeholder="e.g. Priya Nair"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      required
                      placeholder="priya@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                    <Input
                      label="Contact Mobile"
                      required
                      placeholder="+91 98765 00000"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <Input
                      label="Booking Reference (if applicable)"
                      placeholder="TM-2026-XXXX"
                      value={formData.bookingRef}
                      onChange={e => setFormData({ ...formData, bookingRef: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase mb-1.5">
                      Issue Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-sm text-slate-900 focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="Booking Assistance">Booking Assistance</option>
                      <option value="Flight Rescheduling or Cancellation">
                        Flight Rescheduling or Cancellation
                      </option>
                      <option value="Hotel Check-in Dispute">Hotel Check-in Dispute</option>
                      <option value="Refund Status Tracking">Refund Status Tracking</option>
                      <option value="Payment / GST Invoice Query">Payment / GST Invoice Query</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase mb-1.5">
                      How can we assist you?
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share flight numbers, dates, or specific requests..."
                      className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm text-slate-900 focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      leftIcon={<Send className="w-4 h-4" />}
                      className="w-full sm:w-auto px-8"
                    >
                      Submit Ticket
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
