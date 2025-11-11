import { createSlice } from "@reduxjs/toolkit";

const savedAuth = localStorage.getItem("auth");
const parsedAuth = savedAuth ? JSON.parse(savedAuth) : {};

const initialState = {
  isLoggedIn: !!parsedAuth.token,
  email: parsedAuth.email || null,
  useName: parsedAuth.useName || null,
  userId: parsedAuth.userId || null,
  dateCreated: parsedAuth.dateCreated || null,
  token: parsedAuth.token || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      const { email, useName, userId, dateCreated, token } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.useName = useName;
      state.userId = userId;
      state.dateCreated = dateCreated;
      state.token = token;
      // Sauvegarde dans le localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({ email, useName, userId, dateCreated, token })
      );
    },
    REMOVE_ACTIVE_USER(state, action) {
      state.isLoggedIn = false;
      state.email = null;
      state.useName = null;
      state.userId = null;
      state.dateCreated = null;
      state.token = null;
      // Suppression du localStorage
      localStorage.removeItem("auth");
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.useName;
export const selectUserID = (state) => state.auth.userId;
export const selectDateCreated = (state) => state.auth.dateCreated;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
