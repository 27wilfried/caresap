import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../redux/slice/cartSlice";
import {
  REMOVE_ACTIVE_USER,
  selectIsLoggedIn,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Utilisez le hook useCart pour obtenir le nombre total d'articles
  const dispatch=useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const logoutUser = () => {
    dispatch(REMOVE_ACTIVE_USER());
    navigate("/auth");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const cartItems = useSelector(selectCartItems);
  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Boutique", path: "/formations" },
    { name: "Actualités", path: "/blog" },
    { name: "A Propos", path: "apropos" },
    { name: "Contact", path: "/contact" },
    { name: "Login" },
    { name: "Logout" },
    { name: "Mon compte" },
  ];

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo du site */}
        <div className="flex items-center space-x-2">
          {/* Remplacez ceci par le logo de CaRESaP */}
          <Link to="/" className="text-2xl font-bold text-blue-500">
            CaRESaP
          </Link>
        </div>

        {/* Menu de navigation - Desktop */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => {
            if (link.name === "Login") {
              return (
                <ShowOnLogout key={link.name}>
                  <Link
                    to="/auth"
                    className="px-4 py-2 text-secondary hover:text-primary hover:bg-primary-50 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2"
                  >
                    Login
                  </Link>
                </ShowOnLogout>
              );
            }
            if (link.name === "Logout") {
              return (
                <ShowOnLogin key={link.name}>
                  <Link
                    to=""
                    onClick={() => logoutUser()}
                    className="px-4 py-2 text-text-secondary hover:text-primary hover:bg-primar-50 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2"
                  >
                    Logout
                  </Link>
                </ShowOnLogin>
              ); // Ne pas afficher le lien "Logout" si l'utilisateur n'est pas
            }

            if (link.name === "Mon compte") {
              return (
                <ShowOnLogin key={link.name}>
                  <Link
                    to="/user-dashboard"
                    className="p-2 rounded-full transition-all duration-200 text-text-secondary hover:text-primary hover:bg-primar-50"
                  >
                    Mon compte
                  </Link>
                </ShowOnLogin>
              );
            }

            return (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
              >
                {link.name}
              </Link>
            );
          })}

          {/* Icône Panier */}
          <Link
            to="/panier"
            className="relative text-gray-600 hover:text-blue-500"
          >
            <ShoppingCart size={24} />
            {/* Affichez le nombre total d'articles */}
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-ping"></span>
            )}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {cartItems?.length}
            </span>
          </Link>
        </nav>

        {/* Boutons et icônes - Mobile */}
        <div className="md:hidden flex items-center space-x-4">
          <Link
            to="/panier"
            className="relative text-gray-600 hover:text-blue-500"
          >
            <ShoppingCart size={24} />
            {/* Affichez le nombre total d'articles */}
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-ping"></span>
            )}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {cartItems.length}
            </span>
          </Link>
          <button
            onClick={toggleMenu}
            className="text-gray-600 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu responsive - Mobile */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
        }`}
      >
        <nav className="flex flex-col items-center py-4 space-y-4">
          {navLinks.map((link) => {
            if (link.name === "Login") {
              return (
                <ShowOnLogout key={link.name}>
                  <Link
                    to="/auth"
                    onClick={toggleMenu}
                    className="text-lg text-gray-700 hover:text-blue-500 transition-colors duration-300 w-full text-center py-2"
                  >
                    Login
                  </Link>
                </ShowOnLogout>
              );
            }
            if (link.name === "Logout") {
              return (
                <ShowOnLogin key={link.name}>
                  <Link
                    to=""
                    onClick={() => { logoutUser(); toggleMenu(); }}
                    className="text-lg text-gray-700 hover:text-blue-500 transition-colors duration-300 w-full text-center py-2"
                  >
                    Logout
                  </Link>
                </ShowOnLogin>
              );
            }
            if (link.name === "Mon compte") {
              return (
                <ShowOnLogin key={link.name}>
                  <Link
                    to="/user-dashboard"
                    onClick={toggleMenu}
                    className="text-lg text-gray-700 hover:text-blue-500 transition-colors duration-300 w-full text-center py-2"
                  >
                    Mon compte
                  </Link>
                </ShowOnLogin>
              );
            }
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={toggleMenu}
                className="text-lg text-gray-700 hover:text-blue-500 transition-colors duration-300 w-full text-center py-2"
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
