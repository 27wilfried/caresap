import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  publications: localStorage.getItem("publications")
    ? JSON.parse(localStorage.getItem("publications"))
    : [],
};

const publicationSlice = createSlice({
  name: "publication",
  initialState,
  reducers: {
    STORE_PUBLICATIONS(state, action) {
        state.publications = action?.payload?.publications;
        localStorage.setItem("publications", JSON.stringify(state.publications));
    },
  },
});

export const { STORE_PUBLICATIONS, } = publicationSlice.actions;

export const selectPublications = (state) => state?.publication?.publications


export default publicationSlice.reducer;
