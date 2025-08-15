import React from "react";
import { Star, Quote } from "lucide-react";

// Données d'exemple pour les avis clients
const clientReviews = [
  {
    name: "Sarah Dubois",
    role: "CEO, TechStart",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    comment: "Une formation exceptionnelle qui a transformé notre approche du marketing digital. L'équipe est très professionnelle et les résultats sont au rendez-vous.",
    rating: 5
  },
  {
    name: "Marc Lefebvre",
    role: "Directeur Marketing",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    comment: "Grâce à leurs conseils, nous avons doublé notre chiffre d'affaires en 6 mois. Je recommande vivement leurs services à tous les entrepreneurs.",
    rating: 4
  },
  {
    name: "Emma Martin",
    role: "Fondatrice, Creative Studio",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    comment: "L'expertise et la passion de cette équipe sont remarquables. Ils ont su nous accompagner avec bienveillance et efficacité.",
    rating: 5
  },
  {
    name: "Thomas Girard",
    role: "E-commerce Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    comment: "Des formations de qualité supérieure avec un suivi personnalisé. Notre taux de conversion a augmenté de 300% !",
    rating: 3
  },
  {
    name: "Julie Moreau",
    role: "Consultante Digital",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    comment: "Un investissement qui en vaut la peine. L'approche pédagogique est moderne et les outils fournis sont très pratiques.",
    rating: 5
  }
];

const AvisClient = () => {
  const reviewsLoop = [...clientReviews, ...clientReviews, ...clientReviews];

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
            Découvrez les témoignages authentiques de nos clients qui ont transformé 
            leur business grâce à nos formations et notre accompagnement.
          </p>
        </div>

        {/* Défilement horizontal */}
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex animate-smooth-scroll space-x-8 hover:pause p-10">
              {reviewsLoop.map((review, index) => (
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
                      <img
                        src={review.image}
                        alt={`Photo de profil de ${review.name}`}
                        className="w-16 h-16 rounded-2xl object-cover shadow-md ring-4 ring-white"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-3 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                        {review.name}
                      </h4>
                      <p className="text-sm text-slate-500 font-medium">{review.role}</p>
                    </div>
                  </div>

                  {/* Étoiles dynamiques */}
                  <div className="flex mb-6 space-x-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="text-yellow-400 fill-yellow-400 group-hover:text-yellow-500 group-hover:fill-yellow-500 transition-colors duration-300"
                      />
                    ))}
                    {Array.from({ length: 5 - review.rating }).map((_, i) => (
                      <Star
                        key={`empty-${i}`}
                        size={18}
                        className="text-gray-300 fill-gray-300"
                      />
                    ))}
                  </div>

                  {/* Commentaire */}
                  <blockquote className="text-slate-700 leading-relaxed text-base italic relative">
                    {review.comment}
                  </blockquote>

                  {/* Effet de brillance */}
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
              {clientReviews.slice(0, 4).map((review, i) => (
                <img
                  key={i}
                  src={review.image}
                  alt=""
                  className="w-12 h-12 rounded-full border-3 border-white shadow-sm object-cover"
                />
              ))}
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-slate-900">+500 clients satisfaits</div>
              <div className="text-sm text-slate-600">Rejoignez-les dès aujourd'hui</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes smooth-scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
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
