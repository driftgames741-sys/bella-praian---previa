import React from 'react';
import { MapPin, Truck, Clock } from 'lucide-react';
import { BELLA_LINKS } from '../constants/links';

export const StoreInfo: React.FC = () => {
  return (
    <section className="relative w-full px-4 sm:px-6 pt-2 pb-6 sm:pb-8 z-10">
      <div className="max-w-xl md:max-w-3xl mx-auto">
        {/* Bloco informativo premium integrado ao tema de praia */}
        <div className="beach-glass rounded-3xl p-5 sm:p-6 md:p-7 shadow-xs transition-all duration-300 hover:shadow-md">
          {/* Distribuição equilibrada no desktop: mais respiro para entregas e horário */}
          <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1.15fr_1fr] gap-5 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-[#eadecd]/80">
            {/* 1. LOJA FÍSICA */}
            <a
              href={BELLA_LINKS.maps}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver endereço da loja física no Google Maps: Av. Beberibe, 4325 - Recife"
              className="flex items-start gap-3.5 pt-1 pb-1.5 md:py-0 group hover:opacity-95 transition-opacity"
            >
              <div className="w-10 h-10 rounded-xl bg-[#d96f43]/10 text-[#d96f43] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-[#965535] block mb-1 font-sans">
                  Loja Física
                </span>
                <p className="text-sm font-semibold text-[#2c241e] leading-snug group-hover:text-[#963c1a] transition-colors">
                  Av. Beberibe, 4325
                </p>
                <p className="text-xs text-[#6e5846] mt-0.5 leading-relaxed">
                  Beberibe — Recife/PE
                </p>
                {/* Indicação discreta e elegante de link */}
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#d96f43] group-hover:text-[#b8542c] group-hover:translate-x-0.5 transition-all mt-1.5">
                  Ver no mapa <span aria-hidden="true" className="text-xs">↗</span>
                </span>
              </div>
            </a>

            {/* 2. ENTREGAS */}
            <div className="flex items-start gap-3.5 pt-4 pb-2 sm:pb-2.5 md:py-0 md:pl-6">
              <div className="w-10 h-10 rounded-xl bg-[#2b7a8c]/10 text-[#2b7a8c] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Truck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-[#2b7a8c] block mb-1 font-sans">
                  Entregas
                </span>
                <p className="text-sm font-semibold text-[#2c241e] leading-snug">
                  Motoboy e Correios
                </p>
                <p className="text-xs text-[#6e5846] mt-0.5 leading-relaxed">
                  Receba seu pedido com entrega local ou envio pelos Correios.
                </p>
              </div>
            </div>

            {/* 3. HORÁRIO DE ATENDIMENTO - DESTAQUE VISUAL */}
            <div className="flex items-start gap-3.5 pt-4 md:py-0 md:pl-6">
              <div className="w-10 h-10 rounded-xl bg-[#e8a735]/15 text-[#b07415] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] sm:text-[10.5px] font-semibold tracking-[0.14em] md:tracking-[0.15em] uppercase text-[#b07415] block mb-1 font-sans md:whitespace-nowrap">
                  Horário de Atendimento
                </span>
                <p className="text-sm font-bold text-[#2c241e] tracking-tight">
                  Diariamente
                </p>
                <p className="text-sm sm:text-base font-bold text-[#963c1a] mt-0.5">
                  9h30 às 18h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
