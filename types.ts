// Fix: Add React import for JSX.Element type
import React from 'react';

export interface Developer {
  id: number;
  name: string;
  logoUrl: string;
  badge?: 'Premium Developer' | 'Affordable Housing' | 'Most Trusted';
  projects: Project[];
}

export interface Project {
  id: number;
  name: string;
  imageUrl: string;
  location: string;
}

export interface Property {
  id: number;
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
}

export interface Category {
  name: 'House & Lot' | 'Condominium' | 'Lot Only' | 'Commercial Properties' | 'Townhouses' | 'Pre-selling / RFO';
  icon: JSX.Element;
}

export interface Benefit {
  icon: JSX.Element;
  title: string;
  description: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  clientName: string;
  clientRole: string;
  clientImage: string;
  rating: number;
}

export interface Service {
    icon: JSX.Element;
    title: string;
    description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}