
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-[80vh] min-h-[500px] bg-cover bg-center flex items-center" style={{ backgroundImage: `url('https://picsum.photos/1920/1080?grayscale&blur=2')` }}>
      <div className="absolute inset-0 bg-primary bg-opacity-60"></div>
      <div className="container mx-auto px-6 text-center z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          Find Your Dream Property
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Partnered with top developers across the Philippines
        </p>

        <div className="bg-white p-6 rounded-lg shadow-2xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div className="md:col-span-4 lg:col-span-1">
              <input type="text" placeholder="Location (e.g., Makati)" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-white">
                <option>Property Type</option>
                <option>Condominium</option>
                <option>House & Lot</option>
                <option>Lot Only</option>
              </select>
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-white">
                <option>Budget Range</option>
                <option>Below ₱5M</option>
                <option>₱5M - ₱10M</option>
                <option>₱10M+</option>
              </select>
            </div>
            <div className="md:col-span-4 lg:col-span-1 grid grid-cols-2 gap-2">
              <button className="w-full p-3 bg-gray-100 text-primary rounded-md font-semibold hover:bg-gray-200">Rent</button>
              <button className="w-full p-3 bg-gray-100 text-primary rounded-md font-semibold hover:bg-gray-200">Sale</button>
            </div>
             <div className="md:col-span-4 lg:col-span-1">
               <button className="w-full p-3 bg-secondary text-white rounded-md font-bold text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
