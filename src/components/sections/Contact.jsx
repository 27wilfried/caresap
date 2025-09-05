import React, { useState, useRef } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { createData } from "../../helpers/fonctions";
import { Toast } from "primereact/toast";
import { Loader } from 'rsuite';

/**
 * Composant de la section "Contactez-nous".
 * Affiche les informations de contact et un formulaire moderne.
 */
const Contact = () => {
  const [formData, setFormData] = useState({
    nom_prenom: "",
    email: "",
    sujet: "",
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
    
    try {
      await createData("contact", formData);

      toast.current.show({
        severity: "success",
        summary: "Erreur",
        detail: "Message envoyé avec succès.",
        life: 3000,
      });
      setLoading(false);
      setFormData({ nom_prenom: "", email: "", sujet: "", message: "" });
    } catch (error) {
     
      toast.current.show({
        severity: "error",
        summary: "Erreur",
        detail: error?.data?.message || "Méssage non envoyé.",
        life: 3000,
      });
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="py-16 md:py-28 bg-white">
      <Toast ref={toast} />
      <div className="container mx-auto px-4 sm:px-6">
        {/* Titre de la section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Contactez-<span className="text-primary">nous</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Nous sommes à votre écoute. N'hésitez pas à nous contacter pour
            toute question ou demande.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Colonne de gauche : Informations de contact */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            {/* Carte d'adresse */}
            <div className="bg-gray-50 p-8 rounded-3xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center">
              <MapPin size={48} className="text-primary mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900">Adresse</h3>
              <p className="mt-2 text-gray-600">Parakou (Borgou), Rép. Bénin</p>
            </div>

            {/* Grille pour Téléphone et Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Carte Téléphone */}
              <div className="bg-gray-50 p-8 rounded-3xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center">
                <Phone size={48} className="text-primary mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900">
                  Téléphone
                </h3>
                <p className="mt-2 text-gray-600">+229 01 94 98 17 85</p>
              </div>

              {/* Carte Email */}
              <div className="bg-gray-50 p-8 rounded-3xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center">
                <Mail size={48} className="text-primary mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900">Email</h3>
                <p className="mt-2 text-gray-600 break-words">
                  contact@caresap.org
                </p>
              </div>
            </div>
          </div>

          {/* Colonne de droite : Formulaire de contact */}
          <div className="lg:w-2/3 bg-gray-50 p-8 md:p-12 rounded-3xl">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Envoyez-nous un message
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Nom et prénom(s)"
                  value={formData.nom_prenom}
                  onChange={handleChange}
                  name="nom_prenom"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors duration-200"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors duration-200"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Sujet"
                  value={formData.sujet}
                  onChange={handleChange}
                  name="sujet"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors duration-200"
                />
              </div>

              <div>
                <textarea
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  name="message"
                  rows="6"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors duration-200"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary/90"
                >
                  {loading ? <Loader content="En cours d'envoi..."/>: "Envoyer"}
                  <Send size={20} className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
