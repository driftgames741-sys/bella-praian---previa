import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { BELLA_LINKS } from '../constants/links';

interface FloatingWhatsAppProps {
  heroCtaRef?: React.RefObject<HTMLDivElement | null>;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ heroCtaRef }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Se tiver referência do CTA do Hero, verifica se o usuário já rolou além dele
      if (heroCtaRef?.current) {
        const rect = heroCtaRef.current.getBoundingClientRect();
        // Quando o botão do topo estiver fora da viewport (rolado para cima)
        setIsVisible(rect.bottom < 60);
      } else {
        // Fallback baseado no scroll vertical da tela
        setIsVisible(window.scrollY > 320);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroCtaRef]);

  return (
    <div
      className={`fixed bottom-[calc(4.25rem+env(safe-area-inset-bottom,0px))] right-5 sm:bottom-10 sm:right-7 z-40 transition-all duration-300 ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
      }`}
    >
      <a
        href={BELLA_LINKS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Bella Praiana no WhatsApp"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#d96f43] hover:bg-[#c25a2f] text-white shadow-[0_6px_20px_rgba(217,111,67,0.38)] hover:shadow-[0_8px_25px_rgba(217,111,67,0.50)] active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d96f43] focus-visible:ring-offset-2 transition-all duration-200"
      >
        {/* Efeito sutil de onda / pulso */}
        <span className="absolute -inset-1 rounded-full bg-[#d96f43]/25 animate-ping -z-10 pointer-events-none" />

        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2] text-white" />

        {/* Tooltip sutil no desktop */}
        <span className="absolute right-full mr-3.5 px-3 py-1.5 rounded-lg bg-[#2c241e] text-white text-xs font-medium tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden md:block shadow-md">
          Falar no WhatsApp
        </span>
      </a>
    </div>
  );
};
