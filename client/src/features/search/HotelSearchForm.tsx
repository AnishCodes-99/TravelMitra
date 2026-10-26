import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Building2, Calendar, Users, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const hotelSchema = z
  .object({
    city: z.string().min(2, 'Please select or enter a city or destination'),
    checkInDate: z.string().min(1, 'Check-in date is required'),
    checkOutDate: z.string().min(1, 'Check-out date is required'),
    rooms: z.coerce.number().min(1, 'Minimum 1 room').max(5, 'Maximum 5 rooms'),
    adults: z.coerce.number().min(1, 'Minimum 1 adult').max(10, 'Maximum 10 adults'),
    children: z.coerce.number().min(0, 'Cannot be negative').max(6, 'Maximum 6 children'),
  })
  .refine(
    data => {
      return new Date(data.checkOutDate) > new Date(data.checkInDate);
    },
    {
      message: 'Check-out date must be after check-in date',
      path: ['checkOutDate'],
    }
  );

type HotelFormValues = z.infer<typeof hotelSchema>;

const POPULAR_HOTEL_CITIES = [
  'Goa',
  'Delhi',
  'Mumbai',
  'Jaipur',
  'Udaipur',
  'Kashmir',
  'Manali',
  'Kerala',
  'Bengaluru',
  'Varanasi',
  'Kolkata',
  'Chennai',
  'Hyderabad',
  'Agra',
  'Amritsar',
  'Ooty',
  'Andaman',
  'Rishikesh',
];

export const HotelSearchForm: React.FC = () => {
  const navigate = useNavigate();

  const today = new Date();
  const checkIn = new Date(today);
  checkIn.setDate(today.getDate() + 2);

  const checkOut = new Date(checkIn);
  checkOut.setDate(checkIn.getDate() + 3);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<HotelFormValues>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {
      city: 'Goa',
      checkInDate: checkIn.toISOString().split('T')[0],
      checkOutDate: checkOut.toISOString().split('T')[0],
      rooms: 1,
      adults: 2,
      children: 0,
    },
  });

  const onSubmit = (data: HotelFormValues) => {
    const params = new URLSearchParams({
      city: data.city.trim(),
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      rooms: String(data.rooms),
      adults: String(data.adults),
      children: String(data.children),
    });
    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
        {/* Destination / City - Searchable Input with Datalist */}
        <div className="md:col-span-4">
          <label htmlFor="hotel-city" className="block text-xs font-bold text-slate-500 uppercase mb-1">
            City, Location or Property
          </label>
          <div className="relative">
            <Building2 className="w-5 h-5 absolute left-3 top-3 text-brand-500 pointer-events-none" />
            <input
              id="hotel-city"
              type="text"
              list="popular-hotel-cities"
              placeholder="e.g. Goa, Jaipur, Mumbai, Delhi..."
              {...register('city')}
              className="w-full bg-slate-50/80 hover:bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <datalist id="popular-hotel-cities">
              {POPULAR_HOTEL_CITIES.map(c => (
                <option key={c} value={c}>
                  {c}, India
                </option>
              ))}
            </datalist>
          </div>
          {errors.city && <p className="text-xs text-rose-600 mt-1">{errors.city.message}</p>}
        </div>

        {/* Check-in Date */}
        <div className="md:col-span-3">
          <label htmlFor="hotel-check-in-date" className="block text-xs font-bold text-slate-500 uppercase mb-1">
            Check-In
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
            <input
              id="hotel-check-in-date"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              {...register('checkInDate')}
              className="w-full bg-slate-50/80 hover:bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-2 py-2.5 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          {errors.checkInDate && <p className="text-xs text-rose-600 mt-1">{errors.checkInDate.message}</p>}
        </div>

        {/* Check-out Date */}
        <div className="md:col-span-3">
          <label htmlFor="hotel-check-out-date" className="block text-xs font-bold text-slate-500 uppercase mb-1">
            Check-Out
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
            <input
              id="hotel-check-out-date"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              {...register('checkOutDate')}
              className="w-full bg-slate-50/80 hover:bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-2 py-2.5 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          {errors.checkOutDate && <p className="text-xs text-rose-600 mt-1">{errors.checkOutDate.message}</p>}
        </div>

        {/* Rooms & Guests */}
        <div className="md:col-span-2">
          <label htmlFor="hotel-rooms" className="block text-xs font-bold text-slate-500 uppercase mb-1">
            Rooms & Guests
          </label>
          <div className="relative">
            <Users className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
            <select
              id="hotel-rooms"
              {...register('rooms')}
              className="w-full bg-slate-50/80 hover:bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-2 py-2.5 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="1">1 Room, 2 Adults</option>
              <option value="2">2 Rooms, 4 Adults</option>
              <option value="3">3 Rooms, 6 Adults</option>
              <option value="4">4 Rooms, 8 Adults</option>
            </select>
          </div>
        </div>
      </div>

      {/* Footer quick tags and button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs text-slate-500">
          <span className="font-semibold text-slate-700 shrink-0">Popular Stays:</span>
          {['Goa', 'Jaipur', 'Manali', 'Udaipur', 'Kashmir', 'Kerala'].map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => setValue('city', tag)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-brand-50 hover:text-brand-600 rounded-md font-medium shrink-0 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          leftIcon={<Search className="w-5 h-5" />}
          className="w-full sm:w-auto px-8 shadow-lg shadow-brand-500/25"
        >
          Search Hotels
        </Button>
      </div>
    </form>
  );
};
