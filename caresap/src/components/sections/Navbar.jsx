import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Formations", path: "/formations" },
    { name: "Actualités", path: "/blog" },
    { name: "A Propos", path: "apropos" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo du site */}
        <div className="flex items-center space-x-2">
          {/* Remplacez ceci par le logo de CaRESaP */}
          <Link to="/" className="text-2xl font-bold text-blue-500">CaRESaP</Link>
        </div>

        {/* Menu de navigation - Desktop */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
          
          {/* Icône Panier */}
          <Link to="/panier" className="relative text-gray-600 hover:text-blue-500">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
          </Link>
        </nav>

        {/* Boutons et icônes - Mobile */}
        <div className="md:hidden flex items-center space-x-4">
          <Link to="/panier" className="relative text-gray-600 hover:text-blue-500">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
          </Link>
          <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu responsive - Mobile */}
      <div className={`md:hidden absolute top-16 left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}>
        <nav className="flex flex-col items-center py-4 space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={toggleMenu}
              className="text-lg text-gray-700 hover:text-blue-500 transition-colors duration-300 w-full text-center py-2"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;