import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const packageSearchSchema = z.object({
  destination: z.string().optional(),
  departureCity: z.string().optional(),
  travelMonth: z.string().optional(),
  travellers: z.coerce.number().min(1).default(2),
});

export async function searchPackages(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = packageSearchSchema.parse(req.query);

    const packages = [
      {
        id: 'pkg-goa-beach',
        title: 'Goa Coastal Serenity & Sunset Cruise',
        destination: 'Goa',
        duration: '4 Nights / 5 Days',
        pricePerPerson: 18999,
        currency: 'INR',
        rating: 4.8,
        inclusions: ['4-Star Beach Resort', 'Daily Breakfast', 'South Goa Tour', 'Mandovi Sunset Cruise'],
        imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
        isDemo: true,
      },
      {
        id: 'pkg-kerala-backwaters',
        title: 'Munnar Hills & Alleppey Houseboat Trail',
        destination: 'Kerala',
        duration: '5 Nights / 6 Days',
        pricePerPerson: 24499,
        currency: 'INR',
        rating: 4.9,
        inclusions: ['Tea Estate Resort', 'Private AC Houseboat', 'All Meals in Houseboat', 'Private Cab Transfer'],
        imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
        isDemo: true,
      },
      {
        id: 'pkg-kashmir-paradise',
        title: 'Mystic Kashmir: Srinagar & Gulmarg Snow Meadows',
        destination: 'Kashmir',
        duration: '5 Nights / 6 Days',
        pricePerPerson: 29999,
        currency: 'INR',
        rating: 4.9,
        inclusions: ['Luxury Dal Lake Houseboat', 'Gulmarg Gondola Phase 1', 'Pahalgam Valley Tour', 'Shikara Ride'],
        imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
        isDemo: true,
      },
    ];

    const filtered = validated.destination
      ? packages.filter(p => p.destination.toLowerCase().includes(validated.destination!.toLowerCase()))
      : packages;

    res.json({
      success: true,
      meta: {
        totalResults: filtered.length,
        isDemoCatalog: true,
      },
      data: filtered,
    });
  } catch (error) {
    next(error);
  }
}
