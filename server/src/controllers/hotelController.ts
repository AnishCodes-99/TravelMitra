import { Request, Response, NextFunction } from 'express';
import { hotelProvider } from '../providers/hotels/hotelProvider.js';
import { z } from 'zod';

const hotelSearchSchema = z.object({
  city: z.string().min(2),
  checkInDate: z.string().min(8),
  checkOutDate: z.string().min(8),
  rooms: z.coerce.number().min(1).max(5).default(1),
  adults: z.coerce.number().min(1).max(10).default(2),
  children: z.coerce.number().min(0).max(6).default(0),
});

export async function searchHotels(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = hotelSearchSchema.parse(req.query);
    const offers = await hotelProvider.searchHotels({
      cityCodeOrName: validated.city,
      checkInDate: validated.checkInDate,
      checkOutDate: validated.checkOutDate,
      rooms: validated.rooms,
      adults: validated.adults,
      children: validated.children,
    });

    res.json({
      success: true,
      meta: {
        totalResults: offers.length,
        isProviderConnected: hotelProvider.isConfigured(),
        searchedAt: new Date().toISOString(),
      },
      data: offers,
    });
  } catch (error) {
    next(error);
  }
}
