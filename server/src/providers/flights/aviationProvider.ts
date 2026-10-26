import { IFlightProvider, FlightSearchParams, FlightOffer } from '../types.js';
import { env } from '../../config/env.js';
import { logger } from '../../utils/logger.js';

interface AirportRouteInfo {
  distanceKm: number;
  durationMinutes: number;
}

// Approximate flight durations and distances between major Indian hubs
const INDIAN_CITY_PAIRS: Record<string, AirportRouteInfo> = {
  'DEL-BOM': { distanceKm: 1148, durationMinutes: 130 },
  'BOM-DEL': { distanceKm: 1148, durationMinutes: 130 },
  'DEL-GOI': { distanceKm: 1515, durationMinutes: 155 },
  'GOI-DEL': { distanceKm: 1515, durationMinutes: 155 },
  'BOM-GOI': { distanceKm: 435, durationMinutes: 75 },
  'GOI-BOM': { distanceKm: 435, durationMinutes: 75 },
  'DEL-BLR': { distanceKm: 1740, durationMinutes: 165 },
  'BLR-DEL': { distanceKm: 1740, durationMinutes: 165 },
  'BOM-BLR': { distanceKm: 842, durationMinutes: 100 },
  'BLR-BOM': { distanceKm: 842, durationMinutes: 100 },
  'DEL-CCU': { distanceKm: 1305, durationMinutes: 135 },
  'CCU-DEL': { distanceKm: 1305, durationMinutes: 135 },
  'DEL-JAI': { distanceKm: 240, durationMinutes: 55 },
  'JAI-DEL': { distanceKm: 240, durationMinutes: 55 },
  'DEL-SXR': { distanceKm: 650, durationMinutes: 85 },
  'SXR-DEL': { distanceKm: 650, durationMinutes: 85 },
  'DEL-COK': { distanceKm: 2080, durationMinutes: 190 },
  'COK-DEL': { distanceKm: 2080, durationMinutes: 190 },
  'BOM-COK': { distanceKm: 1060, durationMinutes: 115 },
  'COK-BOM': { distanceKm: 1060, durationMinutes: 115 },
};

const AIRLINE_TEMPLATES = [
  {
    airline: 'IndiGo',
    iata: '6E',
    basePricePerKm: 3.4,
    flightNoPrefix: 200,
    departureOffsetHour: 6,
    departureOffsetMinute: 15,
  },
  {
    airline: 'Air India',
    iata: 'AI',
    basePricePerKm: 3.9,
    flightNoPrefix: 500,
    departureOffsetHour: 10,
    departureOffsetMinute: 30,
  },
  {
    airline: 'Vistara',
    iata: 'UK',
    basePricePerKm: 4.2,
    flightNoPrefix: 800,
    departureOffsetHour: 14,
    departureOffsetMinute: 10,
  },
  {
    airline: 'Akasa Air',
    iata: 'QP',
    basePricePerKm: 3.2,
    flightNoPrefix: 1100,
    departureOffsetHour: 17,
    departureOffsetMinute: 45,
  },
  {
    airline: 'SpiceJet',
    iata: 'SG',
    basePricePerKm: 3.1,
    flightNoPrefix: 400,
    departureOffsetHour: 20,
    departureOffsetMinute: 0,
  },
];

export class IndianAviationFlightProvider implements IFlightProvider {
  private aviationStackApiKey: string;

  constructor() {
    this.aviationStackApiKey = env.AVIATIONSTACK_API_KEY || '';
  }

  public isConfigured(): boolean {
    return Boolean(this.aviationStackApiKey);
  }

  public async searchFlights(params: FlightSearchParams): Promise<FlightOffer[]> {
    const origin = params.origin.toUpperCase().trim();
    const destination = params.destination.toUpperCase().trim();

    // 1. If user provided a free AviationStack API key, try querying live flights
    if (this.isConfigured()) {
      try {
        const liveOffers = await this.queryAviationStack(origin, destination, params);
        if (liveOffers.length > 0) {
          logger.info(`Fetched ${liveOffers.length} live flights from AviationStack API`);
          return liveOffers;
        }
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        logger.warn(`AviationStack query failed (${errMsg}). Falling back to Mitra Indian Aviation Engine.`);
      }
    }

    // 2. High-fidelity native Indian Aviation Engine (Zero external API keys required, 100% free)
    return this.generateDomesticFlights(origin, destination, params);
  }

  private async queryAviationStack(
    origin: string,
    destination: string,
    params: FlightSearchParams
  ): Promise<FlightOffer[]> {
    const url = `http://api.aviationstack.com/v1/flights?access_key=${encodeURIComponent(
      this.aviationStackApiKey
    )}&dep_iata=${encodeURIComponent(origin)}&arr_iata=${encodeURIComponent(destination)}&limit=10`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = (await response.json()) as { data?: Array<Record<string, any>> };
      clearTimeout(timeout);

      if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
        return [];
      }

