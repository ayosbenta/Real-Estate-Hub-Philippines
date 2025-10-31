
import React from 'react';
import { useData } from '../context/DataContext';

const FeaturedDevelopers: React.FC = () => {
  const { developers } = useData();

  return (
    <section id="developers" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Partner Developers</h2>
          <p className="text-gray-600 mt-2">Trusted names in the Philippine real estate industry.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {developers.map(dev => (
            <div key={dev.id} className="group text-center">
              <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center h-32 transition-transform transform group-hover:-translate-y-2">
                <img src={dev.logoUrl} alt={dev.name} className="max-h-16 grayscale group-hover:grayscale-0 transition-all duration-300" />
              </div>
              <p className="mt-4 font-semibold text-primary">{dev.name}</p>
              {dev.badge && <span className="text-xs bg-secondary text-white px-2 py-1 rounded-full mt-1 inline-block">{dev.badge}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDevelopers;
