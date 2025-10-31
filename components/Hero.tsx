
import React from 'react';
import { SearchIcon } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-[85vh] min-h-[600px] bg-cover bg-center flex items-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1596649511420-54f85e09b9f7?q=80&w=1920&auto=format&fit=crop')` }}>
      <div className="absolute inset-0 bg-primary bg-opacity-70"></div>
      <div className="container mx-auto px-6 text-center z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          Your Dream Home in the Philippines Awaits
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Discover premier properties from the nation's top developers.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-2xl max-w-5xl mx-auto">
          <form className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-4 relative">
              <input type="text" placeholder="Location (e.g., Makati)" className="w-full p-4 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
            </div>
            <div className="md:col-span-2">
              <select className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-white">
                <option>Type</option>
                <option>Condominium</option>
                <option>House & Lot</option>
                <option>Lot Only</option>
              </select>
            </div>
             <div className="md:col-span-2">
              <select className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-white">
                <option>Listing</option>
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <select className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-white">
                <option>Budget</option>
                <option>Below ₱5M</option>
                <option>₱5M - ₱10M</option>
                <option>₱10M+</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="w-full p-4 bg-secondary text-white rounded-md font-bold text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105 flex items-center justify-center">
                <SearchIcon className="w-6 h-6 mr-2"/>
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;