import React from 'react';
import { Instagram, MessageCircle, MapPin } from 'lucide-react';
import { BELLA_LINKS } from '../constants/links';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full pt-10 sm:pt-12 pb-12 sm:pb-14 px-4 sm:px-6 z-10 text-center pb-safe">
      <div className="max-w-md mx-auto flex flex-col items-center">
        {/* LOGO EM TAMANHO MENOR */}
        <div className="w-28 sm:w-32 aspect-square mb-3 opacity-90 hover:opacity-100 transition-opacity">
          <picture>
            <source type="image/webp" srcSet={BELLA_LINKS.logo400w} />
            <img
              src={BELLA_LINKS.logoPng}
              alt="Bella Praiana"
              width={128}
              height={128}
              className="w-full h-full object-contain"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== BELLA_LINKS.logoExternal) {
                  target.src = BELLA_LINKS.logoExternal;
                }
              }}
            />
          </picture>
        </div>

        {/* HANDLE OFICIAL */}
        <a
          href={BELLA_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-sm font-semibold tracking-wider text-[#735845] hover:text-[#963c1a] transition-colors mb-3 block"
        >
          {BELLA_LINKS.handle}
        </a>

        {/* ACESSOS RÁPIDOS COM ÁREA INTERATIVA AMPLIADA (48x48px POR ÍCONE) */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-6">
          <a
            href={BELLA_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Bella Praiana"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-transparent text-[#786453] hover:text-[#2b7a8c] hover:bg-white/25 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7a8c]"
          >
            <Instagram className="w-4 h-4 stroke-[2]" />
          </a>
          <a
            href={BELLA_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp da Bella Praiana"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-transparent text-[#786453] hover:text-[#d96f43] hover:bg-white/25 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d96f43]"
          >
            <MessageCircle className="w-4 h-4 stroke-[2]" />
          </a>
          <a
            href={BELLA_LINKS.maps}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Localização no Google Maps"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-transparent text-[#786453] hover:text-[#b07415] hover:bg-white/25 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b07415]"
          >
            <MapPin className="w-4 h-4 stroke-[2]" />
          </a>
        </div>

        {/* TEXTO DE DIREITOS COM CONTRASTE REFINADO E RESPIRO INFERIOR */}
        <p className="text-[11px] font-medium text-[#685c52] tracking-wider uppercase leading-relaxed">
          Bella Praiana • Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
};
