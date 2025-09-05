import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "../../data/blog"; // Importation des données de blog
import { formatDate, host, shortenText } from "../../helpers/fonctions";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_CATEGORIE_PUBLICATIONS,
  selectFilteredPublications,
} from "../../redux/slice/filterPubSlice";
import { selectPublications } from "../../redux/slice/publicationSlice";

/**
 * Composant de la page "Blog".
 * Affiche tous les articles de blog disponibles dans une grille moderne et paginée,
 * avec la possibilité de filtrer par catégorie.
 */
const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Nombre d'articles par page

  const [category, setCategory] = useState("Tous");
  const [loadingPub, setLoadingPub] = useState(true);
  const publications = useSelector(selectPublications);
  const resultsFilteredPub = useSelector(selectFilteredPublications);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FILTER_BY_CATEGORIE_PUBLICATIONS({ publications, category }));
  }, [dispatch, publications.length, category]);

  const uniquePub = [];
  const seen = new Set();
  publications.forEach((pub) => {
    const id = pub?.CategoriePub?.id_cat;
    const nom = pub?.CategoriePub?.nom;
    if (id && !seen.has(id)) {
      uniquePub.push({ id_cat: id, nom });
      seen.add(id);
    }
  });
  const allCategorie = [{ id_cat: "all", nom: "Tous" }, ...uniquePub];

  // Logique de pagination
  const totalPages = Math.ceil(resultsFilteredPub.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = resultsFilteredPub.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

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
            Explorez nos articles de fond, analyses et nouvelles sur les
            dernières avancées en santé publique et en recherche.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Menu déroulant pour le filtre de catégories */}
          {publications?.length > 0 && (
            <div className="mb-8">
              <label htmlFor="category-filter" className="sr-only">
                Filtrer par catégorie
              </label>

              <select
                id="category-filter"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors duration-200"
              >
                {allCategorie?.map((category) => (
                  <option key={category?.id_cat} value={category?.nom}>
                    {category?.nom}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Grille d'articles de blog filtrés */}
          {publications?.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts?.map((post) => (
                  <div
                    key={post?.id_pub}
                    className="bg-gray-50 rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={`${host}file/${post?.PhotoPub?.img_pub?.replace(
                          "uploads/img/",
                          ""
                        )}`}
                        alt={post?.titre}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="text-sm font-semibold text-primary mb-2">
                        {post.CategoriePub?.nom}
                      </p>
                      <h3 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors duration-300">
                        <Link to={`/blog/${post?.id_pub}`}>{post?.titre}</Link>
                      </h3>
                      <p className="mt-3 text-gray-600 line-clamp-3">
                        {post?.sous_titre}
                      </p>
                      <div className="mt-6 flex items-center text-sm text-gray-500">
                        <span>Par {post?.auteur}</span>
                        <span className="mx-2">&bull;</span>
                        <span>{formatDate(post?.createdAt)}</span>
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
                  {pageNumbers.map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                        currentPage === number
                          ? "bg-primary text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
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
            </>
          )}

          {publications?.length === 0 && <h4>Pas de publication disponible</h4>}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
