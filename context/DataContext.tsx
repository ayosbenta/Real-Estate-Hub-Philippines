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

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [developers, setDevelopers] = useState<Developer[]>(DEVELOPERS);
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [benefits, setBenefits] = useState<Benefit[]>(BENEFITS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [services, setServices] = useState<Service[]>(SERVICES);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(CONTACT_INFO);

  useEffect(() => {
    const fetchData = async () => {
        console.log("Fetching all data from Supabase...");
        try {
            const [
                developersRes,
                propertiesRes,
                categoriesRes,
                benefitsRes,
                testimonialsRes,
                servicesRes,
                contactInfoRes
            ] = await Promise.all([
                supabase.from('developers').select('*').order('id'),
                supabase.from('properties').select('*').order('id'),
                supabase.from('categories').select('*').order('id'),
                supabase.from('benefits').select('*').order('id'),
                supabase.from('testimonials').select('*').order('id'),
                supabase.from('services').select('*').order('id'),
                supabase.from('contact_info').select('*').limit(1).single()
            ]);

            if (developersRes.data) setDevelopers(developersRes.data as Developer[]);
            if (propertiesRes.data) setProperties(propertiesRes.data);
            if (categoriesRes.data) setCategories(categoriesRes.data);
            if (benefitsRes.data) setBenefits(benefitsRes.data);
            if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
            if (servicesRes.data) setServices(servicesRes.data);
            if (contactInfoRes.data) setContactInfo(contactInfoRes.data);

        } catch (error) {
            console.error("Error fetching data from Supabase:", error);
            // Fallback to initial data if fetch fails
        }
    };

    fetchData();
  }, []);
  
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
