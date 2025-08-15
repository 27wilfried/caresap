// src/components/sections/HeroSection.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';


const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 py-24 overflow-hidden">
      {/* Décor de fond */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary rounded-full blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="container mx-auto text-center relative z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-4 leading-tight">
          Expertise en <span className="text-blue-600">santé publique</span>.
        </h1>
        <h2 className="text-lg md:text-2xl font-medium text-gray-700 mb-6">
          Solutions de recherche & analyses <span className="text-primary font-semibold">garanties</span>
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Appuyés sur des méthodologies rigoureuses, nous développons des études fiables
          pour accompagner les décisions en matière de santé publique.
        </p>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link   to="/contact"  className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition">
            Nous contacter
          </Link>
          <Link to="formations" className="px-6 py-3 text-primary rounded-full font-medium flex items-center justify-center gap-2 hover:bg-primary transition">
            <span>Découvrir nos formations</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
