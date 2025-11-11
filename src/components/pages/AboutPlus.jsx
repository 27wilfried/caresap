import React from 'react';

const AboutPlus = () => {
  return (
    <div className="bg-white p-8 rounded-2xl max-w-6xl mx-auto my-10 border-t-8 border-blue-600">
      <div className="prose max-w-none text-gray-800">
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-12 mb-10">
          {/* Bloc de texte à gauche */}
          <div className="md:w-7/12 mb-6 md:mb-0">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6">À propos de CaRESaP</h1>
            <p className="text-lg text-gray-800 leading-relaxed mb-4">
              Créé en 2020 comme une initiative de recherche indépendante, le Cabinet de Recherche en Épidémiologie et Santé des Populations (CaRESaP) a vu le jour dans un contexte marqué par le besoin croissant de données fiables et de qualité pour éclairer les politiques de santé publique.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed mb-4">
              Durant ses premières années, CaRESaP a fonctionné sans cadre légal formel, mais avec une réelle passion pour la recherche scientifique et l’appui aux décideurs. C’est en 2022 que le cabinet s’est officiellement doté d’un statut légal, renforçant ainsi sa crédibilité et sa capacité à agir comme un acteur clé dans le domaine de la recherche en santé.
            </p>
          </div>
          {/* Image à droite */}
          <div className="md:w-5/12">
            <img
              src="https://www.chu-bordeaux.fr/media/image/237/pole_sante_publique_chubordeaux_romolotavanifotolia-1473769932.png"
              alt="Des chercheurs travaillant ensemble sur des données de santé."
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
        
        {/* Le reste du contenu continue sous le bloc image/texte */}
        <p className="text-lg text-gray-800 leading-relaxed mb-6">
          Aujourd’hui, CaRESaP est bien plus qu’un simple prestataire de services :
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mb-6 ml-4">
          <li>Un partenaire stratégique des institutions publiques, privées et internationales ;</li>
          <li>Un promoteur de la qualité et de la fiabilité des chiffres en Afrique et au-delà ;</li>
          <li>Un espace de réflexion et d’innovation au service de la santé des populations.</li>
        </ul>

        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Notre vision</h2>
        <p className="text-lg text-gray-800 leading-relaxed mb-6">
          Être une référence en matière de recherche scientifique rigoureuse, contribuant à l’amélioration durable de la santé publique en Afrique et dans le monde.
        </p>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Nos objectifs</h2>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mb-6 ml-4">
          <li>Produire des données fiables, pertinentes et exploitables pour la prise de décision ;</li>
          <li>Renforcer les capacités locales en matière de recherche et d’analyse ;</li>
          <li>Favoriser l’émergence d’initiatives innovantes en épidémiologie et santé des populations ;</li>
          <li>Promouvoir une culture de l’évidence scientifique dans les politiques et programmes de santé.</li>
        </ul>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">Notre projection pour l’avenir</h2>
        <p className="text-lg text-gray-800 leading-relaxed mb-4">
          À l’horizon 2030, CaRESaP ambitionne de devenir un centre de référence reconnu sur le continent africain pour la recherche en épidémiologie et santé des populations, en développant :
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mb-6 ml-4">
          <li>Un réseau de chercheurs et praticiens de haut niveau ;</li>
          <li>Des collaborations internationales solides ;</li>
          <li>Des solutions numériques et innovantes pour le suivi, l’évaluation et la prise de décision.</li>
        </ul>
        
        <p className="text-lg text-gray-800 leading-relaxed">
          Chez CaRESaP, nous croyons que la force des données réside dans leur capacité à transformer des vies. C’est pourquoi nous nous engageons chaque jour à produire et valoriser des chiffres qui parlent, qui comptent et qui impactent.
        </p>
      </div>
    </div>
  );
};

export default AboutPlus;
