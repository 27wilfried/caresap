import React from 'react';

/**
 * Composant de la page des Conditions Générales de Vente (CGV).
 * Contient les termes et conditions de vente de CaRESaP.
 */
const Cgv = () => {
  return (
    <div className="bg-white p-8 rounded-2xl max-w-5xl mx-auto my-10">
      <div className="prose max-w-none text-gray-800">
        <h1 className="text-4xl font-extrabold text-primary mb-6 text-center">Conditions Générales de Vente (CGV) – CaRESaP</h1>
        
        {/* Article 1: Objet */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Article 1 : Objet</h2>
        <p className="text-lg text-gray-700">
          Les présentes Conditions Générales de Vente (CGV) régissent toutes les ventes effectuées sur le site internet de CaRESaP (www.caresap.com). Elles définissent les droits et obligations de CaRESaP et de l’acheteur concernant les produits proposés à la vente.
        </p>
        <p className="text-lg text-gray-700">
          En validant sa commande, l’acheteur accepte sans réserve ces CGV.
        </p>
        
        {/* Article 2: Produits proposés */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Article 2 : Produits proposés</h2>
        <p className="text-lg text-gray-700">
          La boutique CaRESaP propose :
        </p>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li>Des livres scientifiques, guides et supports pédagogiques ;</li>
          <li>Des théories et modèles de recherche ;</li>
          <li>Des formations et modules éducatifs.</li>
        </ul>
        <p className="text-lg text-gray-700">
          Chaque produit est présenté avec un contenu détaillé, ses caractéristiques, ses objectifs et ses modalités d’accès. L’acheteur est invité à lire attentivement ces informations avant toute commande.
        </p>
        
        {/* Article 3: Commande */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Article 3 : Commande</h2>
        <p className="text-lg text-gray-700">
          Toute commande implique :
        </p>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li>La création d’un compte ou l’identification de l’acheteur ;</li>
          <li>La validation des informations fournies ;</li>
          <li>L’acceptation des CGV.</li>
        </ul>
        <p className="text-lg text-gray-700">
          CaRESaP se réserve le droit de refuser toute commande en cas de non-conformité des informations fournies ou pour tout motif légitime.
        </p>
        
        {/* Article 4: Prix */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Article 4 : Prix</h2>
        <p className="text-lg text-gray-700">
          Les prix des produits sont indiqués en USD et incluent toutes taxes applicables.
        </p>
        <p className="text-lg text-gray-700">
          CaRESaP se réserve le droit de modifier les prix à tout moment, mais les produits sont facturés sur la base des tarifs en vigueur au moment de la commande.
        </p>
        
        {/* Article 5: Paiement */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Article 5 : Paiement</h2>
        <p className="text-lg text-gray-700">
          Le paiement s’effectue en ligne via les moyens proposés sur le site (cartes bancaires, transferts sécurisés, etc.).
        </p>
        <p className="text-lg text-gray-700">
          La commande est considérée comme effective uniquement après confirmation du paiement.
        </p>
        
        {/* Article 6: Livraison / Accès aux produits */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Article 6 : Livraison / Accès aux produits</h2>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li>Pour les produits numériques ou formations, l’accès est fourni immédiatement après paiement et confirmation de la commande.</li>
          <li>L’acheteur est responsable de la bonne réception et de l’utilisation des produits via ses propres dispositifs.</li>
        </ul>
        
        {/* Article 7: Politique de remboursement */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Article 7 : Politique de remboursement</h2>
        <p className="text-lg text-gray-700">
          Conformément à la nature des produits vendus (numériques, scientifiques ou formations), aucun remboursement n’est possible.
        </p>
        <p className="text-lg text-gray-700">
          Toutes les informations nécessaires sur le contenu des produits sont communiquées avant achat pour permettre à l’acheteur de prendre une décision éclairée.
        </p>
        
        {/* Article 8: Propriété intellectuelle */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Article 8 : Propriété intellectuelle</h2>
        <p className="text-lg text-gray-700">
          Tous les produits proposés restent la propriété intellectuelle exclusive de CaRESaP.
        </p>
        <p className="text-lg text-gray-700">
          L’acheteur ne peut en aucun cas :
        </p>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li>Reproduire, distribuer, vendre ou diffuser les produits à des tiers ;</li>
          <li>Modifier ou exploiter commercialement tout ou partie des contenus.</li>
        </ul>
        
        {/* Article 9: Responsabilité */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Article 9 : Responsabilité</h2>
        <p className="text-lg text-gray-700">
          CaRESaP s’engage à fournir des produits fiables et conformes à leur description.
        </p>
        <p className="text-lg text-gray-700">
          Cependant, CaRESaP ne peut être tenu responsable de :
        </p>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li>L’usage incorrect des produits par l’acheteur ;</li>
          <li>Les dommages indirects ou immatériels résultant de l’utilisation des produits ;</li>
          <li>Les problèmes liés à l’accès aux produits (connexion internet, dispositifs incompatibles, etc.).</li>
        </ul>
        
        {/* Article 10: Données personnelles */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Article 10 : Données personnelles</h2>
        <p className="text-lg text-gray-700">
          Les données recueillies lors de la commande sont nécessaires pour le traitement de celle-ci et sont protégées conformément à la législation en vigueur sur la protection des données.
        </p>
        <p className="text-lg text-gray-700">
          L’acheteur dispose d’un droit d’accès, de rectification et de suppression de ses données.
        </p>
        
        {/* Article 11: Litiges et droit applicable */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Article 11 : Litiges et droit applicable</h2>
        <p className="text-lg text-gray-700">
          Les présentes CGV sont régies par le droit béninois.
        </p>
        <p className="text-lg text-gray-700">
          En cas de litige, l’acheteur et CaRESaP s’efforceront de trouver une solution amiable. À défaut, les tribunaux compétents du ressort de CaRESaP seront seuls compétents.
        </p>

      </div>
    </div>
  );
};

export default Cgv;
