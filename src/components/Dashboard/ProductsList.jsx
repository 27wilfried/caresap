import React from "react";
import { Plus, Edit, Trash, ArrowLeft } from "lucide-react";
import { iconMap } from "../../data/initialData";
import { host, shortenText } from "../../helpers/fonctions";

const ProductsList = ({
  products,
  collection,
  onBack,
  onEdit,
  onDelete,
  onAddNew,
}) => {
  const IconComponent = iconMap[collection?.icon];

  return (
    <>
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 mr-4 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center">
          {IconComponent && (
            <IconComponent className="mr-2 text-indigo-500" size={32} />
          )}
          <h2 className="text-3xl font-bold text-gray-800">
            {collection?.titre}
          </h2>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        {/* <p className="text-gray-600 text-lg">{collection?.description}</p> */}
        <button
          onClick={onAddNew}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus size={20} className="mr-2" />
          Ajouter un produit
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="text-gray-500 col-span-3 text-center">
            Aucun produit pour cette collection. Ajoutez-en un !
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product.id_res}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              <img
                src={`${host}file/${product?.PhotoRessource?.img_res?.replace(
                  "uploads/img/",
                  ""
                )}`}
                alt={product.titre}
                className="h-48 w-full object-cover"
              />
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.titre}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {shortenText(product.desc)}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold text-indigo-600">
                    {product.prix}
                  </p>
                  {/* {product.originalPrice && (
                    <p className="text-sm text-gray-400 line-through">
                      {product.originalPrice}{product.currency}
                    </p>
                  )} */}
                </div>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-2">
                <button
                  onClick={() => onEdit(product)}
                  className="p-2 rounded-full text-indigo-600 hover:bg-indigo-100 transition-colors"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => onDelete(product)}
                  className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ProductsList;
