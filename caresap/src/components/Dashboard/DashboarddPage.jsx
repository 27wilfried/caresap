import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ServicesDashboard from './ServicesDashboard'; // Supposons que vous ayez créé ces composants
import FormationsDashboard from './FormationsDashboard';
import BlogDashboard from './BlogDashboard';
import OrdersList from './OrdersDashboard'; 
import ReviewForm from '../UserDashboard/ReviewForm';

/**
 * Composant principal de la page du tableau de bord.
 * Gère l'état de la navigation et affiche les différents composants du tableau de bord.
 */
const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState('services');

  // Fonction pour déterminer quel composant de contenu afficher
  const renderContent = () => {
    switch (activeSection) {
      case 'services':
        return <ServicesDashboard />;
      case 'formations':
        return <FormationsDashboard />;
      case 'blog':
        return <BlogDashboard />;
      case 'commandes':
        return <OrdersList />;
      case 'avis':
        return <ReviewForm />;
      default:
        // Section par défaut, si aucune n'est sélectionnée
        return (
          <div className="p-10 text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Bienvenue sur votre tableau de bord</h1>
            <p className="text-lg text-gray-600">Sélectionnez une section dans le menu de gauche pour commencer à gérer votre contenu.</p>
          </div>
        );
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-100 min-h-screen flex">
      {/* Barre latérale de navigation */}
      <Sidebar activeSection={activeSection} onNavClick={setActiveSection} />

      {/* Contenu principal */}
      <main className="flex-1 overflow-y-auto">
        <Header />
        {renderContent()}
      </main>
    </div>
  );
};

export default DashboardPage;
