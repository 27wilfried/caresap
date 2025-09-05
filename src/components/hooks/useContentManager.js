import { useState, useCallback } from "react";
import { iconMap } from "../../data/initialData";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCollectionsAndRessources,
  STORE_COLLECTIONS_AND_RESSOURCES,
} from "../../redux/slice/collectionAndRessourceSlice";
import {
  getData,
  createData,
  deleteData,
  updateData,
} from "../../helpers/fonctions";
import { toast } from "react-toastify";
import { selectToken } from "../../redux/slice/authSlice";

export const useContentManager = () => {
  const collections = useSelector(selectCollectionsAndRessources);
  const token = useSelector(selectToken);
  const [currentView, setCurrentView] = useState("collections");
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const refetchCollection = async () => {
    const collection = await getData("private/collection/liste", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch(
      STORE_COLLECTIONS_AND_RESSOURCES({
        collections_and_ressources: collection,
      })
    );
  };

  const buildFormData = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null && key !== "id_col") {
        // Ajoute les fichiers seulement si ce sont des objets File
        if (
          (key === "photos" || key === "documents") &&
          data[key] instanceof File
        ) {
          formData.append(key, data[key]);
        } else if (key !== "photos" && key !== "documents") {
          formData.append(key, data[key]);
        }
      }
    }
    // Ajoute id_col explicitement si besoin
    if (data.id_col) formData.append("id_col", data.id_col);
    return formData;
  };

  const handleAddCollection = async (newCollection) => {
    setLoading(true);
    setSubmitted(true);
    if (!newCollection.titre || !newCollection.photos) {
      toast.error("Veuillez remplir tous les champs obligatoires.", {
        position: "top-left",
      });
      setLoading(false);
      return;
    }
    const formDataToSend = buildFormData(newCollection);
    try {
      let retour;

      retour = await createData("private/collection", formDataToSend, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      toast.success("La collection est créée avec succès", {
        position: "top-left",
      });
      refetchCollection();
      setLoading(false);
      setSubmitted(false);
      setEditingItem(null);
    } catch (error) {
      console.log("erreur", error);
      toast.error(
        `${
          error?.response?.data?.message ||
          error?.data?.message ||
          "Erreur lors de l'opération, veuillez réessayer plus tard."
        } `,
        {
          position: "top-left",
        }
      );
      setLoading(false);
    }
  };

  const handleUpdateCollection = async (updatedCollection) => {
    console.log("updating", updatedCollection);
    setLoading(true);
    setSubmitted(true);
    if (!updatedCollection.titre || !updatedCollection.photos) {
      toast.error("Veuillez remplir tous les champs obligatoires.", {
        position: "top-left",
      });
      setLoading(false);
      return;
    }
    const formDataToSend = buildFormData(updatedCollection);
    try {
      let retour;

      retour = await updateData(
        updatedCollection.id_col,
        "private/collection",
        formDataToSend,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("La collection est modifiée avec succès", {
        position: "top-left",
      });

      refetchCollection();
      setSubmitted(true);
      setLoading(false);
    } catch (error) {
      console.log("erreur", error);
      toast.error("Erreur lors de la modification", {
        position: "top-left",
      });
      setLoading(false);
    }
    setEditingItem(null);
  };

  const handleDeleteCollection = (collection) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer cette collection ${collection.titre} ?`
      )
    ) {
      try {
        deleteData(collection.id_col, "private/collection", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }).then(() => {
          toast.success("La collection est supprimée avec succès", {
            position: "top-left",
          });
          refetchCollection();
        });
        // setLoading(false);
      } catch (error) {
        console.log("erreur", error);
        toast.error("Erreur lors de la suppression", {
          position: "top-left",
        });
        // setLoading(false);
      }
    }
  };

  const handleAddProduct = async (newProduct) => {
    setLoading(true);
    setSubmitted(true);
    if (
      !newProduct.titre ||
      !newProduct.desc ||
      !newProduct.prix ||
      !newProduct.id_col ||
      !newProduct.documents ||
      !newProduct.photos
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires.", {
        position: "top-left",
      });
      setLoading(false);
      return;
    }
    const formDataToSend = buildFormData(newProduct);

    try {
      let retour;

      retour = await createData("private/ressource", formDataToSend, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      toast.success("La ressource est créée avec succès", {
        position: "top-left",
      });
      refetchCollection();
      setLoading(false);
      setSubmitted(false);
    } catch (error) {
      console.log("erreur", error);
      toast.error(
        `${
          error?.response?.data?.message ||
          error?.data?.message ||
          "Erreur lors de l'opération, veuillez réessayer plus tard."
        } `,
        {
          position: "top-left",
        }
      );
      setLoading(false);
    }

    setEditingItem(null);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    setLoading(true);
    setSubmitted(true);
    if (
      !updatedProduct.titre ||
      !updatedProduct.desc ||
      !updatedProduct.prix ||
      !updatedProduct.id_col ||
      !updatedProduct.documents ||
      !updatedProduct.photos
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
    const formDataToSend = buildFormData(updatedProduct);
    try {
      let retour;

      retour = await updateData(
        updatedProduct.id_res,
        "private/ressource",
        formDataToSend,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("La ressource est modifiée avec succès", {
        position: "top-left",
      });

      refetchCollection();
      setLoading(false);
      setSubmitted(false);
    } catch (error) {
      console.log("erreur", error);
      toast.error("Erreur lors de la modification", {
        position: "top-left",
      });
      setLoading(false);
    }
    setEditingItem(null);
  };

  const handleDeleteProduct = (product) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer cette ressource ${product.titre} ?`
      )
    ) {
      try {
        deleteData(product.id_res, "private/ressource", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }).then(() => {
          toast.success("La ressource est supprimée avec succès", {
            position: "top-left",
          });
          refetchCollection();
        });
        // setLoading(false);
      } catch (error) {
        console.log("erreur", error);
        toast.error("Erreur lors de la suppression", {
          position: "top-left",
        });
        // setLoading(false);
      }
    }
  };

  const handleBackToCollections = () => {
    setCurrentView("collections");
    setSelectedCollectionId(null);
    setEditingItem(null);
  };

  return {
    collections,
    currentView,
    selectedCollectionId,
    editingItem,
    iconMap,
    loading,
    submitted,
    setCurrentView,
    setSelectedCollectionId,
    setEditingItem,
    handleBackToCollections,
    handleAddCollection,
    handleUpdateCollection,
    handleDeleteCollection,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  };
};
