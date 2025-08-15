import React, { useState, useCallback } from 'react';
import { Plus, Edit, Trash, ArrowLeft, Laptop, Book, Clipboard, FileText } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

// Données mockées sans URLs externes
const initialCollections = [
  {
    id: "formations",
    title: "Formations",
    slug: "formations",
    image: "",
    description: "Formations professionnelles certifiantes",
    isNew: true,
    icon: "Laptop",
  },
  {
    id: "livres",
    title: "Livres",
    slug: "livres",
    image: "",
    description: "Ouvrages de référence en santé publique",
    isNew: false,
    icon: "Book",
  },
  {
    id: "supports",
    title: "Supports",
    slug: "supports",
    image: "",
    description: "Supports pédagogiques et théoriques",
    isNew: true,
    icon: "Clipboard",
  },
  {
    id: "articles",
    title: "Articles",
    slug: "articles",
    image: "",
    description: "Articles de recherche et publications",
    isNew: false,
    icon: "FileText",
  }
];

const initialProducts = [
  {
    id: "form-001", 
    collectionId: "formations", 
    name: "Data Science pour la Santé Publique", 
    slug: "data-science-sante-publique",
    image: "", 
    price: 299.99, 
    originalPrice: 399.99, 
    currency: "€",
    description: "Formation complète en Data Science appliquée à la santé publique avec Python et R.", 
    shortDescription: "Maîtrisez la Data Science en santé publique",
    duration: "40 heures", 
    level: "Intermédiaire", 
    instructor: "Dr. Marie Dubois", 
    rating: 4.8, 
    reviewsCount: 156, 
    studentsCount: 1247,
    features: ["Certificat inclus", "Support 24/7", "Accès à vie", "Projets pratiques"],
    badges: [{ type: "bestseller", label: "Bestseller", color: "bg-orange-500" }, { type: "discount", label: "-25%", color: "bg-red-500" }],
    inStock: true, 
    createdAt: "2024-01-15", 
    updatedAt: "2024-08-01",
  },
  {
    id: "form-002", 
    collectionId: "formations", 
    name: "Introduction aux Essais Cliniques", 
    slug: "introduction-essais-cliniques",
    image: "", 
    price: 199.99, 
    currency: "€",
    description: "Formation complète sur la conception, conduite et analyse des essais cliniques.", 
    shortDescription: "Les fondamentaux des essais cliniques",
    duration: "25 heures", 
    level: "Débutant", 
    instructor: "Prof. Jean Martin", 
    rating: 4.6, 
    reviewsCount: 89, 
    studentsCount: 678,
    features: ["Certificat inclus", "Quiz interactifs", "Études de cas", "Forum communauté"],
    badges: [{ type: "new", label: "Nouveau", color: "bg-green-500" }],
    inStock: true, 
    createdAt: "2024-07-20", 
    updatedAt: "2024-08-05",
  },
  {
    id: "book-001", 
    collectionId: "livres", 
    name: "Épidémiologie Pratique", 
    slug: "epidemiologie-pratique-guide",
    image: "",
    price: 89.99, 
    originalPrice: 109.99, 
    currency: "€",
    description: "Guide complet d'épidémiologie pratique avec études de cas réels et méthodologies actualisées.", 
    shortDescription: "Le guide de référence en épidémiologie",
    pages: 456, 
    format: "PDF + Papier", 
    author: "Dr. Anne Mercier", 
    publisher: "Éditions Santé+", 
    isbn: "978-2-123456-78-9",
    language: "Français", 
    rating: 4.8, 
    reviewsCount: 324,
    badges: [{ type: "bestseller", label: "Bestseller", color: "bg-orange-500" }, { type: "discount", label: "-18%", color: "bg-red-500" }],
    inStock: true, 
    createdAt: "2024-01-08", 
    updatedAt: "2024-07-22",
  }
];

const iconMap = {
  Laptop: Laptop,
  Book: Book,
  Clipboard: Clipboard,
  FileText: FileText,
};

