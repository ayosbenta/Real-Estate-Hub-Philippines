
import React from 'react';
import { useData } from '../context/DataContext';

const Contact: React.FC = () => {
  const { contactInfo } = useData();
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Get in Touch</h2>
          <p className="text-gray-600 mt-2">Have questions? We'd love to hear from you.</p>
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            <div className="bg-light-gray p-8 rounded-lg h-full">
              <h3 className="text-2xl font-bold text-primary mb-6">Contact Information</h3>
              <div className="space-y-4 text-gray-700">
                <p><strong>Phone:</strong> {contactInfo.phone}</p>
                <p><strong>Email:</strong> {contactInfo.email}</p>
                <p><strong>Address:</strong> {contactInfo.address}</p>
              </div>
              <div className="mt-8">
                <h4 className="font-semibold text-primary mb-3">Connect with us:</h4>
                <div className="flex space-x-4">
                  <button className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">FB</button>
                  <button className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">WA</button>
                  <button className="bg-blue-400 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">MSG</button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <div className="bg-light-gray p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-6">Send an Inquiry</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"/>
                <input type="email" placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"/>
                <input type="text" placeholder="Phone Number" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"/>
                <textarea placeholder="Your Message" rows={4} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"></textarea>
                <button type="submit" className="w-full bg-secondary text-white py-3 rounded-md font-bold text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
