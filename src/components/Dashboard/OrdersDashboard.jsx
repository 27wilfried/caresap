import React, { useEffect, useState } from "react";
import { initialOrders } from "../../data/ordersData";
import OrdersList from "../Orders/OrdersList";
import OrderDetails from "../Orders/OrderDetails";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/slice/authSlice";
import { getData } from "../../helpers/fonctions";

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const token = useSelector(selectToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData("private/vente/liste", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((list) => {
        setOrders(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la recupération des commandes:", err);
        setLoading(false);
      });
  }, []);

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
        <OrdersList
          orders={orders}
          onSelectOrder={handleSelectOrder}
          loading={loading}
        />
      )}
    </div>
  );
};

export default OrdersDashboard;
