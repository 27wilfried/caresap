import React, { useState, useRef } from "react";
// Les imports suivants ont été remplacés par des implémentations internes pour que le code fonctionne dans un seul fichier.
// import { Mail, Lock, User, LogIn, UserPlus, Contact } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { checkEmail, createData } from "../../../helpers/fonctions";
// import { SET_ACTIVE_USER } from "../../../redux/slice/authSlice";
// import { useNavigate } from "react-router-dom";
// import { Toast } from "primereact/toast";

// --- Mocks pour l'environnement de fichier unique
const useDispatch = () => () => {}; // Mock pour useDispatch
const useSelector = (selector) => selector({}); // Mock pour useSelector
const useNavigate = () => () => {}; // Mock pour useNavigate
const checkEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Mock de la fonction de validation
const createData = (endpoint, data) => {
  console.log(`Données envoyées à l'endpoint ${endpoint}:`, data);
  if (endpoint === "private/client/auth") {
      if (data.email === "contact@caresap.org" && data.password === "123456") {
          return Promise.resolve({
              data: { data: { email: data.email, nom: "Admin", id_client: "123" }, token: "mock_token" }
          });
      }
      return Promise.reject({ data: { message: "Identifiants invalides." } });
  }

  if (endpoint === "private/client/create-client") {
      // Simulation de l'envoi d'un e-mail de confirmation
      console.log(`E-mail de confirmation envoyé à ${data.email} avec le code: 123456`);
      return Promise.resolve({
          data: { message: "Un code de confirmation a été envoyé à votre adresse e-mail." }
      });
  }

  if (endpoint === "private/client/confirm-email") {
      // Simulation de la vérification du code
      if (data.confirmationCode === "123456") {
          return Promise.resolve({
              data: { data: { email: data.email, nom: data.nom, id_client: "456" }, token: "new_mock_token" }
          });
      }
      return Promise.reject({ data: { message: "Code de confirmation invalide." } });
  }

  if (endpoint === "private/client/reset-password") {
      if (data.email === "test@test.com") {
          return Promise.resolve({
              data: { message: "Un lien de réinitialisation a été envoyé à votre adresse e-mail." }
          });
      }
      return Promise.reject({ data: { message: "Erreur lors de l'envoi du lien de réinitialisation." } });
  }

  return Promise.reject({ data: { message: "Erreur de l'API." } });
};

const SET_ACTIVE_USER = (user) => ({ type: "SET_ACTIVE_USER", payload: user });

