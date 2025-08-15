import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import FileUploader from '../Shared/FileUploader';

const ProductForm = ({ 
    initialData, 
    onSave, 
    onCancel, 
    uploadedImage, 
    onImageUpload, 
    onImageRemove, 
    uploadedMedia,
    onMediaUpload,
    onMediaRemove,
    collectionId,
    collections
}) => {
    
    // Configuration des types de fichiers en fonction de la collection
    const fileAcceptConfig = {
        formations: {
            image: ['image/*'],
            content: ['application/zip','application/x-zip-compressed','video/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'audio/*'],
            contentLabel: 'Fichier de Formation (Vidéo, PDF, Word, Audio...)'
        },
        livres: {
            image: ['image/*'],
            content: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
            contentLabel: 'Fichier du Livre (PDF, Word)'
        },
        supports: {
            image: ['image/*'],
            content: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/*'],
            contentLabel: 'Fichier de Support (PDF, Word, Images...)'
        },
        articles: {
            image: ['image/*'],
            content: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/*'],
            contentLabel: 'Fichier de l\'Article (PDF, Word, Images...)'
        },
    };

    const selectedCollection = collections.find(c => c.id === (collectionId || initialData.collectionId));
    const acceptedFilesForMedia = fileAcceptConfig[selectedCollection?.id]?.content || [];
    const mediaLabel = fileAcceptConfig[selectedCollection?.id]?.contentLabel || 'Fichier de Contenu';

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        price: 0,
        shortDescription: '',
        ...initialData,
        image: uploadedImage || initialData?.image || '',
        media: uploadedMedia || initialData?.media || '',
        collectionId: initialData?.collectionId || collectionId,
        badges: initialData?.badges || [],
        features: initialData?.features || [],
    });

    useEffect(() => {
        setFormData(prev => ({ 
            ...prev, 
            image: uploadedImage || initialData?.image || '',
            media: uploadedMedia || initialData?.media || '',
        }));
    }, [uploadedImage, uploadedMedia, initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    // Logique pour les champs dynamiques (badges, features)
    const [badgeInput, setBadgeInput] = useState('');
    const [featureInput, setFeatureInput] = useState('');

    const handleAddBadge = () => {
        if (badgeInput.trim() !== '') {
            setFormData(prev => ({
                ...prev,
                badges: [...prev.badges, { type: badgeInput.toLowerCase(), label: badgeInput, color: 'bg-gray-500' }]
            }));
            setBadgeInput('');
        }
    };

    const handleRemoveBadge = (index) => {
        setFormData(prev => ({
            ...prev,
            badges: prev.badges.filter((_, i) => i !== index)
        }));
    };

    const handleAddFeature = () => {
        if (featureInput.trim() !== '') {
            setFormData(prev => ({
                ...prev,
                features: [...prev.features, featureInput]
            }));
            setFeatureInput('');
        }
    };

    const handleRemoveFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="p-8 bg-white rounded-2xl shadow-xl mb-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                    {formData.id ? `Éditer le produit (${selectedCollection?.title})` : `Ajouter un nouveau produit à la collection "${selectedCollection?.title}"`}
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
                    <label className="block text-sm font-medium text-gray-700">Nom du produit</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Prix</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm" required />
                </div>
                
                {/* Uploader d'image de couverture */}
                <FileUploader
                    label="Image de couverture"
                    acceptedFiles={['image/*']}
                    onFileSelect={onImageUpload}
                    uploadedFile={uploadedImage || formData.image}
                    onFileRemove={onImageRemove}
                />
                
                {/* Uploader du fichier de contenu (dynamique) */}
                <FileUploader
                    label={mediaLabel}
                    acceptedFiles={acceptedFilesForMedia}
                    onFileSelect={onMediaUpload}
                    uploadedFile={uploadedMedia || formData.media}
                    onFileRemove={onMediaRemove}
                />
                
                {/* Champs dynamiques */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Badges</label>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                        {formData.badges.map((badge, index) => (
                            <span key={index} className={`${badge.color} text-white text-xs font-semibold px-2.5 py-0.5 rounded-full`}>
                                {badge.label}
                                <button type="button" onClick={() => handleRemoveBadge(index)} className="ml-1 text-xs">x</button>
                            </span>
                        ))}
                    </div>
                    <div className="mt-2 flex">
                        <input type="text" value={badgeInput} onChange={(e) => setBadgeInput(e.target.value)} placeholder="Ajouter un badge..." className="block w-full px-4 py-2 border border-gray-300 rounded-l-lg shadow-sm" />
                        <button type="button" onClick={handleAddBadge} className="p-2.5 bg-gray-200 hover:bg-gray-300 rounded-r-lg">
                            <Plus size={20} />
                        </button>
                    </div>
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

export default ProductForm;