import React, { useState, useRef, useEffect } from "react";
import { Briefcase, Plus, Edit, Trash, ArrowLeft, Layers } from "lucide-react";
import { Toast } from "primereact/toast";
import { Loader } from "rsuite";
import {
  shortenText,
  getData,
  createData,
  updateData,
  deleteData,
  host,
} from "../../helpers/fonctions";

import { useDispatch, useSelector } from "react-redux";
import { STORE_SERVICES, selectServices } from "../../redux/slice/serviceSlice";
import { selectToken } from "../../redux/slice/authSlice";

// Données mockées pour simuler l'état initial des services.
// La structure correspond à l'exemple que vous avez fourni.
const initialServices = [
  {
    id: 1,
    icon: Briefcase,
    title: "Évaluation de programmes et interventions de santé",
    description:
      "Évaluations d’impact, d’efficacité et de rentabilité de projets ou politiques de santé publique.",
    detail:
      "Évaluations d’impact, d’efficacité et de rentabilité de projets ou politiques de santé publique, avec recommandations stratégiques.",
    beneficiaries:
      "Projets de santé publique, ONG, agences de coopération, ministères et toute autre personne, particulier ou chercheur indépendant.",
    conditions:
      "Accès aux documents du programme, aux données existantes et aux parties prenantes.",
    procedure:
      "Contactez-nous via contact@caresap.org ou le formulaire en bas de page.",
    period: "4 à 10 semaines (possibilité express).",
    slug: "evaluation-de-programmes",
  },
  {
    id: 2,
    icon: Briefcase,
    title: "Analyse de données et recherche opérationnelle",
    description:
      "Services d'analyse statistique et de recherche pour l'aide à la décision en santé.",
    detail:
      "Analyse statistique avancée, modélisation épidémiologique et conception d'études de recherche pour des projets complexes.",
    beneficiaries:
      "Chercheurs, laboratoires pharmaceutiques, institutions académiques.",
    conditions: "Accès aux données brutes et protocoles de recherche.",
    procedure:
      "Envoyez-nous votre requête via email pour une consultation initiale.",
    period: "Variable selon la complexité.",
    slug: "analyse-de-donnees",
  },
];

/**
 * Composant de tableau de bord pour la gestion des services.
 * Permet d'afficher, d'ajouter, d'éditer et de supprimer des services.
 */
