import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


import {
  ArrowRight,
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  ChevronDown,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCollectionsAndRessources,
  GET_PRICE_PRODUCTS,
  selectMaxPrice,
  selectMinPrice,
} from "../../redux/slice/collectionAndRessourceSlice";
import {
  FILTER_BY_COLLECTION,
  FILTER_BY_PRICE,
  FILTER_BY_SEARCH,
  SORT_RESSOURCES,
  selectFilteredCollections,
} from "../../redux/slice/filterSlice";
import { host, shortenText } from "../../helpers/fonctions";

const FormationsPage = () => {
  
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState("Tous");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const collections = useSelector(selectCollectionsAndRessources);
  const resultsFilteredCollections = useSelector(selectFilteredCollections);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_PRICE_PRODUCTS({ collections }));
  }, [dispatch, collections.length]);

  useEffect(() => {
    dispatch(SORT_RESSOURCES({ collections, sort }));
  }, [dispatch, collections.length, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ collections, search }));
  }, [dispatch, collections.length, search]);

  useEffect(() => {
    dispatch(FILTER_BY_COLLECTION({ collections, category }));
  }, [dispatch, collections.length, category]);

  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const [price, setPrice] = useState({ min: minPrice, max: maxPrice });

  // 1) Extraire seulement id_col et titre
  const uniqueCollections = collections.map((col) => ({
    id_col: col.id_col,
    titre: col.titre,
  }));

  // 2) Optionnel : exclure les collections vides
  const excludeEmpty = true;
  const filteredCollections = excludeEmpty
    ? collections
        .filter((col) => col.Ressources?.length > 0)
        .map((col) => ({ id_col: col.id_col, titre: col.titre }))
    : uniqueCollections;

  // 3) Ajouter "Tous" en tête
  const allCollections = [
    { id_col: "all", titre: "Tous" },
    ...filteredCollections,
  ];

  // 👉 allCollections est prêt pour alimenter ton select / menu

  const clearFilters = () => {
    setCategory("Tous");
    setSearch("");
    setSort("latest");
    setPrice({ min: minPrice, max: maxPrice })
  };

 
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50/20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4 lg:mb-0">
            Boutique
          </h1>
          <p className="text-lg text-gray-600">
            Formations, livres, supports et articles pour les professionnels de
            la santé publique.
          </p>
        </div>

        {/* Control bar (Search, Sort, View Mode) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search bar */}
            <div className="relative flex-grow md:mr-4">
              <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Rechercher une ressource..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>

            {/* Button for extended filters (mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center md:hidden px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <SlidersHorizontal size={16} className="mr-2" />
              Filtres
              <ChevronDown
                size={16}
                className={`ml-2 transform transition-transform ${
                  showFilters ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Sort and view mode (desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                >
                  <option value="lowest-price">Prix croissant</option>
                  <option value="highest-price">Prix décroissant</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown size={16} />
                </div>
              </div>

              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                >
                  {allCollections.map((cat,index) => (
                    <option key={index} value={`${cat.titre}`}>{cat.titre}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown size={16} />
                </div>
              </div>

              {/* View mode */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  aria-label="Affichage en grille"
                  className={`p-2 rounded-lg ${
                    viewMode === "grid"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  aria-label="Affichage en liste"
                  className={`p-2 rounded-lg ${
                    viewMode === "list"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Extended filters (desktop and mobile) */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Price filter */}
              <div>
                <div className="relative mb-2">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                  >
                    <option value="lowest-price">Prix croissant</option>
                    <option value="highest-price">Prix décroissant</option>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={16} />
                  </div>
                </div>

                <div className="relative mb-2">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                  >
                    {allCollections.map((cat) => (
                      <option value={`${cat.titre}`}>{cat.titre}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={16} />
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">Prix</h3>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    min={1}
                    max={minPrice}
                    value={price.min}
                    onChange={(e) =>
                      setPrice({ ...price, min: e.target.value })
                    }
                    className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={price.max}
                    min={minPrice + 1}
                    max={maxPrice}
                    onChange={(e) =>
                      setPrice({ ...price, max: e.target.value })
                    }
                    className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                  <span className="text-gray-500 text-sm">fcfa</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Display by collections */}
      <div className="container mx-auto px-4 sm:px-6">
        {resultsFilteredCollections.length > 0 ? (
          resultsFilteredCollections.map((collection) => {
            return (
              collection.Ressources.length > 0 && (
                <div key={collection.id_col} className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <img
                        src={`${host}file/${collection?.PhotoCollections[0]?.img_col?.replace(
                          "uploads/img/",
                          ""
                        )}`}
                        alt={collection.titre}
                        className=""
                      />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {collection.titre}
                    </h2>
                  </div>
                  <div
                    className={`grid gap-6 ${
                      viewMode === "grid"
                        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        : "grid-cols-1"
                    }`}
                  >
                    {collection.Ressources.map((res) => {
                      return (
                        <div
                          key={res.id_res}
                          className={`group bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 transform hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 overflow-hidden ${
                            viewMode === "list"
                              ? "flex flex-row items-center p-4"
                              : "flex flex-col"
                          }`}
                        >
                          {/* Image and Badges */}
                          <div
                            className={`relative overflow-hidden ${
                              viewMode === "list"
                                ? "w-48 flex-shrink-0 rounded-xl"
                                : "rounded-t-2xl"
                            }`}
                          >
                            
                            <img
                              src={`${host}file/${res?.PhotoRessource?.img_res?.replace(
                                "uploads/img/",
                                ""
                              )}`}
                              alt={res.titre}
                              className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                                viewMode === "list"
                                  ? "w-full h-32"
                                  : "w-full h-48"
                              }`}
                            />
                            {/* <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                              {product.badges &&
                                product.badges.map((badge, index) => (
                                  <span
                                    key={index}
                                    className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${badge.color}`}
                                  >
                                    {badge.label}
                                  </span>
                                ))}
                            </div> */}
                          </div>

                          {/* Content */}
                          <div
                            className={`p-6 flex flex-col flex-grow ${
                              viewMode === "list" ? "pl-8" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3 mb-3">
                              <h3 className="text-xl font-bold text-gray-900 leading-tight flex-grow">
                                {res.titre}
                              </h3>
                            </div>

                            <p className="text-gray-600 leading-relaxed text-sm mb-4 flex-grow">
                              {shortenText(res.desc,200) }
                            </p>

                            <div className="mt-auto pt-4 border-t border-gray-100/50 flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-2xl font-bold text-gray-900">
                                  {res.prix} fcfa
                                </span>
                                <span className="text-xs text-gray-500 capitalize">
                                  {collection.titre}
                                </span>
                              </div>
                              <Link
                                to={`/formations/${collection.id_col}/${res.id_res}`}
                                className="inline-flex items-center px-4 py-2.5 text-white bg-primary rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group/btn transform hover:scale-105"
                              >
                                Voir
                                <ArrowRight
                                  size={16}
                                  className="ml-2 transition-transform duration-300"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            );
          })
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-500 mb-6">
              Essayez de modifier vos critères de recherche ou filtres.
            </p>
            <button
              onClick={() => clearFilters()}
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
