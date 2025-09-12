import React, { useState, useRef } from "react";
import { Mail, Lock, User, LogIn, UserPlus, Contact } from "lucide-react";
import { checkEmail, createData } from "../../../helpers/fonctions";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Loader } from "rsuite";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useRef(null);

  const forgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !checkEmail(email)) {
      toast.current.show({
        severity: "warn",
        summary: "Avertissement",
        detail: "Veillez remplir tout les champs.",
        life: 3000,
      });
      setSubmitted(true);
      setLoading(false);
      return;
    }

    try {
      const client = await createData("private/client/forgot-password", {
        email,
      });
      toast.current.show({
        severity: "success",
        summary: "Succès",
        detail:
          client?.data?.message ||
          `Un lien de réenitialisation vous a été envoyé par mail`,
        life: 3000,
      });
      setLoading(false);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Erreur",
        detail:
          error?.data?.message ||
          error?.response?.data?.message ||
          "Erreur lors de l'envoi du lien de réenitialisation.",
        life: 3000,
      });
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://presse.inserm.fr/wp-content/uploads/2023/06/PhotoCP-web-IA.jpg')",
      }}
    >
      <Toast ref={toast} />
      {/* Superposition sombre pour lisibilité */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      <div className="relative bg-white/90 rounded-3xl shadow-2xl p-10 m-10 w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-blue-600 text-white shadow-lg mb-4 transform transition-transform duration-300 hover:scale-110">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Réenitialisez votre mot de passe
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Veillez renseigner votre email pour réenitialiser votre mot de passe
          </p>
        </div>

        <form onSubmit={forgotPassword} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Adresse e-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail size={20} className="text-gray-400" />
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {submitted && !checkEmail(email) && (
                <span className="text-red-500 text-xs">
                  Veuillez renseigner un email valide
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold shadow-md transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
          >
            {loading ? <Loader content="Envoie en cours..." /> : "Envoyez"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
