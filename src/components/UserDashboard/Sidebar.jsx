import React from 'react';

/**
 * Composant de barre latérale pour la navigation du tableau de bord.
 * @param {string} activeSection - La section de navigation actuellement active.
 * @param {function} onNavClick - La fonction de rappel pour gérer les clics de navigation.
 */
const Sidebar = ({ activeSection, onNavClick }) => {
  const sections = [
    { id: 'orders', label: 'Mes commandes' },
    { id: 'reviews', label: 'Avis' },
  ];

  return (
    <aside className="w-64 bg-white p-6 rounded-r-3xl flex-shrink-0">
      <nav>
        <ul>
          {sections.map((section) => (
            <li key={section.id} className="mb-2">
              <button
                onClick={() => onNavClick(section.id)}
                className={`w-full text-left py-3 px-4 rounded-xl transition-colors duration-200 
                  ${activeSection === section.id 
                    ? 'bg-blue-600 text-white font-bold shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`
                }
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
