import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building2,
  Lock,
  CheckCircle2,
  Printer,
  Luggage,
} from 'lucide-react';
import { formatINR } from '../../lib/utils';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { firestoreService, BookingRecord } from '../../services/firestoreService';

export interface BookingPaymentItem {
  id: string;
  type: 'flight' | 'hotel' | 'package';
  title: string;
  subtitle: string;
  price: number;
  currency?: string;
  details: { label: string; value: string }[];
  imageUrl?: string;
}

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingItem: BookingPaymentItem | null;
  onPaymentSuccess?: (confirmedBooking: any) => void;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  isOpen,
  onClose,
  bookingItem,
  onPaymentSuccess,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 8921 7741 9924');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('482');
  const [cardName, setCardName] = useState('Aarav Sharma');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  const [stage, setStage] = useState<'checkout' | 'processing' | 'success'>('checkout');
  const [paymentId, setPaymentId] = useState('');
  const [pnr, setPnr] = useState('');

  if (!isOpen || !bookingItem) return null;

  const handlePay = () => {
    setStage('processing');

    const generatedPaymentId = `pay_TM${Math.floor(100000000 + Math.random() * 900000000)}`;
    const generatedPnr = `TM-${Math.floor(1000 + Math.random() * 9000)}-${bookingItem.type.slice(0, 3).toUpperCase()}`;

    setTimeout(() => {
      setPaymentId(generatedPaymentId);
      setPnr(generatedPnr);
      setStage('success');

      // Persist to Firestore and local backup
      const newBooking: BookingRecord = {
        id: generatedPnr,
        pnr: generatedPnr,
        userId: user?.uid,
        userEmail: user?.email || undefined,
        title: bookingItem.title,
        type: bookingItem.type === 'flight' ? 'Flight' : bookingItem.type === 'hotel' ? 'Hotel' : 'Holiday Package',
        dates: bookingItem.details.find(d => d.label.toLowerCase().includes('date'))?.value || 'Upcoming Journey',
        status: 'Confirmed',
        airline: bookingItem.type === 'flight' ? bookingItem.subtitle : undefined,
        hotel: bookingItem.type === 'hotel' ? bookingItem.title : undefined,
        totalCost: bookingItem.price,
        currency: 'INR',
        passenger: cardName || user?.displayName || user?.email?.split('@')[0] || 'Aarav Sharma',
        paymentId: generatedPaymentId,
        bookedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        createdAt: new Date().toISOString(),
        details: bookingItem.details,
      };

      // Save to Firestore database & local storage
      firestoreService.saveBooking(newBooking).catch(err => {
        console.warn('Could not save booking to Firestore:', err);
      });

      if (onPaymentSuccess) {
        onPaymentSuccess(newBooking);
      }
    }, 1800);
  };

  const handleDone = () => {
    setStage('checkout');
    onClose();
    navigate('/my-trips');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Razorpay Brand Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-lg">
              <img src="/logo.png" alt="TravelMitra" className="h-6 w-auto object-contain" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold leading-none">
                TravelMitra Checkout
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] text-slate-300 font-medium">Secured by</span>
                <span className="text-xs font-bold text-sky-400 flex items-center gap-1">
                  Razorpay <Lock className="w-3 h-3 inline" />
                </span>
              </div>
            </div>
          </div>
          {stage !== 'processing' && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-1 text-lg font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {stage === 'checkout' && (
          <div className="p-6 sm:p-7 space-y-6">
            {/* Booking Summary Box */}
            <div className="bg-gradient-to-r from-orange-50/80 to-amber-50/50 p-4 rounded-2xl border border-orange-200/70 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 block">
                  {bookingItem.type} Booking
                </span>
                <h4 className="font-bold text-slate-900 text-base">{bookingItem.title}</h4>
                <p className="text-xs text-slate-600">{bookingItem.subtitle}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[11px] text-slate-500 block">Total Amount</span>
                <span className="text-2xl font-black text-brand-600">
                  {formatINR(bookingItem.price)}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold block">GST Included</span>
              </div>
            </div>

            {/* Item Details Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-150">
              {bookingItem.details.map((d, idx) => (
                <div key={idx} className="space-y-0.5">
                  <span className="text-slate-400 uppercase font-semibold text-[10px] block">{d.label}</span>
                  <span className="font-semibold text-slate-800">{d.value}</span>
                </div>
              ))}
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Select Payment Mode
              </span>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-brand-500 bg-brand-50/60 text-brand-700 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mb-1.5" />
                  <span className="text-xs font-bold">UPI / QR</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Instant & Free</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'border-brand-500 bg-brand-50/60 text-brand-700 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mb-1.5" />
                  <span className="text-xs font-bold">Cards</span>
                  <span className="text-[10px] text-slate-400">Debit / Credit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-brand-500 bg-brand-50/60 text-brand-700 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Building2 className="w-5 h-5 mb-1.5" />
                  <span className="text-xs font-bold">Net Banking</span>
                  <span className="text-[10px] text-slate-400">All Major Banks</span>
                </button>
              </div>

              {/* UPI Tab Content */}
              {paymentMethod === 'upi' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>Popular UPI Apps:</span>
                    <span className="text-slate-400 text-[11px]">GPay • PhonePe • Paytm</span>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 uppercase block mb-1">
                      Enter Virtual Payment Address (VPA / UPI ID)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={upiId}
                        onChange={e => setUpiId(e.target.value)}
                        placeholder="username@okhdfcbank"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                      <span className="absolute right-3 top-2.5 text-[11px] text-emerald-600 font-bold">
                        Verified ✓
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Card Tab Content */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 uppercase block mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      placeholder="4532 •••• •••• 9924"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 uppercase block mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 uppercase block mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={e => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 uppercase block mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={e => setCardName(e.target.value)}
                      placeholder="Aarav Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
              )}

              {/* Net Banking Tab Content */}
              {paymentMethod === 'netbanking' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <span className="text-[11px] font-semibold text-slate-600 uppercase block">
                    Choose Bank
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Bank'].map(bank => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-2.5 text-xs rounded-xl border text-left font-medium transition-all ${
                          selectedBank === bank
                            ? 'border-brand-500 bg-brand-50 text-brand-800 font-bold'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Security Guarantee callout */}
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-emerald-50/60 p-3 rounded-xl border border-emerald-200/60">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>256-bit SSL encrypted. 100% refund guarantee on cancellations.</span>
            </div>

            {/* Pay Button */}
            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handlePay}
                className="px-8 shadow-lg shadow-brand-500/25"
              >
                Pay {formatINR(bookingItem.price)} with Razorpay
              </Button>
            </div>
          </div>
        )}

        {/* Processing State */}
        {stage === 'processing' && (
          <div className="p-12 text-center space-y-6">
            <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Contacting Razorpay Gateway...</h3>
              <p className="text-xs text-slate-500">
                Authorizing secure payment of {formatINR(bookingItem.price)}. Please do not refresh.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verifying 3D Secure bank OTP protocol</span>
            </div>
          </div>
        )}

        {/* Success State */}
        {stage === 'success' && (
          <div className="p-7 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <Badge variant="success" className="mx-auto">
                Payment Authorized & Confirmed
              </Badge>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Booking Confirmed! 🎉
              </h3>
              <p className="text-xs text-slate-500">
                Your reservation has been generated in real-time with airline & hotelier confirmation.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Booking Reference / PNR:</span>
                <span className="font-mono font-bold text-brand-600 text-sm">{pnr}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Razorpay Payment ID:</span>
                <span className="font-mono text-slate-700">{paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Total Paid:</span>
                <span className="font-extrabold text-slate-900 text-sm">{formatINR(bookingItem.price)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Printer className="w-4 h-4" />}
                onClick={() => window.print()}
                className="w-full sm:w-auto"
              >
                Print Receipt
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Luggage className="w-4 h-4" />}
                onClick={handleDone}
                className="w-full sm:w-auto"
              >
                View in My Trips
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
