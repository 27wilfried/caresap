import React from "react";
import { clientReviews } from "../../data/avisclient";
import { Star } from "lucide-react";

const AvisClient = () => {
  // On duplique le tableau pour assurer la continuité
  const reviewsLoop = [...clientReviews, ...clientReviews, ...clientReviews];

  return (
    <section id="reviews" className="py-16 md:py-28 bg-gray-50 overflow-">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Ce que <span className="text-primary">nos clients</span> disent
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Ils témoignent de la qualité de nos formations et de nos ressources.
          </p>
        </div>

        {/* Bande défilante infinie */}
        <div className="overflow-hidden p-4">
          <div className="flex flex-nowrap animate-marquee space-x-8">
            {reviewsLoop.map((review, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 w-80 flex-shrink-0"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={review.image}
                    alt={`Photo de profil de ${review.name}`}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-gray-900">
                      {review.name}
                    </h4>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>

                {/* Étoiles jaunes */}
                <div className="flex mb-4">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    ))}
                </div>

                <p className="text-gray-700 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default AvisClient;
