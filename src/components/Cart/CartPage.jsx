import React, { useEffect } from "react";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import {
  UPDATE_QUANTITY,
  REMOVE_FROM_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalAmount,
  selectCartItems,
} from "../../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import { host } from "../../helpers/fonctions";

const CartPage = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const montant = useSelector(selectCartTotalAmount);

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  const updateQteRessource = (product, qte) => {
    dispatch(UPDATE_QUANTITY({ product, qte: Number(qte) }));
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const deleteToCart = (product) => {
    dispatch(REMOVE_FROM_CART(product));
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [cartItems]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Votre Panier
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Liste des produits du panier */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl p-6 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id_res}
                className="flex items-center space-x-4 border-b border-gray-200 pb-4 last:border-b-0"
              >
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
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.titre}
                  </h3>
                  {/* Prix unitaire */}
                  <p className="text-gray-600 text-sm">{item.prix} fcfa</p>
                </div>

                {/* Contrôle de la quantité */}
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    value={item.cartQuantity} // ✅ directement depuis Redux
                    onChange={(e) => updateQteRessource(item, e.target.value)}
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
            ))}
          </div>
        </div>

        {/* Résumé de la commande */}
        <div className="lg:w-1/3">
          <CartSummary montant={montant} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
