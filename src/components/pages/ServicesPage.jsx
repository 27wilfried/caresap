import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { selectServices } from "../../redux/slice/serviceSlice";
import { useSelector } from "react-redux";
import { host } from "../../helpers/fonctions";

const ServicesPage = () => {
  const services = useSelector(selectServices);
  return (
    <div className="py-12 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Tous nos <span className="text-primary">services</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
            Découvrez l'ensemble de nos expertises et trouvez la solution qui
            correspond à vos besoins en recherche et santé publique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              to={`/services/${service.id_serv}`}
              key={index}
              className="group block h-full"
            >
              <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col transition-all duration-300 transform group-hover:shadow-lg group-hover:scale-[1.02]">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-indigo-100 mb-6 transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={`${host}file/${service.PhotoService.img_serv.replace(
                      "uploads/img/",
                      ""
                    )}`}
                    alt="image service"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {service.titre}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                  {service.desc}
                </p>
                <div className="mt-auto">
                  <span className="inline-flex items-center text-primary font-semibold group-hover:underline">
                    En savoir plus
                    <ArrowRight
                      size={18}
                      className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {services.length === 0 && (
          <div className="text-center mt-8">
            <h4 className="text-gray-600">
              Aucun service disponible pour le moment ou une erreur est subvenue
              lors de la recuperation des services.
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
