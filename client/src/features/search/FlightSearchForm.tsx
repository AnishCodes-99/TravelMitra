import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { PlaneTakeoff, PlaneLanding, Calendar, Users, ArrowRightLeft, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const flightSchema = z
  .object({
    tripType: z.enum(['one-way', 'round-trip']),
    origin: z.string().min(2, 'Origin city or airport is required'),
    destination: z.string().min(2, 'Destination city or airport is required'),
    departureDate: z.string().min(1, 'Departure date is required'),
    returnDate: z.string().optional(),
    passengers: z.coerce.number().min(1, 'Minimum 1 passenger').max(9, 'Maximum 9 passengers'),
    cabinClass: z.enum(['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST']),
  })
  .refine(
    data => {
      if (data.origin.trim().toUpperCase() === data.destination.trim().toUpperCase()) {
        return false;
      }
      return true;
    },
    {
      message: 'Origin and destination cannot be identical',
      path: ['destination'],
    }
  )
  .refine(
    data => {
      if (data.tripType === 'round-trip') {
        if (!data.returnDate) return false;
        return new Date(data.returnDate) >= new Date(data.departureDate);
      }
      return true;
    },
    {
      message: 'Return date must be on or after departure date',
      path: ['returnDate'],
    }
  );

type FlightFormValues = z.infer<typeof flightSchema>;

// Quick Indian airport suggestions
const POPULAR_AIRPORTS = [
  { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi Intl (DEL)' },
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Intl (BOM)' },
  { code: 'BLR', city: 'Bengaluru', name: 'Kempegowda Intl (BLR)' },
  { code: 'GOI', city: 'Goa', name: 'Dabolim / Mopa (GOI/GOX)' },
  { code: 'CCU', city: 'Kolkata', name: 'Netaji Subhash Chandra Bose (CCU)' },
  { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi Intl (HYD)' },
  { code: 'MAA', city: 'Chennai', name: 'Chennai Intl (MAA)' },
  { code: 'JAI', city: 'Jaipur', name: 'Jaipur Intl (JAI)' },
  { code: 'COK', city: 'Kochi', name: 'Cochin Intl (COK)' },
  { code: 'SXR', city: 'Srinagar', name: 'Sheikh ul-Alam Intl (SXR)' },
];

export const FlightSearchForm: React.FC = () => {
  const navigate = useNavigate();

  // Tomorrow as default departure date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDeparture = tomorrow.toISOString().split('T')[0];

  const defaultReturn = new Date();
  defaultReturn.setDate(defaultReturn.getDate() + 5);
  const defaultReturnDate = defaultReturn.toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FlightFormValues>({
    resolver: zodResolver(flightSchema),
    defaultValues: {
      tripType: 'one-way',
      origin: 'DEL',
      destination: 'GOI',
      departureDate: defaultDeparture,
      returnDate: defaultReturnDate,
      passengers: 1,
      cabinClass: 'ECONOMY',
    },
  });

  const tripType = watch('tripType');
  const origin = watch('origin');
  const destination = watch('destination');

  const handleSwapAirports = () => {
    setValue('origin', destination);
    setValue('destination', origin);
  };

  const onSubmit = (data: FlightFormValues) => {
    const params = new URLSearchParams({
      tripType: data.tripType,
      origin: data.origin.toUpperCase(),
      destination: data.destination.toUpperCase(),
      departureDate: data.departureDate,
      ...(data.tripType === 'round-trip' && data.returnDate ? { returnDate: data.returnDate } : {}),
      passengers: String(data.passengers),
      cabinClass: data.cabinClass,
    });
    navigate(`/flights?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Trip Type Selector & Cabin Class */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-800">
            <input
              type="radio"
              value="one-way"
              {...register('tripType')}
              className="w-4 h-4 text-brand-500 focus:ring-brand-500"
            />
            <span>One Way</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-800">
            <input
              type="radio"
              value="round-trip"
              {...register('tripType')}
              className="w-4 h-4 text-brand-500 focus:ring-brand-500"
            />
            <span>Round Trip</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 uppercase">Cabin Class:</span>
          <select
            {...register('cabinClass')}
            className="text-xs font-semibold bg-slate-100 border-0 rounded-lg px-2.5 py-1.5 text-slate-700 focus:ring-2 focus:ring-brand-500"
          >
            <option value="ECONOMY">Economy</option>
            <option value="PREMIUM_ECONOMY">Premium Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST">First Class</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Origin, Swap, Destination, Dates, Passengers */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
        {/* Origin */}
        <div className="md:col-span-3">
          <label htmlFor="flight-origin" className="block text-xs font-bold text-slate-500 uppercase mb-1">
            From (Origin)
          </label>
          <div className="relative">
            <PlaneTakeoff className="w-5 h-5 absolute left-3 top-3 text-brand-500 pointer-events-none" />
            <select
              id="flight-origin"
              {...register('origin')}
              className="w-full bg-slate-50/80 hover:bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Select departure city</option>
              {POPULAR_AIRPORTS.map(apt => (
                <option key={`orig-${apt.code}`} value={apt.code}>
                  {apt.city} ({apt.code})
                </option>
              ))}
            </select>
          </div>
          {errors.origin && <p className="text-xs text-rose-600 mt-1">{errors.origin.message}</p>}
        </div>

        {/* Swap button */}
        <div className="hidden md:flex md:col-span-1 justify-center pt-6">
          <button
            type="button"
            onClick={handleSwapAirports}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm hover:border-brand-500 hover:text-brand-600 flex items-center justify-center text-slate-500 transition-colors"
            title="Swap origin and destination"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Destination */}
        <div className="md:col-span-3">
          <label htmlFor="flight-destination" className="block text-xs font-bold text-slate-500 uppercase mb-1">
            To (Destination)
          </label>
          <div className="relative">
            <PlaneLanding className="w-5 h-5 absolute left-3 top-3 text-brand-500 pointer-events-none" />
            <select
              id="flight-destination"
              {...register('destination')}
              className="w-full bg-slate-50/80 hover:bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Select arrival city</option>
              {POPULAR_AIRPORTS.map(apt => (
                <option key={`dest-${apt.code}`} value={apt.code}>
                  {apt.city} ({apt.code})
                </option>
              ))}
            </select>
          </div>
          {errors.destination && <p className="text-xs text-rose-600 mt-1">{errors.destination.message}</p>}
        </div>

        {/* Departure Date */}
        <div className={tripType === 'round-trip' ? 'md:col-span-2' : 'md:col-span-3'}>
          <label htmlFor="flight-departure-date" className="block text-xs font-bold text-slate-500 uppercase mb-1">
            Departure
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
            <input
              id="flight-departure-date"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              {...register('departureDate')}
              className="w-full bg-slate-50/80 hover:bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-2 py-2.5 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          {errors.departureDate && <p className="text-xs text-rose-600 mt-1">{errors.departureDate.message}</p>}
        </div>

        {/* Return Date (Conditional) */}
        {tripType === 'round-trip' && (
          <div className="md:col-span-2">
            <label htmlFor="flight-return-date" className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Return
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
              <input
                id="flight-return-date"
                type="date"
                min={watch('departureDate') || new Date().toISOString().split('T')[0]}
                {...register('returnDate')}
                className="w-full bg-slate-50/80 hover:bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-2 py-2.5 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            {errors.returnDate && <p className="text-xs text-rose-600 mt-1">{errors.returnDate.message}</p>}
          </div>
        )}

        {/* Passengers */}
        <div className={tripType === 'round-trip' ? 'md:col-span-1' : 'md:col-span-2'}>
          <label htmlFor="flight-passengers" className="block text-xs font-bold text-slate-500 uppercase mb-1">
            Passengers
          </label>
          <div className="relative">
            <Users className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
            <select
              id="flight-passengers"
              {...register('passengers')}
              className="w-full bg-slate-50/80 hover:bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-2 py-2.5 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <option key={`pax-${num}`} value={num}>
                  {num} {num === 1 ? 'Adult' : 'Adults'}
                </option>
              ))}
            </select>
          </div>
          {errors.passengers && <p className="text-xs text-rose-600 mt-1">{errors.passengers.message}</p>}
        </div>
      </div>

      {/* Popular quick picks & submit button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs text-slate-500">
          <span className="font-semibold text-slate-700 shrink-0">Popular Routes:</span>
          <button
            type="button"
            onClick={() => {
              setValue('origin', 'DEL');
              setValue('destination', 'BOM');
            }}
            className="px-2 py-1 bg-slate-100 hover:bg-brand-50 hover:text-brand-600 rounded-md shrink-0"
          >
            DEL → BOM
          </button>
          <button
            type="button"
            onClick={() => {
              setValue('origin', 'BLR');
              setValue('destination', 'GOI');
            }}
            className="px-2 py-1 bg-slate-100 hover:bg-brand-50 hover:text-brand-600 rounded-md shrink-0"
          >
            BLR → GOI
          </button>
          <button
            type="button"
            onClick={() => {
              setValue('origin', 'DEL');
              setValue('destination', 'SXR');
            }}
            className="px-2 py-1 bg-slate-100 hover:bg-brand-50 hover:text-brand-600 rounded-md shrink-0"
          >
            DEL → SXR
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          leftIcon={<Search className="w-5 h-5" />}
          className="w-full sm:w-auto px-8 shadow-lg shadow-brand-500/25"
        >
          Search Flights
        </Button>
      </div>
    </form>
  );
};
