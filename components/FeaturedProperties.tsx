
import React, { useState, useMemo } from 'react';
import { PROPERTIES } from '../constants';
import { Property } from '../types';
import { MapPinIcon } from '../constants';

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
      <div className="relative">
        <img src={property.imageUrl} alt={property.title} className="w-full h-56 object-cover" />
        <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 text-sm font-semibold rounded-full">{property.listingType}</div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-2 truncate">{property.title}</h3>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPinIcon className="w-5 h-5 mr-2 text-gray-400" />
          <span>{property.location}</span>
        </div>
        <p className="text-2xl font-extrabold text-primary mb-4">
          ₱{property.price.toLocaleString()}
          {property.listingType === 'For Rent' && <span className="text-base font-normal text-gray-500">/mo</span>}
        </p>
        <div className="flex justify-between text-sm text-gray-500 border-t pt-4">
          <span>{property.bedrooms} beds</span>
          <span>{property.bathrooms} baths</span>
          <span>{property.sqm} sqm</span>
        </div>
        <button className="mt-6 w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

const FeaturedProperties: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('price_asc');

  const filteredProperties = useMemo(() => {
    let properties = [...PROPERTIES];
    if (filter !== 'All') {
      properties = properties.filter(p => p.listingType === filter);
    }
    properties.sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      return 0;
    });
    return properties;
  }, [filter, sort]);

  return (
    <section id="properties" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Top Featured Properties</h2>
          <p className="text-gray-600 mt-2">Handpicked properties you might be interested in.</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
          <div className="flex space-x-2 bg-gray-100 p-2 rounded-full">
            <button onClick={() => setFilter('All')} className={`px-6 py-2 rounded-full font-medium ${filter === 'All' ? 'bg-secondary text-white' : 'text-gray-600'}`}>All</button>
            <button onClick={() => setFilter('For Sale')} className={`px-6 py-2 rounded-full font-medium ${filter === 'For Sale' ? 'bg-secondary text-white' : 'text-gray-600'}`}>For Sale</button>
            <button onClick={() => setFilter('For Rent')} className={`px-6 py-2 rounded-full font-medium ${filter === 'For Rent' ? 'bg-secondary text-white' : 'text-gray-600'}`}>For Rent</button>
          </div>
          <div className="relative">
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-gray-100 p-2 pl-4 pr-8 rounded-full font-medium text-gray-600 focus:outline-none"
            >
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProperties.map(prop => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