      return data.data.map((flight, idx) => {
        const airlineName = flight.airline?.name || 'Domestic Carrier';
        const flightNumber = flight.flight?.iata || `${flight.airline?.iata || 'IN'}-${100 + idx}`;
        const depTime = flight.departure?.estimated || flight.departure?.scheduled || '09:00 AM';
        const arrTime = flight.arrival?.estimated || flight.arrival?.scheduled || '11:15 AM';

        const cabinMultiplier =
          params.cabinClass === 'BUSINESS'
            ? 2.8
            : params.cabinClass === 'PREMIUM_ECONOMY'
            ? 1.6
            : params.cabinClass === 'FIRST'
            ? 4.5
            : 1.0;

        return {
          id: `as-${flight.flight?.icao || idx}-${Date.now()}`,
          provider: 'AviationStack (Live)',
          airline: airlineName,
          flightNumber,
          origin,
          destination,
          departureTime: this.formatTimeStr(depTime),
          arrivalTime: this.formatTimeStr(arrTime),
          duration: '2h 15m',
          stops: 0,
          price: Math.round((3999 + idx * 450) * cabinMultiplier * params.passengers),
          currency: 'INR',
          cabinClass: params.cabinClass,
          isDemo: false,
        };
      });
    } finally {
      clearTimeout(timeout);
    }
  }

  private generateDomesticFlights(
    origin: string,
    destination: string,
    params: FlightSearchParams
  ): FlightOffer[] {
    const routeKey = `${origin}-${destination}`;
    const routeInfo = INDIAN_CITY_PAIRS[routeKey] || { distanceKm: 1200, durationMinutes: 135 };

    const hours = Math.floor(routeInfo.durationMinutes / 60);
    const mins = routeInfo.durationMinutes % 60;
    const durationFormatted = `${hours}h ${mins > 0 ? `${mins}m` : ''}`.trim();

    const cabinMultiplier =
      params.cabinClass === 'BUSINESS'
        ? 2.8
        : params.cabinClass === 'PREMIUM_ECONOMY'
        ? 1.6
        : params.cabinClass === 'FIRST'
        ? 4.5
        : 1.0;

    return AIRLINE_TEMPLATES.map((airline, idx) => {
      const depHour = (airline.departureOffsetHour + idx * 2) % 24;
      const depMin = airline.departureOffsetMinute;
      const depPeriod = depHour >= 12 ? 'PM' : 'AM';
      const depHour12 = depHour % 12 === 0 ? 12 : depHour % 12;

      const arrTotalMinutes = depHour * 60 + depMin + routeInfo.durationMinutes;
      const arrHour = Math.floor(arrTotalMinutes / 60) % 24;
      const arrMin = arrTotalMinutes % 60;
      const arrPeriod = arrHour >= 12 ? 'PM' : 'AM';
      const arrHour12 = arrHour % 12 === 0 ? 12 : arrHour % 12;

      const pad = (n: number) => n.toString().padStart(2, '0');
      const depTimeStr = `${pad(depHour12)}:${pad(depMin)} ${depPeriod}`;
      const arrTimeStr = `${pad(arrHour12)}:${pad(arrMin)} ${arrPeriod}`;

      // Calculate fair domestic pricing based on route distance + passenger count
      const baseFare = Math.round(routeInfo.distanceKm * airline.basePricePerKm);
      const roundedFare = Math.ceil(baseFare / 100) * 100 - 1; // e.g. 4899, 5299
      const totalFare = Math.round(roundedFare * cabinMultiplier * params.passengers);

      const flightNumber = `${airline.iata}-${airline.flightNoPrefix + idx * 4 + 2}`;

      return {
        id: `flight-${airline.iata.toLowerCase()}-${flightNumber.toLowerCase()}`,
        provider: 'TravelMitra Aviation Engine',
        airline: airline.airline,
        flightNumber,
        origin,
        destination,
        departureTime: depTimeStr,
        arrivalTime: arrTimeStr,
        duration: durationFormatted,
        stops: idx === 4 ? 1 : 0, // SpiceJet has 1 stop, others non-stop
        price: totalFare,
        currency: 'INR',
        cabinClass: params.cabinClass,
        isDemo: true,
      };
    });
  }

  private formatTimeStr(isoOrTime: string): string {
    if (!isoOrTime) return '10:00 AM';
    if (isoOrTime.includes('T')) {
      const date = new Date(isoOrTime);
      if (!isNaN(date.getTime())) {
        return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
      }
    }
    return isoOrTime;
  }
}

export const flightProvider = new IndianAviationFlightProvider();
