import React from 'react';
import { useCart } from '../contexts/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import EmptyCart from './EmptyCart';

const CartPage = () => {
  const { cartItems } = useCart();

  // Si le panier est vide, afficher le composant EmptyCart
  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Votre Panier</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Liste des produits du panier */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl p-6 space-y-6">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>
        
        {/* Résumé de la commande */}
        <div className="lg:w-1/3">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;