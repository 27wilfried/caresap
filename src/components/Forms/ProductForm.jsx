import React, { useState, useEffect } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import FileUploader from "../shared/FileUploader";
import { Loader } from "rsuite";
import { host } from "../../helpers/fonctions";

const ProductForm = ({
  initialData,
  onSave,
  onCancel,
  collections,
  loading,
  submitted,
}) => {
  // Configuration des types de fichiers en fonction de la collection

  const [formData, setFormData] = useState({
    titre: initialData?.titre || "",
    desc: initialData?.desc || "",
    prix: initialData?.prix || "",
    photos: initialData?.PhotoRessource
      ? initialData.PhotoRessource.img_res
      : "",
    documents: initialData?.DocRessource
      ? initialData.DocRessource?.doc_res
      : "",
    id_col: collections?.id_col,
    id_res: initialData?.id_res || null,
    isNew: initialData?.isNew || false,
  });

  useEffect(() => {
    setFormData({
      titre: initialData?.titre || "",
      desc: initialData?.desc || "",
      prix: initialData?.prix || "",
      photos: initialData?.PhotoRessource
        ? initialData.PhotoRessource.img_res
        : "",
      documents: initialData?.DocRessource
        ? initialData.DocRessource?.doc_res
        : "",
      id_col: collections?.id_col,
      id_res: initialData?.id_res || null,
      isNew: initialData?.isNew || false,
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photos: file }));
    }
  };

  const handleDocChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, documents: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-xl mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          {formData.titre
            ? `Éditer le produit (${formData?.titre})`
            : `Ajouter un nouveau produit à la collection "${collections?.titre}"`}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Champs de base */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom du produit
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
              Veuillez renseigner un nom
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prix
          </label>
          <input
            type="number"
            name="prix"
            value={formData.prix}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
            required
          />
          {submitted && formData.prix === "" && (
            <span className="text-red-500 text-xs">
              Veuillez renseigner prix
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

        {/* Uploader d'image de couverture */}
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

        {/* Uploader du fichier de contenu (dynamique) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Document (zip, pdf, docx)
          </label>
          <input
            type="file"
            accept=".zip,.pdf,.doc,.docx,application/pdf,application/zip,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
            onChange={handleDocChange}
            className="mt-1 block w-full"
          />
          {submitted && formData.documents === "" && (
            <span className="text-red-500 text-xs">
              Veuillez sélectionner un document (zip, pdf, docx)
            </span>
          )}
          {formData.documents &&
            (typeof formData.documents === "string" ? (
              <a
                href={`${host}file/${formData.documents.replace(
                  "uploads/doc/",
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-blue-600 underline"
              >
                Télécharger le document
              </a>
            ) : (
              <span className="mt-3 block text-gray-700">
                {formData.documents.name}
              </span>
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

export default ProductForm;
