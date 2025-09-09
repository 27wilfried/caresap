import React from "react";
import { expertiseDomains } from "../../data/domaine";

const ExpertiseDomainsPage = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Tous nos <span className="text-primary">domaines</span> d'expertise
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez en détail les différents axes de recherche et
            d'intervention sur lesquels notre équipe travaille au quotidien.
          </p>
        </div>

        {/* Liste des domaines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {expertiseDomains.map((domain, index) => {
            const Icon = domain.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {/* Icône */}
                <div className="bg-primary/10 text-primary p-3 rounded-full inline-flex mb-4">
                  <Icon size={32} />
                </div>
                {/* Titre */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {domain.title}
                </h3>
                {/* Description */}
                <p className="text-gray-600 text-sm">
                  {domain.shortDescription}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseDomainsPage;
