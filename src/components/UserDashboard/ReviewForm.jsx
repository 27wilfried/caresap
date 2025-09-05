import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Rate } from "rsuite";
import { useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { Loader } from "rsuite";
import { selectToken } from "../../redux/slice/authSlice";
import { createData } from "../../helpers/fonctions";

/**
 * Composant de formulaire d'avis.
 * Gère la soumission des avis des utilisateurs.
 */
const ReviewForm = () => {
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const token = useSelector(selectToken);
  const [formData, setFormData] = useState({
    nom: "",
    titre: "",
    profession: "",
    pays: "",
    text: "",
    nbre_etoil: "",
    photos: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photos: file }));
    }
  };

  const buildFormData = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null && key !== "id_pub") {
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

  const handleSubmit = async () => {
    setLoading(true);
    setSubmitted(true);

    if (
      !formData.titre ||
      !formData.nom ||
      !formData.profession ||
      !formData.pays ||
      !formData.nbre_etoil ||
      !formData.nbre_etoil === 0 ||
      !formData.text ||
      !formData.photos
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

    const formDataToSend = buildFormData(formData);

    try {
      let retour;

      retour = await createData("private/avis", formDataToSend, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast.current.show({
        severity: "success",
        summary: "Succès",
        detail: "Votre avis est envoyé avec succès.",
        life: 3000,
      });

      setFormData({
        nom: "",
        titre: "",
        profession: "",
        pays: "",
        text: "",
        nbre_etoil: "",
        photos: "",
      });
      setLoading(false);
      setSubmitted(false);
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
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8">
      <Toast ref={toast} />;
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Laisser un avis</h2>
      <form className="space-y-6">
        {/* Champ pour la profession */}
        <div>
          <label
            htmlFor="nom"
            className="block text-sm font-medium text-gray-700"
          >
            Nom et prénom
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
            placeholder="Jules AGBO"
          />
          {submitted && formData.nom === "" && (
            <span className="text-red-500 text-xs">
              Veuillez renseigner un nom et prénom
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="titre"
            className="block text-sm font-medium text-gray-700"
          >
            titre
          </label>
          <input
            type="text"
            id="titre"
            name="titre"
            value={formData.titre}
            onChange={(e) =>
              setFormData({ ...formData, titre: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
            placeholder=""
          />
        </div>
        <div>
          <label
            htmlFor="profession"
            className="block text-sm font-medium text-gray-700"
          >
            profession
          </label>
          <input
            type="text"
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={(e) =>
              setFormData({ ...formData, profession: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
            placeholder=""
          />
        </div>
        <div>
          <label
            htmlFor="pays"
            className="block text-sm font-medium text-gray-700"
          >
            Pays
          </label>
          <input
            type="text"
            id="pays"
            name="pays"
            value={formData.pays}
            onChange={(e) => setFormData({ ...formData, pays: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
            placeholder=""
          />
        </div>
        {/* Champ pour l'image */}
        <div>
          <label
            htmlFor="photos"
            className="block text-sm font-medium text-gray-700"
          >
            Photo
          </label>
          <input
            type="file"
            id="photos"
            name="photos"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
        </div>
        {submitted && formData.photos === "" && (
          <span className="text-red-500 text-xs">
            Veuillez sélectionner une image
          </span>
        )}
        {formData.photos !== "" && (
          <img
            src={URL.createObjectURL(formData.photos)}
            alt="Aperçu"
            className="mt-3 w-full h-48 object-cover rounded-lg"
          />
        )}

        {/* Système d'étoiles */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Votre note
          </label>
          <div className="flex items-center space-x-1">
            <Rate
              max={5}
              value={formData.nbre_etoil}
              onChange={(value) =>
                setFormData({ ...formData, nbre_etoil: value })
              }
            />
          </div>
        </div>
        {submitted && formData.nbre_etoil === "" && (
          <span className="text-red-500 text-xs">Veuillez donner une note</span>
        )}

        {/* Champ de texte pour l'avis */}
        <div>
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700"
          >
            Votre avis
          </label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
            placeholder="Partagez vos impressions sur nos services ou formations..."
          ></textarea>
        </div>
        {submitted && formData.text === "" && (
          <span className="text-red-500 text-xs">
            Veuillez donner votre avis
          </span>
        )}

        <button
          type="button"
          disabled={loading}
          onClick={() => handleSubmit()}
          className="w-full sm:w-auto flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? (
            <Loader content="En cours d'envoi..." />
          ) : (
            "Envoyer l'avis"
          )}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
