import React from 'react';
import HeroSection from '../sections/HeroSection';
import Statistics from '../sections/Statistics';
import Services from '../sections/Services';
import Formations from '../sections/Formations';
import About from '../sections/About';
import AvisClient from '../sections/AvisClient';
import Contact from '../sections/Contact';
import Partners from '../sections/Partners';
import Blog from '../sections/Blog';
import ExpertiseDomains from '../sections/ExpertiseDomains';

const HomePage = () => {
  return (
    <div className="">
      <HeroSection />
      <Statistics />
      <Services />
      <Formations />
      <About />
      <Blog />
      <ExpertiseDomains />
      <AvisClient />
      <Partners />
      <Contact />
    </div>
  );
};

export default HomePage;