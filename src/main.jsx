import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./components/contexts/CartContext"; // <-- chemin corrigé
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store"; // <-- chemin corrigé
import { PrimeReactProvider } from "primereact/api";
import "rsuite/dist/rsuite.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <PrimeReactProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </PrimeReactProvider>
    </CartProvider>
  </React.StrictMode>
);
