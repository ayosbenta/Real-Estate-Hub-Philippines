import { Developer, Property, Category, Benefit, Testimonial, Service, ContactInfo } from './types';

export const DEVELOPERS: Developer[] = [
  { id: 1, name: 'Ayala Land', logoUrl: 'https://via.placeholder.com/150/1a2b4d/FFFFFF?text=Ayala', badge: 'Premium Developer', projects: [
      {id: 1, name: "Park Terraces", imageUrl: 'https://picsum.photos/400/300?random=11', location: "Makati"},
      {id: 2, name: "Anvaya Cove", imageUrl: 'https://picsum.photos/400/300?random=12', location: "Bataan"},
  ]},
  { id: 2, name: 'Megaworld', logoUrl: 'https://via.placeholder.com/150/1a2b4d/FFFFFF?text=Megaworld', badge: 'Most Trusted', projects: [
    {id: 3, name: "Eastwood City", imageUrl: 'https://picsum.photos/400/300?random=13', location: "Quezon City"},
    {id: 4, name: "McKinley Hill", imageUrl: 'https://picsum.photos/400/300?random=14', location: "Taguig"},
  ]},
  { id: 3, name: 'Camella Homes', logoUrl: 'https://via.placeholder.com/150/1a2b4d/FFFFFF?text=Camella', badge: 'Affordable Housing', projects: [
    {id: 5, name: "Camella Provence", imageUrl: 'https://picsum.photos/400/300?random=15', location: "Bulacan"},
    {id: 6, name: "Camella Savannah", imageUrl: 'https://picsum.photos/400/300?random=16', location: "Iloilo"},
  ]},
  { id: 4, name: 'SMDC', logoUrl: 'https://via.placeholder.com/150/1a2b4d/FFFFFF?text=SMDC', badge: 'Premium Developer', projects: [
    {id: 7, name: "Shore Residences", imageUrl: 'https://picsum.photos/400/300?random=17', location: "Pasay"},
    {id: 8, name: "Air Residences", imageUrl: 'https://picsum.photos/400/300?random=18', location: "Makati"},
  ]},
  { id: 5, name: 'DMCI Homes', logoUrl: 'https://via.placeholder.com/150/1a2b4d/FFFFFF?text=DMCI', badge: 'Most Trusted', projects: []},
  { id: 6, name: 'Filinvest', logoUrl: 'https://via.placeholder.com/150/1a2b4d/FFFFFF?text=Filinvest', badge: 'Affordable Housing', projects: []},
];

export const PROPERTIES: Property[] = [
  { id: 1, title: 'Luxury Condo in BGC', price: 15000000, location: 'Taguig', type: 'Condominium', status: 'Ready for Occupancy', listingType: 'For Sale', imageUrl: 'https://picsum.photos/400/300?random=1', sqm: 85, bedrooms: 2, bathrooms: 2, developerId: 1, description: 'A stunning 2-bedroom condominium in the heart of Bonifacio Global City. Features world-class amenities and breathtaking city views. Perfect for young professionals and families.' },
  { id: 2, title: 'Spacious House in Quezon City', price: 25000000, location: 'Quezon City', type: 'House & Lot', status: 'Ready for Occupancy', listingType: 'For Sale', imageUrl: 'https://picsum.photos/400/300?random=2', sqm: 300, bedrooms: 4, bathrooms: 3, developerId: 2, description: 'An elegant and spacious 4-bedroom house located in a private, secure village in Quezon City. Includes a lush garden, a modern kitchen, and a two-car garage.' },
  { id: 3, title: 'Beachfront Lot in Batangas', price: 8000000, location: 'Batangas', type: 'Lot Only', status: 'Ready for Occupancy', listingType: 'For Sale', imageUrl: 'https://picsum.photos/400/300?random=3', sqm: 500, bedrooms: 0, bathrooms: 0, developerId: 3, description: 'A prime 500-sqm beachfront lot in a prestigious Batangas resort community. Build your dream vacation home with direct access to the sea and exclusive club amenities.' },
  { id: 4, title: 'Modern Townhouse in Mandaluyong', price: 12000000, location: 'Mandaluyong', type: 'Townhouse', status: 'Pre-selling', listingType: 'For Sale', imageUrl: 'https://picsum.photos/400/300?random=4', sqm: 120, bedrooms: 3, bathrooms: 3, developerId: 4, description: 'A stylish 3-bedroom townhouse in a central Mandaluyong location. Offers convenience and modern living, close to major business districts, malls, and schools.' },
  { id: 5, title: 'Commercial Space in Makati CBD', price: 200000, location: 'Makati', type: 'Commercial', status: 'Ready for Occupancy', listingType: 'For Rent', imageUrl: 'https://picsum.photos/400/300?random=5', sqm: 150, bedrooms: 0, bathrooms: 1, developerId: 1, description: 'A high-visibility commercial space on the ground floor of a major office building in Makati CBD. Ideal for banks, showrooms, or high-end retail stores.' },
  { id: 6, title: 'Affordable Condo near University', price: 35000, location: 'Manila', type: 'Condominium', status: 'Ready for Occupancy', listingType: 'For Rent', imageUrl: 'https://picsum.photos/400/300?random=6', sqm: 30, bedrooms: 1, bathrooms: 1, developerId: 4, description: 'A fully-furnished 1-bedroom condo unit perfect for students and faculty. Located just a short walk from major universities, with amenities like a study hall and fitness center.' },
  { id: 7, title: 'Pre-selling House in Cavite', price: 5500000, location: 'Cavite', type: 'House & Lot', status: 'Pre-selling', listingType: 'For Sale', imageUrl: 'https://picsum.photos/400/300?random=7', sqm: 150, bedrooms: 3, bathrooms: 2, developerId: 3, description: 'A beautiful family home in a growing Cavite community. Take advantage of pre-selling prices and flexible payment terms. Features complete amenities and 24/7 security.' },
  { id: 8, title: 'High-rise Condo with a View', price: 18000000, location: 'Cebu City', type: 'Condominium', status: 'Ready for Occupancy', listingType: 'For Sale', imageUrl: 'https://picsum.photos/400/300?random=8', sqm: 110, bedrooms: 3, bathrooms: 2, developerId: 2, description: 'A premium 3-bedroom condo on a high floor, offering panoramic views of Cebu City and the sea. Located in a premier mixed-use development with direct mall access.' },
];

