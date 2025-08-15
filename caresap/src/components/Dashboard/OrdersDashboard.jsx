import React, { useState } from 'react';
import { initialOrders } from '../../data/ordersData';
import OrdersList from '../Orders/OrdersList';
import OrderDetails from '../Orders/OrderDetails';
import { ShoppingCart } from 'lucide-react';

const OrdersDashboard = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 flex items-center">
        <ShoppingCart className="mr-4 text-indigo-500" size={32} />
        Gestion des Commandes
      </h1>

      {selectedOrder ? (
        <OrderDetails order={selectedOrder} onBack={handleBackToList} />
      ) : (
        <OrdersList orders={orders} onSelectOrder={handleSelectOrder} />
      )}
    </div>
  );
};

export default OrdersDashboard;