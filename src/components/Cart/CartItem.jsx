import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { Trash2 } from "lucide-react";
import {
  UPDATE_QUANTITY,
  REMOVE_FROM_CART,
  CALCULATE_SUBTOTAL,
  selectCartTotalAmount,
  selectCartItems,
} from "../../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { host } from "../../helpers/fonctions";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.cartQuantity);

  const updateQteRessource = (product, qte) => {
    setQuantity(qte);
    dispatch(UPDATE_QUANTITY({ product, qte }));
    dispatch(CALCULATE_SUBTOTAL());
  };
  const deleteToCart = (product) => {
    dispatch(REMOVE_FROM_CART(product));
    dispatch(CALCULATE_SUBTOTAL());
  };
  const montant = useSelector(selectCartTotalAmount);
  return (
    <div className="flex items-center space-x-4 border-b border-gray-200 pb-4 last:border-b-0">
      {/* Image du produit */}

      <img
        src={`${host}file/${item?.PhotoRessource?.img_res?.replace(
          "uploads/img/",
          ""
        )}`}
        alt={item.titre}
        className="w-20 h-20 object-cover rounded-lg shadow-md"
      />
      <div className="flex-1">
        {/* Nom du produit */}
        <h3 className="text-lg font-semibold text-gray-800">{item.titre}</h3>
        {/* Prix unitaire */}
        <p className="text-gray-600 text-sm">{item.prix} fcfa</p>
      </div>

      {/* Contrôle de la quantité */}
      <div className="flex items-center space-x-2">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => updateQteRessource(item, parseInt(e.target.value))}
          className="w-16 text-center border border-gray-300 rounded-md py-1"
        />
        <button
          onClick={() => deleteToCart(item)}
          className="text-red-500 hover:text-red-700 transition-colors"
          aria-label="Supprimer l'article"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
