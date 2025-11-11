import React from 'react';

/**
 * Composant de la page de Politique de remboursement.
 * Décrit les conditions de non-remboursement des produits.
 */
const Remboursement = () => {
  return (
    <div className="bg-white p-8 rounded-2xl max-w-5xl mx-auto my-10">
      <div className="prose max-w-none text-gray-800">
        <h1 className="text-4xl font-extrabold text-primary mb-6 text-center">Politique de remboursement – CaRESaP</h1>
        
        {/* Section 1: Objet */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Objet</h2>
        <p className="text-lg text-gray-700">
          La présente politique précise les conditions relatives aux demandes de remboursement pour les produits achetés sur le site CaRESaP. Elle s’applique à tous les produits proposés à la vente : livres scientifiques, théories, supports pédagogiques, formations et modules éducatifs.
        </p>
        
        {/* Section 2: Produits concernés */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Produits concernés</h2>
        <p className="text-lg text-gray-700">
          Tous les produits vendus sur la boutique CaRESaP sont numériques ou scientifiques, et leur contenu est clairement détaillé avant achat. Chaque produit comporte :
        </p>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li>Une description précise ;</li>
          <li>Les objectifs pédagogiques ;</li>
          <li>Les modalités d’accès ou d’utilisation.</li>
        </ul>
        
        {/* Section 3: Absence de remboursement */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Absence de remboursement</h2>
        <p className="text-lg text-gray-700">
          En raison de la nature spécifique des produits vendus, aucun remboursement, retour ou échange n’est possible, même partiellement. Cette règle s’applique à tous les produits, sans exception. L’acheteur est donc invité à consulter attentivement les informations fournies sur chaque produit avant de finaliser sa commande.
        </p>
        
        {/* Section 4: Support et assistance */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Support et assistance</h2>
        <p className="text-lg text-gray-700">
          Bien que les remboursements ne soient pas possibles, CaRESaP s’engage à :
        </p>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li>Fournir une assistance technique en cas de problème d’accès aux produits ;</li>
          <li>Répondre à toute question concernant le contenu, l’utilisation ou la livraison des produits.</li>
        </ul>
        <p className="text-lg text-gray-700">
          L’acheteur peut contacter le service client via les coordonnées fournies sur le site pour tout problème ou clarification.
        </p>
        
        {/* Section 5: Engagement de qualité */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Engagement de qualité</h2>
        <p className="text-lg text-gray-700">
          CaRESaP garantit que tous les produits vendus sont fiables, complets et conformes à leur description. Notre objectif est de fournir des contenus scientifiques et pédagogiques de qualité, respectant les normes professionnelles et académiques.
        </p>

      </div>
    </div>
  );
};

export default Remboursement;
