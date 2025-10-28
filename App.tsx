
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedDevelopers from './components/FeaturedDevelopers';
import PropertyCategories from './components/PropertyCategories';
import FeaturedProperties from './components/FeaturedProperties';
import DeveloperProjects from './components/DeveloperProjects';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-light-gray font-sans">
      <Header />
      <main>
        <Hero />
        <FeaturedDevelopers />
        <PropertyCategories />
        <FeaturedProperties />
        <DeveloperProjects />
        <WhyChooseUs />
        <Testimonials />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
