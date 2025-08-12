import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center p-8 bg-gray-50 rounded-2xl shadow-xl max-w-xl mx-auto">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Paiement en cours</h1>
        <p className="text-lg text-gray-600 mb-6">
          Votre commande est en train d'être traitée. Merci de votre confiance !
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default PaymentPage;