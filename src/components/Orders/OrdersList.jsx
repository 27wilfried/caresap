import React from "react";
import { formatDate, getData } from "../../helpers/fonctions";
import { Skeleton } from "primereact/skeleton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const OrdersList = ({ orders, onSelectOrder, loading }) => {
  const items = Array.from({ length: 5 }, (v, i) => i);

  return (
    <div className="bg-white rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Liste des commandes
      </h2>
      {loading && (
        <div className="card">
          <DataTable value={items} className="p-datatable-striped">
            <Column
              field="code"
              header="Commande ID"
              style={{ width: "25%" }}
              headerStyle={{ padding: "1rem 0.5rem" }}
              body={() => (
                <div style={{ padding: "0.5rem 0" }}>
                  <Skeleton width="60%" height="1rem" />
                </div>
              )}
            />
            <Column
              field="name"
              header="Nom du client"
              style={{ width: "25%" }}
              headerStyle={{ padding: "1rem 0.5rem" }}
              body={() => (
                <div style={{ padding: "0.5rem 0" }}>
                  <Skeleton width="60%" height="1rem" />
                </div>
              )}
            />
            <Column
              field="category"
              header="Date"
              style={{ width: "25%" }}
              headerStyle={{ padding: "1rem 0.5rem" }}
              body={() => (
                <div style={{ padding: "0.5rem 0" }}>
                  <Skeleton width="60%" height="1rem" />
                </div>
              )}
            />
            <Column
              field="quantity"
              header="Total"
              style={{ width: "25%" }}
              headerStyle={{ padding: "1rem 0.5rem" }}
              body={() => (
                <div style={{ padding: "0.5rem 0" }}>
                  <Skeleton width="60%" height="1rem" />
                </div>
              )}
            />
          </DataTable>
        </div>
      )}
      {
        !loading && orders?.length > 0 && 
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Commande ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Client
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>

              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Détails</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order?.id_vente}
                className="hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => onSelectOrder(order)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order?.id_vente}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order?.Client?.nom}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(order.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order?.montant_total} fcfa
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <span className="text-indigo-600 hover:text-indigo-900">
                    Voir les détails
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      }
      {!loading && orders?.length === 0 && <div>Pas commande pour le moment</div>}
    </div>
  );
};

export default OrdersList;
