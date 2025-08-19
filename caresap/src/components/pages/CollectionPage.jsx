// src/components/pages/CollectionPage.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCollectionBySlug, getBadgeConfig, products } from '../../data/formation';

const CollectionPage = () => {
    const { collectionSlug } = useParams();
    
    const [cart, setCart] = useState([]);
    const [notification, setNotification] = useState(null);
    
    // On récupère la collection par son slug
    const collection = getCollectionBySlug(collectionSlug);

    // Si la collection n'est pas trouvée, on affiche un message d'erreur
    if (!collection) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center bg-white p-10 rounded-xl shadow-lg">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Collection non trouvée</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        La collection "{collectionSlug}" n'existe pas.
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
    
    // On filtre les produits pour ne garder que ceux de la collection actuelle
    const items = products.filter(item => item.collectionId === collection.id);

    const handleAddToCart = (item) => {
        setCart(prevCart => [...prevCart, item]);
        setNotification(`${item.name} a été ajouté au panier !`);
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 pt-20">
            {notification && (
                <div className="fixed top-24 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
                    {notification}
                </div>
            )}
            
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-20 z-40 backdrop-blur-sm bg-white/95">
                <div className="container mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link 
                            to="/"
                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="font-medium">Retour aux collections</span>
                        </Link>
                        
                        <div className="text-sm text-gray-500">
                            {items.length} ressource{items.length > 1 ? 's' : ''}
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero */}
            <div className="relative py-16 md:py-24 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 relative">
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <div className="inline-flex flex-col items-center space-y-3 mb-6">
                            <img 
                                src={collection.image} 
                                alt={collection.title}
                                className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                            />
                            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
                                {collection.title}
                            </h1>
                        </div>
                        <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                            {collection.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="container mx-auto px-4 sm:px-6 pb-20">
                {/* Filtres */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
                        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                            Tous
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg text-sm">
                            Nouveau
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg text-sm">
                            Bestseller
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg text-sm">
                            Promo
                        </button>
                    </div>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                        <option>Trier par popularité</option>
                        <option>Prix croissant</option>
                        <option>Prix décroissant</option>
                        <option>Plus récent</option>
                        <option>Mieux noté</option>
                    </select>
                </div>
                
                {/* Grille d'articles */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    {item.badges && item.badges.length > 0 && (
                                        <div className="absolute top-4 left-4 flex flex-col space-y-2">
                                            {item.badges.slice(0, 2).map((badge, badgeIndex) => {
                                                const badgeConfig = getBadgeConfig(badge.type);
                                                return (
                                                    <div 
                                                        key={badgeIndex}
                                                        className={`px-2 py-1 ${badge.color || badgeConfig.color} ${badgeConfig.textColor} text-xs font-bold uppercase rounded-full shadow-lg`}
                                                    >
                                                        {badge.label || badgeConfig.label}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                                        {item.name}
                                    </h3>
                                    
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <span className="flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                            <span>Ressource</span>
                                        </span>
                                        <span className="text-green-600 font-medium">Gratuit</span> 
                                    </div>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-2">
                                            {item.originalPrice && (
                                                <span className="text-sm text-gray-400 line-through">
                                                    {item.originalPrice}{item.currency}
                                                </span>
                                            )}
                                            <span className="text-2xl font-bold text-blue-600">
                                                {item.price}{item.currency}
                                            </span>
                                        </div>
                                        {item.rating && (
                                            <div className="flex items-center space-x-1">
                                                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                </svg>
                                                <span className="text-sm text-gray-600">{item.rating}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex space-x-3">
                                        <Link 
                                            to={`/${collection.slug}/${item.slug}`}
                                            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium text-center"
                                        >
                                            Voir détails
                                        </Link>
                                        <button 
                                            onClick={() => handleAddToCart(item)}
                                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium flex items-center justify-center space-x-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H21M7 13a2 2 0 100 4h12a2 2 0 100-4M7 13H5.4M7 13l-1.6-8H21" />
                                            </svg>
                                            <span>Ajouter</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 col-span-full text-center">
                            Aucun produit disponible pour cette collection.
                        </p>
                    )}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Vous ne trouvez pas ce que vous cherchez ?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Explorez nos autres collections ou contactez-nous pour des recommandations personnalisées.
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