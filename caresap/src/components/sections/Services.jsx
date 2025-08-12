// src/components/sections/ServicesSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import services from '../../data/services';
import { ArrowRight } from 'lucide-react';

const Services = () => {
    return (
        <section className="py-12 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
                        Nos <span className="text-primary">services</span> d'expertise
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                        Découvrez comment nous vous accompagnons avec des solutions sur mesure.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {services.slice(0, 3).map((service, index) => (
    <Link 
        to={`/services/${service.slug}`} 
        key={index} 
        className="group block h-full"
    >
        <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col transition-all duration-300 transform group-hover:shadow-lg group-hover:scale-[1.02]">
            <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-indigo-100 mb-6 transition-transform duration-300 group-hover:scale-110">
                <service.icon size={32} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4 flex-grow">{service.description}</p>
            <div className="mt-auto">
                <span className="inline-flex items-center text-primary font-semibold group-hover:underline">
                    En savoir plus
                    <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
            </div>
        </div>
    </Link>
))}

                </div>
                <div className="flex justify-center pt-4">
                    <Link 
                        to="/services" 
                        className="px-6 py-3 text-primary rounded-full font-medium flex items-center justify-center gap-2 transition hover:bg-gray-100"
                    >
                        <span>Voir tous nos services</span>
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Services;