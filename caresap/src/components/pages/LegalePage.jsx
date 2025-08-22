import React from 'react';

/**
 * Composant de la page des mentions légales.
 * Contient toutes les informations d'identification de l'entreprise.
 */
const LegalePage = () => {
  return (
    <div className="bg-white p-8 rounded-2xl max-w-5xl mx-auto my-10">
      <div className="prose max-w-none text-gray-800">
        <h1 className="text-4xl font-extrabold text-primary mb-6 text-center">Mentions légales – CaRESaP</h1>
        
        {/* Section 1: Identification de l’éditeur */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Identification de l’éditeur</h2>
        <ul className="list-none space-y-2 text-lg text-gray-700">
          <li><strong>Nom commercial :</strong> CaRESaP</li>
          <li><strong>Forme juridique :</strong> Établissement</li>
          <li><strong>Dénomination :</strong> CaRESaP</li>
          <li><strong>Numéro CNSS :</strong> 02022190882102</li>
          <li><strong>Numéro RCCM :</strong> RB/PKO/22 A 14621 du 16-05-2022</li>
          <li><strong>Numéro IFU :</strong> 0202219088210</li>
        </ul>
        
        {/* Section 2: Directeur de publication */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Directeur de publication</h2>
        <p className="text-lg text-gray-700">
          Le directeur de publication est [Nom du responsable légal], représentant légal de CaRESaP.
        </p>

        {/* Section 3: Objet du site */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Objet du site</h2>
        <p className="text-lg text-gray-700">
          Le site internet www.caresap.com a pour objectif de :
        </p>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li>Présenter le cabinet de recherche CaRESaP et ses activités ;</li>
          <li>Proposer à la vente des produits scientifiques, livres, théories et formations ;</li>
          <li>Fournir des informations fiables et de qualité sur l’épidémiologie et la santé des populations.</li>
        </ul>
        
        {/* Section 4: Propriété intellectuelle */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Propriété intellectuelle</h2>
        <p className="text-lg text-gray-700">
          Tous les contenus publiés sur le site (textes, images, vidéos, logos, graphiques, bases de données) sont la propriété exclusive de CaRESaP, sauf mentions contraires.
        </p>
        <p className="text-lg text-gray-700">
          Toute reproduction, diffusion ou exploitation, partielle ou totale, des contenus sans autorisation est strictement interdite.
        </p>
        
        {/* Section 5: Données personnelles */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Données personnelles</h2>
        <p className="text-lg text-gray-700">
          Les informations recueillies via le site sont nécessaires au traitement des commandes et à la gestion des relations avec les clients.
        </p>
        <p className="text-lg text-gray-700">
          Conformément à la législation en vigueur, l’utilisateur dispose d’un droit d’accès, de rectification et de suppression de ses données personnelles.
        </p>
        <p className="text-lg text-gray-700">
          Pour exercer ce droit, contactez-nous à [adresse e-mail de contact].
        </p>

        {/* Section 6: Limitation de responsabilité */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Limitation de responsabilité</h2>
        <p className="text-lg text-gray-700">
          CaRESaP s’efforce de fournir des informations fiables et exactes. Cependant, la responsabilité de CaRESaP ne peut être engagée en cas de :
        </p>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li>Erreurs ou omissions dans le contenu du site ;</li>
          <li>Problèmes liés à l’utilisation du site ou des produits numériques ;</li>
          <li>Dommages directs ou indirects résultant de l’utilisation du site ou des produits.</li>
        </ul>
        
        {/* Section 7: Droit applicable et litiges */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Droit applicable et litiges</h2>
        <p className="text-lg text-gray-700">
          Les présentes mentions légales sont régies par le droit béninois.
        </p>
        <p className="text-lg text-gray-700">
          Tout litige relatif à l’utilisation du site ou à la relation commerciale sera soumis aux tribunaux compétents du ressort de CaRESaP.
        </p>

      </div>
    </div>
  );
};

export default LegalePage;
