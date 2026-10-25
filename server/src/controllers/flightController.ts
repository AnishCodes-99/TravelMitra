import { Request, Response, NextFunction } from 'express';
import { flightProvider } from '../providers/flights/amadeusProvider.js';
import { z } from 'zod';

const flightSearchSchema = z.object({
  origin: z.string().min(2),
  destination: z.string().min(2),
  departureDate: z.string().min(8),
  returnDate: z.string().optional(),
  passengers: z.coerce.number().min(1).max(9).default(1),
  cabinClass: z.enum(['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST']).default('ECONOMY'),
});

export async function searchFlights(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = flightSearchSchema.parse(req.query);
    const offers = await flightProvider.searchFlights(validated);

    res.json({
      success: true,
      meta: {
        totalResults: offers.length,
        isProviderConnected: flightProvider.isConfigured(),
        searchedAt: new Date().toISOString(),
      },
      data: offers,
    });
  } catch (error) {
    next(error);
  }
}
