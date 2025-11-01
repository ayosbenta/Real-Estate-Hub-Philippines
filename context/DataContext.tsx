import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { supabase } from '../supabase/client';
import { DEVELOPERS, PROPERTIES, CATEGORIES, BENEFITS, TESTIMONIALS, SERVICES, CONTACT_INFO } from '../initialData';
import { Developer, Property, Category, Benefit, Testimonial, Service, ContactInfo } from '../types';

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

interface DataContextType {
  developers: Developer[];
  setDevelopers: Setter<Developer[]>;
  properties: Property[];
  setProperties: Setter<Property[]>;
  categories: Category[];
  setCategories: Setter<Category[]>;
  benefits: Benefit[];
  setBenefits: Setter<Benefit[]>;
  testimonials: Testimonial[];
  setTestimonials: Setter<Testimonial[]>;
  services: Service[];
  setServices: Setter<Service[]>;
  contactInfo: ContactInfo;
  setContactInfo: Setter<ContactInfo>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const useStickyState = <T,>(key: string, initialData: T): [T, Setter<T>] => {
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialData;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return initialData;
    }
  });

  // Fix: The try-catch block had a syntax error. The catch clause must be followed by a block statement enclosed in curly braces {}.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
};


export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [developers, setDevelopers] = useStickyState<Developer[]>('data_developers', DEVELOPERS);
  const [properties, setProperties] = useStickyState<Property[]>('data_properties', PROPERTIES);
  const [categories, setCategories] = useStickyState<Category[]>('data_categories', CATEGORIES);
  const [benefits, setBenefits] = useStickyState<Benefit[]>('data_benefits', BENEFITS);
  const [testimonials, setTestimonials] = useStickyState<Testimonial[]>('data_testimonials', TESTIMONIALS);
  const [services, setServices] = useStickyState<Service[]>('data_services', SERVICES);
  const [contactInfo, setContactInfo] = useStickyState<ContactInfo>('data_contactInfo', CONTACT_INFO);
  
  const value = {
    developers, setDevelopers,
    properties, setProperties,
    categories, setCategories,
    benefits, setBenefits,
    testimonials, setTestimonials,
    services, setServices,
    contactInfo, setContactInfo,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
