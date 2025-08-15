import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import FileUploader from '../Shared/FileUploader';
import { iconMap } from '../../data/initialData';

const CollectionForm = ({ initialData, onSave, onCancel, uploadedImage, onImageUpload, onImageRemove }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    isNew: false,
    ...initialData,
    image: uploadedImage || initialData?.image || '',
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, image: uploadedImage || initialData?.image || '' }));
  }, [uploadedImage, initialData]);

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

  const iconNameKeys = Object.keys(iconMap);

  return (
    <div className="p-8 bg-white rounded-2xl mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          {formData.id ? 'Éditer la collection' : 'Ajouter une nouvelle collection'}
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
        <FileUploader
          onImageUpload={onImageUpload}
          uploadedImage={uploadedImage || formData.image}
          onImageRemove={onImageRemove}
        />
   
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

export default CollectionForm;