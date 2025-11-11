import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id_res === action.payload.id_res
      );

      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info(`${action.payload.titre} a été incrémenté de un`, {
          position: "top-left",
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);

        toast.success(`${action.payload.titre} est ajouté au panier`, {
          position: "top-left",
        });
      }
      // save cart to LS
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    UPDATE_QUANTITY(state, action) {
      const { product, qte } = action.payload;
      const productIndex = state.cartItems.findIndex(
        (item) => item.id_res === product.id_res
      );

      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity = qte;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.success(`La quantité de ${product.titre} est modifiée`, {
        position: "top-left",
      });
    },
    DECREASE_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id_res === action.payload.id_res
      );

      if (state.cartItems[productIndex]?.cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;

        toast.info(`${action.payload.titre} a été désincrémenté de un`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex]?.cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item.id_res !== action.payload.id_res
        );
        state.cartItems = newCartItem;

        toast.success(`${action.payload.titre} a été supprimé du panier`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter(
        (item) => item.id_res !== action.payload.id_res
      );

      state.cartItems = newCartItem;

      toast.success(`${action.payload.titre} est supprimé du panier`, {
        position: "top-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.success("Le panier est vidé", {
        position: "top-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CALCULATE_SUBTOTAL(state, action) {
      const array = [];
      state.cartItems?.map((item) => {
        const { cartQuantity } = item;
        const cartItemAmount = item?.prix * cartQuantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = totalAmount;
    },
    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity = totalQuantity;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  UPDATE_QUANTITY,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
