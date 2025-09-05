import React, { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { getData, host } from "../../helpers/fonctions";
import { Skeleton } from "primereact/skeleton";

const AvisClient = () => {
  const [avis, setAvis] = useState([]);
  const [loadingAvis, setLoadingAvis] = useState(true);
  useEffect(() => {
    getData("avis/liste")
      .then((list) => {
        setAvis(list.data);
        setLoadingAvis(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la recupération des avis:", err);
        setLoadingAvis(true);
      });
  }, []);

  return (
    <section className="relative py-24 overflow-hidden ">
      <div className="relative container mx-auto px-4 sm:px-6">
        {/* En-tête */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
            <Star className="w-4 h-4 mr-2 fill-current" />
            Témoignages clients
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Ils nous font <span className="text-primary">confiance</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez les témoignages authentiques de nos clients qui ont
            transformé leur business grâce à nos formations et notre
            accompagnement.
          </p>
        </div>

        {/* Défilement horizontal */}
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex animate-smooth-scroll space-x-8 hover:pause p-10">
              {loadingAvis &&
                [1, 2, 3, 4].map((_, index) => (
                  <div
                    key={index}
                    className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/20 transition-all duration-500 w-96 flex-shrink-0 hover:-translate-y-3 hover:rotate-1"
                  >
                    {/* Effet de bordure gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                    <div className="absolute inset-[1px] bg-white rounded-3xl -z-10"></div>

                    {/* Icône de citation */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      <Quote className="w-4 h-4 text-white" />
                    </div>

                    {/* Profil */}
                    <div className="flex items-center mb-6">
                      <div className="relative">
                        <Skeleton size="4rem"></Skeleton>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-3 border-white flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <Skeleton width="10rem" className="mb-4"></Skeleton>
                        <Skeleton width="5rem" className="mb-2"></Skeleton>
                      </div>
                    </div>

                    {/* Étoiles dynamiques */}
                    <div className="flex mb-6 space-x-1">
                      <Skeleton size="2rem" className="mr-2"></Skeleton>
                      <Skeleton size="2rem" className="mr-2"></Skeleton>
                      <Skeleton size="2rem" className="mr-2"></Skeleton>
                      <Skeleton size="2rem" className="mr-2"></Skeleton>
                    </div>

                    {/* Commentaire */}
                    <blockquote className="text-slate-700 leading-relaxed text-base italic relative">
                      <Skeleton className="mb-2"></Skeleton>
                      <Skeleton className="mb-2"></Skeleton>
                      <Skeleton className="mb-2"></Skeleton>
                      <Skeleton className="mb-2"></Skeleton>
                    </blockquote>

                    {/* Effet de brillance */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-3xl"></div>
                  </div>
                ))}
              {!loadingAvis &&
                avis?.slice(0, 4)?.map((review, index) => (
                  <div
                    key={index}
                    className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/20 transition-all duration-500 w-96 flex-shrink-0 hover:-translate-y-3 hover:rotate-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                    <div className="absolute inset-[1px] bg-white rounded-3xl -z-10"></div>

                    {/* Icône de citation */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      <Quote className="w-4 h-4 text-white" />
                    </div>

                    <div className="flex items-center mb-6">
                      <div className="relative">
                        <img
                          src={`${host}rg/file/${review?.PhotoAvi?.img_avis?.replace(
                            "uploads/img/",
                            ""
                          )}`}
                          alt={review?.nom}
                          className="w-16 h-16 rounded-2xl object-cover shadow-md ring-4 ring-white"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-3 border-white flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                          {review.nom}
                        </h4>
                        <p className="text-sm text-slate-500 font-medium">
                          {review?.profession}
                        </p>
                      </div>
                    </div>

                    <h4 className="text-md font-semibold text-slate-900 mb-2">
                      {review?.titre}
                    </h4>

                    <div className="flex mb-6 space-x-1">
                      {Array.from({ length: review?.nbre_etoil }).map((_, i) => (
                        <Star
                          key={`empty-${i}`}
                          size={18}
                          className="text-gray-300 fill-gray-300"
                        />
                      ))}
                    </div>

                    <blockquote className="text-slate-700 leading-relaxed text-base italic relative">
                      {review.text}
                    </blockquote>
                    <div className="flex mb-6 space-x-1">
                      {review?.pays}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-3xl"></div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4">
            <div className="flex -space-x-2">
              {loadingAvis &&
                [1, 2, 3, 4].map((_, index) => (
                  <Skeleton key={index} shape="circle" size="5rem"></Skeleton>
                ))}
              {!loadingAvis &&
                avis
                  .slice(0, 4)
                  .map((review, i) => (
                    <img
                      key={i}
                      src={`${host}file/${review?.PhotoAvi?.img_avis?.replace(
                        "uploads/img/",
                        ""
                      )}`}
                      alt={review.nom}
                      className="w-12 h-12 rounded-full border-3 border-white shadow-sm object-cover"
                    />
                  ))}
            </div>

            {loadingAvis && (
              <div className="text-left">
                <div className="text-sm text-slate-600">
                  <Skeleton width="7rem" className="mb-2"></Skeleton>
                </div>
              </div>
            )}
            {!loadingAvis && (
              <div className="text-left">
                <div className="text-lg font-bold text-slate-900">
                  +{avis?.length} clients satisfaits
                </div>
                <div className="text-sm text-slate-600">
                  Rejoignez-les dès aujourd'hui
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes smooth-scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-smooth-scroll {
          animation: smooth-scroll 60s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default AvisClient;
