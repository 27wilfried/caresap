import React, { useState, useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products, collections } from '../../data/formation';
import {
    ArrowRight,
    ShoppingCart,
    Filter,
    Search,
    SlidersHorizontal,
    Grid3X3,
    List,
    ChevronDown,
    Laptop,
    Book,
    Clipboard,
    FileText
} from 'lucide-react';

const FormationsPage = () => {
    const { collectionSlug } = useParams();
    const [activeCollectionId, setActiveCollectionId] = useState('tous');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 1000]);

    useEffect(() => {
        if (collectionSlug) {
            const foundCollection = collections.find(c => c.slug === collectionSlug);
            setActiveCollectionId(foundCollection ? foundCollection.id : 'tous');
        } else {
            setActiveCollectionId('tous');
        }
    }, [collectionSlug]);

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products;

        if (activeCollectionId !== 'tous') {
            filtered = filtered.filter(p => p.collectionId === activeCollectionId);
        }

        if (searchTerm) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filtered = filtered.filter(p =>
            p.price >= priceRange[0] && p.price <= priceRange[1]
        );

        switch (sortBy) {
            case 'price-asc':
                return filtered.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return filtered.sort((a, b) => b.price - a.price);
            case 'name':
                return filtered.sort((a, b) => a.name.localeCompare(b.name));
            default:
                return filtered;
        }
    }, [activeCollectionId, searchTerm, sortBy, priceRange]);

    const getCollectionInfo = (id) => collections.find(c => c.id === id);

    return (
        <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50/20 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 py-12">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4 lg:mb-0">
                        Découvrez nos ressources
                    </h1>
                    <p className="text-lg text-gray-600">
                        Formations, livres, supports et articles pour les professionnels de la santé publique.
                    </p>
                </div>

                {/* Barre de contrôle (Recherche, Tri, Affichage) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        {/* Barre de recherche */}
                        <div className="relative flex-grow md:mr-4">
                            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher une ressource..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                            />
                        </div>

                        {/* Bouton pour afficher les filtres étendus (mobile) */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="inline-flex items-center justify-center md:hidden px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                            <SlidersHorizontal size={16} className="mr-2" />
                            Filtres
                            <ChevronDown size={16} className={`ml-2 transform transition-transform ${showFilters ? 'rotate-180' : 'rotate-0'}`} />
                        </button>

                        {/* Tri et affichage (desktop) */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Tri */}
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                                >
                                    <option value="name">Trier par : Nom A-Z</option>
                                    <option value="price-asc">Prix croissant</option>
                                    <option value="price-desc">Prix décroissant</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <ChevronDown size={16} />
                                </div>
                            </div>
                            {/* Affichage */}
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    aria-label="Affichage en grille"
                                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    <Grid3X3 size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    aria-label="Affichage en liste"
                                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    <List size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filtres étendus (desktop et mobile) */}
                {showFilters && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Filtres par collection */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Collections</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="collection"
                                            checked={activeCollectionId === 'tous'}
                                            onChange={() => setActiveCollectionId('tous')}
                                            className="text-primary focus:ring-primary/20"
                                        />
                                        <span className="ml-2 text-gray-700">Tous les produits ({products.length})</span>
                                    </label>
                                    {collections.map((collection) => {
                                        const count = products.filter(p => p.collectionId === collection.id).length;
                                        return (
                                            <label key={collection.id} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="collection"
                                                    checked={activeCollectionId === collection.id}
                                                    onChange={() => setActiveCollectionId(collection.id)}
                                                    className="text-primary focus:ring-primary/20"
                                                />
                                                <span className="ml-2 text-gray-700 capitalize">{collection.title} ({count})</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Filtre par prix */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Prix</h3>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                        className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                    />
                                    <span className="text-gray-500">-</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                    />
                                    <span className="text-gray-500 text-sm">€</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Grille de produits */}
            <div className="container mx-auto px-4 sm:px-6">
                {filteredAndSortedProducts.length > 0 ? (
                    <div className={`grid gap-6 ${viewMode === 'grid'
                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                        : 'grid-cols-1'
                        }`}>
                        {filteredAndSortedProducts.map((product) => {
                            const collectionInfo = getCollectionInfo(product.collectionId);
                            const Icon = collectionInfo?.icon;
                            
                            return (
                                <div
                                    key={product.id}
                                    className={`group bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 transform hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 overflow-hidden ${
                                        viewMode === 'list' ? 'flex flex-row items-center p-4' : 'flex flex-col'
                                    }`}
                                >
                                    {/* Image et Badges */}
                                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0 rounded-xl' : 'rounded-t-2xl'}`}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                                                viewMode === 'list' ? 'w-full h-32' : 'w-full h-48'
                                            }`}
                                        />
                                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                                            {product.badges && product.badges.map((badge, index) => (
                                                <span
                                                    key={index}
                                                    className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${badge.color}`}
                                                >
                                                    {badge.label}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Contenu */}
                                    <div className={`p-6 flex flex-col flex-grow ${viewMode === 'list' ? 'pl-8' : ''}`}>
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                                {Icon && <Icon size={20} className="text-primary" />}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 leading-tight flex-grow">
                                                {product.name}
                                            </h3>
                                        </div>
                                        
                                        <p className="text-gray-600 leading-relaxed text-sm mb-4 flex-grow">
                                            {product.shortDescription}
                                        </p>
                                        
                                        <div className="mt-auto pt-4 border-t border-gray-100/50 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-2xl font-bold text-gray-900">
                                                    {product.price} €
                                                </span>
                                                <span className="text-xs text-gray-500 capitalize">
                                                    {collectionInfo?.title}
                                                </span>
                                            </div>
                                            <Link
                                                to={`/formations/${collectionInfo?.slug}/${product.slug}`}
                                                className="inline-flex items-center px-4 py-2.5 text-white bg-primary rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group/btn transform hover:scale-105"
                                            >
                                               Voir 
                                                <ArrowRight size={16} className="ml-2 transition-transform duration-300" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun produit trouvé</h3>
                        <p className="text-gray-500 mb-6">
                            Essayez de modifier vos critères de recherche ou filtres.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setActiveCollectionId('tous');
                                setPriceRange([0, 1000]);
                            }}
                            className="inline-flex items-center px-6 py-3 text-primary border border-primary rounded-xl hover:bg-primary hover:text-white transition-colors"
                        >
                            Réinitialiser les filtres
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormationsPage;