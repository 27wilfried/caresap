import React, { useState, useEffect } from "react";
import { Skeleton } from "primereact/skeleton";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "../../data/blog"; // Importation des données de blog
import { useDispatch, useSelector } from "react-redux";
import {
  selectPublications,
  STORE_PUBLICATIONS,
} from "../../redux/slice/publicationSlice";
import {
  FILTER_BY_CATEGORIE_PUBLICATIONS,
  selectFilteredPublications,
} from "../../redux/slice/filterPubSlice";
import { formatDate, getData, host, shortenText } from "../../helpers/fonctions";

const Blog = () => {
  const [category, setCategory] = useState("Tous");
  const [loadingPub, setLoadingPub] = useState(true);
 
  const publications = useSelector(selectPublications);
  const resultsFilteredPub = useSelector(selectFilteredPublications);

  const dispatch = useDispatch();

  useEffect(() => {
    getData("publication/liste")
      .then((list) => {
        dispatch(STORE_PUBLICATIONS({ publications: list }));
        setLoadingPub(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la recupération des publications:", err);
        setLoadingPub(true);
      });
  }, []);

  useEffect(() => {
    dispatch(FILTER_BY_CATEGORIE_PUBLICATIONS({ publications, category }));
  }, [dispatch, publications.length, category]);

  // Générer une liste unique de catégories (pas de doublons)
  const uniquePub = [];
  const seen = new Set();
  publications?.forEach((pub) => {
    const id = pub?.CategoriePub?.id_cat;
    const nom = pub?.CategoriePub?.nom;
    if (id && !seen.has(id)) {
      uniquePub.push({ id_cat: id, nom });
      seen.add(id);
    }
  });
  const allCategorie = [{ id_cat: "all", nom: "Tous" }, ...uniquePub];

  return (
    <section id="blog" className="py-16 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* En-tête de la section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Nos dernières <span className="text-primary">publications</span>
            </h2>

            {/* {loadingPub && <Skeleton className="mb-2"></Skeleton>} */}
            {!loadingPub && (
              <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                Restez à jour avec nos articles sur la recherche, les
                innovations et les analyses en santé publique.
              </p>
            )}
          </div>

          {/* Menu déroulant pour le filtre de catégories */}
          {/* {loadingPub && <Skeleton width="10rem" height="4rem"></Skeleton>} */}
          {!loadingPub && (
            <div className="mb-6 md:mb-0">
              <label htmlFor="category-filter" className="sr-only">
                Filtrer par catégorie
              </label>
              <select
                id="category-filter"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors duration-200"
              >
                {allCategorie.map((category) => (
                  <option key={category?.id_cat} value={category?.nom}>
                    {category?.nom}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* {loadingPub && <Skeleton width="10rem" className="mb-2"></Skeleton>} */}
          {!loadingPub && (
            <Link
              to="/blog"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary rounded-full hover:bg-primary"
            >
              <span>Voir tous les articles</span>
              <ArrowRight size={20} className="ml-2" />
            </Link>
          )}
        </div>

        {/* Grille d'articles de blog filtrés et limités */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loadingPub &&
            [1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <Skeleton width="100%" height="200px"></Skeleton>
                <div className="p-6 md:p-8">
                  <Skeleton width="10rem" className="mb-2"></Skeleton>
                  <Skeleton className="mb-2"></Skeleton>
                  <div className="mt-3 text-gray-600 line-clamp-3">
                    <Skeleton className="mb-2"></Skeleton>
                    <Skeleton className="mb-2"></Skeleton>
                    <Skeleton className="mb-2"></Skeleton>
                  </div>
                  <div className="mt-6 flex items-center text-sm text-gray-500">
                    <Skeleton className="mb-2"></Skeleton>
                  </div>
                </div>
              </div>
            ))}
          {!loadingPub &&
            resultsFilteredPub.slice(0, 3).map((post) => (
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
                    {post?.CategoriePub?.nom}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors duration-300">
                    <Link to={`/blog/${post?.id_pub}`}>
                      {shortenText(post.titre, 100)}
                    </Link>
                  </h3>
                  <p className="mt-3 text-gray-600 line-clamp-3">
                    {shortenText(post?.sous_titre, 100)}
                  </p>
                  <div className="mt-6 flex items-center text-sm text-gray-500">
                    <span>Par {post.auteur}</span>
                    <span className="mx-2">&bull;</span>
                    <span>{formatDate(post?.createdAt)}</span>
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
