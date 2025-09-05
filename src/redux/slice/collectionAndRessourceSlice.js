import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collectionsAndRessources: localStorage.getItem("collections")
    ? JSON.parse(localStorage.getItem("collections"))
    : [],
  minPrice: null,
  maxPrice: null,
};

const collectionAndRessourceSlice = createSlice({
  name: "collectionAndRessource",
  initialState,
  reducers: {
    STORE_COLLECTIONS_AND_RESSOURCES(state, action) {
      state.collectionsAndRessources =
        action?.payload?.collections_and_ressources;

      localStorage.setItem(
        "collections",
        JSON.stringify(state.collectionsAndRessources)
      );
    },
    GET_PRICE_PRODUCTS(state, action) {
      const { collections } = action.payload;

      // Récupérer tous les prix de toutes les ressources
      const allPrices = collections.flatMap((col) =>
        col.Ressources.map((res) => res.prix)
      );

      // Vérification si on a au moins un prix
      if (allPrices.length > 0) {
        const max = Math.max(...allPrices);
        const min = Math.min(...allPrices);
        state.minPrice = min;
        state.maxPrice = max;
      } else {
        state.minPrice = 0;
        state.maxPrice = 0;
      }
    },
  },
});

export const { STORE_COLLECTIONS_AND_RESSOURCES, GET_PRICE_PRODUCTS } =
  collectionAndRessourceSlice.actions;

export const selectCollectionsAndRessources = (state) => {
  const value = state?.collectionAndRessource?.collectionsAndRessources || [];
  return value;
};

export const selectMinPrice = (state) =>
  state?.collectionAndRessource?.minPrice;
export const selectMaxPrice = (state) =>
  state?.collectionAndRessource?.maxPrice;

export default collectionAndRessourceSlice.reducer;
