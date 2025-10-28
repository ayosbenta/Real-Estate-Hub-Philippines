
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Real Estate Hub</h3>
            <p className="text-sm">Your trusted partner in finding the perfect property in the Philippines.</p>
            <div className="mt-4 flex space-x-4">
              {/* Social Icons Placeholder */}
              <a href="#" className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-40">F</a>
              <a href="#" className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-40">I</a>
              <a href="#" className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-40">L</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-secondary">Home</a></li>
              <li><a href="#properties" className="hover:text-secondary">Properties</a></li>
              <li><a href="#developers" className="hover:text-secondary">Developers</a></li>
              <li><a href="#contact" className="hover:text-secondary">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-secondary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-secondary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-secondary">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Trusted By</h4>
            <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">Ayala Land</span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">Megaworld</span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">SMDC</span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">Camella</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Real Estate Hub Philippines. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
