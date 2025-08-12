import React from 'react';
import HeroSection from '../sections/HeroSection';
import Statistics from '../sections/Statistics';
import Services from '../sections/Services';
import Formations from '../sections/Formations';
import About from '../sections/About';
import AvisClient from '../sections/AvisClient';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import Blog from '../sections/Blog';
//import ProposSection from '../sections/ProposSection';

const HomePage = () => {
  return (
    <div className="">
      <HeroSection />
      <Statistics />
      <Services />
      <Formations />
      <About />
      <Blog />
      <AvisClient />
      <Contact />
    </div>
  );
};

export default HomePage;