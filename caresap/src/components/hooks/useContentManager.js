import { useState, useCallback } from 'react';
import { initialCollections, initialProducts, iconMap } from '../../data/initialData';

export const useContentManager = () => {
  const [collections, setCollections] = useState(initialCollections);
  const [products, setProducts] = useState(initialProducts);
  const [currentView, setCurrentView] = useState('collections');
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedMedia, setUploadedMedia] = useState(null); // Nouvel état pour le fichier de contenu

  const onImageUpload = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const onMediaUpload = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedMedia(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const onImageRemove = useCallback(() => {
    setUploadedImage(null);
  }, []);

  const onMediaRemove = useCallback(() => {
    setUploadedMedia(null);
  }, []);

  const handleAddCollection = (newCollection) => {
    const newId = `coll-${Date.now()}`;
    const newCollectionWithId = { ...newCollection, id: newId };
    setCollections(prev => [...prev, newCollectionWithId]);
    setEditingItem(null);
    setUploadedImage(null);
  };

  const handleUpdateCollection = (updatedCollection) => {
    setCollections(prev => prev.map(c => c.id === updatedCollection.id ? updatedCollection : c));
    setEditingItem(null);
    setUploadedImage(null);
  };

  const handleDeleteCollection = (collectionId) => {
    setCollections(prev => prev.filter(c => c.id !== collectionId));
    setProducts(prev => prev.filter(p => p.collectionId !== collectionId));
  };

  const handleAddProduct = (newProduct) => {
    const newId = `prod-${Date.now()}`;
    const newProductWithId = {
      ...newProduct,
      id: newId,
      collectionId: selectedCollectionId,
      image: uploadedImage || newProduct.image,
      media: uploadedMedia || newProduct.media,
    };
    setProducts(prev => [...prev, newProductWithId]);
    setEditingItem(null);
    setUploadedImage(null);
    setUploadedMedia(null);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? {
      ...updatedProduct,
      image: uploadedImage || updatedProduct.image,
      media: uploadedMedia || updatedProduct.media,
    } : p));
    setEditingItem(null);
    setUploadedImage(null);
    setUploadedMedia(null);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleBackToCollections = () => {
    setCurrentView('collections');
    setSelectedCollectionId(null);
    setEditingItem(null);
  };

  return {
    collections,
    products,
    currentView,
    selectedCollectionId,
    editingItem,
    uploadedImage,
    uploadedMedia,
    iconMap,
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
    onImageUpload,
    onImageRemove,
    onMediaUpload,
    onMediaRemove,
  };
};