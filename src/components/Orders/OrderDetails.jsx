// import React from "react";
// import { ArrowLeft } from "lucide-react";
// import { formatDate, host } from "../../helpers/fonctions";

// const OrderDetails = ({ order, onBack }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-xl p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">
//           Détails de la commande #{order.id}
//         </h2>
//         <button
//           onClick={onBack}
//           className="text-gray-500 hover:text-gray-700 transition-colors flex items-center"
//         >
//           <ArrowLeft size={20} className="mr-2" /> Retour à la liste
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-700">
//             Informations de la commande
//           </h3>
//           <p>
//             <strong>Date :</strong> {formatDate(order.date)}
//           </p>
//           <p>
//             <strong>Total :</strong> {order?.montant_total} fcfa
//           </p>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold text-gray-700">
//             Informations du client
//           </h3>
//           <p>
//             <strong>Nom :</strong> {order?.client?.nom}
//           </p>
//           <p>
//             <strong>Client contact:</strong> {order?.client?.contact}
//           </p>
//         </div>
//       </div>

//       <h3 className="text-lg font-semibold text-gray-700 mb-3">
//         Produits commandés
//       </h3>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Nom du produit
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Quantité
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Prix unitaire
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Image
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {order?.details?.map((detail,key) => (

//               <tr key={key}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {detail?.ressource?.titre}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {detail?.quantite}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {detail?.ressource?.prix} fcfa
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   <img
//                     src={`http://127.0.0.1:8080${detail?.ressource?.img_res}`}
//                     // src={`https://caresap.org${detail?.ressource?.img_res}`}
//                     alt=""
//                     style={{
//                       width: "50px",
//                       height: "50px",
//                       borderRadius: "5px",
//                     }}
//                   />
//                 </td>
//               </tr>

//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;

// import React from "react";
// import { ArrowLeft } from "lucide-react";
// import { formatDate } from "../../helpers/fonctions";

// const OrderDetails = ({ order, onBack }) => {
//   const host = "https://caresap.org"; // ou http://127.0.0.1:8080 selon ton environnement

//   // 🔒 Empêche le clic droit (pour limiter la capture basique)
//   const disableContextMenu = (e) => e.preventDefault();

//   return (
//     <div className="bg-white rounded-2xl shadow-xl p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">
//           Détails de la commande #{order.id_vente}
//         </h2>
//         <button
//           onClick={onBack}
//           className="text-gray-500 hover:text-gray-700 transition-colors flex items-center"
//         >
//           <ArrowLeft size={20} className="mr-2" /> Retour à la liste
//         </button>
//       </div>

//       {/* Infos commande */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-700">
//             Informations de la commande
//           </h3>
//           <p>
//             <strong>Date :</strong> {formatDate(order.date)}
//           </p>
//           <p>
//             <strong>Total :</strong> {order?.montant_total} fcfa
//           </p>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold text-gray-700">
//             Informations du client
//           </h3>
//           <p>
//             <strong>Nom :</strong> {order?.client?.nom}
//           </p>
//           <p>
//             <strong>Contact :</strong> {order?.client?.contact}
//           </p>
//         </div>
//       </div>

//       {/* Liste des produits */}
//       <h3 className="text-lg font-semibold text-gray-700 mb-3">
//         Produits commandés
//       </h3>

//       {order?.details?.map((detail, key) => (
//         <div
//           key={key}
//           className="border rounded-xl mb-6 p-4 shadow-sm bg-gray-50"
//         >
//           <div className="flex items-center mb-3">
//             <img
//               src={`${host}${detail?.ressource?.img_res}`}
//               alt={detail?.ressource?.titre}
//               className="w-20 h-20 object-cover rounded-lg mr-4"
//             />
//             <div>
//               <h4 className="text-lg font-bold text-gray-900">
//                 {detail?.ressource?.titre}
//               </h4>
//               <p className="text-gray-600">{detail?.ressource?.desc}</p>
//               <p className="text-sm text-gray-500">
//                 Prix unitaire : {detail?.ressource?.prix} fcfa
//               </p>
//               <p className="text-sm text-gray-500">
//                 Quantité : {detail?.quantite}
//               </p>
//             </div>
//           </div>

//           {/* 🧩 Section d'affichage des documents */}
//           {detail?.ressource?.docs?.length > 0 && (
//             <div className="mt-4">
//               <h5 className="font-semibold text-gray-700 mb-2">
//                 Documents disponibles :
//               </h5>
//               <div className="space-y-4">
//                 {detail.ressource.docs.map((doc, index) => {
//                   const url = `${host}${doc.doc_res}`;
//                   const extension = doc.doc_res.split(".").pop().toLowerCase();

//                   // 🧠 Sélection du type de lecteur selon extension
//                   if (["mp4", "avi", "mov", "mkv"].includes(extension)) {
//                     return (
//                       <div key={index} className="border rounded-lg p-2 bg-white">
//                         <video
//                           src={url}
//                           controls
//                           controlsList="nodownload nofullscreen noremoteplayback"
//                           disablePictureInPicture
//                           className="w-full rounded-lg"
//                           onContextMenu={disableContextMenu}
//                         />
//                       </div>
//                     );
//                   } else if (extension === "pdf") {
//                     return (
//                       <div key={index} className="border rounded-lg p-2 bg-white">
//                         <iframe
//                           src={`${url}#toolbar=0`}
//                           title={`Document PDF ${index + 1}`}
//                           className="w-full h-[600px] rounded-lg"
//                           onContextMenu={disableContextMenu}
//                         />
//                       </div>
//                     );
//                   } else if (
//                     ["doc", "docx"].includes(extension)
//                   ) {
//                     return (
//                       <div
//                         key={index}
//                         className="border rounded-lg p-2 bg-white"
//                       >
//                         <iframe
//                           src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
//                             url
//                           )}`}
//                           title={`Document Word ${index + 1}`}
//                           className="w-full h-[600px] rounded-lg"
//                           onContextMenu={disableContextMenu}
//                         />
//                       </div>
//                     );
//                   } else {
//                     return (
//                       <p key={index} className="text-gray-500">
//                         Type de document non pris en charge : {extension}
//                       </p>
//                     );
//                   }
//                 })}
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrderDetails;

import React, { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { formatDate, host } from "../../helpers/fonctions";

const OrderDetails = ({ order, onBack }) => {
  const [openDoc, setOpenDoc] = useState(null); // Document à afficher
console.log("commande risque",order)
  const handleOpenDoc = (doc) => {
    console.log("url document",doc)
    setOpenDoc(doc);
  };

  const handleCloseDoc = () => {
    setOpenDoc(null);
  };

  // Empêche le clic droit pour éviter les téléchargements
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const getDocType = (url) => {
    const ext = url.split(".").pop().toLowerCase();
    if (ext === "pdf") return "pdf";
    if (ext === "mp4") return "video";
    if (ext === "doc" || ext === "docx") return "doc";
    return "autre";
  };

  const renderDocViewer = (docUrl) => {
    const type = getDocType(docUrl);
    const fullUrl = `http://127.0.0.1:8080${docUrl}`;
    // const fullUrl = `https://caresap.org${docUrl}`;

    if (type === "video") {
      return (
        <video
          src={fullUrl}
          controls
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
          className="w-full h-[80vh] rounded-lg"
          onContextMenu={handleContextMenu}
        />
      );
    }

    if (type === "pdf") {
      return (
        <iframe
          src={`${fullUrl}`}
          title="Aperçu PDF"
          className="w-full h-[80vh] rounded-lg bg-white"
          sandbox="allow-same-origin allow-scripts allow-popups"
          onContextMenu={handleContextMenu}
        ></iframe>
      );
    }

    if (type === "doc") {
      return (
        <iframe
          src={`https://docs.google.com/gview?url=${fullUrl}&embedded=true`}
          title="Aperçu Document Word"
          className="w-full h-[80vh] rounded-lg bg-white"
          sandbox="allow-same-origin allow-scripts allow-popups"
          onContextMenu={handleContextMenu}
        ></iframe>
      );
    }

    return (
      <p className="text-center text-gray-200">
        Type de document non pris en charge.
      </p>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      {/* --- En-tête --- */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Détails de la commande #{order?.id_vente}
        </h2>
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700 transition-colors flex items-center"
        >
          <ArrowLeft size={20} className="mr-2" /> Retour à la liste
        </button>
      </div>

      {/* --- Informations commande & client --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            Informations de la commande
          </h3>
          <p>
            <strong>Date :</strong> {formatDate(order?.date)}
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
            <strong>Nom :</strong> {order?.client?.nom}
          </p>
          <p>
            <strong>Contact :</strong> {order?.client?.contact}
          </p>
        </div>
      </div>

      {/* --- Table des produits --- */}
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Produits commandés
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Produit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Quantité
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Prix unitaire
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Documents
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {order?.details?.map((detail, key) => (
              <tr key={key}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {detail?.ressource?.titre}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {detail?.quantite}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {detail?.ressource?.prix} fcfa
                </td>
                <td className="px-6 py-4">
                  <img
                    src={`http://127.0.0.1:8080${detail?.ressource?.img_res}`}
                    // src={`https://caresap.org${detail?.ressource?.img_res}`}
                    alt="Produit"
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 space-y-2">
                  {detail?.ressource?.docs?.length > 0 ? (
                    detail.ressource.docs.map((doc, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOpenDoc(doc.doc_res)}
                        className="text-blue-600 hover:underline text-sm block"
                      >
                        {doc.doc_res.split("/").pop()}
                      </button>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">
                      Aucun document
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Modal d’affichage du document --- */}
      {openDoc && (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
          <div className="relative w-11/12 md:w-3/4 lg:w-2/3 rounded-lg p-4 shadow-lg bg-gray-800">
            <button
              onClick={handleCloseDoc}
              className="absolute top-2 right-2 text-white hover:text-red-400"
            >
              <X size={24} />
            </button>
            {renderDocViewer(openDoc)}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
