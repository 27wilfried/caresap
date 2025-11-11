import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
// Importez les données fictives
import { mockCartItems } from '../../data/panier'; 

// Création du contexte
const CartContext = createContext();

// Hook personnalisé pour accéder au contexte plus facilement
export const useCart = () => useContext(CartContext);

// Provider du contexte
export const CartProvider = ({ children }) => {
    // Initialisez l'état avec les données fictives
    const [cartItems, setCartItems] = useState(mockCartItems);

    // Fonction pour ajouter un produit au panier
    const addToCart = useCallback((product) => {
        setCartItems(prevItems => {
            const itemExists = prevItems.find(item => item.id === product.id);
            if (itemExists) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    }, []);

    // Fonction pour retirer un produit du panier
    const removeFromCart = useCallback((productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    }, []);

    // Fonction pour mettre à jour la quantité
    const updateQuantity = useCallback((productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    }, [removeFromCart]);
    
    // Calcul des totaux
    const cartTotals = useMemo(() => {
        const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        return {
            subtotal,
            totalItems,
        };
    }, [cartItems]);

    // Valeur fournie par le contexte
    const value = useMemo(() => ({
        cartItems,
        ...cartTotals,
        addToCart,
        removeFromCart,
        updateQuantity,
    }), [cartItems, cartTotals, addToCart, removeFromCart, updateQuantity]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
