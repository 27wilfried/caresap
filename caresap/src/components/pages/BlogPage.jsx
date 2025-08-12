import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '../../data/blog'; // Importation des données de blog

/**
 * Composant de la page "Blog".
 * Affiche tous les articles de blog disponibles dans une grille moderne et paginée,
 * avec la possibilité de filtrer par catégorie.
 */
const BlogPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6; // Nombre d'articles par page

    useEffect(() => {
        // Extrait toutes les catégories uniques des articles de blog
        const allCategories = ['all', ...new Set(blogPosts.map(post => post.category))];
        setCategories(allCategories);
        setCurrentPage(1); // Réinitialise la page actuelle lors du changement de catégorie
    }, [selectedCategory]);

    const filteredPosts = blogPosts.filter(post => {
        if (selectedCategory === 'all') {
            return true;
        }
        return post.category === selectedCategory;
    });

    // Logique de pagination
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="bg-white min-h-screen">
            
            {/* En-tête de la page */}
            <header className="py-16 bg-gray-50 text-center">
                <div className="container mx-auto px-4 sm:px-6">
                    <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
                        Notre <span className="text-primary">Blog</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Explorez nos articles de fond, analyses et nouvelles sur les dernières avancées en santé publique et en recherche.
                    </p>
                </div>
            </header>

            <section className="py-16 md:py-28">
                <div className="container mx-auto px-4 sm:px-6">
                    
                    {/* Menu déroulant pour le filtre de catégories */}
                    <div className="mb-8">
                        <label htmlFor="category-filter" className="sr-only">
                            Filtrer par catégorie
                        </label>
                        <select
                            id="category-filter"
                            onChange={handleCategoryChange}
                            value={selectedCategory}
                            className="px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors duration-200"
                        >
                            <option value="all">Toutes les catégories</option>
                            {categories.filter(cat => cat !== 'all').map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Grille d'articles de blog filtrés */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentPosts.map((post) => (
                            <div 
                                key={post.id} 
                                className="bg-gray-50 rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img 
                                        src={post.image} 
                                        alt={`Image de l'article : ${post.title}`} 
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                                </div>
                                <div className="p-6 md:p-8">
                                    <p className="text-sm font-semibold text-primary mb-2">{post.category}</p>
                                    <h3 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors duration-300">
                                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                                    </h3>
                                    <p className="mt-3 text-gray-600 line-clamp-3">{post.summary}</p>
                                    <div className="mt-6 flex items-center text-sm text-gray-500">
                                        <span>Par {post.author}</span>
                                        <span className="mx-2">&bull;</span>
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-12">
                        <nav className="inline-flex rounded-md shadow-sm -space-x-px">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Précédent
                            </button>
                            {pageNumbers.map(number => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                                        currentPage === number ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    {number}
                                </button>
                            ))}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Suivant
                            </button>
                        </nav>
                    </div>
                </div>
            </section>
            
        </div>
    );
};

export default BlogPage;
