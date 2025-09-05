import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
// Importez le hook personnalisé pour le panier
import { useDispatch, useSelector } from "react-redux";
import { selectCollectionsAndRessources } from "../../redux/slice/collectionAndRessourceSlice";
import { host, shortenText } from "../../helpers/fonctions";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
} from "../../redux/slice/cartSlice";

const ProductDetailPage = () => {
  const { id_col, id_res } = useParams();
  const allCollection = useSelector(selectCollectionsAndRessources);
  const collection = allCollection.find(
    (col) => col.id_col === parseInt(id_col)
  );
  const detailRessources = collection.Ressources.filter(
    (res) => res.id_res === parseInt(id_res)
  );
  const autresRessources = collection.Ressources.filter(
    (res) => res.id_res !== parseInt(id_res)
  );
  const dispatch = useDispatch();
  const addToCart = (ressource) => {
    dispatch(ADD_TO_CART(ressource));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  if (!detailRessources) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-center bg-white p-10 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Produit non trouvé
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Le produit que vous recherchez n'existe pas ou a été déplacé.
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
    <div className="min-h-screen bg-white">
      {/* {notification && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          {notification}
        </div>
      )} */}

      <main className="container mx-auto px-4 sm:px-6 pt-20 pb-16">
        {/* Fil d'Ariane */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-blue-600">
            Accueil
          </Link>
          <span>/</span>
          <Link
            to={`/formations/${detailRessources[0].id_col}`}
            className="hover:text-blue-600 capitalize"
          >
            {detailRessources[0].titre}
          </Link>
          {/* <span>/</span>
          <span className="font-medium text-gray-700">{detailRessources[0].name}</span> */}
        </nav>

        {/* Section principale du produit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image du produit */}
          <div className="relative h-96 lg:h-auto rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <img
              src={`${host}file/${detailRessources[0]?.PhotoRessource?.img_res?.replace(
                "uploads/img/",
                ""
              )}`}
              alt={detailRessources[0].titre}
              className="w-full h-full object-cover transform scale-105"
            />
            {/* <div className="absolute top-6 left-6 flex flex-col space-y-2">
              {product.badges &&
                product.badges.map((badge, index) => {
                  const badgeConfig = getBadgeConfig(badge.type);
                  return (
                    <span
                      key={index}
                      className={`px-3 py-1 ${
                        badge.color || badgeConfig.color
                      } ${
                        badgeConfig.textColor
                      } text-xs font-bold uppercase rounded-full shadow-lg`}
                    >
                      {badge.label || badgeConfig.label}
                    </span>
                  );
                })}
            </div> */}
          </div>

          {/* Détails du produit */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {detailRessources[0].titre}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {shortenText(detailRessources[0].desc, 200)}
            </p>

            {/* Prix */}
            <div className="flex items-center space-x-4">
              {/* {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {product.originalPrice}
                  {product.currency}
                </span>
              )} */}
              <span className="text-4xl font-extrabold text-blue-600">
                {detailRessources[0].prix} fcfa
                {/* {product.currency} */}
              </span>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
              <button
                onClick={() => addToCart(detailRessources[0])}
                className="flex-1 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:-translate-y-1"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>

        {/* Description complète et autres détails */}
        <section className="mt-16 border-t border-gray-200 pt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Description complète
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {detailRessources[0].desc}
          </p>
        </section>

        {/* Section des produits recommandés (implémentation simplifiée) */}
        <section className="mt-16 border-t border-gray-200 pt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Vous pourriez aussi aimer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {autresRessources.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group"
              >
                <Link to={`/formations/${item.id_col}`}>
                  <img
                    src={`${host}file/${item?.PhotoRessource?.img_res?.replace(
                      "uploads/img/",
                      ""
                    )}`}
                    alt={item.titre}
                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {item.titre}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {shortenText(item.desc, 100)}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetailPage;
