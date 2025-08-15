import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './components/contexts/CartContext'; // <-- chemin corrigé
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
        <App />
    </CartProvider>
  </React.StrictMode>
);
