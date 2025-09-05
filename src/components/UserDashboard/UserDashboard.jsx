import React, { useState } from 'react';
import Sidebar from './Sidebar';
import OrdersDashboard from './OrdersDashboard';
import ReviewForm from './ReviewForm';

/**
 * Composant principal du tableau de bord utilisateur.
 * Gère la navigation entre les différentes sections.
 */
const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('orders');
// if (!actifClient) return <Navigate to="/auth" />;
  const renderContent = () => {
    switch (activeSection) {
      case 'orders':
        return <OrdersDashboard />;
      case 'reviews':
        return <ReviewForm />;
      default:
        return (
          <div className="flex items-center justify-center p-8 text-center text-gray-600">
            <p>Sélectionnez une section dans le menu de gauche.</p>
          </div>
        );
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-100 min-h-screen flex">
      {/* Barre latérale de navigation */}
      <Sidebar activeSection={activeSection} onNavClick={setActiveSection} />

      {/* Contenu principal */}
      <main className="flex-1 overflow-y-auto p-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Tableau de bord utilisateur
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Bienvenue sur votre espace personnel.
        </p>
        {renderContent()}
      </main>
    </div>
  );
};

export default UserDashboard;
