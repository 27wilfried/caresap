import React from 'react';
import Contact from '../sections/Contact'; 

/**
 * Composant de la page "À propos".
 * C'est la page principale qui contiendra la section "Contact" ainsi que d'autres sections si nécessaire.
 */
const ContactPage = () => {
  return (
    // Conteneur principal de la page avec un fond blanc et une hauteur minimale pour remplir l'écran.
    <div className="bg-white min-h-screen">
      
      {/* Rendu du composant About.jsx qui contient les informations et l'image. */}
      <Contact />
      
      {/* Vous pouvez ajouter d'autres composants de sections ici, par exemple :
      <TeamSection />
      <MissionSection />
      */}
      
    </div>
  );
};

export default ContactPage;
