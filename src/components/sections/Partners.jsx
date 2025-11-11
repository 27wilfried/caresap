import React, { useEffect, useRef } from 'react';
import partner1 from '../../assets/logos.jpg';
import partner2 from '../../assets/banque-mondiale.png';
import partner3 from '../../assets/ministere.png';

import { Building2, Handshake, Users, FlaskConical, Globe } from 'lucide-react';

const Partners = () => {
  const partners = [
    { id: 1, logo: partner1, name: 'Incorruptible' },
    { id: 2, logo: partner2, name: 'Qualit' },
    { id: 3, logo: partner3, name: 'GROUPE ALM' },
  ];

  const partnersList = [
    { name: "Institutions internationales", icon: <Building2 className="w-6 h-6 text-indigo-500" /> },
    { name: "Fondations", icon: <Handshake className="w-6 h-6 text-green-500" /> },
    { name: "Gouvernements et collectivités", icon: <Globe className="w-6 h-6 text-blue-500" /> },
    { name: "ONG, startups, think tanks", icon: <Users className="w-6 h-6 text-yellow-500" /> },
    { name: "Chercheurs, étudiants, citoyens innovateurs", icon: <FlaskConical className="w-6 h-6 text-red-500" /> }
  ];

  const duplicatedPartners = [...partners, ...partners];
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let animationFrame;
    let speed = 0.5;
    let position = 0;

    const animate = () => {
      position -= speed;
      if (position <= -container.scrollWidth / 2) {
        position = 0;
      }
      container.style.transform = `translateX(${position}px)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* En-tête de section */}
        <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Nos<span className="text-primary"> collaborations</span>
          </h2>
          <p className="text-gray-600 mt-8 max-w-2xl mx-auto">
            Nous collaborons avec une diversité d'acteurs clés pour maximiser notre impact en Afrique.
          </p>
        </div>

        {/* Carrousel des logos */}
        <div className="relative mb-12">
          <div 
            ref={containerRef}
            className="flex w-max gap-12 items-center py-6"
            style={{ willChange: 'transform' }}
          >
            {duplicatedPartners.map((partner, index) => (
              <a
                key={`${partner.id}-${index}`}
                href={partner.url}
                className="flex items-center justify-center h-20 w-40 transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain hover:grayscale-0"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
        </div>

   
      </div>
    </section>
  );
};

export default Partners;