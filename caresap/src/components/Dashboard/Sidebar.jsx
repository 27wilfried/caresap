import React from 'react';
import { Star, Briefcase, BookOpen, FileText, LayoutDashboard, ShoppingCart } from 'lucide-react';

/**
 * Composant de la barre latérale pour le tableau de bord.
 * Affiche la navigation principale avec des liens pour gérer les services,
 * les commandes, les formations, le blog et les avis.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.activeSection - La section actuellement active.
 * @param {function} props.onNavClick - La fonction à appeler lors du clic sur un lien de navigation.
 */
const Sidebar = ({ activeSection, onNavClick }) => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6 shadow-2xl rounded-tr-xl">
      <div className="flex items-center mb-10">
        <LayoutDashboard className="h-8 w-8 text-blue-400" />
        <h2 className="ml-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
          Dashboard
        </h2>
      </div>
      <nav>
        <button
          onClick={() => onNavClick('services')}
          className={`flex items-center w-full p-4 rounded-xl transition-colors duration-200 group ${
            activeSection === 'services'
              ? 'bg-gray-800 text-indigo-400'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <Briefcase className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
          <span>Services</span>
        </button>

        <button
          onClick={() => onNavClick('commandes')}
          className={`flex items-center w-full p-4 rounded-xl transition-colors duration-200 group mt-2 ${
            activeSection === 'commandes'
              ? 'bg-gray-800 text-indigo-400'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <ShoppingCart className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
          <span>Commandes</span>
        </button>

        <button
          onClick={() => onNavClick('formations')}
          className={`flex items-center w-full p-4 rounded-xl transition-colors duration-200 group mt-2 ${
            activeSection === 'formations'
              ? 'bg-gray-800 text-indigo-400'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <BookOpen className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
          <span>Formations</span>
        </button>

        <button
          onClick={() => onNavClick('blog')}
          className={`flex items-center w-full p-4 rounded-xl transition-colors duration-200 group mt-2 ${
            activeSection === 'blog'
              ? 'bg-gray-800 text-indigo-400'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <FileText className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
          <span>Blog</span>
        </button>

        <button
          onClick={() => onNavClick('avis')}
          className={`flex items-center w-full p-4 rounded-xl transition-colors duration-200 group mt-2 ${
            activeSection === 'avis'
              ? 'bg-gray-800 text-indigo-400'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <Star className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
          <span>Publier un avis</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
