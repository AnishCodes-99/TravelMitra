import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Palmtree, MapPin, Calendar, Users, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const packageSchema = z.object({
  destination: z.string().min(2, 'Please choose a destination'),
  departureCity: z.string().min(2, 'Please choose your departure city'),
  travelDate: z.string().min(1, 'Please select your preferred travel month/date'),
  travellers: z.coerce.number().min(1, 'Minimum 1 traveller').max(15, 'Maximum 15 travellers'),
});

type PackageFormValues = z.infer<typeof packageSchema>;

const POPULAR_PACKAGE_DESTINATIONS = [
  'Kerala',
  'Kashmir',
  'Goa',
  'Himachal (Manali & Shimla)',
  'Andaman & Nicobar',
  'Rajasthan (Jaipur & Udaipur)',
  'Uttarakhand (Rishikesh & Nainital)',
  'Dubai Special',
];

const DEPARTURE_CITIES = ['New Delhi', 'Mumbai', 'Bengaluru', 'Kolkata', 'Chennai', 'Hyderabad', 'Ahmedabad', 'Pune'];

export const PackageSearchForm: React.FC = () => {
  const navigate = useNavigate();

  const nextMonth = new Date();
  nextMonth.setDate(nextMonth.getDate() + 14);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      destination: 'Kerala',
      departureCity: 'New Delhi',
      travelDate: nextMonth.toISOString().split('T')[0],
      travellers: 2,
    },
  });

  const onSubmit = (data: PackageFormValues) => {
    const params = new URLSearchParams({
      destination: data.destination,
      departureCity: data.departureCity,
      travelDate: data.travelDate,
      travellers: String(data.travellers),
    });
    navigate(`/packages?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
        {/* Destination */}
        <div className="md:col-span-4">
          <label htmlFor="package-destination" className="block text-xs font-bold text-slate-500 uppercase mb-1">
            Holiday Destination
          </label>
          <div className="relative">
            <Palmtree className="w-5 h-5 absolute left-3 top-3 text-brand-500 pointer-events-none" />
            <select
              id="package-destination"
              {...register('destination')}
              className="w-full bg-slate-50/80 hover:bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Select holiday destination</option>
              {POPULAR_PACKAGE_DESTINATIONS.map(d => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          {errors.destination && <p className="text-xs text-rose-600 mt-1">{errors.destination.message}</p>}
        </div>

        {/* Departure City */}
        <div className="md:col-span-3">
          <label htmlFor="package-departure-city" className="block text-xs font-bold text-slate-500 uppercase mb-1">
            Departing From
          </label>
          <div className="relative">
            <MapPin className="w-5 h-5 absolute left-3 top-3 text-slate-400 pointer-events-none" />
            <select
              id="package-departure-city"
              {...register('departureCity')}
              className="w-full bg-slate-50/80 hover:bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Select departure city</option>
              {DEPARTURE_CITIES.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          {errors.departureCity && <p className="text-xs text-rose-600 mt-1">{errors.departureCity.message}</p>}
        </div>

        {/* Travel Date */}
        <div className="md:col-span-3">
          <label htmlFor="package-travel-date" className="block text-xs font-bold text-slate-500 uppercase mb-1">
            Preferred Date
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
            <input
              id="package-travel-date"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              {...register('travelDate')}
              className="w-full bg-slate-50/80 hover:bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-2 py-2.5 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          {errors.travelDate && <p className="text-xs text-rose-600 mt-1">{errors.travelDate.message}</p>}
        </div>

        {/* Travellers */}
        <div className="md:col-span-2">
          <label htmlFor="package-travellers" className="block text-xs font-bold text-slate-500 uppercase mb-1">
            Travellers
          </label>
          <div className="relative">
            <Users className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
            <select
              id="package-travellers"
              {...register('travellers')}
              className="w-full bg-slate-50/80 hover:bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-2 py-2.5 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {[1, 2, 3, 4, 5, 6, 8, 10].map(num => (
                <option key={`pkg-travellers-${num}`} value={num}>
                  {num} {num === 1 ? 'Person' : 'People'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Footer quick tags and button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs text-slate-500">
          <span className="font-semibold text-slate-700 shrink-0">Trending Packages:</span>
          {['Kashmir Paradise', 'Kerala Houseboat', 'Andaman Island Bliss'].map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => setValue('destination', tag.split(' ')[0])}
              className="px-2 py-1 bg-slate-100 hover:bg-brand-50 hover:text-brand-600 rounded-md shrink-0"
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
          Search Packages
        </Button>
      </div>
    </form>
  );
};
