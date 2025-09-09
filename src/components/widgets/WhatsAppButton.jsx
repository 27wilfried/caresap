import React from 'react';
import { MessageCircle } from "lucide-react";


const WhatsAppButton = () => {
  const phoneNumber = '+2290161377398';
  const message = encodeURIComponent("Bonjour, je souhaite avoir des informations.");

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default WhatsAppButton;
