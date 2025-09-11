import React, { useState } from "react";

// --- Mocks pour l'environnement de fichier unique
const mockServices = {
  useDispatch: () => () => {},
  useSelector: (selector) => selector({}),
  useNavigate: () => (path) => console.log(`Navigating to ${path}`),
  checkEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  createData: (endpoint, data) => {
    console.log(`Données envoyées à l'endpoint ${endpoint}:`, data);
    if (endpoint === "private/client/auth") {
      if (data.email === "contact@caresap.org" && data.password === "123456") {
        return Promise.resolve({
          data: { data: { email: data.email, nom: "Admin", id_client: "123", createdAt: new Date().toISOString() }, token: "mock_token" }
        });
      }
      return Promise.reject({ data: { message: "Identifiants invalides." } });
    }

    if (endpoint === "private/client/create-client") {
      if (!mockServices.checkEmail(data.email)) {
        return Promise.reject({ data: { message: "Adresse e-mail invalide." } });
      }
      return Promise.resolve({
        data: { message: "Un code de confirmation a été envoyé à votre adresse e-mail." }
      });
    }

    if (endpoint === "private/client/confirm-email") {
      if (data.confirmationCode === "123456") {
        return Promise.resolve({
          data: { data: { email: data.email, nom: data.nom, id_client: "456", createdAt: new Date().toISOString() }, token: "new_mock_token" }
        });
      }
      return Promise.reject({ data: { message: "Code de confirmation invalide." } });
    }

    if (endpoint === "private/client/set-password") {
      return Promise.resolve({
        data: { message: "Mot de passe défini avec succès." }
      });
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
  },
  SET_ACTIVE_USER: (user) => ({ type: "SET_ACTIVE_USER", payload: user }),
};

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

const Toast = ({ visible, severity, summary, detail }) => {
  if (!visible) return null;
  const colors = {
    success: { bg: "bg-green-100", text: "text-green-800" },
    error: { bg: "bg-red-100", text: "text-red-800" },
    warn: { bg: "bg-yellow-100", text: "text-yellow-800" },
  };
  const { bg, text } = colors[severity] || {};

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${bg} ${text} transition-opacity duration-300`}>
      <h4 className="font-bold">{summary}</h4>
      <p>{detail}</p>
    </div>
  );
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPasswordCreation, setShowPasswordCreation] = useState(false);

  const [formState, setFormState] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    confirmationCode: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState({ visible: false, severity: "", summary: "", detail: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { useDispatch, useNavigate, createData, checkEmail, SET_ACTIVE_USER } = mockServices;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleToast = (severity, summary, detail) => {
    setToast({ visible: true, severity, summary, detail });
    setTimeout(() => setToast({ visible: false, severity: "", summary: "", detail: "" }), 3000);

  };

  const resetForm = () => {
    setFormState({
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
      contact: "",
      confirmationCode: "",
    });
    setSubmitted(false);
  };

  const toggleView = () => {
    setIsLogin(!isLogin);
    setShowForgotPassword(false);
    setShowConfirmation(false);
    setShowPasswordCreation(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (isLogin) {
      if (!formState.email || !checkEmail(formState.email) || !formState.password) return;
      try {
        const client = await createData("private/client/auth", { email: formState.email, password: formState.password });
        dispatch(SET_ACTIVE_USER({
          email: client.data.data.email,
          userName: client.data.data.nom,
          userId: client.data.data.id_client,
          role: client.data.data.email === "contact@caresap.org" ? "admin" : "client",
          dateCreated: client.data.data.createdAt,
          token: client.data.token,
        }));
        navigate(client.data.data.email === "contact@caresap.org" ? "/dashboard" : "/user-dashboard");
      } catch (error) {
        handleToast("error", "Erreur", error?.data?.message || "Erreur lors de l'authentification.");
      }
    } else { // Cas de l'inscription
      if (!formState.lastName || !formState.firstName || !formState.email || !checkEmail(formState.email) || !formState.contact) return;
      try {
        const nomComplet = `${formState.lastName} ${formState.firstName}`;
        await createData("private/client/create-client", { nom: nomComplet, email: formState.email, contact: formState.contact });
        handleToast("success", "Succès", "Veuillez vérifier votre e-mail pour le code de confirmation.");
        setShowConfirmation(true);
      } catch (error) {
        handleToast("error", "Erreur", error?.data?.message || "Erreur lors de la création du compte.");
      }
    }
  };

  const handleConfirmationSubmit = async (e) => {
    e.preventDefault();
    if (!formState.confirmationCode) {
      handleToast("warn", "Avertissement", "Veuillez entrer le code de confirmation.");
      return;
    }
    try {
      const nomComplet = `${formState.lastName} ${formState.firstName}`;
      await createData("private/client/confirm-email", { email: formState.email, confirmationCode: formState.confirmationCode, nom: nomComplet });
      handleToast("success", "Succès", "Code de confirmation valide. Veuillez créer votre mot de passe.");
      setShowConfirmation(false);
      setShowPasswordCreation(true);
    } catch (error) {
      handleToast("error", "Erreur", error?.data?.message || "Code de confirmation invalide.");
    }
  };

  const handlePasswordCreationSubmit = async (e) => {
    e.preventDefault();
    if (!formState.password || !formState.confirmPassword) {
      handleToast("warn", "Avertissement", "Veuillez renseigner les mots de passe.");
      return;
    }
    if (formState.password !== formState.confirmPassword) {
      handleToast("warn", "Avertissement", "Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      const nomComplet = `${formState.lastName} ${formState.firstName}`;
      await createData("private/client/set-password", { email: formState.email, password: formState.password });
      handleToast("success", "Succès", "Votre mot de passe a été créé avec succès.");
      setIsLogin(true); // Rediriger vers la page de connexion
      setShowPasswordCreation(false);
    } catch (error) {
      handleToast("error", "Erreur", error?.data?.message || "Erreur lors de la création du mot de passe.");
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!formState.email || !checkEmail(formState.email)) {
      handleToast("warn", "Avertissement", "Veuillez entrer une adresse e-mail valide.");
      return;
    }
    try {
      await createData("private/client/reset-password", { email: formState.email });
      handleToast("success", "Succès", "Un lien de réinitialisation a été envoyé à votre adresse e-mail.");
      setShowForgotPassword(false);
      resetForm();
    } catch (error) {
      handleToast("error", "Erreur", error?.data?.message || "Erreur lors de l'envoi du lien de réinitialisation.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validation des champs
  const getValidationMessage = (fieldName) => {
    if (!submitted) return null;
    switch (fieldName) {
      case 'lastName':
        return formState.lastName.trim() === "" ? "Veuillez renseigner votre nom." : null;
      case 'firstName':
        return formState.firstName.trim() === "" ? "Veuillez renseigner votre prénom." : null;
      case 'email':
        return !checkEmail(formState.email) ? "Veuillez renseigner un email valide." : null;
      case 'password':
        return formState.password === "" ? "Veuillez renseigner un mot de passe." : null;
      case 'confirmPassword':
        return formState.confirmPassword === "" ? "Veuillez confirmer votre mot de passe." : null;
      case 'contact':
        return formState.contact.trim() === "" ? "Veuillez renseigner un contact valide." : null;
      case 'confirmationCode':
        return formState.confirmationCode.trim() === "" ? "Veuillez renseigner un code de confirmation." : null;
      default:
        return null;
    }
  };

  const renderFormContent = () => {
    if (showForgotPassword) {
      return (
        <form onSubmit={handleForgotPasswordSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Adresse e-mail</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <icons.Mail size={20} className="text-gray-400" />
              </div>
              <input type="email" name="email" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" value={formState.email} onChange={handleChange} required />
            </div>
            <span className="text-red-500 text-xs">{getValidationMessage('email')}</span>
          </div>
          <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold shadow-md transition-transform duration-300 hover:scale-105 hover:bg-blue-700">Réinitialiser le mot de passe</button>
          <p className="mt-6 text-center text-gray-700 text-sm">
            <button onClick={() => setShowForgotPassword(false)} className="text-blue-600 font-semibold ml-1 hover:underline focus:outline-none">Retour à la connexion</button>
          </p>
        </form>
      );
    } else if (showConfirmation) {
      return (
        <form onSubmit={handleConfirmationSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Code de confirmation</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <icons.Lock size={20} className="text-gray-400" />
              </div>
              <input type="text" name="confirmationCode" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" value={formState.confirmationCode} onChange={handleChange} required />
            </div>
            <span className="text-red-500 text-xs">{getValidationMessage('confirmationCode')}</span>
          </div>
          <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold shadow-md transition-transform duration-300 hover:scale-105 hover:bg-blue-700">Confirmer</button>
          <p className="mt-6 text-center text-gray-700 text-sm">
            <button onClick={() => { setShowConfirmation(false); toggleView(); }} className="text-blue-600 font-semibold ml-1 hover:underline focus:outline-none">Retour à l'inscription</button>
          </p>
        </form>
      );
    } else if (showPasswordCreation) {
      return (
        <form onSubmit={handlePasswordCreationSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nouveau mot de passe</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <icons.Lock size={20} className="text-gray-400" />
              </div>
              <input type={showPassword ? "text" : "password"} name="password" className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" value={formState.password} onChange={handleChange} required />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? <icons.Eye size={20} /> : <icons.EyeOff size={20} />}
              </div>
            </div>
            <span className="text-red-500 text-xs">{getValidationMessage('password')}</span>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Confirmer le mot de passe</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <icons.Lock size={20} className="text-gray-400" />
              </div>
              <input type={showPassword ? "text" : "password"} name="confirmPassword" className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" value={formState.confirmPassword} onChange={handleChange} required />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? <icons.Eye size={20} /> : <icons.EyeOff size={20} />}
              </div>
            </div>
            <span className="text-red-500 text-xs">{getValidationMessage('confirmPassword')}</span>
          </div>
          <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold shadow-md transition-transform duration-300 hover:scale-105 hover:bg-blue-700">Créer mon mot de passe</button>
        </form>
      );
    } else { // Inscription ou connexion
      return (
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <>
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nom</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <icons.User size={20} className="text-gray-400" />
                    </div>
                    <input type="text" name="lastName" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" value={formState.lastName} onChange={handleChange} required />
                  </div>
                  <span className="text-red-500 text-xs">{getValidationMessage('lastName')}</span>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Prénom</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <icons.User size={20} className="text-gray-400" />
                    </div>
                    <input type="text" name="firstName" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" value={formState.firstName} onChange={handleChange} required />
                  </div>
                  <span className="text-red-500 text-xs">{getValidationMessage('firstName')}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Contact</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <icons.Contact size={20} className="text-gray-400" />
                  </div>
                  <input type="number" name="contact" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" value={formState.contact} onChange={handleChange} required />
                </div>
                <span className="text-red-500 text-xs">{getValidationMessage('contact')}</span>
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Adresse e-mail</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <icons.Mail size={20} className="text-gray-400" />
              </div>
              <input type="email" name="email" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" value={formState.email} onChange={handleChange} required />
            </div>
            <span className="text-red-500 text-xs">{getValidationMessage('email')}</span>
          </div>
          {isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <icons.Lock size={20} className="text-gray-400" />
                </div>
                <input type={showPassword ? "text" : "password"} name="password" className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" value={formState.password} onChange={handleChange} required />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                  {showPassword ? <icons.Eye size={20} /> : <icons.EyeOff size={20} />}
                </div>
              </div>
              <span className="text-red-500 text-xs">{getValidationMessage('password')}</span>
            </div>
          )}
          <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold shadow-md transition-transform duration-300 hover:scale-105 hover:bg-blue-700">
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
        </form>
      );
    }
  };

  const renderTitleAndSubtitle = () => {
    if (showForgotPassword) {
      return {
        title: "Mot de passe oublié ?",
        subtitle: "Entrez votre e-mail pour réinitialiser votre mot de passe.",
      };
    } else if (showConfirmation) {
      return {
        title: "Confirmer votre e-mail",
        subtitle: "Entrez le code de confirmation envoyé à votre adresse e-mail.",
      };
    } else if (showPasswordCreation) {
      return {
        title: "Créer un mot de passe",
        subtitle: "Définissez un mot de passe pour votre nouveau compte.",
      };
    } else if (isLogin) {
      return {
        title: "Connexion",
        subtitle: "Accédez à votre tableau de bord.",
      };
    } else {
      return {
        title: "Créer un compte",
        subtitle: "Rejoignez notre communauté.",
      };
    }
  };

  const { title, subtitle } = renderTitleAndSubtitle();

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
          <h2 className="text-3xl font-extrabold text-gray-900">{title}</h2>
          <p className="mt-2 text-sm text-gray-700">{subtitle}</p>
        </div>

        {renderFormContent()}

        {/* Liens de bascule */}
        <p className="mt-6 text-center text-gray-700 text-sm">
          {!showForgotPassword && !showConfirmation && !showPasswordCreation && (
            isLogin ? "Pas de compte ?" : "Déjà un compte ?"
          )}
          {!showForgotPassword && !showConfirmation && !showPasswordCreation && (
            <button onClick={toggleView} className="text-blue-600 font-semibold ml-1 hover:underline focus:outline-none">
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          )}
        </p>

        {isLogin && !showForgotPassword && (
          <p className="mt-4 text-center text-sm">
            <button onClick={() => { setShowForgotPassword(true); resetForm(); }} className="text-blue-600 font-semibold hover:underline focus:outline-none">
              Mot de passe oublié ?
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;