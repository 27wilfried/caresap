import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin, X, Instagram } from 'lucide-react';

/**
 * Composant de la section "Pied de page" (Footer).
 * Un design moderne, responsif et respectant les normes UI/UX.
 */
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Colonne 1: Logo et description */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-2xl font-bold text-white">
              CaRESaP
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Votre partenaire de confiance pour l'expertise et la recherche en santé publique.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook size={24} />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Linkedin size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <X size={24} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Colonne 2: Liens rapides */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/apropos" className="hover:text-primary transition-colors duration-300">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/formations" className="hover:text-primary transition-colors duration-300">
                  Formations
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors duration-300">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3: Ressources */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/formations" className="hover:text-primary transition-colors duration-300">
                  Formations
                </Link>
              </li>
              <li>
                <Link to="/formations/livres" className="hover:text-primary transition-colors duration-300">
                  Livres
                </Link>
              </li>
              <li>
                <Link to="/formations/supports" className="hover:text-primary transition-colors duration-300">
                  Supports
                </Link>
              </li>
              <li>
                <Link to="/formations/articles" className="hover:text-primary transition-colors duration-300">
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4: Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <MapPin size={20} className="text-primary flex-shrink-0" />
                <span className="text-gray-400">Parakou (Borgou), Rép. Bénin</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <span className="text-gray-400">+229 01 94 98 17 85</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <span className="text-gray-400 break-words">contact@caresap.org</span>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Ligne de séparation et copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} CaRESaP. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
