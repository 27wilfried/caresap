import React, { useState } from 'react';

// Données fictives pour simuler les commandes d'un client
// Dans une application réelle, ces données seraient chargées depuis une API.
const initialOrders = [
    {
        id: "order-001",
        customerId: "cust-001",
        customerName: "Alice Dubois",
        date: "2024-08-10",
        total: 399.98,
        status: "Livrée",
        products: [
            {
                productId: "form-001",
                productName: "Data Science pour la Santé Publique",
                quantity: 1,
                price: 299.99,
            },
            {
                productId: "art-001",
                productName: "Fibromyalgie et VIH",
                quantity: 5,
                price: 19.99,
            },
        ],
    },
    {
        id: "order-002",
        customerId: "cust-002",
        customerName: "Jean Dupont",
        date: "2024-08-12",
        total: 109.99,
        status: "En cours",
        products: [
            {
                productId: "book-001",
                productName: "Épidémiologie Pratique : Guide Complet...",
                quantity: 1,
                price: 89.99,
            },
            {
                productId: "supp-001",
                productName: "Théorie SPECTRE VIH",
                quantity: 1,
                price: 39.99,
            },
        ],
    },
    {
        id: "order-003",
        customerId: "cust-003",
        customerName: "Marie Lebrun",
        date: "2024-08-14",
        total: 299.99,
        status: "Annulée",
        products: [
            {
                productId: "form-002",
                productName: "Introduction aux Essais Cliniques",
                quantity: 1,
                price: 199.99,
            },
        ],
    },
];

const OrdersDashboard = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleDetailsClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-6 sm:p-8 mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Historique des commandes
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commande ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom du client
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
               
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {initialOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    €{order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDetailsClick(order)}
                      className="text-blue-600 hover:text-blue-900 focus:outline-none"
                    >
                      Détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Détails de la commande en tant que pop-up */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={handleCloseModal}></div>
          <div className="bg-white rounded-2xl shadow-xl p-8 z-10 w-full max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Détails de la commande #{selectedOrder.id}</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <p><strong>Nom du client :</strong> {selectedOrder.customerName}</p>
              <p><strong>Date :</strong> {selectedOrder.date}</p>
              <p><strong>Total :</strong> €{selectedOrder.total}</p>
              <h4 className="font-semibold mt-6">Produits commandés :</h4>
              <ul className="list-disc list-inside space-y-2">
                {selectedOrder.products.map((product, index) => (
                  <li key={index} className="text-gray-700">
                    {product.productName} ({product.quantity}x) - €{product.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersDashboard;
