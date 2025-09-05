import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="relative py-16 md:py-28 bg-gray-50 overflow-hidden">
      {/* Dégradé bleu en haut à gauche */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200 via-blue-300 to-transparent rounded-full blur-3xl opacity-40 -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center gap-14 md:gap-20">
          
          {/* Colonne texte */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
              Notre <span className="text-primary">expertise</span> au service de la santé publique
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-8">
              Nous sommes une équipe de chercheurs et d'experts passionnés par la santé publique. 
              Nous combinons rigueur scientifique et innovation pour améliorer les politiques et programmes de santé.
            </p>
            
            <Link 
              to="/a-propos" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary/90"
            >
              <span>En savoir plus sur nous</span>
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>

          {/* Colonne image */}
          <div className="md:w-1/2 relative group">
            <img 
              src="https://www.santementale.fr/medias/2022/03/sante-publique.jpg"
              alt="Équipe de professionnels"
              className="rounded-3xl shadow-2xl w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
