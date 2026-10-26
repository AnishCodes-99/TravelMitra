/**
 * TravelMitra Provider Adapter Interfaces
 * Clean abstractions separating external travel and payment APIs from internal domain logic.
 */

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string; // YYYY-MM-DD
  returnDate?: string; // YYYY-MM-DD
  passengers: number;
  cabinClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
}

export interface FlightOffer {
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
  isDemo?: boolean;
}

export interface IFlightProvider {
  isConfigured(): boolean;
  searchFlights(params: FlightSearchParams): Promise<FlightOffer[]>;
}

export interface HotelSearchParams {
  cityCodeOrName: string;
  checkInDate: string; // YYYY-MM-DD
  checkOutDate: string; // YYYY-MM-DD
  rooms: number;
  adults: number;
  children: number;
}

export interface HotelOffer {
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

export interface IHotelProvider {
  isConfigured(): boolean;
  searchHotels(params: HotelSearchParams): Promise<HotelOffer[]>;
}

export interface CreateOrderParams {
  bookingId: string;
  amountInPaise: number;
  currency: string;
  receipt: string;
}

export interface PaymentOrder {
  orderId: string;
  amount: number;
  currency: string;
  keyId?: string;
  status: string;
}

export interface VerifyPaymentParams {
  orderId: string;
  paymentId: string;
  signature: string;
}

export interface IPaymentProvider {
  isConfigured(): boolean;
  createOrder(params: CreateOrderParams): Promise<PaymentOrder>;
  verifySignature(params: VerifyPaymentParams): Promise<boolean>;
}
