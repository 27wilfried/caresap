import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Loader } from "rsuite";

const ProductForm = ({
  initialData,
  onSave,
  onCancel,
  collections,
  loading,
  submitted,
}) => {
  
  const [formData, setFormData] = useState({
    titre: initialData?.titre || "",
    desc: initialData?.desc || "",
    prix: initialData?.prix || "",
    img_res: initialData?.img_res || "",
    documents: initialData?.docs?.length > 0 ? initialData.docs : [],
    id_col: collections?.id_col,
    id_res: initialData?.id_res || null,
    isNew: initialData?.isNew || false,
  });

  useEffect(() => {
    setFormData({
      titre: initialData?.titre || "",
      desc: initialData?.desc || "",
      prix: initialData?.prix || "",
      img_res: initialData?.img_res || "",
      documents: initialData?.docs?.length > 0 ? initialData.docs : [],
      id_col: collections?.id_col,
      id_res: initialData?.id_res || null,
      isNew: initialData?.isNew || false,
    });
  }, [initialData]);

  // Gestion des champs textes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Image principale
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, img_res: file }));
    }
  };

  // Documents multiples
  const handleDocChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        documents: [...prev.documents, ...files], // ajout des nouveaux fichiers
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // Supprimer un document de la liste avant envoi
  const removeDocument = (index) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
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
        {/* Nom */}
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

        {/* Prix */}
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
              Veuillez renseigner un prix
            </span>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            rows="2"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
            required
          ></textarea>
          {submitted && formData.desc === "" && (
            <span className="text-red-500 text-xs">
              Veuillez renseigner une description
            </span>
          )}
        </div>

        {/* Image principale */}
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
          {submitted && !formData.img_res && (
            <span className="text-red-500 text-xs">
              Veuillez sélectionner une image
            </span>
          )}
          {formData.img_res && (
            <img
              src={
                typeof formData.img_res === "string"
                  ? formData.img_res
                  : URL.createObjectURL(formData.img_res)
              }
              alt="Aperçu"
              className="mt-3 w-full h-48 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Documents multiples */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Documents (pdf, docx, mp4, avi, mov, mkv)
          </label>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.mp4,.avi,.mov,.mkv"
            onChange={handleDocChange}
            className="mt-1 block w-full"
          />
          {submitted && formData.documents.length === 0 && (
            <span className="text-red-500 text-xs">
              Veuillez sélectionner au moins un document
            </span>
          )}

          {formData.documents.length > 0 && (
            <ul className="mt-3 space-y-2">
              {formData.documents.map((doc, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-sm bg-gray-50 px-3 py-2 rounded-lg border"
                >
                  <span className="truncate">
                    {typeof doc === "string" ? (
                      <a
                        href={doc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {doc.split("/").pop()}
                      </a>
                    ) : (
                      doc.name
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeDocument(index)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Boutons */}
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
