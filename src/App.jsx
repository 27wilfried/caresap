import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ServiceDetailPage from "./components/pages/ServiceDetailPage";
import ServicesPage from "./components/pages/ServicesPage";
import FormationsPage from "./components/pages/FormationsPage";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import PaymentPage from "./components/pages/PaymentPage";
import AboutPage from "./components/pages/AboutPage";
import Contact from "./components/pages/ContactPage";
import BlogPage from "./components/pages/BlogPage";
import BlogDetailPage from "./components/pages/BlogDetailPage";
import DashboardPage from "./components/Dashboard/DashboarddPage";
import AuthPage from "./components/pages/auth/AuthPage";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LegalePage from "./components/pages/LegalePage";
import Remboursement from "./components/pages/Remboursement";
import Confidentialite from "./components/pages/Confidentialite";
import Cgv from "./components/pages/Cgv";
import AboutPlus from "./components/pages/AboutPlus";

// Importez le nouveau composant de la page du panier
import CartPage from "./components/Cart/CartPage";

import Footer from "./components/sections/Footer";
import Navbar from "./components/sections/Navbar";
import CollectionPage from "./components/pages/CollectionPage";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import { selectIsLoggedIn } from "./redux/slice/authSlice";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "./components/hiddenLink/hiddenLink";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id_serv" element={<ServiceDetailPage />} />
          <Route path="/formations" element={<FormationsPage />} />
          <Route path="/formations/:id_col" element={<CollectionPage />} />
          <Route
            path="/formations/:id_col/:id_res"
            element={<ProductDetailPage />}
          />

          <Route path="/mentions-legales" element={<LegalePage />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/remboursement" element={<Remboursement />} />
          <Route path="/cgv" element={<Cgv />} />

          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route path="/apropos" element={<AboutPage />} />
          <Route path="/a-propos" element={<AboutPlus />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id_pub" element={<BlogDetailPage />} />
          <Route
            path="/dashboard"
            element={
              <AdminOnlyRoute>
                <DashboardPage />
              </AdminOnlyRoute>
            }
          />

          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<AuthPage />} />

          {/* Nouvelle route pour la page du panier */}
          <Route path="/panier" element={<CartPage />} />

          <Route
            path="*"
            element={
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Page non trouvée
                  </h1>
                  <p className="text-lg text-gray-600 mb-8">
                    La page que vous cherchez n'existe pas.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Retour à l'accueil
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
