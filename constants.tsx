
import React from 'react';
import { Developer, Property, Category, Benefit, Testimonial, Service } from './types';

// SVG Icons
export const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

export const BuildingIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-8h1m-1 4h1m-1 4h1M5 7h1m-1 4h1m-1 4h1" />
  </svg>
);

export const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const StoreIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

export const CollectionIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

export const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const StarIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

export const SearchIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);


// Mock Data
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
  { id: 1, title: 'Luxury Condo in BGC', price: 15000000, location: 'Taguig', type: 'Condominium', status: 'Ready for Occupancy', listingType: 'For Sale', imageUrl: 'https://picsum.photos/400/300?random=1', sqm: 85, bedrooms: 2, bathrooms: 2, developerId: 1 },
  { id: 2, title: 'Spacious House in Quezon City', price: 25000000, location: 'Quezon City', type: 'House & Lot', status: 'Ready for Occupancy', listingType: 'For Sale', imageUrl: 'https://picsum.photos/400/300?random=2', sqm: 300, bedrooms: 4, bathrooms: 3, developerId: 2 },
  { id: 3, title: 'Beachfront Lot in Batangas', price: 8000000, location: 'Batangas', type: 'Lot Only', status: 'Ready for Occupancy', listingType: 'For Sale', imageUrl: 'https://picsum.photos/400/300?random=3', sqm: 500, bedrooms: 0, bathrooms: 0, developerId: 3 },
  { id: 4, title: 'Modern Townhouse in Mandaluyong', price: 12000000, location: 'Mandaluyong', type: 'Townhouse', status: 'Pre-selling', listingType: 'For Sale', imageUrl: 'https://picsum.photos/400/300?random=4', sqm: 120, bedrooms: 3, bathrooms: 3, developerId: 4 },
  { id: 5, title: 'Commercial Space in Makati CBD', price: 200000, location: 'Makati', type: 'Commercial', status: 'Ready for Occupancy', listingType: 'For Rent', imageUrl: 'https://picsum.photos/400/300?random=5', sqm: 150, bedrooms: 0, bathrooms: 1, developerId: 1 },
  { id: 6, title: 'Affordable Condo near University', price: 35000, location: 'Manila', type: 'Condominium', status: 'Ready for Occupancy', listingType: 'For Rent', imageUrl: 'https://picsum.photos/400/300?random=6', sqm: 30, bedrooms: 1, bathrooms: 1, developerId: 4 },
  { id: 7, title: 'Pre-selling House in Cavite', price: 5500000, location: 'Cavite', type: 'House & Lot', status: 'Pre-selling', listingType: 'For Sale', imageUrl: 'https://picsum.photos/400/300?random=7', sqm: 150, bedrooms: 3, bathrooms: 2, developerId: 3 },
  { id: 8, title: 'High-rise Condo with a View', price: 18000000, location: 'Cebu City', type: 'Condominium', status: 'Ready for Occupancy', listingType: 'For Sale', imageUrl: 'https://picsum.photos/400/300?random=8', sqm: 110, bedrooms: 3, bathrooms: 2, developerId: 2 },
];

export const CATEGORIES: Category[] = [
    { name: 'House & Lot', icon: <HomeIcon className="w-12 h-12 text-primary group-hover:text-secondary transition-colors" /> },
    { name: 'Condominium', icon: <BuildingIcon className="w-12 h-12 text-primary group-hover:text-secondary transition-colors" /> },
    { name: 'Lot Only', icon: <MapPinIcon className="w-12 h-12 text-primary group-hover:text-secondary transition-colors" /> },
    { name: 'Commercial Properties', icon: <StoreIcon className="w-12 h-12 text-primary group-hover:text-secondary transition-colors" /> },
    { name: 'Townhouses', icon: <CollectionIcon className="w-12 h-12 text-primary group-hover:text-secondary transition-colors" /> },
    { name: 'Pre-selling / RFO', icon: <ClockIcon className="w-12 h-12 text-primary group-hover:text-secondary transition-colors" /> },
];

export const BENEFITS: Benefit[] = [
    { icon: <svg className="w-12 h-12 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: 'Licensed Agents', description: 'Work with our network of PRC-licensed real estate professionals.' },
    { icon: <svg className="w-12 h-12 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>, title: 'Wide Selection', description: 'Access thousands of properties from top developers nationwide.' },
    { icon: <svg className="w-12 h-12 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>, title: 'Best Deals & Promos', description: 'Get exclusive access to the latest promos and best market prices.' },
    { icon: <svg className="w-12 h-12 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.93L5.5 8m7-3v5" /></svg>, title: 'Hassle-Free Buying', description: 'We guide you every step of the way, from viewing to turnover.' },
];

export const TESTIMONIALS: Testimonial[] = [
    { id: 1, quote: "The team at iWantPH made finding our first home a breeze. Their professionalism and dedication are unmatched. We couldn't be happier!", clientName: 'Juan Dela Cruz', clientRole: 'New Homeowner', clientImage: 'https://picsum.photos/100/100?random=21', rating: 5 },
    { id: 2, quote: "As an investor, I need quick and reliable information. This platform provided everything I needed, from market trends to the best deals. Highly recommended!", clientName: 'Maria Santos', clientRole: 'Property Investor', clientImage: 'https://picsum.photos/100/100?random=22', rating: 5 },
    { id: 3, quote: "Their selection of properties from different developers is fantastic. It's truly a one-stop-shop for anyone looking to buy property in the Philippines.", clientName: 'Robert Lim', clientRole: 'OFW Buyer', clientImage: 'https://picsum.photos/100/100?random=23', rating: 4 },
];

export const SERVICES: Service[] = [
    { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>, title: 'Buying Assistance', description: 'Expert guidance through the entire process of purchasing your dream property.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>, title: 'Selling & Listing', description: 'Maximize your property\'s visibility and get the best market price with our listing services.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, title: 'Financial Assistance', description: 'We connect you with partner banks to streamline your home loan application.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>, title: 'Investment Consulting', description: 'Discover high-yield real estate investment opportunities with our expert advisors.' },
];