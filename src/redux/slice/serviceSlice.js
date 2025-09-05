import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: localStorage.getItem("servies")
    ? JSON.parse(localStorage.getItem("servies"))
    : [],
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    STORE_SERVICES(state, action) {
        state.services = action?.payload?.services;
        localStorage.setItem("servies", JSON.stringify(state.services));
    },
  },
});

export const { STORE_SERVICES, } = serviceSlice.actions;

export const selectServices = (state) => state?.service?.services


export default serviceSlice.reducer;
