
import React, { useState, useEffect } from 'react';
import { HomeIcon } from '../constants';
import { useRouter } from '../context/RouterContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { navigate } = useRouter();

  const navLinks = ['Home', 'Developers', 'Properties', 'Projects', 'Services', 'About', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-2xl font-bold">
              <HomeIcon className="w-8 h-8 mr-2 text-primary"/>
              <span className="text-secondary">i</span>
              <span className="text-primary">WantPH</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-gray-600 hover:text-secondary transition-colors font-medium">
                {link}
              </a>
            ))}
            <a href="#/admin" onClick={(e) => { e.preventDefault(); navigate('#/admin'); }} className="bg-secondary text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105">
              Login (admin)
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-primary focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-xl p-4">
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md" onClick={() => setIsOpen(false)}>
                {link}
              </a>
            ))}
             <a href="#/admin" onClick={(e) => { e.preventDefault(); navigate('#/admin'); setIsOpen(false); }} className="block text-center w-full mt-4 bg-secondary text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all">
              Login (admin)
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
