import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
      <ShoppingBag size={80} className="text-gray-400 mb-6" />
      <h2 className="text-3xl font-bold text-gray-800 mb-3">Votre panier est vide</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Il semble que vous n'ayez pas encore ajouté de produits. Parcourez nos formations et ressources pour commencer vos achats !
      </p>
      <Link 
        to="/formations" 
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
      >
        Découvrir nos formations
      </Link>
    </div>
  );
};

export default EmptyCart;