import React from 'react';
import { useData } from '../context/DataContext';
import { Icon } from '../constants';

const PropertyCategories: React.FC = () => {
  const { categories } = useData();
  return (
    <section className="py-20 bg-light-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Explore by Category</h2>
          <p className="text-gray-600 mt-2">Find the property that fits your needs.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {categories.map(category => (
            <div key={category.name} className="group bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <Icon name={category.icon} className="w-12 h-12 text-primary group-hover:text-secondary transition-colors mx-auto" />
              <h3 className="mt-4 font-semibold text-primary">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyCategories;