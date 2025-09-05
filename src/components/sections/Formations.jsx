import React, { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";
import {
  selectCollectionsAndRessources,
  STORE_COLLECTIONS_AND_RESSOURCES,
} from "../../redux/slice/collectionAndRessourceSlice";
import { Skeleton } from "primereact/skeleton";
import { getData, host, isNew } from "../../helpers/fonctions";

const Formations = () => {
  const [loadingCollection, setLoadingCollection] = useState(true);
  const dispatch = useDispatch();
  const collections = useSelector(selectCollectionsAndRessources);

  useEffect(() => {
    getData("collection/liste")
      .then((list) => {
        dispatch(
          STORE_COLLECTIONS_AND_RESSOURCES({ collections_and_ressources: list })
        );
        setLoadingCollection(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la recupération des collections:", err);
        setLoadingCollection(true);
      });
  }, []);

  return (
    <section className="relative py-12 md:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* En-tête de section */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Explorer nos Collections
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
            Découvrez nos ressources organisées par catégories pour répondre à
            tous vos besoins professionnels.
          </p>
        </div>

        {/* Collections en ligne horizontale */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8 max-w-7xl mx-auto">
          {loadingCollection &&
            [1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="group relative flex-shrink-0 w-72 h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-white"
              >
                <Skeleton width="100%" height="200px"></Skeleton>

                <div className=" flex flex-col justify-between m-2">
                  <div>
                    <Skeleton width="10rem" className="mb-3"></Skeleton>
                    <Skeleton width="10rem" className="mb-6"></Skeleton>
                  </div>

                  {/* Flèche d'indication */}
                  <div className="">
                    <Skeleton width="5rem" className="mb-2"></Skeleton>
                  </div>
                </div>
              </div>
            ))}

          {!loadingCollection && collections?.slice(0, 4)?.map((collection, index) => {
            
            return (
              <Link
                key={index}
                to={`/formations/${collection.id_col}`}
                className="group relative flex-shrink-0 w-72 h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-white"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={`${host}file/${collection?.PhotoCollections[0]?.img_col?.replace(
                      "uploads/img/",
                      ""
                    )}`}
                    alt={collection.titre}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300"></div>

                  {isNew(collection.createdAt) && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase rounded-full shadow-lg animate-pulse">
                      New
                    </div>
                  )}
                </div>

                <div className=" flex flex-col justify-between m-2">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {collection.titre}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {collection?.Ressources?.length} ressource
                      {collection?.Ressources?.length > 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="">
                    <button className="flex items-center text-blue-600 font-semibold group-hover:text-blue-800 transition-colors duration-300">
                      Découvrir
                      <ArrowRight
                        size={16}
                        className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}

          {collections?.length === 0 && !loadingCollection && (
            <div className="text-center mt-2">
              <p className="text-gray-600">
                Aucune collection disponible pour le moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Formations;
