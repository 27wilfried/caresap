import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Facture from "../pages/Facture";

const InvoiceWrapper = ({ order }) => {
  const factureRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => factureRef.current,
    documentTitle: `Facture-${order?.id_vente}`,
  });
console.log("facture",factureRef)
  return (
    <div>
      <div style={{ position: "absolute", left: "-9999px" }}>
        <Facture ref={factureRef} order={order} />
      </div>

      <button
        onClick={handlePrint}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors"
      >
        Télécharger la facture
      </button>
    </div>
  );
};

export default InvoiceWrapper;
