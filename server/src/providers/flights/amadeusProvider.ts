import { IFlightProvider, FlightSearchParams, FlightOffer } from '../types.js';
import { env } from '../../config/env.js';
import { logger } from '../../utils/logger.js';

export class AmadeusFlightProvider implements IFlightProvider {
  private clientId: string;
  private clientSecret: string;
  private baseUrl: string;

  constructor() {
    this.clientId = env.AMADEUS_CLIENT_ID;
    this.clientSecret = env.AMADEUS_CLIENT_SECRET;
    this.baseUrl = env.AMADEUS_BASE_URL;
  }

  public isConfigured(): boolean {
    return Boolean(this.clientId && this.clientSecret);
  }

  public async searchFlights(params: FlightSearchParams): Promise<FlightOffer[]> {
    if (!this.isConfigured()) {
      logger.info('Amadeus credentials not configured. Returning clearly labelled preliminary demo flight data.');
      return this.getDemoOffers(params);
    }

    // In future phases, authenticate with Amadeus OAuth2 and query flight-offers
    logger.info(`Searching Amadeus API at ${this.baseUrl} for ${params.origin} -> ${params.destination}`);
    return this.getDemoOffers(params);
  }

  private getDemoOffers(params: FlightSearchParams): FlightOffer[] {
    return [
      {
        id: 'demo-6e-204',
        provider: 'Amadeus (Demo Catalog)',
        airline: 'IndiGo',
        flightNumber: '6E-204',
        origin: params.origin.toUpperCase(),
        destination: params.destination.toUpperCase(),
        departureTime: '06:15 AM',
        arrivalTime: '08:30 AM',
        duration: '2h 15m',
        stops: 0,
        price: 4999 * params.passengers,
        currency: 'INR',
        isDemo: true,
      },
      {
        id: 'demo-ai-502',
        provider: 'Amadeus (Demo Catalog)',
        airline: 'Air India',
        flightNumber: 'AI-502',
        origin: params.origin.toUpperCase(),
        destination: params.destination.toUpperCase(),
        departureTime: '10:00 AM',
        arrivalTime: '12:20 PM',
        duration: '2h 20m',
        stops: 0,
        price: 5499 * params.passengers,
        currency: 'INR',
        isDemo: true,
      },
      {
        id: 'demo-qp-1102',
        provider: 'Amadeus (Demo Catalog)',
        airline: 'Akasa Air',
        flightNumber: 'QP-1102',
        origin: params.origin.toUpperCase(),
        destination: params.destination.toUpperCase(),
        departureTime: '04:45 PM',
        arrivalTime: '07:05 PM',
        duration: '2h 20m',
        stops: 0,
        price: 4499 * params.passengers,
        currency: 'INR',
        isDemo: true,
      },
    ];
  }
}

export const flightProvider = new AmadeusFlightProvider();
