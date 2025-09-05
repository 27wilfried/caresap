import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredPublications: [],
};

const filterPubSlice = createSlice({
  name: "filterPub",
  initialState,
  reducers: {
    // ↕️ Trier par différents critères
    SORT_PUBLICATIONS(state, action) {
      const { publications, sort } = action.payload;

      const tempPublications = [];
      if (sort === "a-z") {
        tempPublications = publications.sort((a, b) =>
          a?.titre.localeCompare(b?.titre)
        );
      } else if (sort === "z-a") {
        tempPublications = publications.sort((a, b) =>
          b?.titre.localeCompare(a?.titre)
        );
      }
      state.filteredPublications = tempPublications;
    },

    // 📂 Filtrer par collection (structure conservée)
    FILTER_BY_CATEGORIE_PUBLICATIONS(state, action) {
      const { publications, category } = action.payload;
      let tempPublications = [];

      if (category === "Tous") {
        tempPublications = publications;
      } else {
        tempPublications = publications.filter(
          (c) => c.CategoriePub.nom === category
        );
      }

      state.filteredPublications = tempPublications;
    },

  },
});

export const {

  SORT_PUBLICATIONS,
  FILTER_BY_CATEGORIE_PUBLICATIONS,
} = filterPubSlice.actions;

export const selectFilteredPublications = (state) =>
  state.filterPub.filteredPublications;

export default filterPubSlice.reducer;