const ServicesDashboard = () => {
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const services = useSelector(selectServices);
  const token = useSelector(selectToken);
  const [closeForm, setCloseForm] = useState(false);
  const dispatch = useDispatch();

  const refetchPublication = async () => {
    const service = await getData("private/service/liste", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch(STORE_SERVICES({ services: service }));
  };

  // Fonction utilitaire pour générer le FormData à partir d'un objet data
  const buildFormData = (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null && key !== "id_serv") {
        // Pour le champ photos, on n'ajoute que si c'est un File
        if (key === "photos" && typeof data[key] !== "string") {
          formData.append(key, data[key]);
        } else if (key !== "photos") {
          formData.append(key, data[key]);
        }
      }
    }
    return formData;
  };

  const [editItem, setEditItem] = useState({
    titre: "",
    desc: "",
    detail_service: "",
    beneficiare: "",
    periode_standard: "",
    condition_application: "",
    photos: "",
  });

  const resetForm = () => {
    setCloseForm(false);
    setEditItem({
      titre: "",
      desc: "",
      detail_service: "",
      beneficiare: "",
      periode_standard: "",
      condition_application: "",
      photos: "",
    });
  };

  const handleAddService = async (newService) => {
    setLoading(true);
    setSubmitted(true);

    // resetForm();

    if (
      !newService.titre ||
      !newService.desc ||
      !newService.detail_service ||
      !newService.beneficiare ||
      !newService.periode_standard ||
      !newService.condition_application ||
      !newService.photos
    ) {
      toast.current?.show({
        severity: "warn",
        summary: "Champs manquants",
        detail: "Veuillez remplir tous les champs obligatoires.",
        life: 3000,
      });
      setLoading(false);
      return;
    }

    const formDataToSend = buildFormData(newService);
    try {
      let retour;

      retour = await createData("private/service", formDataToSend, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast.current.show({
        severity: "success",
        summary: "Succès",
        detail: `Le service ${
          retour.data?.pub?.titre || ""
        } a été crée avec succès`,
        life: 3000,
      });

      refetchPublication();
      setLoading(false);
      setSubmitted(false);
      setCloseForm(false);
    } catch (error) {
      console.log("erreur", error);
      toast.current.show({
        severity: "error",
        summary: "Erreur",
        detail:
          error?.response?.data?.message ||
          error?.data?.message ||
          "Erreur lors de l'opération, veuillez réessayer plus tard.",
        life: 3000,
      });
      setLoading(false);
      setCloseForm(false);
    }
  };

  const handleUpdateService = async (updatedService) => {
    setLoading(true);
    setSubmitted(true);

    // resetForm();

    if (
      !updatedService.titre ||
      !updatedService.desc ||
      !updatedService.detail_service ||
      !updatedService.beneficiare ||
      !updatedService.periode_standard ||
      !updatedService.condition_application ||
      !updatedService.photos
    ) {
      toast.current?.show({
        severity: "warn",
        summary: "Champs manquants",
        detail: "Veuillez remplir tous les champs obligatoires.",
        life: 3000,
      });
      setLoading(false);
      return;
    }

    const formDataToSend = buildFormData(updatedService);
    try {
      let retour;

      retour = await updateData(
        updatedService.id_serv,
        "private/service",
        formDataToSend,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.current.show({
        severity: "success",
        summary: "Succès",
        detail: `Le service ${
          retour?.serv?.titre || ""
        } a été modifiée avec succès`,
        life: 3000,
      });

      refetchPublication();
      setLoading(false);
      setSubmitted(false);
      setCloseForm(false);
    } catch (error) {
      console.log("erreur", error);
      toast.current.show({
        severity: "error",
        summary: "Erreur",
        detail:
          error?.response?.data?.message ||
          error?.data?.message ||
          "Erreur lors de l'opération, veuillez réessayer plus tard.",
        life: 3000,
      });
      setLoading(false);
      setCloseForm(false);
    }
  };

  const handleDeleteService = (service) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer ce service ${service.titre} ?`
      )
    ) {
      setLoading(true);
      try {
        deleteData(service.id_serv, "private/service", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }).then(() => {
          toast.current.show({
            severity: "success",
            summary: "Succès",
            detail: `Le service ${
              service?.titre || ""
            } a été supprimée avec succès`,
            life: 3000,
          });
          refetchPublication();
        });
        setLoading(false);
      } catch (error) {
        console.log("erreur", error);
        toast.current.show({
          severity: "error",
          summary: "Erreur",
          detail:
            error?.response?.data?.message ||
            error?.data?.message ||
            "Erreur lors de l'opération, veuillez réessayer plus tard.",
          life: 3000,
        });
        setLoading(false);
      }
    }
  };

  const ServiceForm = ({
    initialData,
    onSave,
    onCancel,
    submitted,
    loader,
  }) => {
    const [formData, setFormData] = useState({
      titre: initialData?.titre || "",
      desc: initialData?.desc || "",
      detail_service: initialData?.detail_service || "",
      beneficiare: initialData?.beneficiare || "",
      periode_standard: initialData?.periode_standard || "",
      condition_application: initialData?.condition_application || "",
      photos: initialData?.PhotoService?.img_serv || null,
      id_serv: initialData?.id_serv || undefined,
    });

    // Met à jour le formulaire si on change d'article à éditer
    React.useEffect(() => {
      setFormData({
        titre: initialData?.titre || "",
        desc: initialData?.desc || "",
        detail_service: initialData?.detail_service || "",
        beneficiare: initialData?.beneficiare || "",
        periode_standard: initialData?.periode_standard || "",
        condition_application: initialData?.condition_application || "",
        photos: initialData?.PhotoService?.img_serv || null,
        id_serv: initialData?.id_serv || undefined,
      });
    }, [initialData]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, photos: file }));
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="p-8 bg-white rounded-2xl  mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {formData.id_serv
              ? "Éditer le service"
              : "Ajouter un nouveau service"}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Titre
            </label>
            <input
              type="text"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {submitted && formData.titre === "" && (
              <span className="text-red-500 text-xs">
                Veuillez renseigner titre
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              rows="2"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            ></textarea>
            {submitted && formData.desc === "" && (
              <span className="text-red-500 text-xs">
                Veuillez renseigner une description
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Détail du service
            </label>
            <textarea
              name="detail_service"
              value={formData.detail_service}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            ></textarea>
            {submitted && formData.detail_service === "" && (
              <span className="text-red-500 text-xs">
                Veuillez renseigner un detail
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bénéficiaires
            </label>
            <textarea
              name="beneficiare"
              value={formData.beneficiare}
              onChange={handleChange}
              rows="2"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            ></textarea>
            {submitted && formData.beneficiare === "" && (
              <span className="text-red-500 text-xs">
                Veuillez renseigner un bénéfice
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Conditions d'application
            </label>
            <textarea
              name="condition_application"
              value={formData.condition_application}
              onChange={handleChange}
              rows="2"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            ></textarea>
            {submitted && formData.condition_application === "" && (
              <span className="text-red-500 text-xs">
                Veuillez renseigner la condition d'application
              </span>
            )}
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Procédure de demande
            </label>
            <textarea
              name="procedure"
              value={formData.procedure}
              onChange={handleChange}
              rows="2"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            ></textarea>
            {submitted && formData.procedure === "" && (
              <span className="text-red-500 text-xs">
                Veuillez renseigner la condition d'application
              </span>
            )}
          </div> */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Période standard
            </label>
            <input
              type="text"
              name="periode_standard"
              value={formData.periode_standard}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {submitted && formData.periode_standard === "" && (
              <span className="text-red-500 text-xs">
                Veuillez renseigner la periode
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full"
            />
            {submitted && formData.photos === "" && (
              <span className="text-red-500 text-xs">
                Veuillez sélectionner une image
              </span>
            )}
            {formData.photos != null &&
              (typeof formData.photos === "string" ? (
                <img
                  src={`${host}file/${formData.photos.replace(
                    "uploads/img/",
                    ""
                  )}`}
                  alt="Aperçu"
                  className="mt-3 w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <img
                  src={URL.createObjectURL(formData.photos)}
                  alt="Aperçu"
                  className="mt-3 w-full h-48 object-cover rounded-lg"
                />
              ))}
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              {loader ? (
                <Loader content="En cours d'envoi..." />
              ) : (
                "Sauvegarder"
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex justify-center py-3 px-6 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="p-10">
      <Toast ref={toast} />;
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 flex items-center">
        <Briefcase className="mr-4 text-indigo-500" size={32} />
        Gestion des Services
      </h1>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setEditItem({
              titre: "",
              desc: "",
              detail_service: "",
              beneficiare: "",
              periode_standard: "",
              condition_application: "",
              photos: "",
            });
            setCloseForm(true);
          }}
          className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
        >
          <Plus className="mr-2" size={20} />
          Ajouter un service
        </button>
      </div>
      {/* Rendu du formulaire d'édition/ajout si editItem n'est pas null */}
      {closeForm && (
        <ServiceForm
          initialData={editItem}
          submitted={submitted}
          loader={loading}
          onSave={editItem.id_serv ? handleUpdateService : handleAddService}
          onCancel={resetForm}
        />
      )}
      {/* Liste des services existants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {services?.map((service) => (
          <div
            key={service.id_serv}
            className="bg-white p-6 rounded-2xl  border border-gray-100 hover:border-indigo-300 transition-colors"
          >
            <img
              src={`${host}file/${service?.PhotoService?.img_serv?.replace(
                "uploads/img/",
                ""
              )}`}
              alt={service?.titre}
              className="w-full h-48 object-cover"
            />
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {service?.titre}
              </h3>

              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditItem(service);
                    setCloseForm(true);
                  }}
                  className="text-indigo-500 hover:text-indigo-700 transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteService(service)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
            <p className="text-gray-600">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesDashboard;
