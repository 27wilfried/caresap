import React from 'react';
import { LayoutDashboard, Bell, User } from 'lucide-react';


const Header = () => {
  return (
    <header className="p-6 shadow-md rounded-b-xl">
      <div className="flex justify-between items-center">
        
        {/* Titre du tableau de bord */}
        <div className="flex items-center">
          <LayoutDashboard className="h-8 w-8 text-blue-500 mr-4" />
          <h1 className="text-3xl font-extrabold text-gray-900">Tableau de bord</h1>
        </div>

        {/* Boutons de notification et de profil utilisateur */}
        <div className="flex items-center space-x-6">
          <button className="relative text-gray-500 hover:text-blue-500 transition-colors">
            <Bell size={24} />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              3
            </span>
          </button>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
              <User size={24} />
            </div>
            <span className="font-semibold text-gray-800 hidden md:block">Admin</span>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
