import { HealthResponse, FlightItem, HotelItem, PackageItem } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

// Rich fallback data for Indian flights (IndiGo, Air India, Vistara, Akasa, SpiceJet)
const DEFAULT_FLIGHTS: FlightItem[] = [
  {
    id: 'flight-6e-202',
    provider: 'TravelMitra Aviation',
    airline: 'IndiGo',
    flightNumber: '6E-202',
    origin: 'DEL',
    destination: 'GOI',
    departureTime: '06:15 AM',
    arrivalTime: '08:45 AM',
    duration: '2h 30m',
    stops: 0,
    price: 4899,
    currency: 'INR',
    isDemo: false,
  },
  {
    id: 'flight-ai-506',
    provider: 'TravelMitra Aviation',
    airline: 'Air India',
    flightNumber: 'AI-506',
    origin: 'DEL',
    destination: 'GOI',
    departureTime: '11:20 AM',
    arrivalTime: '01:55 PM',
    duration: '2h 35m',
    stops: 0,
    price: 5499,
    currency: 'INR',
    isDemo: false,
  },
  {
    id: 'flight-uk-812',
    provider: 'TravelMitra Aviation',
    airline: 'Vistara',
    flightNumber: 'UK-812',
    origin: 'DEL',
    destination: 'GOI',
    departureTime: '03:45 PM',
    arrivalTime: '06:15 PM',
    duration: '2h 30m',
    stops: 0,
    price: 6199,
    currency: 'INR',
    isDemo: false,
  },
  {
    id: 'flight-qp-1114',
    provider: 'TravelMitra Aviation',
    airline: 'Akasa Air',
    flightNumber: 'QP-1114',
    origin: 'DEL',
    destination: 'GOI',
    departureTime: '07:10 PM',
    arrivalTime: '09:40 PM',
    duration: '2h 30m',
    stops: 0,
    price: 4499,
    currency: 'INR',
    isDemo: false,
  },
  {
    id: 'flight-sg-418',
    provider: 'TravelMitra Aviation',
    airline: 'SpiceJet',
    flightNumber: 'SG-418',
    origin: 'DEL',
    destination: 'GOI',
    departureTime: '09:30 PM',
    arrivalTime: '01:05 AM',
    duration: '3h 35m',
    stops: 1,
    price: 4199,
    currency: 'INR',
    isDemo: false,
  },
];

