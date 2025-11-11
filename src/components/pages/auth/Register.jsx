import React, { useState, useRef } from "react";
import { Mail, Lock, User, UserPlus, Contact, Eye, EyeOff } from "lucide-react";
import { checkEmail, createData } from "../../../helpers/fonctions";
import { useNavigate, Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Loader } from "rsuite";

const Register = () => {
  const [isLogin, setIsLogin] = useState(1);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const toast = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !checkEmail(email) || !password || !confirmPassword) {
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
      const client = await createData("finalize-register/", {
        email,
        password,
      });
 
      toast.current.show({
        severity: "success",
        summary: "Succès",
        detail: client?.data?.message || `Inscription validée`,
        life: 3000,
      });
      setLoading(false);
      navigate("/login");
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Erreur",
        detail:
          error?.response?.data?.message ||
          "Erreur lors de la création du compte.",
        life: 3000,
      });
      setLoading(false);
    }
  };

  const preRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!nom || !prenom || !email || !checkEmail(email) || !contact) {
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
      const client = await createData("pre-register/", {
        nom: nom + " " + prenom,
        email,
        contact,
      });
      
      toast.current.show({
        severity: "success",
        summary: "Succès",
        detail:
          client?.data?.message || `Un code a été envoyé à l'adresse ${email}`,
        life: 3000,
      });
      setIsLogin(2);
      setLoading(false);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Erreur",
        detail:
          error?.response?.data?.message ||
          "Erreur lors de la pré-inscription.",
        life: 3000,
      });
      setIsLogin(1);
      setLoading(false);
    }
  };

  const verifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !checkEmail(email) || !code) {
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
      const client = await createData("verify-code/", {
        email,
        code,
      });
    
      toast.current.show({
        severity: "success",
        summary: "Succès",
        detail: client?.data?.message || `Code validé`,
        life: 3000,
      });
      setIsLogin(3);
      setLoading(false);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Erreur",
        detail:
          error?.response?.data?.message ||
          "Erreur lors de la validation du code.",
        life: 3000,
      });
      setIsLogin(2);
      setLoading(false);
    }
  };

  const texteIndicatif = () => {
    if (isLogin === 1) return "Rejoignez notre communauté.";
    if (isLogin === 2)
      return "Un code de confirmation vous a été envoyé par email.";
    if (isLogin === 3)
      return "Créez un mot de passe sécurisé pour votre compte.";
  };

  const boutonsIndicatif = () => {
    if (isLogin === 1)
      return (
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold shadow-md transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
        >
          {loading ? (
            <Loader content="Pré-inscription en cours..." />
          ) : (
            "Pré-inscription"
          )}
        </button>
      );
    if (isLogin === 2)
      return (
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold shadow-md transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
        >
          {loading ? (
            <Loader content="Validation du code en cours..." />
          ) : (
            "Validation du code"
          )}
        </button>
      );
    if (isLogin === 3)
      return (
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold shadow-md transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
        >
          {loading ? (
            <Loader content="Inscription en cours..." />
          ) : (
            "S'inscription"
          )}
        </button>
      );
  };
  // tchegounsossou@gmail.com
  const fonctionEnCours = (e) => {
    if (isLogin === 1) return preRegister(e);
    if (isLogin === 2) return verifyCode(e);
    if (isLogin === 3) return handleSubmit(e);
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
            Créer un compte
          </h2>
          <p className="mt-2 text-sm text-gray-700">{texteIndicatif()}</p>
        </div>

        <form onSubmit={fonctionEnCours} className="space-y-5">
          {isLogin === 1 && (
            <>
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Nom
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      required
                    />
                    {submitted && nom === "" && (
                      <span className="text-red-500 text-xs">
                        Veuillez renseigner votre nom complet
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
                      <User size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      required
                    />
                    {submitted && prenom === "" && (
                      <span className="text-red-500 text-xs">
                        Veuillez renseigner votre prénom
                      </span>
                    )}
                  </div>
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
                    name="contact"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>
                {submitted && contact === "" && (
                  <span className="text-red-500 text-xs">
                    Veuillez renseigner votre contact
                  </span>
                )}
              </div>
            </>
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

          {isLogin === 2 && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Code de confirmation
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="confirmationCode"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
                {submitted && code === "" && (
                  <span className="text-red-500 text-xs">
                    Veuillez renseigner le code de confirmation
                  </span>
                )}
              </div>
            </div>
          )}

          {isLogin === 3 && (
            <>
              {/* Mot de passe */}
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
                  {/* Bouton pour afficher/masquer */}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {submitted && password === "" && (
                    <span className="text-red-500 text-xs">
                      Veuillez renseigner un mot de passe
                    </span>
                  )}
                </div>
              </div>

              {/* Confirmation du mot de passe */}
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
                  {/* Bouton pour afficher/masquer */}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                  {submitted && confirmPassword === "" && (
                    <span className="text-red-500 text-xs">
                      Veuillez confirmer votre mot de passe
                    </span>
                  )}
                </div>
              </div>
            </>
          )}

          {boutonsIndicatif()}
        </form>
        <p className="mt-6 text-center text-gray-700 text-sm">
          Vous avez déjà un compte
          <Link
            to="/login"
            className="text-blue-600 font-semibold ml-1 hover:underline focus:outline-none"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
