
import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { StarIcon } from '../constants';

const Testimonials: React.FC = () => {
  const { testimonials } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) {
    return null; // Or a placeholder
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">What Our Clients Say</h2>
          <p className="text-gray-600 mt-2">Their success stories are our greatest achievements.</p>
        </div>

        <div className="max-w-3xl mx-auto bg-light-gray p-8 rounded-xl shadow-lg relative overflow-hidden min-h-[280px]">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 text-secondary opacity-10">
            <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003 15v4a1 1 0 001 1h12a1 1 0 001-1v-4a1 1 0 00-.293-.707L16 11.586V8a6 6 0 00-6-6zM5 15h10v3H5v-3zM8 8a2 2 0 114 0v3H8V8z"></path></svg>
          </div>
          {currentTestimonial && (
            <div className="relative">
              <p className="text-xl italic text-primary mb-6">"{currentTestimonial.quote}"</p>
              <div className="flex items-center">
                <img src={currentTestimonial.clientImage} alt={currentTestimonial.clientName} className="w-16 h-16 rounded-full mr-4 border-4 border-secondary"/>
                <div>
                  <p className="font-bold text-primary">{currentTestimonial.clientName}</p>
                  <p className="text-gray-500">{currentTestimonial.clientRole}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={`w-5 h-5 ${i < currentTestimonial.rating ? 'text-secondary' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {testimonials.map((_, index) => (
                <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-secondary' : 'bg-gray-300'}`}></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
