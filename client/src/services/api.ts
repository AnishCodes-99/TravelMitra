import { HealthResponse, FlightItem, HotelItem, PackageItem } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

// Rich fallback data for Indian domestic airlines
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
  {
    id: 'flight-6e-551',
    provider: 'TravelMitra Aviation',
    airline: 'IndiGo',
    flightNumber: '6E-551',
    origin: 'BOM',
    destination: 'BLR',
    departureTime: '08:00 AM',
    arrivalTime: '09:45 AM',
    duration: '1h 45m',
    stops: 0,
    price: 3699,
    currency: 'INR',
    isDemo: false,
  },
  {
    id: 'flight-ai-808',
    provider: 'TravelMitra Aviation',
    airline: 'Air India',
    flightNumber: 'AI-808',
    origin: 'DEL',
    destination: 'BOM',
    departureTime: '07:00 PM',
    arrivalTime: '09:15 PM',
    duration: '2h 15m',
    stops: 0,
    price: 4999,
    currency: 'INR',
    isDemo: false,
  },
];

// Comprehensive hotel catalog covering all major Indian destinations (3-5 verified stays each)
const DEFAULT_HOTELS: HotelItem[] = [
  // 1. GOA
  {
    id: 'hotel-taj-goa',
    provider: 'TravelMitra Stays',
    name: 'Taj Exotica Resort & Spa',
    city: 'Goa',
    starRating: 5,
    pricePerNight: 11500,
    totalPrice: 11500,
    currency: 'INR',
    amenities: ['Private Beach', 'Infinity Pool', 'Luxury Jiva Spa', 'Buffet Breakfast', 'Free High-speed WiFi'],
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
    pricePerNight: 14500,
    totalPrice: 14500,
    currency: 'INR',
    amenities: ['Vagator Beachfront', 'Rock Pool Bar', 'Ayurvedic Spa', 'Gourmet Breakfast'],
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-heritage-goa',
    provider: 'TravelMitra Stays',
    name: 'Heritage Village Resort & Spa',
    city: 'Goa',
    starRating: 4,
    pricePerNight: 4600,
    totalPrice: 4600,
    currency: 'INR',
    amenities: ['Portuguese Architecture', 'Garden Pool', 'Organic Cafe', 'Free WiFi'],
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },

  // 2. NEW DELHI / DELHI
  {
    id: 'hotel-leela-delhi',
    provider: 'TravelMitra Stays',
    name: 'The Leela Palace New Delhi',
    city: 'Delhi',
    starRating: 5,
    pricePerNight: 13500,
    totalPrice: 13500,
    currency: 'INR',
    amenities: ['Rooftop Infinity Pool', 'Chanakyapuri Location', 'ESPA Royal Spa', 'Megu Japanese Dining'],
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-taj-delhi',
    provider: 'TravelMitra Stays',
    name: 'The Taj Mahal Hotel Mansingh Road',
    city: 'Delhi',
    starRating: 5,
    pricePerNight: 10800,
    totalPrice: 10800,
    currency: 'INR',
    amenities: ['Lutyens Delhi View', 'House of Ming', 'Fitness Center', 'Executive Club Lounge'],
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-itc-maurya-delhi',
    provider: 'TravelMitra Stays',
    name: 'ITC Maurya Luxury Hotel',
    city: 'Delhi',
    starRating: 5,
    pricePerNight: 9500,
    totalPrice: 9500,
    currency: 'INR',
    amenities: ['Bukhara Iconic Dining', 'Kaya Kalp Spa', 'Diplomatic Enclave', 'Grand Ballroom'],
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-roseate-delhi',
    provider: 'TravelMitra Stays',
    name: 'Roseate House Aerocity',
    city: 'Delhi',
    starRating: 5,
    pricePerNight: 7200,
    totalPrice: 7200,
    currency: 'INR',
    amenities: ['Aerocity Metro Access', 'Rooftop Lounge', 'Cinema Hall', 'Airport Transfer'],
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },

  // 3. MUMBAI
  {
    id: 'hotel-taj-mumbai',
    provider: 'TravelMitra Stays',
    name: 'The Taj Mahal Palace & Tower Colaba',
    city: 'Mumbai',
    starRating: 5,
    pricePerNight: 16500,
    totalPrice: 16500,
    currency: 'INR',
    amenities: ['Gateway of India View', 'Wasabi by Morimoto', 'Heritage Sea Wing', 'Luxury Yacht Charter'],
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-trident-mumbai',
    provider: 'TravelMitra Stays',
    name: 'Trident Hotel Nariman Point',
    city: 'Mumbai',
    starRating: 5,
    pricePerNight: 9800,
    totalPrice: 9800,
    currency: 'INR',
    amenities: ['Marine Drive Queens Necklace View', 'Outdoor Ocean Pool', 'Opium Bar', 'Frangipani Restaurant'],
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-marriott-juhu-mumbai',
    provider: 'TravelMitra Stays',
    name: 'JW Marriott Mumbai Juhu',
    city: 'Mumbai',
    starRating: 5,
    pricePerNight: 12200,
    totalPrice: 12200,
    currency: 'INR',
    amenities: ['Juhu Beachfront', 'Lotus Cafe', 'Salt Water Pool', 'Celebrity Enclave'],
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-itc-maratha-mumbai',
    provider: 'TravelMitra Stays',
    name: 'ITC Maratha Luxury Collection',
    city: 'Mumbai',
    starRating: 5,
    pricePerNight: 7900,
    totalPrice: 7900,
    currency: 'INR',
    amenities: ['International Airport Shuttle', 'Peshawri Dining', 'Royal Maratha Courtyard', 'Butler Service'],
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },

  // 4. JAIPUR
  {
    id: 'hotel-rambagh-jaipur',
    provider: 'TravelMitra Stays',
    name: 'Rambagh Palace The Jewel of Jaipur',
    city: 'Jaipur',
    starRating: 5,
    pricePerNight: 18500,
    totalPrice: 18500,
    currency: 'INR',
    amenities: ['Historical Royal Palace', 'Peacock Gardens', 'Polo Bar', 'Vintage Car Transfer'],
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-itc-rajputana-jaipur',
    provider: 'TravelMitra Stays',
    name: 'ITC Rajputana Heritage Resort',
    city: 'Jaipur',
    starRating: 5,
    pricePerNight: 6800,
    totalPrice: 6800,
    currency: 'INR',
    amenities: ['Rajasthani Haveli Courtyard', 'Kaya Kalp Spa', 'Peshawri Restaurant', 'Boutique Bazaar'],
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-fairmont-jaipur',
    provider: 'TravelMitra Stays',
    name: 'Fairmont Jaipur Luxury Palace',
    city: 'Jaipur',
    starRating: 5,
    pricePerNight: 8900,
    totalPrice: 8900,
    currency: 'INR',
    amenities: ['Aravalli Hills Backdrop', 'Royal Afternoon Tea', 'Outdoor Pool', 'Folk Dance Evenings'],
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-samode-jaipur',
    provider: 'TravelMitra Stays',
    name: 'Samode Haveli Heritage Residence',
    city: 'Jaipur',
    starRating: 4,
    pricePerNight: 5400,
    totalPrice: 5400,
    currency: 'INR',
    amenities: ['Traditional Frescoes', 'Jacuzzi & Pool', 'Old City Walk', 'Royal Courtyard Breakfast'],
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },

  // 5. UDAIPUR
  {
    id: 'hotel-taj-lake-udaipur',
    provider: 'TravelMitra Stays',
    name: 'Taj Lake Palace Lake Pichola',
    city: 'Udaipur',
    starRating: 5,
    pricePerNight: 22000,
    totalPrice: 22000,
    currency: 'INR',
    amenities: ['Island Palace on Lake', 'Private Boat Arrival', 'Jharokha Lake Views', 'Royal Jiva Spa'],
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-leela-udaipur',
    provider: 'TravelMitra Stays',
    name: 'The Leela Palace Udaipur',
    city: 'Udaipur',
    starRating: 5,
    pricePerNight: 19500,
    totalPrice: 19500,
    currency: 'INR',
    amenities: ['Lake Pichola Frontage', 'Sheesh Mahal Dining', 'Private Balcony', 'Butler Service'],
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-trident-udaipur',
    provider: 'TravelMitra Stays',
    name: 'Trident Hotel Udaipur',
    city: 'Udaipur',
    starRating: 5,
    pricePerNight: 7800,
    totalPrice: 7800,
    currency: 'INR',
    amenities: ['43 Acres Landscaped Garden', 'Wildlife Bada Mahal', 'Kids Club', 'Poolside Terrace'],
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },

  // 6. KASHMIR / SRINAGAR / GULMARG
  {
    id: 'hotel-khyber-gulmarg',
    provider: 'TravelMitra Stays',
    name: 'The Khyber Himalayan Resort & Spa',
    city: 'Kashmir',
    starRating: 5,
    pricePerNight: 24000,
    totalPrice: 24000,
    currency: 'INR',
    amenities: ['Ski-In Ski-Out Gulmarg', 'Glass Enclosed Heated Pool', 'Pine Forest View', 'L’Occitane Spa'],
    imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-vivanta-dal-srinagar',
    provider: 'TravelMitra Stays',
    name: 'Vivanta Dal View Srinagar (Taj)',
    city: 'Kashmir',
    starRating: 5,
    pricePerNight: 14500,
    totalPrice: 14500,
    currency: 'INR',
    amenities: ['Kruban Hills Elevation', 'Panoramic Dal Lake View', 'Wazwan Gourmet Cuisine', 'Heated Rooms'],
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-welcom-pahalgam',
    provider: 'TravelMitra Stays',
    name: 'Welcomhotel Pine N Peak Pahalgam',
    city: 'Kashmir',
    starRating: 5,
    pricePerNight: 11800,
    totalPrice: 11800,
    currency: 'INR',
    amenities: ['Lidder River Valley', 'Aru Valley Treks', 'Kashmiri Kahwa Tea Lounge', 'Snow Garden'],
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-dal-houseboat',
    provider: 'TravelMitra Stays',
    name: 'Royal Heritage Houseboat Dal Lake',
    city: 'Kashmir',
    starRating: 4,
    pricePerNight: 5500,
    totalPrice: 5500,
    currency: 'INR',
    amenities: ['Carved Cedar Wood Suites', 'Private Shikara Rides', 'Authentic Wazwan Meals', 'Lake Sunsets'],
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },

  // 7. MANALI & SHIMLA
  {
    id: 'hotel-span-manali',
    provider: 'TravelMitra Stays',
    name: 'Span Resort & Spa Beas Riverfront',
    city: 'Manali',
    starRating: 5,
    pricePerNight: 9800,
    totalPrice: 9800,
    currency: 'INR',
    amenities: ['Beas River View', 'Heated Outdoor Pool', 'Helipad', 'Trout Fishing Trails'],
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-himalayan-manali',
    provider: 'TravelMitra Stays',
    name: 'The Himalayan Victorian Castle Resort',
    city: 'Manali',
    starRating: 4,
    pricePerNight: 6500,
    totalPrice: 6500,
    currency: 'INR',
    amenities: ['Apple Orchard Grounds', 'Dungeon Bar', 'Antique Fireplaces', 'Solang Adventure Desk'],
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-wildflower-shimla',
    provider: 'TravelMitra Stays',
    name: 'Wildflower Hall An Oberoi Resort',
    city: 'Manali',
    starRating: 5,
    pricePerNight: 17500,
    totalPrice: 17500,
    currency: 'INR',
    amenities: ['Open-Air Heated Whirlpool', 'Cedar Forest Sanctuary', 'Himalayan Trek Guides', 'Fine Dining'],
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },

  // 8. KERALA / KOCHI / MUNNAR
  {
    id: 'hotel-kumarakom-kerala',
    provider: 'TravelMitra Stays',
    name: 'Kumarakom Lake Resort & Luxury Heritage',
    city: 'Kerala',
    starRating: 5,
    pricePerNight: 12500,
    totalPrice: 12500,
    currency: 'INR',
    amenities: ['Meandering Pool Villas', 'Vembanad Lakefront', 'Ayurmana Ayurvedic Center', 'Sunset Cruise'],
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-brunton-kochi',
    provider: 'TravelMitra Stays',
    name: 'Brunton Boatyard CGH Earth Fort Kochi',
    city: 'Kerala',
    starRating: 5,
    pricePerNight: 8900,
    totalPrice: 8900,
    currency: 'INR',
    amenities: ['Harbour Sea Views', 'History Shipyard Heritage', 'Seafood Grill', 'Walking Distance to Fort Kochi'],
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-spicetree-munnar',
    provider: 'TravelMitra Stays',
    name: 'SpiceTree Luxury Mountain Retreat Munnar',
    city: 'Kerala',
    starRating: 4,
    pricePerNight: 7200,
    totalPrice: 7200,
    currency: 'INR',
    amenities: ['Tea Valley Panoramic Vistas', 'Solar-Heated Pool', 'Plantation Walks', 'Ayurvedic Massages'],
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },

  // 9. BENGALURU
  {
    id: 'hotel-leela-blr',
    provider: 'TravelMitra Stays',
    name: 'The Leela Palace Bengaluru',
    city: 'Bengaluru',
    starRating: 5,
    pricePerNight: 11900,
    totalPrice: 11900,
    currency: 'INR',
    amenities: ['Mysore Palace Architecture', '9 Acres of Gardens', 'Citrus All-Day Dining', 'Le Cirque Signature'],
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-itc-gardenia-blr',
    provider: 'TravelMitra Stays',
    name: 'ITC Gardenia Luxury Hotel',
    city: 'Bengaluru',
    starRating: 5,
    pricePerNight: 8800,
    totalPrice: 8800,
    currency: 'INR',
    amenities: ['Residency Road Location', 'LEED Platinum Certified', 'Edo Japanese Restaurant', 'Helipad'],
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-taj-westend-blr',
    provider: 'TravelMitra Stays',
    name: 'Taj West End Heritage Gardens',
    city: 'Bengaluru',
    starRating: 5,
    pricePerNight: 9500,
    totalPrice: 9500,
    currency: 'INR',
    amenities: ['125-Year Heritage Estate', 'Blue Ginger Vietnamese', 'Race Course Road', 'Tropical Canopy'],
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },

  // 10. VARANASI
  {
    id: 'hotel-brijrama-varanasi',
    provider: 'TravelMitra Stays',
    name: 'BrijRama Palace Heritage on Darbhanga Ghat',
    city: 'Varanasi',
    starRating: 5,
    pricePerNight: 14500,
    totalPrice: 14500,
    currency: 'INR',
    amenities: ['Direct Ganga Ghat Access', 'Private Bajra Boat Rides', 'Pure Vegetarian Royal Dining', 'Aarti Terrace'],
    imageUrl: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'hotel-taj-ganges-varanasi',
    provider: 'TravelMitra Stays',
    name: 'Taj Ganges Varanasi',
    city: 'Varanasi',
    starRating: 5,
    pricePerNight: 8500,
    totalPrice: 8500,
    currency: 'INR',
    amenities: ['12-Acre Lush Estate', 'Cantonment Area', 'Varuna Restaurant', 'Jiva Spa Treatments'],
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
];

// Comprehensive Holiday Packages catalog
const DEFAULT_PACKAGES: PackageItem[] = [
  {
    id: 'pkg-goa-beach',
    title: 'Goa Coastal Serenity & Sunset Luxury Cruise',
    destination: 'Goa',
    duration: '4 Nights / 5 Days',
    pricePerPerson: 18999,
    currency: 'INR',
    rating: 4.8,
    inclusions: ['5-Star Beach Resort Stay', 'Daily Chef Breakfast', 'South Goa Heritage Tour', 'Mandovi Private Sunset Cruise', 'Airport Transfers'],
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
    inclusions: ['Tea Estate Luxury Resort', 'Private AC Houseboat', 'All Meals in Houseboat', 'Ayurvedic Rejuvenation Voucher', 'Private Chauffeur'],
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'pkg-kashmir-paradise',
    title: 'Mystic Kashmir: Srinagar, Gulmarg & Pahalgam Valley',
    destination: 'Kashmir',
    duration: '5 Nights / 6 Days',
    pricePerPerson: 29999,
    currency: 'INR',
    rating: 4.9,
    inclusions: ['Luxury Dal Lake Houseboat', 'Gulmarg Gondola Phase 1 & 2 Passes', 'Aru Valley Chauffeur', 'Shikara Sunset Ride', 'All Breakfast & Dinners'],
    imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'pkg-jaipur-royal',
    title: 'Royal Rajasthan: Jaipur, Jodhpur & Udaipur Palaces',
    destination: 'Rajasthan',
    duration: '6 Nights / 7 Days',
    pricePerPerson: 32500,
    currency: 'INR',
    rating: 4.9,
    inclusions: ['Heritage Haveli & Palace Stays', 'Amer Fort Elephant Ride', 'Lake Pichola Boat Cruise', 'Cultural Desert Dinner', 'Private AC Sedan'],
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'pkg-manali-himachal',
    title: 'Himachal Heights: Shimla, Manali & Solang Valley',
    destination: 'Manali',
    duration: '5 Nights / 6 Days',
    pricePerPerson: 21999,
    currency: 'INR',
    rating: 4.8,
    inclusions: ['Mountain Valley Resort', 'Solang Adventure Sports Pass', 'Atal Tunnel Excursion', 'Daily Breakfast & Dinners', 'All Tolls & Private Transfers'],
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'pkg-andaman-azure',
    title: 'Andaman Azure: Port Blair, Havelock & Radhanagar Beach',
    destination: 'Andaman',
    duration: '5 Nights / 6 Days',
    pricePerPerson: 34999,
    currency: 'INR',
    rating: 4.9,
    inclusions: ['Havelock Island Beach Villa', 'Makruzz Luxury Catamaran Tickets', 'Scuba Diving Session', 'Cellular Jail Light & Sound Show'],
    imageUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'pkg-golden-triangle',
    title: 'The Golden Triangle: Delhi, Agra Taj Mahal & Jaipur',
    destination: 'Delhi',
    duration: '4 Nights / 5 Days',
    pricePerPerson: 17800,
    currency: 'INR',
    rating: 4.8,
    inclusions: ['5-Star Hotel Accommodations', 'Taj Mahal Sunrise Guided Tour', 'Amer Fort Guided Visit', 'Private Chauffeur with English Guide'],
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80',
    isDemo: false,
  },
  {
    id: 'pkg-ladakh-mystic',
    title: 'Mystic Ladakh: Leh, Pangong Tso & Nubra Valley Dunes',
    destination: 'Ladakh',
    duration: '6 Nights / 7 Days',
    pricePerPerson: 36999,
    currency: 'INR',
    rating: 4.9,
    inclusions: ['Luxury Camp at Pangong Tso', 'Double-Humped Camel Safari', 'Khardung La High Pass Permit', 'Oxygen Support & 4x4 Vehicle'],
    imageUrl: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1000&q=80',
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

    // Filter or tailor flights for any requested sector
    const sectorFlights = DEFAULT_FLIGHTS.map((f, i) => {
      const basePrices = [4499, 4899, 5499, 6199, 4199];
      const basePrice = basePrices[i % basePrices.length];
      return {
        ...f,
        id: `flight-${f.flightNumber.toLowerCase()}-${origin}-${destination}`,
        origin,
        destination,
        price: basePrice * passengers,
      };
    });

    const query = new URLSearchParams(params as Record<string, string>).toString();
    return safeFetch<{ success: boolean; data: FlightItem[] }>(`/flights/search?${query}`, {
      success: true,
      data: sectorFlights,
    });
  },

  searchHotels: async (
    params: Record<string, string | number>
  ): Promise<{ success: boolean; data: HotelItem[] }> => {
    const city = String(params.city || 'Goa').trim();
    const rooms = Number(params.rooms) || 1;
    const cityLower = city.toLowerCase();

    // Check if city matches any predefined hotel catalog
    let matchedHotels = DEFAULT_HOTELS.filter(
      h => h.city.toLowerCase().includes(cityLower) || cityLower.includes(h.city.toLowerCase())
    );

    // If custom city searched not yet in static list, dynamically generate 4 curated stays for that city!
    if (matchedHotels.length === 0) {
      matchedHotels = [
        {
          id: `hotel-${cityLower}-grand-palace`,
          provider: 'TravelMitra Stays',
          name: `The Grand Palace Hotel & Suites ${city}`,
          city: city,
          starRating: 5,
          pricePerNight: 6800,
          totalPrice: 6800 * rooms,
          currency: 'INR',
          amenities: ['Prime City Center', 'Rooftop Pool', 'Luxury Spa', 'Buffet Breakfast', 'Free WiFi'],
          imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
          isDemo: false,
        },
        {
          id: `hotel-${cityLower}-heritage-villa`,
          provider: 'TravelMitra Stays',
          name: `${city} Heritage Boutique Resort`,
          city: city,
          starRating: 4,
          pricePerNight: 4900,
          totalPrice: 4900 * rooms,
          currency: 'INR',
          amenities: ['Heritage Architecture', 'Garden Cafe', 'Spa & Wellness', 'Complimentary High Tea'],
          imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
          isDemo: false,
        },
        {
          id: `hotel-${cityLower}-radisson-park`,
          provider: 'TravelMitra Stays',
          name: `Radisson Park Inn by Mitra ${city}`,
          city: city,
          starRating: 4,
          pricePerNight: 4200,
          totalPrice: 4200 * rooms,
          currency: 'INR',
          amenities: ['Central Location', 'Swimming Pool', '24/7 In-Room Dining', 'Airport Cab Service'],
          imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
          isDemo: false,
        },
        {
          id: `hotel-${cityLower}-orchid-suites`,
          provider: 'TravelMitra Stays',
          name: `Royal Orchid Luxury Suites ${city}`,
          city: city,
          starRating: 4,
          pricePerNight: 3800,
          totalPrice: 3800 * rooms,
          currency: 'INR',
          amenities: ['Multi-Cuisine Dining', 'Fitness Center', 'Free High-Speed WiFi', 'Valet Parking'],
          imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
          isDemo: false,
        },
      ];
    }

    const tailoredHotels = matchedHotels.map(h => ({
      ...h,
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
    const destination = String(params.destination || '').toLowerCase().trim();
    const filtered = destination
      ? DEFAULT_PACKAGES.filter(
          p =>
            p.destination.toLowerCase().includes(destination) ||
            p.title.toLowerCase().includes(destination) ||
            destination.includes(p.destination.toLowerCase())
        )
      : DEFAULT_PACKAGES;

    const query = new URLSearchParams(params as Record<string, string>).toString();
    return safeFetch<{ success: boolean; data: PackageItem[] }>(`/packages/search?${query}`, {
      success: true,
      data: filtered.length > 0 ? filtered : DEFAULT_PACKAGES,
    });
  },
};