const FormationsDashboard = () => {
  const [collections, setCollections] = useState(initialCollections);
  const [products, setProducts] = useState(initialProducts);
  const [currentView, setCurrentView] = useState('collections');
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [uploadedImages, setUploadedImages] = useState({});

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        const imageUrl = reader.result;
        if (editingItem) {
          setEditingItem(prev => ({ ...prev, image: imageUrl }));
        }
        setUploadedImages(prev => ({
          ...prev,
          [editingItem?.id || `temp-${Date.now()}`]: imageUrl
        }));
      };
      
      reader.readAsDataURL(file);
    }
  }, [editingItem]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false
  });

  const handleAddCollection = (newCollection) => {
    const newId = `col-${Date.now()}`;
    setCollections([...collections, { 
      ...newCollection, 
      id: newId, 
      icon: iconMap[newCollection.icon] 
    }]);
    setEditingItem(null);
  };

  const handleUpdateCollection = (updatedCollection) => {
    setCollections(collections.map(c => 
      c.id === updatedCollection.id ? { 
        ...updatedCollection, 
        icon: iconMap[updatedCollection.icon] 
      } : c
    ));
    setEditingItem(null);
  };

  const handleDeleteCollection = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette collection et tous ses produits ?')) {
      setCollections(collections.filter(c => c.id !== id));
      setProducts(products.filter(p => p.collectionId !== id));
      setCurrentView('collections');
    }
  };

  const handleAddProduct = (newProduct) => {
    const newId = `prod-${Date.now()}`;
    const newBadges = newProduct.badges.split(',').map(type => ({ 
      type: type.trim(), 
      label: type.trim(), 
      color: 'bg-gray-500' 
    }));
    setProducts([...products, { 
      ...newProduct, 
      id: newId, 
      badges: newBadges, 
      collectionId: selectedCollectionId 
    }]);
    setEditingItem(null);
  };

  const handleUpdateProduct = (updatedProduct) => {
    const updatedBadges = updatedProduct.badges.split(',').map(type => ({ 
      type: type.trim(), 
      label: type.trim(), 
      color: 'bg-gray-500' 
    }));
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? { 
        ...updatedProduct, 
        badges: updatedBadges 
      } : p
    ));
    setEditingItem(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const CollectionForm = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      ...initialData,
      image: uploadedImages[initialData.id] || initialData.image || ''
    });

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({ 
        ...prev, 
        [name]: type === 'checkbox' ? checked : value 
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="p-8 bg-white rounded-2xl shadow-xl mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {formData.id ? 'Éditer la collection' : 'Ajouter une nouvelle collection'}
          </h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Titre</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input 
              type="text" 
              name="slug" 
              value={formData.slug} 
              onChange={handleChange} 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <div 
              {...getRootProps()} 
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${
                isDragActive ? 'border-indigo-500' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              {formData.image ? (
                <div className="text-center">
                  <img src={formData.image} alt="Preview" className="mx-auto h-32 object-contain" />
                  <p className="mt-2 text-sm text-indigo-600">
                    Cliquer ou glisser une nouvelle image pour remplacer
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    {isDragActive 
                      ? 'Déposez l\'image ici...' 
                      : 'Glissez-déposez une image ici, ou cliquez pour sélectionner'}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom de l'icône (ex: Laptop, Book)</label>
            <input 
              type="text" 
              name="icon" 
              value={formData.icon} 
              onChange={handleChange} 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm" 
              required 
            />
          </div>
          <div className="flex items-center">
            <input 
              id="isNew" 
              name="isNew" 
              type="checkbox" 
              checked={formData.isNew} 
              onChange={handleChange} 
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded" 
            />
            <label htmlFor="isNew" className="ml-2 block text-sm text-gray-900">
              Nouvelle collection
            </label>
          </div>
          <div className="flex space-x-4">
            <button 
              type="submit" 
              className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sauvegarder
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

  const ProductForm = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      ...initialData,
      image: uploadedImages[initialData.id] || initialData.image || '',
      badges: initialData.badges?.map(b => b.type).join(', ') || ''
    });

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({ 
        ...prev, 
        [name]: type === 'checkbox' ? checked : value 
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="p-8 bg-white rounded-2xl shadow-xl mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {formData.id ? 'Éditer le produit' : 'Ajouter un nouveau produit'}
          </h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom du produit</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input 
              type="text" 
              name="slug" 
              value={formData.slug} 
              onChange={handleChange} 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <div 
              {...getRootProps()} 
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${
                isDragActive ? 'border-indigo-500' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              {formData.image ? (
                <div className="text-center">
                  <img src={formData.image} alt="Preview" className="mx-auto h-32 object-contain" />
                  <p className="mt-2 text-sm text-indigo-600">
                    Cliquer ou glisser une nouvelle image pour remplacer
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    {isDragActive 
                      ? 'Déposez l\'image ici...' 
                      : 'Glissez-déposez une image ici, ou cliquez pour sélectionner'}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Prix (€)</label>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Badges (séparés par des virgules, ex: bestseller, new)
            </label>
            <input 
              type="text" 
              name="badges" 
              value={formData.badges} 
              onChange={handleChange} 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm" 
            />
          </div>
          <div className="flex items-center">
            <input 
              id="inStock" 
              name="inStock" 
              type="checkbox" 
              checked={formData.inStock} 
              onChange={handleChange} 
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded" 
            />
            <label htmlFor="inStock" className="ml-2 block text-sm text-gray-900">
              En stock
            </label>
          </div>
          <div className="flex space-x-4">
            <button 
              type="submit" 
              className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sauvegarder
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

  const renderContent = () => {
    if (editingItem) {
      if (editingItem.collectionId) {
        return (
          <ProductForm 
            initialData={editingItem} 
            onSave={handleUpdateProduct} 
            onCancel={() => setEditingItem(null)} 
          />
        );
      } else {
        return (
          <CollectionForm 
            initialData={editingItem} 
            onSave={handleUpdateCollection} 
            onCancel={() => setEditingItem(null)} 
          />
        );
      }
    }
    
    if (currentView === 'collections') {
      return (
        <div>
          <div className="flex justify-end mb-6">
            <button 
              onClick={() => setEditingItem({ 
                id: null, 
                title: '', 
                slug: '', 
                image: '', 
                description: '', 
                isNew: false, 
                icon: '' 
              })} 
              className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
            >
              <Plus className="mr-2" size={20} />
              Ajouter une collection
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {collections.map(collection => {
              const IconComponent = iconMap[collection.icon];
              return (
                <div 
                  key={collection.id} 
                  className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:border-indigo-300 transition-colors cursor-pointer" 
                  onClick={() => { 
                    setCurrentView('products'); 
                    setSelectedCollectionId(collection.id); 
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="p-3 bg-indigo-100 rounded-full mr-4">
                        {IconComponent && <IconComponent className="text-indigo-600" size={24} />}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{collection.title}</h3>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setEditingItem({ 
                            ...collection, 
                            icon: collection.icon 
                          }); 
                        }} 
                        className="text-indigo-500 hover:text-indigo-700 transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          handleDeleteCollection(collection.id); 
                        }} 
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                  {collection.image && (
                    <img 
                      src={collection.image} 
                      alt={collection.title} 
                      className="w-full h-40 object-cover rounded-lg mb-4" 
                    />
                  )}
                  <p className="text-gray-600">{collection.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (currentView === 'products') {
      const currentCollection = collections.find(c => c.id === selectedCollectionId);
      const filteredProducts = products.filter(p => p.collectionId === selectedCollectionId);

      return (
        <div>
          <div className="flex items-center mb-6">
            <button 
              onClick={() => setCurrentView('collections')} 
              className="mr-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-3xl font-extrabold text-gray-800 flex-grow">
              {currentCollection?.title}
            </h2>
            <button 
              onClick={() => setEditingItem({ 
                id: null, 
                name: '', 
                slug: '', 
                image: '', 
                price: '', 
                description: '', 
                inStock: true, 
                badges: '' 
              })} 
              className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
            >
              <Plus className="mr-2" size={20} />
              Ajouter un produit
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setEditingItem(product)} 
                      className="text-indigo-500 hover:text-indigo-700 transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)} 
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
                {product.image && (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-40 object-cover rounded-lg mb-4" 
                  />
                )}
                <p className="text-gray-600 text-sm mb-2">{product.shortDescription}</p>
                <div className="flex items-center justify-between text-lg font-bold text-gray-900">
                  <span>{product.price} {product.currency}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {product.originalPrice} {product.currency}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 flex items-center">
        <Laptop className="mr-4 text-indigo-500" size={32} />
        Gestion des Collections & Produits
      </h1>
      {renderContent()}
    </div>
  );
};

export default FormationsDashboard;