// Fix: Use namespace import for React to ensure JSX types are available.
import * as React from 'react';

// New type for icon names to avoid serializing React elements
export type IconName = 
  | 'HomeIcon' 
  | 'BuildingIcon' 
  | 'MapPinIcon' 
  | 'StoreIcon' 
  | 'CollectionIcon' 
  | 'ClockIcon'
  | 'BenefitCheckIcon'
  | 'BenefitDealIcon'
  | 'BenefitThumbsUpIcon'
  | 'ServiceBuyIcon'
  | 'ServiceSellIcon'
  | 'ServiceFinanceIcon'
  | 'ServiceInvestIcon'
  | 'KeyIcon'
  | 'UsersIcon'
  | 'BriefcaseIcon'
  | 'DollarSignIcon';

export interface Developer {
  id: number;
  name: string;
  logoUrl: string;
  badge?: 'Premium Developer' | 'Affordable Housing' | 'Most Trusted' | '';
  projects: Project[];
}

export interface Project {
  id: number;
  name: string;
  imageUrl: string;
  location: string;
}

export interface Property {
  id?: number;
  title: string;
  price: number;
  location: string;
  type: 'House & Lot' | 'Condominium' | 'Lot Only' | 'Commercial' | 'Townhouse';
  status: 'Pre-selling' | 'Ready for Occupancy';
  listingType: 'For Sale' | 'For Rent';
  imageUrl: string;
  sqm: number;
  bedrooms: number;
  bathrooms: number;
  developerId: number;
  description?: string;
}

export interface Category {
  id?: number;
  name: 'House & Lot' | 'Condominium' | 'Lot Only' | 'Commercial Properties' | 'Townhouses' | 'Pre-selling / RFO';
  icon: IconName;
}

export interface Benefit {
  id?: number;
  icon: IconName;
  title: string;
  description: string;
}

export interface Testimonial {
  id?: number;
  quote: string;
  clientName: string;
  clientRole: string;
  clientImage: string;
  rating: number;
}

export interface Service {
    id?: number;
    icon: IconName;
    title: string;
    description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ContactInfo {
  id?: number;
  phone: string;
  email: string;
  address: string;
}