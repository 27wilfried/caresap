import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slice/authSlice";
import collectionAndRessourceReducer from "./slice/collectionAndRessourceSlice";
import filterReducer from "./slice/filterSlice";
import cartReducer from "./slice/cartSlice";
import orderReducer from "./slice/orderSlice";
import serviceReducer from "./slice/serviceSlice";
import filterPubReducer from "./slice/filterPubSlice";
import publicationReducer from "./slice/publicationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    collectionAndRessource: collectionAndRessourceReducer, // <== il faut impérativement ce nom-là ici
    filter: filterReducer,
    cart: cartReducer,
    orders: orderReducer,
    service: serviceReducer,
    filterPub: filterPubReducer,
    publication: publicationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
