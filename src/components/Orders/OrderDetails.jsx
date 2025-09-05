import React from "react";
import { ArrowLeft } from "lucide-react";
import { formatDate, host } from "../../helpers/fonctions";

const OrderDetails = ({ order, onBack }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Détails de la commande #{order.id}
        </h2>
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700 transition-colors flex items-center"
        >
          <ArrowLeft size={20} className="mr-2" /> Retour à la liste
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            Informations de la commande
          </h3>
          <p>
            <strong>Date :</strong> {formatDate(order.date)}
          </p>
          <p>
            <strong>Total :</strong> {order?.montant_total} fcfa
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            Informations du client
          </h3>
          <p>
            <strong>Nom :</strong> {order?.Client?.nom}
          </p>
          <p>
            <strong>Client contact:</strong> {order?.Client?.contact}
          </p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Produits commandés
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nom du produit
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quantité
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Prix unitaire
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Image
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {order?.Ressources?.map((product) => (
              <tr key={product.productId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product?.titre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product?.DetailVente?.quantite}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product?.prix} fcfa
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <img
                    src={`${host}file/${product?.PhotoRessource?.img_res.replace(
                      "uploads/img/",
                      ""
                    )}`}
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "5px",
                    }}
                  />
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
