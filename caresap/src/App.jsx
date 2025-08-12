import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import ServiceDetailPage from './components/pages/ServiceDetailPage';
import ServicesPage from './components/pages/ServicesPage'; 
import FormationsPage from './components/pages/FormationsPage';
import ProductDetailPage from './components/pages/ProductDetailPage'; 
import PaymentPage from './components/pages/PaymentPage';
import AboutPage from './components/pages/AboutPage';
import Contact from './components/pages/ContactPage'; 
import BlogPage from './components/pages/BlogPage'; 
import BlogDetailPage from './components/pages/BlogDetailPage';
import Footer from './components/sections/Footer';
import Navbar from './components/sections/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} /> 
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/formations" element={<FormationsPage />} />
          <Route path="/formations/:collectionSlug" element={<FormationsPage />} />
          <Route path="/formations/:collectionSlug/:productSlug" element={<ProductDetailPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/apropos" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="*" element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Page non trouvée</h1>
                <p className="text-lg text-gray-600 mb-8">La page que vous cherchez n'existe pas.</p>
                <a 
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retour à l'accueil
                </a>
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;