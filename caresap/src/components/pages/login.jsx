import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function AirLocLoginForm() {
  const [formData, setFormData] = useState({
    password: '',
    rememberMe: false
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptSMS, setAcceptSMS] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptSMS || !phoneNumber || !formData.password) return;
    console.log('Form submitted:', {
      phoneNumber,
      password: formData.password,
      rememberMe: formData.rememberMe,
      acceptSMS
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center" style={{ backgroundImage: 'url("/background.jpg")' }}>
      <div className="w-full max-w-md rounded-xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/30">
          <h1 className="text-xl font-bold text-white">Connexion ou inscription</h1>
          <button className="text-white/70 hover:text-white transition-colors" aria-label="Fermer">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-center text-white mb-2">Bienvenue sur AirLoc</h2>
            <p className="text-center text-white/70 mb-6">Entrez vos informations pour continuer</p>
          </div>

          {/* Champ Pays/Numéro CORRIGÉ */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Pays / Numéro de téléphone</label>
            <div className="relative flex items-center  bg-white/10 rounded-lg overflow-hidden">
              <PhoneInput
                international
                defaultCountry="FR"
                value={phoneNumber}
                onChange={setPhoneNumber}
                className="w-full"
                countrySelectProps={{
                  className: "!bg-gray-800 !text-white !border-r !border-white/50 !py-3 !pl-4 !pr-8 p-8",
                  arrowComponent: () => (
                    <span className="">
                      ▼
                    </span>
                  )
                }}
                inputClassName=""
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-white/50 bg-white/10 text-white placeholder-white/70 rounded-lg pr-10 focus:ring-2 focus:ring-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white/70 hover:text-white"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4">
            <label className="flex items-center text-sm text-white">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-2 h-4 w-4 text-red-600 border-white/30 bg-white/20 rounded focus:ring-red-500"
              />
              Se souvenir de moi
            </label>
            <label className="flex items-start text-sm text-white">
              <input
                type="checkbox"
                checked={acceptSMS}
                onChange={e => setAcceptSMS(e.target.checked)}
                required
                className="mr-2 mt-1 h-4 w-4 text-red-600 border-white/30 bg-white/20 rounded focus:ring-red-500"
              />
              Je consens à recevoir des SMS de confirmation. <br />
              <a href="/privacy" className="text-red-300 underline">Politique de confidentialité</a>
            </label>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={!acceptSMS || !phoneNumber || !formData.password}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
              (acceptSMS && phoneNumber && formData.password) ? 'bg-primary hover:bg-red-700 shadow-md' : 'bg-white/20 cursor-not-allowed text-white/40'
            }`}
          >
            Continuer
          </button>

          {/* Lien vers Connexion */}
          <p className="text-center text-sm text-white mt-4">
            Vous avez déjà un compte ?{' '}
            <a href="/auth/login" className="text-red-300 hover:underline font-medium">Se connecter</a>
          </p>
        </form>
      </div>
    </div>
  );
}