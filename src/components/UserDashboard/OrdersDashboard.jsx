// import React, { useState, useEffect } from "react";
// import { formatDate, getData, host } from "../../helpers/fonctions";
// import { STORE_ORDERS, selectOrderHistory } from "../../redux/slice/orderSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { selectToken, selectUserID } from "../../redux/slice/authSlice";
// import { Skeleton } from "primereact/skeleton";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { generateInvoice } from "../GenererFacture/GenererFacture";
// // import InvoiceWrapper from "../GenererFacture/InvoiceWrapper";

// // Données fictives pour simuler les commandes d'un client
// // Dans une application réelle, ces données seraient chargées depuis une API.

// const OrdersDashboard = () => {
//   const dispatch = useDispatch();
//   const orders = useSelector(selectOrderHistory);
//   const id_client = useSelector(selectUserID);
//   const token = useSelector(selectToken);
//   const [loading, setLoading] = useState(true);

//   const items = Array.from({ length: 5 }, (v, i) => i);

//   useEffect(() => {
//     getData(`private/vente/liste-query-params?id_client=${id_client}`, {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     })
//       .then((list) => {
//         dispatch(STORE_ORDERS({ orderHistory: list }));
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Erreur lors de la recupération des commandes:", err);
//         setLoading(false);
//       });
//   }, []);

//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const handleDetailsClick = (order) => {
//     console.log("detail vente",order)
//     setSelectedOrder(order);
//   };

//   const handleCloseModal = () => {
//     setSelectedOrder(null);
//   };

//   // Fonction pour gérer le téléchargement de la facture
//   const handleDownloadInvoice = () => {
//     // Dans une application réelle, cette fonction appellerait une API pour générer une facture PDF
//     // et la téléchargerait. Pour l'exemple, nous allons simplement afficher un message.
//     console.log(
//       `Téléchargement de la facture pour la commande #${selectedOrder.id}...`
//     );
//     // Implémentez ici la logique de téléchargement du fichier
//   };

//   return (
//     <>
//       <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-10">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">
//           Historique des commandes
//         </h2>
//         {loading && (
//           <div className="card">
//             <DataTable value={items} className="p-datatable-striped">
//               <Column
//                 field="code"
//                 header="Commande ID"
//                 style={{ width: "25%" }}
//                 headerStyle={{ padding: "1rem 0.5rem" }}
//                 body={() => (
//                   <div style={{ padding: "0.5rem 0" }}>
//                     <Skeleton width="60%" height="1rem" />
//                   </div>
//                 )}
//               />
//               <Column
//                 field="name"
//                 header="Nom du client"
//                 style={{ width: "25%" }}
//                 headerStyle={{ padding: "1rem 0.5rem" }}
//                 body={() => (
//                   <div style={{ padding: "0.5rem 0" }}>
//                     <Skeleton width="60%" height="1rem" />
//                   </div>
//                 )}
//               />
//               <Column
//                 field="category"
//                 header="Date"
//                 style={{ width: "25%" }}
//                 headerStyle={{ padding: "1rem 0.5rem" }}
//                 body={() => (
//                   <div style={{ padding: "0.5rem 0" }}>
//                     <Skeleton width="60%" height="1rem" />
//                   </div>
//                 )}
//               />
//               <Column
//                 field="quantity"
//                 header="Total"
//                 style={{ width: "25%" }}
//                 headerStyle={{ padding: "1rem 0.5rem" }}
//                 body={() => (
//                   <div style={{ padding: "0.5rem 0" }}>
//                     <Skeleton width="60%" height="1rem" />
//                   </div>
//                 )}
//               />
//             </DataTable>
//           </div>
//         )}
//         <div className="overflow-x-auto">
//           {!loading && orders?.length > 0 && (
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Commande ID
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Nom du client
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Date
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Total
//                   </th>
//                   <th scope="col" className="px-6 py-3"></th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {orders?.map((order) => (
//                   <tr key={order?.id_vente}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       #{order?.id_vente}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {order?.client?.nom}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {formatDate(order.date)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {order?.montant_total} fcfa
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <button
//                         onClick={() => handleDetailsClick(order)}
//                         className="text-blue-600 hover:text-blue-900 focus:outline-none"
//                       >
//                         Détails
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//           {!loading && orders?.length === 0 && (
//             <div>Aucune commande effectuée</div>
//           )}
//         </div>
//       </div>

