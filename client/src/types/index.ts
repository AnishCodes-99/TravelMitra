export type TravelTab = 'flights' | 'hotels' | 'packages';

export interface FlightSearchFormValues {
  tripType: 'one-way' | 'round-trip';
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
}

export interface HotelSearchFormValues {
  city: string;
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
  adults: number;
  children: number;
}

export interface PackageSearchFormValues {
  destination: string;
  departureCity: string;
  travelDate: string;
  travellers: number;
}

export interface FlightItem {
  id: string;
  provider: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  currency: string;
  cabinClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
  seatsAvailable?: number;
  isDemo?: boolean;
}

export interface HotelItem {
  id: string;
  provider: string;
  name: string;
  city: string;
  starRating: number;
  pricePerNight: number;
  totalPrice: number;
  currency: string;
  amenities: string[];
  imageUrl?: string;
  isDemo?: boolean;
}

export interface PackageItem {
  id: string;
  title: string;
  destination: string;
  duration: string;
  pricePerPerson: number;
  currency: string;
  rating: number;
  inclusions: string[];
  imageUrl: string;
  isDemo?: boolean;
}

export interface DestinationCard {
  id: string;
  name: string;
  state: string;
  tagline: string;
  startingPrice: number;
  tag: string;
  imageUrl: string;
  airportCode?: string;
  cityQuery?: string;
}

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
  timestamp: string;
  uptime: number;
  database: 'connected' | 'disconnected' | 'not-configured';
  environment: string;
}
