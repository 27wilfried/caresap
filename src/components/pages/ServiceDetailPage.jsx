import React, { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Loader } from "rsuite";
import {
  ArrowLeft,
  Send,
  Users,
  FileText,
  Clock,
  Mail,
  CheckCircle,
} from "lucide-react";
import { selectServices } from "../../redux/slice/serviceSlice";
import { useSelector } from "react-redux";
import { checkEmail, createData, host } from "../../helpers/fonctions";

const ServiceDetailPage = () => {
  const [countries, setCountries] = useState([]);

  // Récupération des pays
 useEffect(() => {
  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v2/all?fields=name");
      if (!response.ok) {
        throw new Error("Erreur réseau : " + response.status);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Données reçues invalides : ce n'est pas un tableau");
      }

      const countryNames = data
        .map((c) => c.name)
        .sort((a, b) => a.localeCompare(b));

      setCountries(countryNames);
    } catch (error) {
      console.error("Erreur lors du chargement des pays:", error);
    }
  };
  fetchCountries();
}, []);


  const { id_serv } = useParams();
  const services = useSelector(selectServices);
  const service = services.find((s) => s.id_serv === parseInt(id_serv));

  if (!service) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <h1 className="text-4xl text-gray-700">Service non trouvé</h1>
      </div>
    );
  }

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    service: service.titre,
    pays: "",
    whatsapp: "",
    message: "",
  });

  const toast = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(true);

    if (
      !formData.nom ||
      !formData.email ||
      !checkEmail(formData.email) ||
      !formData.pays ||
      !formData.service ||
      !formData.whatsapp ||
      !formData.message
    ) {
      setLoading(false);
      return;
    }

    try {
      await createData("devis/", formData);
      toast.current.show({
        severity: "success",
        summary: "Succès",
        detail: "Message envoyé avec succès.",
        life: 3000,
      });

      setFormData({
        nom: "",
        email: "",
        service: service.titre,
        pays: "",
        whatsapp: "",
        message: "",
      });
    } catch (error) {
     
      toast.current.show({
        severity: "error",
        summary: "Erreur",
        detail: error?.data?.message || "Méssage non envoyé.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Toast ref={toast} />
      {/* Section Détailles du Service */}
      <section className="py-12 md:py-20 bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <Link
            to="/services"
            className="inline-flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300 mb-6"
          >
            <ArrowLeft size={18} className="mr-2" />
            Retour aux services
          </Link>
          <div className="flex items-center space-x-6 mb-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-indigo-100">
              <img
                src={service.img_serv}
                alt=""
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
                {service.titre}
              </h1>
              <p className="text-lg text-gray-600">{service.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section des détails supplémentaires */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Section gauche */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl">
                <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
                  <CheckCircle size={24} className="text-indigo-600 mr-3" />
                  Détail du service
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {service.detail_service}
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl">
                <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
                  <Users size={24} className="text-indigo-600 mr-3" />
                  Bénéficiaires
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {service.beneficiaire}
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl">
                <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
                  <FileText size={24} className="text-indigo-600 mr-3" />
                  Conditions d'application
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {service.condition_application}
                </p>
              </div>
            </div>

            {/* Section droite */}
            <div className="lg:sticky lg:top-8 flex flex-col space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Prêt à démarrer ?
                </h2>
                <a
                  href="#contact-form"
                  className="w-full inline-flex items-center justify-center px-6 py-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                >
                  Demander un devis
                  <Send size={18} className="ml-2" />
                </a>
              </div>

              <div className="bg-white p-8 rounded-2xl">
                <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
                  <Mail size={24} className="text-indigo-600 mr-3" />
                  Procédure de demande
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Écrivez à contact@caresap.org ou utilisez le formulaire en bas.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl">
                <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
                  <Clock size={24} className="text-indigo-600 mr-3" />
                  Période standard
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {service.periode_standard}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section id="contact-form" className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Formulaire de contact
              </h2>
              <p className="text-gray-600">
                Laissez-nous vos informations et nous vous recontacterons dans
                les plus brefs délais.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Nom */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom et Prénoms
                </label>
                <input
                  type="text"
                  id="name"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="John Doe"
                />
                {submitted && formData.nom === "" && (
                  <span className="text-red-500 text-xs">
                    Veuillez renseigner votre nom complet
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="john.doe@email.com"
                />
                {submitted && !checkEmail(formData.email) && (
                  <span className="text-red-500 text-xs">
                    Veuillez renseigner un email valide
                  </span>
                )}
              </div>

              {/* Service */}
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700"
                >
                  Service demandé
                </label>
                <input
                  type="text"
                  id="service"
                  name="service"
                  readOnly
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pays */}
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Pays
                  </label>
                  <select
                    id="country"
                    name="pays"
                    value={formData.pays}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">-- Sélectionnez votre pays --</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                {/* WhatsApp */}
                <div>
                  <label
                    htmlFor="whatsapp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Numéro WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="+229 XX XX XX XX"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Détaillez votre besoin..."
                ></textarea>
              </div>

              {/* Bouton */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                >
                  {loading ? (
                    <Loader content="En cours d'envoi..." />
                  ) : (
                    "Envoyer ma demande"
                  )}
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