export const CATEGORIES: Category[] = [
    { id: 1, name: 'House & Lot', icon: 'HomeIcon' },
    { id: 2, name: 'Condominium', icon: 'BuildingIcon' },
    { id: 3, name: 'Lot Only', icon: 'MapPinIcon' },
    { id: 4, name: 'Commercial Properties', icon: 'StoreIcon' },
    { id: 5, name: 'Townhouses', icon: 'CollectionIcon' },
    { id: 6, name: 'Pre-selling / RFO', icon: 'ClockIcon' },
];

export const BENEFITS: Benefit[] = [
    { id: 1, icon: 'BenefitCheckIcon', title: 'Licensed Agents', description: 'Work with our network of PRC-licensed real estate professionals.' },
    { id: 2, icon: 'MapPinIcon', title: 'Wide Selection', description: 'Access thousands of properties from top developers nationwide.' },
    { id: 3, icon: 'BenefitDealIcon', title: 'Best Deals & Promos', description: 'Get exclusive access to the latest promos and best market prices.' },
    { id: 4, icon: 'BenefitThumbsUpIcon', title: 'Hassle-Free Buying', description: 'We guide you every step of the way, from viewing to turnover.' },
];

export const TESTIMONIALS: Testimonial[] = [
    { id: 1, quote: "The team at iWantPH made finding our first home a breeze. Their professionalism and dedication are unmatched. We couldn't be happier!", clientName: 'Juan Dela Cruz', clientRole: 'New Homeowner', clientImage: 'https://picsum.photos/100/100?random=21', rating: 5 },
    { id: 2, quote: "As an investor, I need quick and reliable information. This platform provided everything I needed, from market trends to the best deals. Highly recommended!", clientName: 'Maria Santos', clientRole: 'Property Investor', clientImage: 'https://picsum.photos/100/100?random=22', rating: 5 },
    { id: 3, quote: "Their selection of properties from different developers is fantastic. It's truly a one-stop-shop for anyone looking to buy property in the Philippines.", clientName: 'Robert Lim', clientRole: 'OFW Buyer', clientImage: 'https://picsum.photos/100/100?random=23', rating: 4 },
];

export const SERVICES: Service[] = [
    { id: 1, icon: 'ServiceBuyIcon', title: 'Buying Assistance', description: 'Expert guidance through the entire process of purchasing your dream property.' },
    { id: 2, icon: 'ServiceSellIcon', title: 'Selling & Listing', description: 'Maximize your property\'s visibility and get the best market price with our listing services.' },
    { id: 3, icon: 'ServiceFinanceIcon', title: 'Financial Assistance', description: 'We connect you with partner banks to streamline your home loan application.' },
    { id: 4, icon: 'ServiceInvestIcon', title: 'Investment Consulting', description: 'Discover high-yield real estate investment opportunities with our expert advisors.' },
];

export const CONTACT_INFO: ContactInfo = {
    id: 1,
    phone: '+63 917 123 4567',
    email: 'inquire@iwantph.com',
    address: '123 Ayala Avenue, Makati City, Philippines',
};