import React from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import { host } from '../../helpers/fonctions';

const CollectionsList = ({ collections, onSelectCollection, onEdit, onDelete, onAddNew }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Collections</h2>
        <button
          onClick={() => onAddNew()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus size={20} className="mr-2" />
          Nouvelle Collection
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <div
            key={collection.id_col}
            className="bg-white rounded-2xl hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer group"
          >
            <div onClick={() => onSelectCollection(collection.id_col)}>
             
              <img
                src={`${host}file/${collection?.PhotoCollections[0]?.img_col?.replace(
                  "uploads/img/",
                  ""
                )}`}
                alt={collection?.titre}
                className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{collection.titre}</h3>
                  {collection.isNew && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      Nouveau
                    </span>
                  )}
                </div>
                {/* <p className="text-gray-600 text-sm">{collection.description}</p> */}
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-2">
              <button
                onClick={() => onEdit(collection)}
                className="p-2 rounded-full text-indigo-600 hover:bg-indigo-100 transition-colors"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => onDelete(collection)}
                className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors"
              >
                <Trash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CollectionsList;