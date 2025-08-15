import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Trash2 } from 'lucide-react';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-4 border-b border-gray-200 pb-4 last:border-b-0">
      {/* Image du produit */}
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow-md" />
      
      <div className="flex-1">
        {/* Nom du produit */}
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        {/* Prix unitaire */}
        <p className="text-gray-600 text-sm">{item.price.toFixed(2)} €</p>
      </div>
      
      {/* Contrôle de la quantité */}
      <div className="flex items-center space-x-2">
        <input 
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-16 text-center border border-gray-300 rounded-md py-1"
        />
        <button 
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
          aria-label="Supprimer l'article"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;