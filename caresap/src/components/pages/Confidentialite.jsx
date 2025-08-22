import React from 'react';

/**
 * Composant de la page de Politique de confidentialité.
 * Décrit comment CaRESaP gère les données personnelles.
 */
const Confidentialite = () => {
  return (
    <div className="bg-white p-8 rounded-2xl max-w-5xl mx-auto my-10">
      <div className="prose max-w-none text-gray-800">
        <h1 className="text-4xl font-extrabold text-primary mb-6 text-center">Politique de confidentialité – CaRESaP</h1>
        
        {/* Section 1: Introduction */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Introduction</h2>
        <p className="text-lg text-gray-700">
          La présente Politique de confidentialité décrit comment CaRESaP collecte, utilise, stocke et protège les données personnelles de ses utilisateurs et clients lors de leur navigation sur le site www.caresap.com ou lors de l’achat de produits.
        </p>
        <p className="text-lg text-gray-700">
          En utilisant notre site, vous acceptez la collecte et l’utilisation de vos données conformément à cette politique.
        </p>
        
        {/* Section 2: Données collectées */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Données collectées</h2>
        <p className="text-lg text-gray-700">
          CaRESaP peut collecter les informations suivantes :
        </p>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li><strong>Données personnelles :</strong> nom, prénom, adresse email, adresse postale, numéro de téléphone ;</li>
          <li><strong>Données de paiement :</strong> informations nécessaires pour la validation des transactions (traitées de manière sécurisée) ;</li>
          <li><strong>Données de navigation :</strong> adresse IP, pages consultées, durée de visite, cookies et informations sur le dispositif utilisé ;</li>
          <li><strong>Données liées aux produits :</strong> préférences d’achat, historique de commandes, téléchargements effectués.</li>
        </ul>
        
        {/* Section 3: Finalités de la collecte */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Finalités de la collecte</h2>
        <p className="text-lg text-gray-700">
          Les données collectées sont utilisées pour :
        </p>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li>Traiter et confirmer les commandes ;</li>
          <li>Fournir un accès aux produits numériques et formations ;</li>
          <li>Communiquer des informations importantes liées aux produits ou au site ;</li>
          <li>Améliorer l’expérience utilisateur et optimiser le site ;</li>
          <li>Réaliser des analyses statistiques et suivi des ventes (de manière anonyme).</li>
        </ul>
        
        {/* Section 4: Partage et divulgation des données */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Partage et divulgation des données</h2>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li>CaRESaP ne vend ni ne loue vos données personnelles à des tiers.</li>
          <li>Les données peuvent être partagées uniquement avec des prestataires de services nécessaires au fonctionnement du site (paiement sécurisé, hébergement, livraison).</li>
          <li>CaRESaP peut divulguer vos données si la loi l’exige ou pour protéger ses droits légaux.</li>
        </ul>
        
        {/* Section 5: Sécurité des données */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Sécurité des données</h2>
        <p className="text-lg text-gray-700">
          Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données contre tout accès non autorisé, divulgation, altération ou destruction.
        </p>
        <p className="text-lg text-gray-700">
          Les paiements en ligne sont traités via des systèmes sécurisés conformes aux normes bancaires.
        </p>
        
        {/* Section 6: Conservation des données */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Conservation des données</h2>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li>Les informations liées aux commandes et aux transactions sont conservées aussi longtemps que nécessaire pour répondre aux obligations légales et fiscales.</li>
          <li>Les données de navigation anonymisées peuvent être conservées à des fins statistiques.</li>
        </ul>
        
        {/* Section 7: Droits des utilisateurs */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Droits des utilisateurs</h2>
        <p className="text-lg text-gray-700">
          Conformément à la législation en vigueur, vous disposez des droits suivants :
        </p>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li>Accès à vos données personnelles ;</li>
          <li>Rectification des données inexactes ou incomplètes ;</li>
          <li>Suppression de vos données dans les limites légales ;</li>
          <li>Opposition au traitement de certaines données ;</li>
        </ul>
        <p className="text-lg text-gray-700">
          Pour exercer ces droits, contactez-nous à : [adresse email de contact].
        </p>
        
        {/* Section 8: Cookies et technologies similaires */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">8. Cookies et technologies similaires</h2>
        <p className="text-lg text-gray-700">
          Notre site utilise des cookies pour :
        </p>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li>Analyser la fréquentation du site ;</li>
          <li>Améliorer l’expérience utilisateur ;</li>
          <li>Fournir des fonctionnalités adaptées à vos préférences.</li>
        </ul>
        <p className="text-lg text-gray-700">
          Vous pouvez gérer ou désactiver les cookies via votre navigateur.
        </p>
        
        {/* Section 9: Modifications de la politique */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">9. Modifications de la politique</h2>
        <p className="text-lg text-gray-700">
          CaRESaP se réserve le droit de modifier cette politique à tout moment. Les utilisateurs sont invités à consulter régulièrement cette page pour prendre connaissance des éventuelles mises à jour.
        </p>
        
        {/* Section 10: Contact */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">10. Contact</h2>
        <p className="text-lg text-gray-700">
          Pour toute question relative à la protection des données ou à cette Politique de confidentialité :
        </p>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li><strong>Email :</strong> Contact@caresap.org</li>
          <li><strong>Adresse :</strong> Parakou, Banikanni, Rép. du Bénin</li>
          <li><strong>Téléphone :</strong> +229 01 94 98 17 85 / 01 67 96 36 88</li>
        </ul>

      </div>
    </div>
  );
};

export default Confidentialite;
