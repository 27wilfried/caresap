import React from 'react';
import { useCart } from '../contexts/CartContext';

const CartSummary = () => {
  const { subtotal } = useCart();
  const shipping = 0; // Frais de port gratuits pour cet exemple

  return (
    <div className="bg-white rounded-2xl p-6 sticky top-28">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-4">Résumé de la commande</h2>
      
      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between items-center">
          <p>Sous-total</p>
          <p className="font-semibold">{subtotal.toFixed(2)} €</p>
        </div>
        
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 text-xl font-bold text-gray-900">
          <h3>Total</h3>
          <h3>{(subtotal + shipping).toFixed(2)} €</h3>
        </div>
      </div>
      
      <button 
        className="mt-6 w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Passer à la caisse
      </button>
    </div>
  );
};

export default CartSummary;