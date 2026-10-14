import React from 'react';
import { Compass, Navigation } from 'lucide-react';
import { BELLA_LINKS } from '../constants/links';

export const LocationSection: React.FC = () => {
  return (
    <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 z-10">
      <div className="max-w-xl md:max-w-2xl mx-auto">
        <div className="rounded-3xl beach-glass p-6 sm:p-8 md:p-10 text-center transition-all duration-300 hover:shadow-md">
          {/* Título da seção */}
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] uppercase text-[#965535] block mb-1.5 font-sans">
            Visite Nosso Espaço
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#2c241e] tracking-tight mb-3">
            Venha conhecer a Bella Praiana
          </h2>
          <div className="w-12 h-0.5 bg-[#df7d52]/50 mx-auto mb-4 rounded-full" />

          <p className="text-xs sm:text-sm text-[#5d4a3b] leading-relaxed max-w-md mx-auto mb-7 font-sans">
            Consulte a rota pelo Google Maps ou visualize o endereço e o entorno em 360° antes de chegar.
          </p>

          {/* Dois botões de ação para localização: linha única no desktop, empilhados no mobile */}
          <div className="w-full max-w-lg mx-auto flex flex-col sm:flex-row gap-3 sm:gap-3.5 justify-center items-center">
            {/* Botão 1: Como chegar (Coral / Terracota) */}
            <a
              href={BELLA_LINKS.maps}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir Como chegar no Google Maps"
              className="w-full sm:w-auto sm:px-6 py-3.5 min-h-[50px] rounded-2xl bg-[#d96f43] hover:bg-[#c35c31] text-white font-medium text-sm sm:text-[14.5px] whitespace-nowrap flex items-center justify-center gap-2.5 shadow-sm hover:shadow active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d96f43] transition-all duration-200"
            >
              <Navigation className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2] flex-shrink-0" />
              <span>Como chegar</span>
            </a>

            {/* Botão 2: Ver localização em 360° (Claro e Translúcido) */}
            <a
              href={BELLA_LINKS.maps360}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visualizar a localização e entorno em 360 graus"
              className="w-full sm:w-auto sm:px-6 py-3.5 min-h-[50px] rounded-2xl bg-white/75 hover:bg-white text-[#2c241e] font-medium text-sm sm:text-[14.5px] whitespace-nowrap flex items-center justify-center gap-2.5 border border-[#dac4a8]/60 shadow-xs hover:shadow active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7a8c] transition-all duration-200"
            >
              <Compass className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#2b7a8c] stroke-[2.2] flex-shrink-0" />
              <span>Ver localização em 360°</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
