// src/components/pages/CollectionPage.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCollectionsAndRessources } from "../../redux/slice/collectionAndRessourceSlice";
import {
  selectFilteredCollections,
  SORT_RESSOURCES,
} from "../../redux/slice/filterSlice";
import { ADD_TO_CART ,CALCULATE_TOTAL_QUANTITY} from "../../redux/slice/cartSlice";
import { host } from "../../helpers/fonctions";

const CollectionPage = () => {
  const { id_col } = useParams();
  const dispatch = useDispatch();
  const [sort, setSort] = useState("latest");
  const allCollection = useSelector(selectCollectionsAndRessources);

  const collection = allCollection?.filter(
    (col) => col.id_col === parseInt(id_col)
  );
  const FilteredCollections = useSelector(selectFilteredCollections);
  const resultsFilteredCollections =
    sort == "latest" ? collection : FilteredCollections;
  useEffect(() => {
    dispatch(SORT_RESSOURCES({ collections: collection, sort }));
  }, [dispatch, collection?.Ressources?.length, sort]);

  const addToCart = (ressource) => {
    dispatch(ADD_TO_CART(ressource));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
 
  // Si la collection n'existe pas, afficher une page d'erreur
  if (!collection) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-10 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Collection non trouvée
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            La collection "{resultsFilteredCollections[0]?.titre}" n'existe pas.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 pt-20">
      
      {/* Header de la page */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="font-medium">Retour aux collections</span>
            </Link>

            <div className="text-sm text-gray-500">
              {resultsFilteredCollections[0]?.Ressources?.length} ressource
              {resultsFilteredCollections[0]?.Ressources?.length > 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Section Hero */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex flex-col items-center space-y-3 mb-6">
              <img
                src={`${host}file/${resultsFilteredCollections[0]?.PhotoCollections[0]?.img_col?.replace(
                  "uploads/img/",
                  ""
                )}`}
                alt={resultsFilteredCollections[0]?.titre}
                className="w-20 h-20 rounded-2xl object-cover shadow-lg"
              />
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
                {resultsFilteredCollections[0]?.titre}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 sm:px-6 pb-20">
        {/* Filtres et tri */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white rounded-xl p-4 shadow-sm">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="lowest-price">Prix croissant</option>
            <option value="highest-price">Prix décroissant</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>

        {/* Grille d'articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resultsFilteredCollections[0]?.Ressources?.length > 0 &&
            resultsFilteredCollections[0]?.Ressources.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`${host}file/${item?.PhotoRessource?.img_res?.replace(
                      "uploads/img/",
                      ""
                    )}`}
                    alt={item.titre}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    {item.titre}
                  </h3>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">
                        {item.prix}fcfa
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Link
                      to={`/formations/${resultsFilteredCollections[0]?.id_col}/${item.id_res}`}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium text-center"
                    >
                      Voir détails
                    </Link>
                    <button
                      onClick={() => addToCart(item)}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium flex items-center justify-center space-x-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H21M7 13a2 2 0 100 4h12a2 2 0 100-4M7 13H5.4M7 13l-1.6-8H21"
                        />
                      </svg>
                      <span>Ajouter</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          {collection?.Ressources?.length === 0 && (
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Aucune ressource disponible pour cette collection.
              </p>
            </div>
          )}
        </div>

        {/* Section call-to-action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Vous ne trouvez pas ce que vous cherchez ?
            </h3>
            <p className="text-gray-600 mb-6">
              Explorez nos autres collections ou contactez-nous pour des
              recommandations personnalisées.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Explorer toutes les collections
              </Link>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
