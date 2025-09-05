import React from 'react';
import About from '../sections/About'; // Importation du composant About.jsx

/**
 * Composant de la page "À propos".
 * C'est la page principale qui contiendra la section "About" ainsi que d'autres sections si nécessaire.
 */
const AboutPage = () => {
  return (
    // Conteneur principal de la page avec un fond blanc et une hauteur minimale pour remplir l'écran.
    <div className="bg-white min-h-screen">
      
      {/* En-tête de la page, simple et centré. */}
      <header className="py-12 bg-gray-50 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">
          À propos de nous
        </h1>
      </header>

      {/* Rendu du composant About.jsx qui contient les informations et l'image. */}
      <About />
      
      {/* Vous pouvez ajouter d'autres composants de sections ici, par exemple :
      <TeamSection />
      <MissionSection />
      */}
      
    </div>
  );
};

export default AboutPage;
