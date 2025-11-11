import React, { forwardRef } from "react";
import whatsappIcon from "../../assets/logo-caresap1.png";
import cachercaresap from "../../assets/cachercaresap.png";
import { formatDate } from "../../helpers/fonctions";

const Facture = forwardRef(({ order }, ref) => {
  if (!order) return null;

  return (
    <div ref={ref} className="max-w-4xl mx-auto bg-white font-sans">
      {/* Header avec logo et titre FACTURE */}
      <div className="flex">
        {/* Section gauche avec logo et info CaRESaP */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 flex-1 relative">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16   flex items-center justify-center mr-4">
              <img
                src={whatsappIcon}
                alt="Logo CaRESaP"
                className="w-30 h-15"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">CaRESaP</h1>
              <p className="text-sm text-white">
                CABINET DE RECHERCHE EN
                <br />
                ÉPIDÉMIOLOGIE ET EN SANTÉ
                <br />
                DES POPULATIONS
              </p>
            </div>
          </div>
        </div>

        {/* Section droite avec titre FACTURE */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-6 flex-1 flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold mb-2">FACTURE</h2>
          <p className="text-sm text-white">
            Facture N° {order?.id_vente}/CaRESaP
          </p>
        </div>
      </div>

      {/* Date et informations client */}
      <div className="p-6">
        <div className="text-right mb-6">
          <p className="text-sm text-gray-600">
            Facture émise le {formatDate(order?.date)}
          </p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">À l'endroit de :</p>
          <h3 className="text-xl font-bold text-purple-700 mb-2">
            {order?.Client?.nom}
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p className="flex items-center">
              <span className="text-purple-600 mr-2">📞</span>
              {order?.Client?.contact}
            </p>
            <p className="flex items-center">
              <span className="text-purple-600 mr-2">📧</span>
              Adresse électronique : {order?.Client?.email}
            </p>
            <p className="flex items-center">
              <span className="text-purple-600 mr-2">📍</span>
              Borgou, Parakou, Rep. du Bénin
            </p>
          </div>
        </div>

        {/* Tableau des services */}
        <div className="overflow-hidden rounded-lg border">
          {/* En-tête du tableau */}
          <div className="flex bg-gradient-to-r from-purple-600 to-blue-800 text-white">
            <div className="flex-1 p-4 font-semibold">Description</div>
            <div className="w-20 p-4 font-semibold text-center">Qté</div>
            <div className="w-24 p-4 font-semibold text-center">Prix</div>
            <div className="w-24 p-4 font-semibold text-center">Total</div>
          </div>

          {/* Lignes du tableau */}
          <div className="bg-white">
            {order?.Ressources?.map((item, index) => (
              <div
                key={index}
                className={`flex border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div className="flex-1 p-4 text-sm">{item.titre}</div>
                <div className="flex-1 p-4 text-sm">{item.desc}</div>
                <div className="w-20 p-4 text-sm text-center">
                  {item?.DetailVente?.quantite}
                </div>
                <div className="w-24 p-4 text-sm text-center">{item?.prix}</div>
                <div className="w-24 p-4 text-sm text-center">
                  {item?.prix * item?.DetailVente?.quantite}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totaux */}
        <div className="mt-6">
          <div className="flex justify-end mb-4">
            <div className="text-right space-y-1">
              <div className="flex justify-between items-center w-64">
                <span className="text-sm">Montant HT :</span>
                <span className="text-sm">{order?.montant_total}</span>
              </div>
              <div className="flex justify-between items-center w-64">
                <span className="text-sm">Montant payé :</span>
                <span className="text-sm">{order?.montant_total}</span>
              </div>
              <div className="flex justify-between items-center w-64">
                <span className="text-sm">Remise :</span>
                <span className="text-sm">Pas de remise</span>
              </div>
            </div>
          </div>

          {/* Total TTC */}
          <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Total TTC :</span>
              <span className="text-xl font-bold">
                {order?.montant_total} f CFA
              </span>
            </div>
          </div>

          {/* Reste à payer */}
          <div className="text-center mb-6">
            <span className="text-purple-600 font-semibold">
              Reste à payer :{" "}
            </span>
            <span className="text-purple-600 font-bold text-lg">0 f CFA</span>
          </div>
        </div>

        {/* Modes de paiement et mentions légales */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-bold text-gray-800 mb-2">Modes de paiement</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>COMPTE BCA : 00227530004</p>
              <p>COMPTE BGFI : 03003791011</p>
              <p>MoMo Pay : 00229 01 67 863 688</p>
            </div>
          </div>

          {/* Cachet et signature */}
          <div className="flex-1 flex justify-end">
            <div className="relative">
              {/* Cachet simulé */}
              <div className="w-32 h-24 border-2 border-red-500 rounded-lg flex items-center justify-center transform rotate-12 bg-red-50">
                <div className="text-center">
                  <div className="text-red-600 text-xs font-bold leading-tight">
                    CABINET DE RECHERCHE
                    <br />
                    EN ÉPIDÉMIOLOGIE
                    <br />
                    ET EN SANTÉ
                    <br />
                    DES POPULATIONS
                  </div>
                </div>
              </div>
              {/* Signature simulée */}
              <div className="mt-4 text-right">
                <div className="text-2xl font-cursive text-blue-800">
                  Signature
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mentions légales */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex justify-between items-end">
            {/* Section Mentions Légales à gauche */}
            <div className="text-xs text-gray-600 max-w-md">
              <h4 className="font-bold  text-gray-800  mb-1">
                Mentions légales
              </h4>
              <p>
                Siège : Rue Campus – Rose croix, Von École Moumbarack,
                Banikanni, Parakou (Rép. Bénin)
              </p>
              <p>Tél : (00229) 01 94 881-785 | 67 963-688</p>
              <p>IFU : 0202219088210 RCCM : RB/PKO/22 A 14621</p>
              <div className="flex items-center space-x-2 mt-1">
                <p className="flex items-center">
                  <svg
                    className="w-3 h-3 mr-1 text-blue-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  <a
                    href="mailto:contact@caresap.org"
                    className="text-blue-600 hover:underline"
                  >
                    contact@caresap.org
                  </a>
                </p>
                <p className="flex items-center">
                  <svg
                    className="w-3 h-3 mr-1 text-blue-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-1 0a7 7 0 11-14 0 7 7 0 0114 0zm-4 4a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 011-1h2a1 1 0 011 1v2zm-3-4a1 1 0 01-1 1h-2a1 1 0 01-1-1V6a1 1 0 011-1h2a1 1 0 011 1v4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <a
                    href="https://www.caresap.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    www.caresap.org
                  </a>
                </p>
              </div>
            </div>

            {/* Section signature et tampon à droite */}
            <div className="text-center">
              <img
                src={cachercaresap}
                alt="Cachet de CaRESaP"
                className="w-64 h-auto object-contain mb-2"
              />
              <p className="font-bold text-blue-700">EDAYE J-D Beaudouin</p>
              <p className="text-sm text-gray-700">Directeur CaReSaP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Facture;
