import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { collections, products } from '../../data/formation';
import { ArrowRight } from 'lucide-react'; // Importez l'icône de flèche pour plus de clarté

const Formations = () => {
    // Utilisation de useMemo pour calculer le nombre de produits par collection une seule fois
    const collectionsWithCount = useMemo(() => {
        return collections.map(collection => {
            const productCount = products.filter(p => p.collectionId === collection.id).length;
            return {
                ...collection,
                productCount
            };
        });
    }, [products, collections]); // Le calcul est refait uniquement si les dépendances changent

    return (
        <section className="relative py-12 md:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 relative">
                {/* En-tête de section */}
                <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                        Explorer nos Collections
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                        Découvrez nos ressources organisées par catégories pour répondre à tous vos besoins professionnels.
                    </p>
                </div>

                {/* Collections en ligne horizontale */}
                <div className="flex flex-wrap justify-center gap-6 lg:gap-8 max-w-7xl mx-auto">
                    {collectionsWithCount.map((collection, index) => (
                        <Link
                            key={index}
                            to={`/formations/${collection.slug}`}
                            className="group relative flex-shrink-0 w-72 h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-white"
                        >
                            {/* Image de la collection */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={collection.image}
                                    alt={collection.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                                
                                {/* Badge NEW pour certaines collections */}
                                {collection.isNew && (
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase rounded-full shadow-lg animate-pulse">
                                        New
                                    </div>
                                )}
                            </div>

                            {/* Contenu de la carte */}
                            <div className="p-6 flex flex-col justify-between h-32">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                        {collection.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">
                                        {collection.productCount} ressource{collection.productCount > 1 ? 's' : ''}
                                    </p>
                                </div>
                                
                                {/* Flèche d'indication */}
                                <div className="flex justify-end">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                                        <ArrowRight size={16} className="text-white" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

              
            </div>
        </section>
    );
};

export default Formations;