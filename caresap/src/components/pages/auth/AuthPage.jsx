import React, { useState } from 'react';
import { Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    if (isLogin) {
      console.log('Connexion soumise', { email, password });
      setMessage('Connexion réussie ! Bienvenue.');
    } else {
      if (password !== confirmPassword) {
        setMessage('Erreur: Les mots de passe ne correspondent pas !');
        return;
      }
      console.log('Inscription soumise', { fullName, email, password });
      setMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');
    }
  };

  const toggleView = () => {
    setIsLogin(!isLogin);
    setMessage('');
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://presse.inserm.fr/wp-content/uploads/2023/06/PhotoCP-web-IA.jpg')`,
      }}
    >
      {/* Superposition sombre pour lisibilité */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      <div className="relative bg-white/90 rounded-3xl shadow-2xl p-10 m-10 w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-blue-600 text-white shadow-lg mb-4 transform transition-transform duration-300 hover:scale-110">
            {isLogin ? <LogIn size={32} /> : <UserPlus size={32} />}
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Connexion' : 'Créer un compte'}
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            {isLogin ? "Accédez à votre tableau de bord." : "Rejoignez notre communauté."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nom & Prénom</label>
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
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Adresse e-mail</label>
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
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mot de passe</label>
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
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Confirmer le mot de passe</label>
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
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold shadow-md transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
          >
            {isLogin ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.includes('réussi') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}

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
