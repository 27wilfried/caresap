// src/components/Dashboard/BlogDashboard.jsx
import React, { useState, useRef } from "react";
import { Plus, Edit, Trash, ArrowLeft } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";
import {
  createData,
  deleteData,
  formatDate,
  getData,
  host,
  shortenText,
  updateData,
} from "../../helpers/fonctions";
import {
  selectPublications,
  STORE_PUBLICATIONS,
} from "../../redux/slice/publicationSlice";
import { selectToken } from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { Loader } from "rsuite";

// titre, sous_titre, desc, auteur,id_cat
// Modale de confirmation de suppression
const ConfirmationModal = ({ isOpen, onConfirm, blog, loading, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="p-8 bg-white rounded-2xl shadow-xl w-96">
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
          Confirmer la suppression
        </h3>
        <p className="text-gray-600 mb-6 text-center">
          Êtes-vous sûr de vouloir supprimer {blog} ? Cette action est
          irréversible.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            {loading ? (
              <Loader content="Suppression en cour..." />
            ) : (
              "Supprimer"
            )}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

// Formulaire d'ajout/édition
const PostForm = ({
  initialData,
  onSave,
  onCancel,
  loader,
  submitted,
  cat_pub,
}) => {
  const [formData, setFormData] = useState({
    titre: initialData?.titre || "",
    sous_titre: initialData?.sous_titre || "",
    desc: initialData?.desc || "",
    auteur: initialData?.auteur || "",
    id_cat: initialData?.id_cat || "",
    photos: initialData?.PhotoPub?.img_pub || null,
    id_pub: initialData?.id_pub || undefined,
  });

  // Met à jour le formulaire si on change d'article à éditer
  React.useEffect(() => {
    setFormData({
      titre: initialData?.titre || "",
      sous_titre: initialData?.sous_titre || "",
      desc: initialData?.desc || "",
      auteur: initialData?.auteur || "",
      id_cat: initialData?.id_cat || "",
      photos: initialData?.PhotoPub?.img_pub || null,
      id_pub: initialData?.id_pub || undefined,
    });
  }, [initialData]);

  const [preview, setPreview] = useState(
    initialData?.PhotoPub?.img_pub || null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fonction pour gérer le changement de contenu de l'éditeur TinyMCE
  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, desc: content }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photos: file }));
      setPreview(URL.createObjectURL(file));
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
          {formData.id_pub ? "Éditer l'article" : "Ajouter un nouvel article"}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 transition"
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
            Résumé
          </label>
          <textarea
            name="sous_titre"
            value={formData.sous_titre}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
            required
          />
          {submitted && formData.sous_titre === "" && (
            <span className="text-red-500 text-xs">
              Veuillez renseigner un résumé
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description complète
          </label>
          {/* Intégration de l'éditeur TinyMCE */}
          <Editor
            apiKey="qaung5mvnrg5qc559fcwltcm9dujp3p9446d73doct6md738" // REMPLACEZ CETTE CHAÎNE PAR VOTRE CLÉ API
            init={{
              height: 300,
              menubar: false,
              plugins:
                "advlist autolink lists link image charmap print preview anchor",
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                                      alignleft aligncenter alignright alignjustify | \
                                      bullist numlist outdent indent | removeformat | help",
            }}
            value={formData.desc}
            onEditorChange={handleEditorChange}
          />
          {submitted && formData.desc === "" && (
            <span className="text-red-500 text-xs">
              Veuillez renseigner une description
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Auteur
          </label>
          <input
            type="text"
            name="auteur"
            value={formData.auteur}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
            required
          />
          {submitted && formData.auteur === "" && (
            <span className="text-red-500 text-xs">
              Veuillez renseigner l'auteur
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full"
          />
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
          {submitted && formData.photos === null && (
            <span className="text-red-500 text-xs">
              Veuillez selectionner une image
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Catégorie
          </label>
          <select
            name="id_cat"
            value={formData.id_cat}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
            required
          >
            <option value="">-- Sélectionner une catégorie --</option>
            {cat_pub.map((cat) => (
              <option key={cat.id_cat} value={cat.id_cat}>
                {cat.nom}
              </option>
            ))}
          </select>
          {submitted && formData.id_pub === "" && (
            <span className="text-red-500 text-xs">
              Veuillez sélectionner une catégorie
            </span>
          )}
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loader}
            className="py-3 px-6 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {loader ? <Loader content="En cours d'envoi..." /> : "Sauvegarder"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="py-3 px-6 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

// Composant principal Dashboard
const BlogDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState({
    titre: "",
    sous_titre: "",
    desc: "",
    auteur: "",
    id_cat: "",
    photos: "",
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const publication = useSelector(selectPublications);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const uniquePub = [];
  const seen = new Set();
  publication.forEach((pub) => {
    const id = pub?.CategoriePub?.id_cat;
    const nom = pub?.CategoriePub?.nom;
    if (id && !seen.has(id)) {
      uniquePub.push({ id_cat: id, nom });
      seen.add(id);
    }
  });

  const handleAdd = () => {
    setEditingPost({
      titre: "",
      sous_titre: "",
      desc: "",
      auteur: "",
      id_cat: "",
      photos: "",
    });
    setShowForm(true);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDelete = (post) => {
    setPostToDelete(post);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setLoading(true);
    try {
      deleteData(postToDelete.id_pub, "private/publication", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then(() => {
        toast.current.show({
          severity: "success",
          summary: "Succès",
          detail: `La publication ${
            postToDelete?.titre || ""
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
    }
    setShowConfirm(false);
    setLoading(false);
  };

  const refetchPublication = async () => {
    const pub = await getData("private/publication/liste", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch(STORE_PUBLICATIONS({ publications: pub }));
  };

  // Fonction utilitaire pour générer le FormData à partir d'un objet data
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

  const handleSave = async (data) => {
    setLoading(true);
    setSubmitted(true);

    // Validation utilisateur
    if (
      !data.titre ||
      !data.sous_titre ||
      !data.desc ||
      !data.auteur ||
      !data.id_cat ||
      !data.photos
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

    const formDataToSend = buildFormData(data);

    try {
      let retour;
      if (data.id_pub) {
        retour = await updateData(data.id_pub, "private/publication", formDataToSend, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        toast.current.show({
          severity: "success",
          summary: "Succès",
          detail: `La publication ${
            retour?.pub?.titre || ""
          } a été modifiée avec succès`,
          life: 3000,
        });
      } else {
        retour = await createData("private/publication", formDataToSend, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        toast.current.show({
          severity: "success",
          summary: "Succès",
          detail: `La publication ${
            retour.data?.pub?.titre || ""
          } a été créée avec succès`,
          life: 3000,
        });
      }
      refetchPublication();
      setLoading(false);
      setSubmitted(false);
      setShowForm(false);
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
    <div className="p-6">
      <Toast ref={toast} />;
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          Gestion des articles
        </h2>
        {!showForm && (
          <button
            onClick={handleAdd}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-700"
          >
            <Plus size={18} className="mr-2" />
            Nouvel article
          </button>
        )}
      </div>
      {showForm ? (
        <PostForm
          initialData={editingPost}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
          cat_pub={uniquePub}
          loader={loading}
          submitted={submitted}
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publication.map((post) => (
            <div
              key={post?.id_pub}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={`${host}file/${post?.PhotoPub?.img_pub?.replace(
                  "uploads/img/",
                  ""
                )}`}
                alt={post?.titre}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{post?.titre}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {formatDate(post?.createdAt)} - {post?.auteur} |{" "}
                  {post?.CategoriePub?.nom}
                </p>
                <p className="text-gray-700 mb-4">
                  {shortenText(post?.sous_titre, 40)}
                </p>
                {/* Affichage de la description avec dangerouslySetInnerHTML */}
                {post?.desc && (
                  <div
                    className="text-gray-700 mb-4 prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: shortenText(post?.desc, 60),
                    }}
                  ></div>
                )}
                <div className="flex justify-between">
                  <button
                    onClick={() => handleEdit(post)}
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    <Edit size={16} className="mr-1" /> Éditer
                  </button>
                  <button
                    onClick={() => handleDelete(post)}
                    className="flex items-center text-red-600 hover:underline"
                  >
                    <Trash size={16} className="mr-1" /> Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ConfirmationModal
        isOpen={showConfirm}
        blog={postToDelete.titre}
        loading={loading}
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default BlogDashboard;
