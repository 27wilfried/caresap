// src/components/pages/ProductDetailPage.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug, getBadgeConfig, getFeaturedProducts } from '../../data/formation';

const ProductDetailPage = () => {
  const { collectionSlug, productSlug } = useParams();
  
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  const product = getProductBySlug(collectionSlug, productSlug);
  const recommendedProducts = getFeaturedProducts(4);

  const handleAddToCart = (item) => {
    setCart(prevCart => [...prevCart, item]);
    setNotification(`${item.name} a été ajouté au panier !`);
    setTimeout(() => setNotification(null), 3000);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-center bg-white p-10 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Produit non trouvé</h1>
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
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          {notification}
        </div>
      )}

      <main className="container mx-auto px-4 sm:px-6 pt-20 pb-16">
        {/* Fil d'Ariane */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-blue-600">Accueil</Link>
          <span>/</span>
          <Link to={`/${product.collectionSlug}`} className="hover:text-blue-600 capitalize">
            {product.collectionTitle}
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-700">{product.name}</span>
        </nav>

        {/* Section principale du produit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image du produit */}
          <div className="relative h-96 lg:h-auto rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transform scale-105"
            />
            <div className="absolute top-6 left-6 flex flex-col space-y-2">
              {product.badges && product.badges.map((badge, index) => {
                const badgeConfig = getBadgeConfig(badge.type);
                return (
                  <span
                    key={index}
                    className={`px-3 py-1 ${badge.color || badgeConfig.color} ${badgeConfig.textColor} text-xs font-bold uppercase rounded-full shadow-lg`}
                  >
                    {badge.label || badgeConfig.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Détails du produit */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Évaluation (implémentation simplifiée) */}
            {product.rating && (
              <div className="flex items-center space-x-2 text-gray-600">
                {Array(5).fill(null).map((_, i) => (
                  <svg key={i} className={`w-4 h-4 fill-current ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
                <span className="font-medium">{product.rating}</span>
                <span className="text-sm">({product.reviewsCount} avis)</span>
                {product.studentsCount && (
                  <>
                    <span className="mx-2">•</span>
                    <span className="text-sm">
                      {product.studentsCount} étudiants
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Prix */}
            <div className="flex items-center space-x-4">
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {product.originalPrice}{product.currency}
                </span>
              )}
              <span className="text-4xl font-extrabold text-blue-600">
                {product.price}{product.currency}
              </span>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:-translate-y-1"
              >
                Ajouter au panier
              </button>
              <button className="flex-1 px-8 py-4 bg-gray-100 text-gray-800 font-bold rounded-xl hover:bg-gray-200 transition-colors duration-300">
                Ajouter aux favoris
              </button>
            </div>

            {/* Caractéristiques */}
            {product.features && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Description complète et autres détails */}
        <section className="mt-16 border-t border-gray-200 pt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Description complète
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {product.description}
          </p>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.level && (
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">Niveau</h3>
                <p className="text-gray-800 font-medium">{product.level}</p>
              </div>
            )}
            {product.duration && (
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">Durée</h3>
                <p className="text-gray-800 font-medium">{product.duration}</p>
              </div>
            )}
            {product.instructor && (
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">Formateur</h3>
                <p className="text-gray-800 font-medium">{product.instructor}</p>
              </div>
            )}
             {product.author && (
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">Auteur</h3>
                <p className="text-gray-800 font-medium">{product.author}</p>
              </div>
            )}
             {product.pages && (
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">Pages</h3>
                <p className="text-gray-800 font-medium">{product.pages}</p>
              </div>
            )}
          </div>
        </section>

        {/* Section des produits recommandés (implémentation simplifiée) */}
        <section className="mt-16 border-t border-gray-200 pt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Vous pourriez aussi aimer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {recommendedProducts.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                <Link to={`/${item.collectionSlug}/${item.slug}`}>
                  <img src={item.image} alt={item.name} className="h-48 w-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-2">{item.shortDescription}</p>
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