//       {/* Détails de la commande en tant que pop-up */}
//       {selectedOrder && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div
//             className="fixed inset-0 bg-gray-900 opacity-50"
//             onClick={handleCloseModal}
//           ></div>
//           <div className="bg-white rounded-2xl shadow-xl p-8 z-10 w-full max-w-lg mx-auto">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-2xl font-bold text-gray-800">
//                 Détails de la commande #{selectedOrder.id_vente}
//               </h3>
//               <button
//                 onClick={handleCloseModal}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <div className="space-y-4">
//               <p>
//                 <strong>Nom du client :</strong> {selectedOrder?.client?.nom}
//               </p>
//               <p>
//                 <strong>Date :</strong> {formatDate(selectedOrder.date)}
//               </p>
//               <p>
//                 <strong>Total :</strong> €{selectedOrder?.montant_total}
//               </p>
//               <h4 className="font-semibold mt-6">Produits commandés :</h4>
//               <ul className="list-disc list-inside space-y-2">
//                 {selectedOrder?.details?.map((detail, index) => (
//                   <li key={index} className="text-gray-700">
//                     {detail?.ressource?.titre} ({detail?.quantite}x) - fcfa{" "}
//                     {detail?.ressource?.prix}{" "}
//                     <img
//                       // src={`https://caresap.org${detail?.ressource?.img_res}`}
//                       src={`http://127.0.0.1:8080${detail?.ressource?.img_res}`}
//                       alt=""
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         borderRadius: "5px",
//                       }}
//                     />
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             {/* <div className="mt-8 flex justify-end">
//               <InvoiceWrapper order={selectedOrder} />
//             </div> */}
//             <div className="mt-8 flex justify-end">
//               <button
//                 onClick={() => generateInvoice(selectedOrder)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors"
//               >
//                 Télécharger la facture
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default OrdersDashboard;
import React, { useState, useEffect } from "react";
import { formatDate, getData } from "../../helpers/fonctions";
import { STORE_ORDERS, selectOrderHistory } from "../../redux/slice/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUserID } from "../../redux/slice/authSlice";
import { Skeleton } from "primereact/skeleton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { generateInvoice } from "../GenererFacture/GenererFacture";

const OrdersDashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrderHistory);
  const id_client = useSelector(selectUserID);
  const token = useSelector(selectToken);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDoc, setOpenDoc] = useState(null); // document ouvert dans la modale

  const items = Array.from({ length: 5 }, (_, i) => i);

  useEffect(() => {
    getData(`private/vente/liste-query-params?id_client=${id_client}`, {
      headers: { authorization: `Bearer ${token}` },
    })
      .then((list) => {
        dispatch(STORE_ORDERS({ orderHistory: list }));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des commandes:", err);
        setLoading(false);
      });
  }, [dispatch, id_client, token]);

  const handleDetailsClick = (order) => setSelectedOrder(order);
  const handleCloseModal = () => setSelectedOrder(null);
  const handleOpenDoc = (docUrl) => setOpenDoc(docUrl);
  const handleCloseDoc = () => setOpenDoc(null);

  // Vérifie les types de fichiers
  const isVideo = (file) =>
    /\.(mp4|webm|ogg|mov|avi|mkv|flv|wmv|m4v)$/i.test(file);
  const isPDF = (file) => /\.pdf$/i.test(file);
  const isDocx = (file) => /\.(docx|doc)$/i.test(file);

  return (
    <>
      {/* 🧾 Tableau principal */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">
          Historique des commandes
        </h2>

        {/* Loading skeleton */}
        {loading && (
          <div className="card">
            <DataTable value={items} className="p-datatable-striped">
              {["Commande ID", "Nom du client", "Date", "Total"].map(
                (header, i) => (
                  <Column
                    key={i}
                    header={header}
                    body={() => (
                      <div style={{ padding: "0.5rem 0" }}>
                        <Skeleton width="60%" height="1rem" />
                      </div>
                    )}
                  />
                )
              )}
            </DataTable>
          </div>
        )}

        {/* Tableau des commandes */}
        <div className="overflow-x-auto">
          {!loading && orders?.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Commande ID", "Client", "Date", "Total"].map(
                    (header, i) => (
                      <th
                        key={i}
                        className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    )
                  )}
                  <th></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id_vente}>
                    <td className="px-4 sm:px-6 py-4 text-gray-900">
                      #{order.id_vente}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-500">
                      {order?.client?.nom}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-500">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-500">
                      {order?.montant_total} fcfa
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right">
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
          )}
          {!loading && orders?.length === 0 && (
            <div className="text-center text-gray-500 py-6">
              Aucune commande effectuée.
            </div>
          )}
        </div>
      </div>

      {/* 🪟 Pop-up détails commande */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div
            className="fixed inset-0 bg-gray-900 opacity-50"
            onClick={handleCloseModal}
          ></div>
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 z-10 w-full max-w-3xl mx-auto overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                Commande #{selectedOrder.id_vente}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <p>
                <strong>Client :</strong> {selectedOrder?.client?.nom}
              </p>
              <p>
                <strong>Date :</strong> {formatDate(selectedOrder.date)}
              </p>
              <p>
                <strong>Total :</strong> {selectedOrder?.montant_total} fcfa
              </p>

              <h4 className="font-semibold mt-6">Produits commandés :</h4>
              <ul className="list-disc list-inside space-y-4">
                {selectedOrder?.details?.map((detail, index) => (
                  <li key={index}>
                    <div className="flex items-center gap-3 flex-wrap">
                      <img
                        src={`http://127.0.0.1:8080${detail?.ressource?.img_res}`}
                        // src={`https://caresap.org${detail?.ressource?.img_res}`}
                        alt={detail?.ressource?.titre}
                        className="w-12 h-12 rounded-md object-cover border"
                      />
                      <div>
                        <p className="font-medium">
                          {detail?.ressource?.titre} ({detail?.quantite}x)
                        </p>
                        <p className="text-gray-500 text-sm">
                          {detail?.ressource?.prix} fcfa
                        </p>
                      </div>
                    </div>

                    {/* 📂 Documents */}
                    <div className="ml-6 mt-2 space-y-1">
                      {detail?.ressource?.docs?.map((doc, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            handleOpenDoc(`http://127.0.0.1:8080${doc.doc_res}`)
                            // handleOpenDoc(`https://caresap.org${doc.doc_res}`)

                          }
                          className="text-blue-600 hover:underline text-sm block break-all"
                        >
                          {doc.doc_res.split("/").pop()}
                        </button>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-center sm:justify-end">
              <button
                onClick={() => generateInvoice(selectedOrder)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md text-sm sm:text-base"
              >
                Télécharger la facture
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔐 Fenêtre modale sécurisée pour lecture vidéo/PDF/DOCX */}
      {openDoc && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-[999] flex flex-col items-center justify-center p-2 sm:p-6"
          onContextMenu={(e) => e.preventDefault()} // bloque clic droit
        >
          <button
            onClick={handleCloseDoc}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white text-2xl font-bold"
          >
            ✕
          </button>

          <div className="w-full sm:w-[95%] h-[90vh] bg-black flex items-center justify-center rounded-lg overflow-hidden">
            {isVideo(openDoc) ? (
              <video
                src={openDoc}
                controls
                disablePictureInPicture
                controlsList="nodownload noremoteplayback nofullscreen"
                className="w-full h-full object-contain rounded-lg"
              />
            ) : isPDF(openDoc) ? (
              <iframe
                src={openDoc}
                title="Aperçu PDF"
                className="w-full h-full rounded-lg border-none"
                sandbox="allow-same-origin allow-scripts"
              ></iframe>
            ) : isDocx(openDoc) ? (
              <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                  openDoc
                )}`}
                title="Aperçu DOCX"
                className="w-full h-full rounded-lg border-none"
                sandbox="allow-same-origin allow-scripts"
              ></iframe>
            ) : (
              <p className="text-white">Format non pris en charge.</p>
            )}
          </div>

          {/* Calque anti-capture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)",
              zIndex: 10,
            }}
          ></div>
        </div>
      )}
    </>
  );
};

export default OrdersDashboard;

