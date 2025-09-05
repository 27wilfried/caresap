import React from "react";
import { Laptop } from "lucide-react";
import { useContentManager } from "../hooks/useContentManager";
import CollectionForm from "../Forms/CollectionForm";
import ProductForm from "../Forms/ProductForm";
import CollectionsList from "./CollectionsList";
import ProductsList from "./ProductsList";
import { useSelector } from "react-redux";
import { selectCollectionsAndRessources } from "../../redux/slice/collectionAndRessourceSlice";

const FormationsDashboard = () => {
  const {
    collections,
    currentView,
    selectedCollectionId,
    editingItem,
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
   
  } = useContentManager();

  const handleSelectCollection = (id_col) => {
    setSelectedCollectionId(id_col);
    setCurrentView("products");
  };

  const selectedCollection = collections.find(
    (c) => c.id_col === selectedCollectionId
  );
  // const productsForSelectedCollection = products.filter(
  //   (p) => p.collectionId === selectedCollectionId
  // );

  const renderContent = () => {

    if (editingItem) {
      if (
        (editingItem.id_col && currentView === "collections") ||
        currentView === "collections"
      ) {
        // Formulaire pour un produit
        return (
          // <ProductForm
          //   initialData={editingItem}
          //   onSave={handleUpdateProduct}
          //   onCancel={() => setEditingItem(null)}
          //   uploadedImage={uploadedImage}
          //   onImageUpload={onImageUpload}
          //   onImageRemove={onImageRemove}
          //   uploadedMedia={uploadedMedia}
          //   onMediaUpload={onMediaUpload}
          //   onMediaRemove={onMediaRemove}
          //   collections={collections}
          // />
          <CollectionForm
            initialData={editingItem}
            onSave={
              editingItem.id_col ? handleUpdateCollection : handleAddCollection
            }
            loading={loading}
            submitted={submitted}
            onCancel={() => setEditingItem(null)}
          />
        );
      } else {
        // Formulaire pour une collection
        return (
          // <CollectionForm
          //   initialData={editingItem}
          //   onSave={handleUpdateCollection}
          //   onCancel={() => setEditingItem(null)}
          //   uploadedImage={uploadedImage}
          //   onImageUpload={onImageUpload}
          //   onImageRemove={onImageRemove}
          // />
          <ProductForm
            initialData={editingItem}
            loading={loading}
            submitted={submitted}
            onSave={editingItem.id_res ? handleUpdateProduct : handleAddProduct}
            onCancel={() => setEditingItem(null)}
            collections={selectedCollection}
          />
        );
      }
    }

    if (currentView === "collections") {
      return (
        <CollectionsList
          collections={collections}
          onSelectCollection={handleSelectCollection}
          onEdit={setEditingItem}
          onDelete={handleDeleteCollection}
          onAddNew={() => setEditingItem({})}
        />
      );
    }

    if (currentView === "products" && selectedCollection) {
      return (
        <ProductsList
          products={selectedCollection?.Ressources}
          collection={selectedCollection}
          onBack={handleBackToCollections}
          onEdit={setEditingItem}
          onDelete={handleDeleteProduct}
          onAddNew={() => setEditingItem({ id_col: selectedCollectionId })}
        />
      );
    }

    return null; // ou un composant d'erreur/vide
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 flex items-center"></h1>
      {renderContent()}
    </div>
  );
};

export default FormationsDashboard;
