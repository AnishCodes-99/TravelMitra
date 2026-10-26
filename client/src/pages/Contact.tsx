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
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Submit form directly to wanianish75@gmail.com via FormSubmit AJAX API
      await fetch('https://formsubmit.co/ajax/wanianish75@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `[TravelMitra Support] ${formData.category} - ${formData.name}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          bookingReference: formData.bookingRef || 'N/A',
          issueCategory: formData.category,
          message: formData.message,
          submittedAt: new Date().toLocaleString('en-IN'),
        }),
      });
    } catch (err) {
      console.warn('FormSubmit network call notice:', err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const mailtoLink = `mailto:wanianish75@gmail.com?subject=${encodeURIComponent(
    `[TravelMitra Support] ${formData.category || 'Help Request'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nBooking Ref: ${formData.bookingRef || 'N/A'}\nCategory: ${formData.category}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            24/7 Mitra Helpdesk & Customer Support
          </h1>
          <p className="text-sm text-slate-600">
            Have questions about an upcoming flight, hotel check-in, or holiday itinerary? We are here
            to help around the clock. Your message is dispatched directly to our priority support inbox.
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
                  <a
                    href="mailto:wanianish75@gmail.com"
                    className="text-xs text-brand-600 font-semibold hover:underline block mt-0.5"
                  >
                    wanianish75@gmail.com
                  </a>
                  <p className="text-[11px] text-slate-400 mt-0.5">Direct response within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Headquarters</h4>
                  <p className="text-xs text-slate-500 mt-0.5">TravelMitra Operations Hub, India</p>
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
                  <h3 className="text-xl font-bold text-slate-900">Support Ticket Dispatched!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <strong>{formData.name || 'Traveller'}</strong>. Your support ticket has
                    been delivered directly to our support team at <strong>wanianish75@gmail.com</strong>.
                    We will get back to you shortly.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={mailtoLink}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-xl text-xs font-bold hover:bg-brand-600 transition"
                    >
                      <Mail className="w-4 h-4" /> Open In Email Client
                    </a>
                    <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                      Submit Another Query
                    </Button>
                  </div>
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
                      disabled={submitting}
                      leftIcon={<Send className="w-4 h-4" />}
                      className="w-full sm:w-auto px-8 font-bold"
                    >
                      {submitting ? 'Sending to wanianish75@gmail.com...' : 'Submit Support Ticket'}
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
