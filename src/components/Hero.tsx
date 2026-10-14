import React from 'react';
import { MessageCircle, Instagram, ChevronDown } from 'lucide-react';
import { BELLA_LINKS } from '../constants/links';

interface HeroProps {
  heroCtaRef?: React.RefObject<HTMLDivElement | null>;
}

export const Hero: React.FC<HeroProps> = ({ heroCtaRef }) => {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-between items-center px-4 sm:px-6 py-6 sm:py-10 pt-safe pb-safe z-10">
      {/* Topo delicado para centralização equilibrada */}
      <div className="w-full flex justify-center items-center pt-1 sm:pt-3">
        <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#6c5a4b] font-medium opacity-85 select-none">
          Central Digital Oficial
        </span>
      </div>

      {/* Cartão principal central - Superfície translúcida refinada (beach-glass) */}
      <div className="w-full max-w-[420px] sm:max-w-md mx-auto my-auto py-7 sm:py-8.5 px-5 sm:px-8 rounded-[28px] sm:rounded-3xl beach-glass flex flex-col items-center text-center transition-all duration-500 animate-[fadeIn_0.9s_ease-out] shadow-[0_12px_36px_-12px_rgba(180,130,90,0.18),0_1px_3px_rgba(0,0,0,0.04)]">
        {/* LOGO ORIGINAL DA BELLA PRAIANA */}
        <div className="relative w-[256px] sm:w-[304px] md:w-[324px] aspect-square mb-0 transition-transform duration-700 ease-out hover:scale-[1.015]">
          <picture>
            <source
              type="image/webp"
              srcSet={`${BELLA_LINKS.logo400w} 400w, ${BELLA_LINKS.logo} 800w`}
              sizes="(max-width: 640px) 256px, (max-width: 768px) 304px, 324px"
            />
            <img
              src={BELLA_LINKS.logoPng}
              alt="Bella Praiana - Moda Praia, Verão e Estilo"
              width={800}
              height={800}
              fetchPriority="high"
              decoding="sync"
              className="w-full h-full object-contain drop-shadow-sm select-none"
              onError={(e) => {
                // Fallback gracioso para CDN externa se necessário
                const target = e.currentTarget;
                if (target.src !== BELLA_LINKS.logoExternal) {
                  target.src = BELLA_LINKS.logoExternal;
                }
              }}
            />
          </picture>
        </div>

        {/* IDENTIFICAÇÃO / ASSINATURA */}
        <p className="text-[10.5px] sm:text-xs tracking-[0.22em] uppercase text-[#735845] font-semibold -mt-3.5 sm:-mt-4 mb-2 font-sans">
          Moda praia • verão • estilo
        </p>

        {/* FRASE DE APOIO REFINADA - TAMANHO, CONTRASTE E LEGIBILIDADE APRIMORADOS */}
        <p className="font-serif italic text-[15px] sm:text-[17px] text-[#1b5d6c] leading-snug tracking-wide mb-6 sm:mb-7 font-normal max-w-[340px]">
          A essência do verão em cada detalhe.
        </p>

        {/* BOTÕES PRINCIPAIS DE AÇÃO COM REFORÇO VISUAL SUAVE */}
        <div ref={heroCtaRef} className="w-full flex flex-col gap-3 sm:gap-3.5">
          {/* BOTÃO PRINCIPAL: WhatsApp */}
          <a
            href={BELLA_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com a Bella Praiana no WhatsApp"
            className="w-full min-h-[52px] sm:min-h-[54px] px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#d96f43] to-[#cd6134] hover:from-[#c95a2d] hover:to-[#bd5226] text-white font-medium text-sm sm:text-[15px] flex items-center justify-center gap-3 shadow-[0_5px_18px_rgba(217,111,67,0.32)] hover:shadow-[0_7px_24px_rgba(217,111,67,0.42)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d96f43] focus-visible:ring-offset-2 transition-all duration-200"
          >
            <MessageCircle className="w-5 h-5 flex-shrink-0 text-white stroke-[2.2]" />
            <span className="tracking-wide font-semibold">Falar com a Bella Praiana</span>
          </a>

          {/* BOTÃO SECUNDÁRIO: Instagram */}
          <a
            href={BELLA_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver perfil da Bella Praiana no Instagram"
            className="w-full min-h-[50px] sm:min-h-[52px] px-6 py-3.5 rounded-2xl bg-white/80 hover:bg-white text-[#2c241e] font-medium text-sm sm:text-[15px] flex items-center justify-center gap-3 border border-[#dac4a8]/70 hover:border-[#2b7a8c]/40 shadow-[0_2px_8px_rgba(180,130,90,0.06)] hover:shadow-[0_4px_14px_rgba(180,130,90,0.12)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7a8c] focus-visible:ring-offset-2 transition-all duration-200"
          >
            <Instagram className="w-5 h-5 flex-shrink-0 text-[#2b7a8c] stroke-[2.2]" />
            <span className="tracking-wide">Ver Instagram</span>
          </a>
        </div>
      </div>

      {/* Indicador de rolagem mais intencional e integrado */}
      <div className="w-full flex justify-center pb-1">
        <a
          href="#acessos"
          aria-label="Rolar para os acessos da Bella Praiana"
          className="inline-flex flex-col items-center gap-1 px-4 py-1.5 rounded-full text-[#6c5847]/85 hover:text-[#2c241e] hover:bg-white/25 transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d96f43]"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-medium opacity-80 group-hover:opacity-100">
            Explorar
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce opacity-75 group-hover:opacity-100" />
        </a>
      </div>
    </section>
  );
};
