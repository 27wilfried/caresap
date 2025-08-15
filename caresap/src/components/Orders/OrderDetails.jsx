import React from 'react';
import { ArrowLeft } from 'lucide-react';

const OrderDetails = ({ order, onBack }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Détails de la commande #{order.id}</h2>
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700 transition-colors flex items-center">
          <ArrowLeft size={20} className="mr-2" /> Retour à la liste
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Informations de la commande</h3>
          <p><strong>Date :</strong> {order.date}</p>
          <p><strong>Total :</strong> {order.total.toFixed(2)} €</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Informations du client</h3>
          <p><strong>Nom :</strong> {order.customerName}</p>
          <p><strong>Client ID :</strong> {order.customerId}</p>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Produits commandés</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom du produit
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantité
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prix unitaire
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {order.products.map((product) => (
              <tr key={product.productId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.price.toFixed(2)} €
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;