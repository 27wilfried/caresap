import React from "react";
import { Link } from "react-router-dom";
import { expertiseDomains } from "../../data/domaine";
import { ArrowRight } from "lucide-react";

const ExpertiseDomains = () => {
  // 👉 Version fixe : affiche seulement les 4 premiers domaines
  const domainsToShow = expertiseDomains.slice(0, 4);

  return (
    <section id="expertise" className="py-16 md:py-28 bg-gray-50   overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Titre */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Nos <span className="text-primary">domaines</span> d'intervention
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nous mettons notre expertise au service de la santé publique en
            abordant les défis les plus urgents à travers la recherche et
            l'innovation.
          </p>
        </div>

        {/* Liste des 4 domaines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {domainsToShow.map((domain, index) => {
            const Icon = domain.icon;
            return (
              <div
                key={index}
                className="bg-white  p-6 rounded-2xl  transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="bg-primary/10 text-primary p-3 rounded-full inline-flex mb-4">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {domain.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {domain.shortDescription}
                </p>
              </div>
            );
          })}
        </div>

        {/* Lien vers tous les domaines */}

        <div className="flex justify-center pt-4">
            <Link
              to="/tous-nos-domaines"
              className="px-6 py-3 text-primary rounded-full font-medium flex items-center justify-center gap-2 transition hover:bg-gray-100"
            >
              <span>Voir tous nos domaines</span>
              <ArrowRight size={18} />
            </Link>
          </div>

      </div>
    </section>
  );
};

export default ExpertiseDomains;
