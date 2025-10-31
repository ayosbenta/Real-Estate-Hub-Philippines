import React from 'react';
import { useData } from '../context/DataContext';
import { Icon } from '../constants';

const Services: React.FC = () => {
    const { services } = useData();
    return (
        <section id="services" className="py-20 bg-light-gray">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Real Estate Services</h2>
                    <p className="text-gray-600 mt-2">Comprehensive support for all your property needs.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <div className="flex justify-center mb-4">
                                <Icon name={service.icon} className="h-10 w-10 text-secondary" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;