import React, { useState, useRef } from "react";
import { Lock, UserPlus, Eye, EyeOff } from "lucide-react";
import { createData } from "../../../helpers/fonctions";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Loader } from "rsuite";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const navigate = useNavigate();
  const toast = useRef(null);

  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!password || !confirmPassword) {
      toast.current.show({
        severity: "warn",
        summary: "Avertissement",
        detail: "Veuillez remplir tous les champs.",
        life: 3000,
      });
      setSubmitted(true);
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.current.show({
        severity: "warn",
        summary: "Avertissement",
        detail: "Les mots de passe ne correspondent pas.",
        life: 3000,
      });
      setLoading(false);
      return;
    }

    try {
      const client = await createData("private/client/reset-password", {
        token,
        newPassword: password,
      });
      toast.current.show({
        severity: "success",
        summary: "Succès",
        detail:
          client?.data?.message || `Mot de passe réinitialisé avec succès`,
        life: 3000,
      });
      setLoading(false);
      navigate("/login");
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Erreur",
        detail:
          error?.data?.message ||
          error?.response?.data?.message ||
          "Erreur lors de la modification du mot de passe.",
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
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      <div className="relative bg-white/90 rounded-3xl shadow-2xl p-10 m-10 w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-blue-600 text-white shadow-lg mb-4 transform transition-transform duration-300 hover:scale-110">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Modification du mot de passe
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Entrez un mot de passe sécurisé pour réinitialiser votre mot de
            passe
          </p>
        </div>

        <form onSubmit={resetPassword} className="space-y-5">
          {/* Champ mot de passe */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock size={20} className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Icône œil */}
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-500" />
                ) : (
                  <Eye size={20} className="text-gray-500" />
                )}
              </div>
              {submitted && password === "" && (
                <span className="text-red-500 text-xs">
                  Veuillez renseigner un mot de passe
                </span>
              )}
            </div>
          </div>

          {/* Champ confirmation mot de passe */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock size={20} className="text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {/* Icône œil */}
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} className="text-gray-500" />
                ) : (
                  <Eye size={20} className="text-gray-500" />
                )}
              </div>
              {submitted && confirmPassword === "" && (
                <span className="text-red-500 text-xs">
                  Veuillez confirmer votre mot de passe
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold shadow-md transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
          >
            {loading ? (
              <Loader content="Modification en cours..." />
            ) : (
              "Modifier"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