// Remplacement des icônes Lucide par des SVG inline
const icons = {
  Mail: ({ size = 20, className = "text-gray-400" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  Lock: ({ size = 20, className = "text-gray-400" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  ),
  Eye: ({ size = 20, className = "text-gray-400 cursor-pointer" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  EyeOff: ({ size = 20, className = "text-gray-400 cursor-pointer" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a1.8 1.8 0 0 1 0-.2L5.88 15"/><path d="M10.79 6.61A10.07 10.07 0 0 1 12 4c7 0 10 7 10 7a1.8 1.8 0 0 1 0 .2l-3.22 3.22"/><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9.34A3.49 3.49 0 0 0 12 12a3.49 3.49 0 0 0 3-2.66"/></svg>
  ),
  User: ({ size = 20, className = "text-gray-400" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  LogIn: ({ size = 32, className = "text-white" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
  ),
  UserPlus: ({ size = 32, className = "text-white" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
  ),
  Contact: ({ size = 20, className = "text-gray-400" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 18a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2c0-1.1-0.9-2-2-2zM9 18a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2c0-1.1-0.9-2-2-2zM21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V15zM7 10h.01M10 10h.01"/></svg>
  ),
};

// Composant Toast personnalisé pour remplacer primereact
const Toast = ({ visible, severity, summary, detail }) => {
  if (!visible) return null;
  let color = "";
  let bgColor = "";
  if (severity === "success") {
    color = "text-green-800";
    bgColor = "bg-green-100";
  } else if (severity === "error") {
    color = "text-red-800";
    bgColor = "bg-red-100";
  } else if (severity === "warn") {
    color = "text-orange-800";
    bgColor = "bg-orange-100";
  }
  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${bgColor} ${color} transition-opacity duration-300`}>
      <h4 className="font-bold">{summary}</h4>
      <p>{detail}</p>
    </div>
  );
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // Nouvelle étape de confirmation
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [confirmationCode, setConfirmationCode] = useState(""); // État pour le code de confirmation
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState({ visible: false, severity: "", summary: "", detail: "" });
  const [showPassword, setShowPassword] = useState(false); // Nouveau état pour l'affichage du mot de passe

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleToast = (severity, summary, detail) => {
    setToast({ visible: true, severity, summary, detail });
    setTimeout(() => setToast({ visible: false, severity: "", summary: "", detail: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (isLogin) {
      if (!email || !checkEmail(email) || !password) return;
      try {
        const client = await createData("private/client/auth", { email, password });
        setActiveUser(client);
        if (client.data.data.email === "contact@caresap.org") {
          navigate("/dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } catch (error) {
        handleToast("error", "Erreur", error?.data?.message || "Erreur lors de l'authentification.");
        console.log("error", error);
      }
    } else { // Cas de l'inscription
      if (!lastName || !firstName || !email || !checkEmail(email) || !password || !confirmPassword || !contact) return;
      if (password !== confirmPassword) {
        handleToast("warn", "Avertissement", "Les mots de passe ne correspondent pas.");
        return;
      }
      try {
        const nomComplet = `${lastName} ${firstName}`;
        await createData("private/client/create-client", { nom: nomComplet, email, password, contact });
        handleToast("success", "Succès", "Veuillez vérifier votre e-mail pour le code de confirmation.");
        setShowConfirmation(true); // Passer à l'étape de confirmation
      } catch (error) {
        handleToast("error", "Erreur", error?.data?.message || "Erreur lors de la création du compte.");
      }
    }
  };

  const handleConfirmationSubmit = async (e) => {
    e.preventDefault();
    if (!confirmationCode) {
      handleToast("warn", "Avertissement", "Veuillez entrer le code de confirmation.");
      return;
    }
    try {
      const nomComplet = `${lastName} ${firstName}`;
      const client = await createData("private/client/confirm-email", { email, confirmationCode, nom: nomComplet });
      setActiveUser(client);
      navigate("/user-dashboard");
    } catch (error) {
      handleToast("error", "Erreur", error?.data?.message || "Code de confirmation invalide.");
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!email || !checkEmail(email)) {
      handleToast("warn", "Avertissement", "Veuillez entrer une adresse e-mail valide.");
      return;
    }
    try {
      await createData("private/client/reset-password", { email });
      handleToast("success", "Succès", "Un lien de réinitialisation a été envoyé à votre adresse e-mail.");
      setShowForgotPassword(false);
    } catch (error) {
      handleToast("error", "Erreur", error?.data?.message || "Erreur lors de l'envoi du lien de réinitialisation.");
    }
  };

  const toggleView = () => {
    setIsLogin(!isLogin);
    setLastName("");
    setFirstName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setContact("");
    setShowForgotPassword(false);
    setShowConfirmation(false); // Réinitialiser l'étape de confirmation
  };

  // Fonction pour basculer l'affichage du mot de passe
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://presse.inserm.fr/wp-content/uploads/2023/06/PhotoCP-web-IA.jpg')`,
      }}
    >
      <Toast {...toast} />

      <div className="absolute inset-0 backdrop-blur-sm"></div>

      <div className="relative bg-white/90 rounded-3xl shadow-2xl p-10 m-10 w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-blue-600 text-white shadow-lg mb-4 transform transition-transform duration-300 hover:scale-110">
            {isLogin ? <icons.LogIn size={32} /> : <icons.UserPlus size={32} />}
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            {showForgotPassword ? "Mot de passe oublié ?" : (isLogin ? "Connexion" : (showConfirmation ? "Confirmer votre e-mail" : "Créer un compte"))}
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            {showForgotPassword ? "Entrez votre e-mail pour réinitialiser votre mot de passe." : (isLogin ? "Accédez à votre tableau de bord." : (showConfirmation ? "Entrez le code de confirmation envoyé à votre adresse e-mail." : "Rejoignez notre communauté."))}
          </p>
        </div>

        {showForgotPassword ? (
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Adresse e-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <icons.Mail size={20} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold shadow-md transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
            >
              Réinitialiser le mot de passe
            </button>
            <p className="mt-6 text-center text-gray-700 text-sm">
              <button
                onClick={() => setShowForgotPassword(false)}
                className="text-blue-600 font-semibold ml-1 hover:underline focus:outline-none"
              >
                Retour à la connexion
              </button>
            </p>
          </form>
        ) : showConfirmation ? (
          <form onSubmit={handleConfirmationSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Code de confirmation
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <icons.Lock size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold shadow-md transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
            >
              Confirmer
            </button>
            <p className="mt-6 text-center text-gray-700 text-sm">
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  toggleView();
                }}
                className="text-blue-600 font-semibold ml-1 hover:underline focus:outline-none"
              >
                Retour à l'inscription
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Nom
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <icons.User size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    {submitted && lastName === "" && (
                      <span className="text-red-500 text-xs">
                        Veuillez renseigner votre nom
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Prénom
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <icons.User size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Adresse e-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <icons.Mail size={20} className="text-gray-400" />
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
                  <icons.Lock size={20} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={togglePasswordVisibility}>
                  {showPassword ? <icons.Eye size={20} /> : <icons.EyeOff size={20} />}
                </div>
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
                      <icons.Lock size={20} className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={togglePasswordVisibility}>
                      {showPassword ? <icons.Eye size={20} /> : <icons.EyeOff size={20} />}
                    </div>
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
                      <icons.Contact size={20} className="text-gray-400" />
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
        )}

        <p className="mt-6 text-center text-gray-700 text-sm">
          {showForgotPassword ? "" : (isLogin ? "Pas de compte ?" : (showConfirmation ? "" : "Déjà un compte ?"))}
          {showForgotPassword ? "" : (
            <button
              onClick={toggleView}
              className="text-blue-600 font-semibold ml-1 hover:underline focus:outline-none"
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          )}
        </p>

        {isLogin && !showForgotPassword && (
          <p className="mt-4 text-center text-sm">
            <button
              onClick={() => setShowForgotPassword(true)}
              className="text-blue-600 font-semibold hover:underline focus:outline-none"
            >
              Mot de passe oublié ?
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
