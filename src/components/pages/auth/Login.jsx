import React, { useState, useRef } from "react";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { checkEmail, createData } from "../../../helpers/fonctions";
import { SET_ACTIVE_USER } from "../../../redux/slice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Loader } from "rsuite";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👁️ gestion visibilité mot de passe

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useRef(null);

  const setActiveUser = (user) => {
    dispatch(
      SET_ACTIVE_USER({
        email: user.data.data.email,
        useName: user.data.data.nom,
        userId: user.data.data.id_client,
        dateCreated: user.data.data.createdAt,
        token: user.data.access,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!email || !checkEmail(email) || !password) {
      toast.current.show({
        severity: "error",
        summary: "Erreur",
        detail: "Veuillez remplir correctement tous les champs.",
        life: 3000,
      });
      return; // stoppe seulement si validation échoue
    }

    try {
      setLoading(true);
      const client = await createData("private/client/auth/", {
        email,
        password,
      });

      setActiveUser(client);
      console.log('infos user',client)
      
      toast.current.show({
        severity: "success",
        summary: "Succès",
        detail: client?.data.message || "Connexion réussie.",
        life: 3000,
      });

      if (client.data.data.email === "contact@caresap.org") {
        navigate("/dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      console.log('error',error)
      toast.current.show({
        severity: "error",
        summary: "Erreur",
        detail: error?.response?.data?.message || "Erreur lors de l'authentification.",life: 3000,
      });
     
    } finally {
      setLoading(false); // ✅ toujours exécuté (succès ou erreur)
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
      {/* Superposition sombre */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      <div className="relative bg-white/90 rounded-3xl shadow-2xl p-10 m-10 w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-blue-600 text-white shadow-lg mb-4 transform transition-transform duration-300 hover:scale-110">
            <LogIn size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Connexion</h2>
          <p className="mt-2 text-sm text-gray-700">
            Entrez vos identifiants pour vous connecter
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Champ email */}
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
                type={showPassword ? "text" : "password"} // 👁️
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Bouton œil */}
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              {submitted && password === "" && (
                <span className="text-red-500 text-xs">
                  Veuillez renseigner un mot de passe
                </span>
              )}
            </div>
          </div>

          {/* Bouton connexion */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold shadow-md transition-transform duration-300 hover:scale-105 hover:bg-blue-700 disabled:opacity-70"
          >
            {loading ? (
              <Loader content="Connexion en cours..." />
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        {/* Lien inscription */}
        <p className="mt-6 text-center text-gray-700 text-sm">
          Pas de compte ?
          <Link
            to="/register"
            className="text-blue-600 font-semibold ml-1 hover:underline focus:outline-none"
          >
            S'inscrire
          </Link>
        </p>

        {/* Lien mot de passe oublié */}
        <p className="mt-6 text-center text-gray-700 text-sm">
          <Link
            to="/forgot-password"
            className="text-blue-600 font-semibold ml-1 hover:underline focus:outline-none"
          >
            Mot de passe oublié ?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
