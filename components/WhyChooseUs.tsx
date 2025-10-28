
import React from 'react';
import { BENEFITS } from '../constants';

const WhyChooseUs: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
          <p className="text-gray-300 mt-2 max-w-2xl mx-auto">We provide a seamless and trustworthy experience for your real estate journey, backed by industry leaders and professional expertise.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {BENEFITS.map((benefit, index) => (
            <div key={index} className="text-center p-6 bg-white bg-opacity-10 rounded-lg">
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">{benefit.title}</h3>
              <p className="text-gray-200">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
