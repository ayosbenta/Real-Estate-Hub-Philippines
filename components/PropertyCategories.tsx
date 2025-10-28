
import React from 'react';
import { CATEGORIES } from '../constants';

const PropertyCategories: React.FC = () => {
  return (
    <section className="py-20 bg-light-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Explore by Category</h2>
          <p className="text-gray-600 mt-2">Find the property that fits your needs.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {CATEGORIES.map(category => (
            <div key={category.name} className="group bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              {category.icon}
              <h3 className="mt-4 font-semibold text-primary">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyCategories;
