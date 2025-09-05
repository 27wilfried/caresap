import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredCollections: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // 🔎 Filtrer par recherche (titre ou desc) mais garder la structure
    FILTER_BY_SEARCH(state, action) {
      const { collections, search } = action.payload;

      const tempCollections = collections
        .map((col) => ({
          ...col,
          Ressources: col.Ressources.filter(
            (res) =>
              res?.titre?.toLowerCase().includes(search?.toLowerCase()) ||
              res?.desc?.toLowerCase().includes(search?.toLowerCase())
          ),
        }))
        .filter((col) => col.Ressources.length > 0); // supprime collections vides

      state.filteredCollections = tempCollections;
    },

    // ↕️ Trier par différents critères
    SORT_RESSOURCES(state, action) {
      const { collections, sort } = action.payload;

      const tempCollections = collections?.map((col) => {
        let sortedRessources = [...col.Ressources];

        if (sort === "lowest-price") {
          sortedRessources.sort((a, b) => a.prix - b.prix);
        } else if (sort === "highest-price") {
          sortedRessources.sort((a, b) => b.prix - a.prix);
        } else if (sort === "a-z") {
          sortedRessources.sort((a, b) => a?.titre.localeCompare(b?.titre));
        } else if (sort === "z-a") {
          sortedRessources.sort((a, b) => b?.titre.localeCompare(a?.titre));
        }
        // "latest" => on garde l’ordre naturel

        return { ...col, Ressources: sortedRessources };
      });

      state.filteredCollections = tempCollections;
    },

    // 📂 Filtrer par collection (structure conservée)
    FILTER_BY_COLLECTION(state, action) {
      const { collections, category } = action.payload;
      let tempCollections = [];

      if (category === "Tous") {
        tempCollections = collections;
      } else {
        tempCollections = collections.filter((c) => c.titre === category);
      }

      state.filteredCollections = tempCollections;
    },

    // 💰 Filtrer par plage de prix
    FILTER_BY_PRICE(state, action) {
      const { collections, price } = action.payload;

      const tempCollections = collections
        .map((col) => ({
          ...col,
          Ressources: col.Ressources.filter(
            (res) => res.prix >= price.min && res.prix <= price.max
          ),
        }))
        .filter((col) => col.Ressources.length > 0);

      state.filteredCollections = tempCollections;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_RESSOURCES,
  FILTER_BY_COLLECTION,
  FILTER_BY_PRICE,
} = filterSlice.actions;

export const selectFilteredCollections = (state) =>
  state.filter.filteredCollections;

export default filterSlice.reducer;
