import React, { useState, useRef } from "react";
import { Mail, Lock, User, LogIn, UserPlus, Contact } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { checkEmail, createData } from "../../../helpers/fonctions";
import { SET_ACTIVE_USER } from "../../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);
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
        token: user.data.token,
      })
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (isLogin) {
      // Connexion
      if (!email || !checkEmail(email) || !password) return;

      try {
        const client = await createData("private/client/auth", {
          email,
          password,
        });
        
        setActiveUser(client);
        if (client.data.data.email === "contact@caresap.org") {
          navigate("/dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Erreur",
          detail: error?.data?.message || "Erreur lors de l'authentification.",
          life: 3000,
        });
        console.log("error", error);
      }
    } else {
      // Inscription
      if (
        !fullName ||
        !email ||
        !checkEmail(email) ||
        !password ||
        !confirmPassword ||
        !contact
      )
        return;

      if (password !== confirmPassword) {
        toast.current.show({
          severity: "warn",
          summary: "Avertissement",
          detail: "Les mots de passe ne correspondent pas.",
          life: 3000,
        });
        return;
      }

      try {
        const client = await createData("private/client/create-client", {
          nom: fullName,
          email,
          password,
          contact,
        });
        navigate("/user-dashboard");
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Erreur",
          detail:
            error?.data?.message || "Erreur lors de la création du compte.",
          life: 3000,
        });
      }
    }
  };

  const toggleView = () => {
    setIsLogin(!isLogin);
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://presse.inserm.fr/wp-content/uploads/2023/06/PhotoCP-web-IA.jpg')`,
      }}
    >
      <Toast ref={toast} />
      {/* Superposition sombre pour lisibilité */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      <div className="relative bg-white/90 rounded-3xl shadow-2xl p-10 m-10 w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-blue-600 text-white shadow-lg mb-4 transform transition-transform duration-300 hover:scale-110">
            {isLogin ? <LogIn size={32} /> : <UserPlus size={32} />}
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isLogin ? "Connexion" : "Créer un compte"}
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            {isLogin
              ? "Accédez à votre tableau de bord."
              : "Rejoignez notre communauté."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nom & Prénom
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                {submitted && fullName === "" && (
                  <span className="text-red-500 text-xs">
                    Veuillez renseigner votre nom complet
                  </span>
                )}
              </div>
            </div>
          )}

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

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock size={20} className="text-gray-400" />
              </div>
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {submitted && password === "" && (
                <span className="text-red-500 text-xs">
                  Veuillez renseigner un mot de passe
                </span>
              )}
            </div>
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {submitted && confirmPassword === "" && (
                    <span className="text-red-500 text-xs">
                      Veuillez confirmer votre mot de passe
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Contact
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Contact size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                  {submitted && contact === "" && (
                    <span className="text-red-500 text-xs">
                      Veuillez renseigner un contact valide
                    </span>
                  )}
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold shadow-md transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
          >
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700 text-sm">
          {isLogin ? "Pas de compte ?" : "Déjà un compte ?"}
          <button
            onClick={toggleView}
            className="text-blue-600 font-semibold ml-1 hover:underline focus:outline-none"
          >
            {isLogin ? "S'inscrire" : "Se connecter"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
