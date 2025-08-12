import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '../../data/blog'; // Importation des données de blog

/**
 * Composant de la section "Blog".
 * Affiche les articles de blog récents avec un design moderne et responsive,
 * incluant un filtre par catégorie et une limite d'affichage de 3 articles.
 */
const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Extrait toutes les catégories uniques des articles de blog pour les filtres.
    const uniqueCategories = ['all', ...new Set(blogPosts.map(post => post.category))];
    setCategories(uniqueCategories);
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredPosts = blogPosts.filter(post => {
    if (selectedCategory === 'all') {
      return true;
    }
    return post.category === selectedCategory;
  });

  // Limite l'affichage à 3 articles
  const displayedPosts = filteredPosts.slice(0, 3);

  return (
    <section id="blog" className="py-16 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* En-tête de la section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Nos dernières <span className="text-primary">publications</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl">
              Restez à jour avec nos articles sur la recherche, les innovations et les analyses en santé publique.
            </p>
          </div>
          
          {/* Menu déroulant pour le filtre de catégories */}
          <div className="mb-6 md:mb-0">
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

          <Link 
            to="/blog" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary rounded-full hover:bg-primary"
          >
            <span>Voir tous les articles</span>
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
        
        {/* Grille d'articles de blog filtrés et limités */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post) => (
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
      </div>
    </section>
  );
};

export default Blog;