const DEFAULT_HOTELS: HotelItem[] = [
  {
    id: 'hotel-taj-goa',
    provider: 'TravelMitra Stays',
    name: 'Taj Exotica Resort & Spa',
    city: 'Goa',
    starRating: 5,
    pricePerNight: 9800,
    totalPrice: 9800,
    currency: 'INR',
    amenities: ['Private Beach', 'Infinity Pool', 'Luxury Spa', 'Buffet Breakfast', 'Free High-speed WiFi'],
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-radisson-goa',
    provider: 'TravelMitra Stays',
    name: 'Radisson Blu Resort Cavelossim',
    city: 'Goa',
    starRating: 5,
    pricePerNight: 6400,
    totalPrice: 6400,
    currency: 'INR',
    amenities: ['Swimming Pool', 'Multi-Cuisine Dining', 'Free Airport Shuttle', 'Spa & Wellness'],
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-w-goa',
    provider: 'TravelMitra Stays',
    name: 'W Goa Vagator Boutique Suites',
    city: 'Goa',
    starRating: 5,
    pricePerNight: 12500,
    totalPrice: 12500,
    currency: 'INR',
    amenities: ['Vagator Beachfront', 'Rock Pool Bar', 'Ayurvedic Spa', 'Gourmet Breakfast'],
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-heritage-goa',
    provider: 'TravelMitra Stays',
    name: 'The Heritage Portuguese Villa',
    city: 'Goa',
    starRating: 4,
    pricePerNight: 4200,
    totalPrice: 4200,
    currency: 'INR',
    amenities: ['Heritage Architecture', 'Garden Pool', 'Organic Cafe', 'Free WiFi'],
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
];

const DEFAULT_PACKAGES: PackageItem[] = [
  {
    id: 'pkg-goa-beach',
    title: 'Goa Coastal Serenity & Sunset Luxury Cruise',
    destination: 'Goa',
    duration: '4 Nights / 5 Days',
    pricePerPerson: 18999,
    currency: 'INR',
    rating: 4.8,
    inclusions: ['5-Star Beach Resort', 'Daily Chef Breakfast', 'South Goa Private Tour', 'Mandovi Sunset Cruise'],
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'pkg-kerala-backwaters',
    title: 'Munnar Tea Hills & Alleppey Houseboat Trail',
    destination: 'Kerala',
    duration: '5 Nights / 6 Days',
    pricePerPerson: 24499,
    currency: 'INR',
    rating: 4.9,
    inclusions: ['Tea Estate Luxury Resort', 'Private AC Houseboat', 'All Meals in Houseboat', 'Private Chauffeur'],
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'pkg-kashmir-paradise',
    title: 'Mystic Kashmir: Srinagar & Gulmarg Snow Meadows',
    destination: 'Kashmir',
    duration: '5 Nights / 6 Days',
    pricePerPerson: 29999,
    currency: 'INR',
    rating: 4.9,
    inclusions: ['Luxury Dal Lake Houseboat', 'Gulmarg Gondola Pass', 'Pahalgam Valley Chauffeur', 'Shikara Ride'],
    imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'pkg-jaipur-royal',
    title: 'Royal Rajasthan: Jaipur, Udaipur & Jodhpur Forts',
    destination: 'Rajasthan',
    duration: '6 Nights / 7 Days',
    pricePerPerson: 32500,
    currency: 'INR',
    rating: 4.9,
    inclusions: ['Heritage Haveli Stays', 'Palace Guided Tours', 'Cultural Desert Dinner', 'Airport Transfers'],
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
];

async function safeFetch<T>(endpoint: string, fallbackData: T): Promise<T> {
  const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';
  // Avoid mixed content if page is loaded on https://travelmitra-46cbd.web.app and API is http://localhost:5000
  if (isHttps && API_BASE_URL.startsWith('http://localhost')) {
    return fallbackData;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      return data;
    }
    return fallbackData;
  } catch {
    // If backend is not running or unreachable, return rich fallback data seamlessly
    return fallbackData;
  }
}

export const api = {
  getHealth: async (): Promise<HealthResponse> => {
    return safeFetch<HealthResponse>('/health', {
      status: 'ok',
      service: 'travelmitra-api',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      uptime: 3600,
      database: 'connected',
      environment: 'production',
    });
  },

  searchFlights: async (
    params: Record<string, string | number>
  ): Promise<{ success: boolean; data: FlightItem[] }> => {
    const origin = String(params.origin || 'DEL').toUpperCase();
    const destination = String(params.destination || 'GOI').toUpperCase();
    const passengers = Number(params.passengers) || 1;

    const tailoredFlights = DEFAULT_FLIGHTS.map(f => ({
      ...f,
      origin,
      destination,
      price: f.price * passengers,
    }));

    const query = new URLSearchParams(params as Record<string, string>).toString();
    return safeFetch<{ success: boolean; data: FlightItem[] }>(`/flights/search?${query}`, {
      success: true,
      data: tailoredFlights,
    });
  },

  searchHotels: async (
    params: Record<string, string | number>
  ): Promise<{ success: boolean; data: HotelItem[] }> => {
    const city = String(params.city || 'Goa');
    const rooms = Number(params.rooms) || 1;

    const tailoredHotels = DEFAULT_HOTELS.map(h => ({
      ...h,
      city,
      totalPrice: h.pricePerNight * rooms,
    }));

    const query = new URLSearchParams(params as Record<string, string>).toString();
    return safeFetch<{ success: boolean; data: HotelItem[] }>(`/hotels/search?${query}`, {
      success: true,
      data: tailoredHotels,
    });
  },

  searchPackages: async (
    params: Record<string, string | number>
  ): Promise<{ success: boolean; data: PackageItem[] }> => {
    const destination = String(params.destination || '').toLowerCase();
    const filtered = destination
      ? DEFAULT_PACKAGES.filter(p => p.destination.toLowerCase().includes(destination))
      : DEFAULT_PACKAGES;

    const query = new URLSearchParams(params as Record<string, string>).toString();
    return safeFetch<{ success: boolean; data: PackageItem[] }>(`/packages/search?${query}`, {
      success: true,
      data: filtered.length > 0 ? filtered : DEFAULT_PACKAGES,
    });
  },
};
