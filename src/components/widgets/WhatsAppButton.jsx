import React from 'react';
import whatsappIcon from '../../assets/whatsapp.webp'; // ajuste le chemin selon ta structure

const WhatsAppButton = () => {
  const phoneNumber = '+2290161377398';
  const message = encodeURIComponent("Bonjour, je souhaite avoir des informations.");

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 text-white p-4 flex items-center justify-center transition-all duration-300 z-50"
    >
      <img 
        src={whatsappIcon} 
        alt="WhatsApp" 
        className="w-50 h-20"
      />
    </a>
  );
};

export default WhatsAppButton;
