import React from 'react';
import { useParams, Link } from 'react-router-dom';
import services from '../../data/services';
// Importation des icônes supplémentaires pour les nouveaux champs
import { ArrowLeft, Send, Users, FileText, Clock, Mail, CheckCircle } from 'lucide-react';

const ServiceDetailPage = () => {
    const { slug } = useParams();
    const service = services.find((s) => s.slug === slug);

    if (!service) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <h1 className="text-4xl text-gray-700">Service non trouvé</h1>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Section Détailles du Service */}
            <section className="py-12 md:py-20 bg-white shadow-sm">
                <div className="container mx-auto px-4 sm:px-6">
                    <Link to="/services" className="inline-flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300 mb-6">
                        <ArrowLeft size={18} className="mr-2" />
                        Retour aux services
                    </Link>
                    <div className="flex items-center space-x-6 mb-6">
                        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-indigo-100">
                            <service.icon size={36} className="text-indigo-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">{service.title}</h1>
                            <p className="text-lg text-gray-600">{service.description}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section des détails supplémentaires */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Section gauche : détails étendus */}
                        <div className="space-y-8">
                            {/* Détail du service */}
                            <div className="bg-white p-8 rounded-2xl">
                                <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
                                    <CheckCircle size={24} className="text-indigo-600 mr-3" />
                                    Détail du service
                                </h2>
                                <p className="text-gray-700 leading-relaxed">{service.detail}</p>
                            </div>

                            {/* Bénéficiaires */}
                            <div className="bg-white p-8 rounded-2xl">
                                <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
                                    <Users size={24} className="text-indigo-600 mr-3" />
                                    Bénéficiaires
                                </h2>
                                <p className="text-gray-700 leading-relaxed">{service.beneficiaries}</p>
                            </div>
                            
                            {/* Conditions d'application */}
                            <div className="bg-white p-8 rounded-2xl">
                                <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
                                    <FileText size={24} className="text-indigo-600 mr-3" />
                                    Conditions d'application
                                </h2>
                                <p className="text-gray-700 leading-relaxed">{service.conditions}</p>
                            </div>
                            
                            {/* Période standard */}
                            <div className="bg-white p-8 rounded-2xl">
                                <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
                                    <Clock size={24} className="text-indigo-600 mr-3" />
                                    Période standard
                                </h2>
                                <p className="text-gray-700 leading-relaxed">{service.period}</p>
                            </div>
                        </div>

                        {/* Section droite : CTA et procédure */}
                        <div className="lg:sticky lg:top-8 flex flex-col space-y-8">
                            {/* CTA pour le formulaire */}
                            <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Prêt à démarrer ?</h2>
                                <p className="text-gray-600 mb-6">{service.cta}</p>
                                <a
                                    href="#contact-form"
                                    className="w-full inline-flex items-center justify-center px-6 py-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                                >
                                    Demander un devis
                                    <Send size={18} className="ml-2" />
                                </a>
                            </div>

                            {/* Procédure de demande */}
                            <div className="bg-white p-8 rounded-2xl">
                                <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
                                    <Mail size={24} className="text-indigo-600 mr-3" />
                                    Procédure de demande
                                </h2>
                                <p className="text-gray-700 leading-relaxed">{service.procedure}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Formulaire de Demande de Devis */}
            <section id="contact-form" className="py-12 md:py-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Formulaire de contact</h2>
                            <p className="text-gray-600">
                                Laissez-nous vos informations et nous vous recontacterons dans les plus brefs délais.
                            </p>
                        </div>

                        <form className="space-y-6">
                            {/* Nom et Prénoms */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom et Prénoms</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="john.doe@email.com"
                                />
                            </div>

                            {/* Service demandé (pré-rempli) */}
                            <div>
                                <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service demandé</label>
                                <input
                                    type="text"
                                    id="service"
                                    name="service"
                                    readOnly
                                    value={service.title}
                                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Pays */}
                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Pays</label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Votre pays"
                                    />
                                </div>
                                {/* Numéro WhatsApp */}
                                <div>
                                    <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">Numéro WhatsApp</label>
                                    <input
                                        type="tel"
                                        id="whatsapp"
                                        name="whatsapp"
                                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="+1234567890"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Détaillez votre besoin..."
                                ></textarea>
                            </div>

                            {/* Bouton de soumission */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                                >
                                    Envoyer ma demande
                                    <Send size={18} className="ml-2" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetailPage;
