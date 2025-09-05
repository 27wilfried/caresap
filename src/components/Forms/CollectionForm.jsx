import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { iconMap } from "../../data/initialData";
import { Loader } from "rsuite";
import { host } from "../../helpers/fonctions";

const CollectionForm = ({
  initialData,
  onSave,
  onCancel,
  loading,
  submitted,
}) => {
  const [formData, setFormData] = useState({
    titre: initialData?.titre || "",
    isNew: initialData?.isNew || false,
    photos:
      initialData?.PhotoCollections && initialData.PhotoCollections.length > 0
        ? initialData.PhotoCollections[0].img_col
        : "",
    id_col: initialData?.id_col || undefined,
  });

  // Met à jour le formulaire si on change de collection à éditer
  useEffect(() => {
    setFormData({
      titre: initialData?.titre || "",
      isNew: initialData?.isNew || false,
      photos:
        initialData?.PhotoCollections && initialData.PhotoCollections.length > 0
          ? initialData.PhotoCollections[0].img_col
          : "",
      id_col: initialData?.id_col || undefined,
    });
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photos: file }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-8 bg-white rounded-2xl mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          {formData.id_col
            ? "Éditer la collection"
            : "Ajouter une nouvelle collection"}
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
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
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
          {formData.photos &&
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
            className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {loading ? <Loader content="En cours d'envoi..." /> : "Sauvegarder"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex justify-center py-3 px-6 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default CollectionForm;
