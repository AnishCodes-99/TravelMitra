import { IHotelProvider, HotelSearchParams, HotelOffer } from '../types.js';
import { logger } from '../../utils/logger.js';

export class BaseHotelProvider implements IHotelProvider {
  public isConfigured(): boolean {
    return false; // Provider to be selected and configured in future phase
  }

  public async searchHotels(params: HotelSearchParams): Promise<HotelOffer[]> {
    logger.info(`Searching hotel catalog for ${params.cityCodeOrName}`);
    return [
      {
        id: 'demo-hotel-taj',
        provider: 'Hospitality Partner (Demo Catalog)',
        name: 'The Grand Palace Heritage Resort',
        city: params.cityCodeOrName,
        starRating: 5,
        pricePerNight: 8500,
        totalPrice: 8500 * params.rooms,
        currency: 'INR',
        amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Breakfast Included'],
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        isDemo: true,
      },
      {
        id: 'demo-hotel-radisson',
        provider: 'Hospitality Partner (Demo Catalog)',
        name: 'Azure Bay Boutique Suites',
        city: params.cityCodeOrName,
        starRating: 4,
        pricePerNight: 4500,
        totalPrice: 4500 * params.rooms,
        currency: 'INR',
        amenities: ['Free WiFi', 'Fitness Center', 'Restaurant', 'Airport Shuttle'],
        imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        isDemo: true,
      },
    ];
  }
}

export const hotelProvider = new BaseHotelProvider();
