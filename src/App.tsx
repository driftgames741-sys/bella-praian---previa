/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { BeachShaderBackground } from './components/BeachShaderBackground';
import { Hero } from './components/Hero';
import { StoreInfo } from './components/StoreInfo';
import { QuickAccess } from './components/QuickAccess';
import { InstagramShowcase } from './components/InstagramShowcase';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { FadeInOnScroll } from './components/FadeInOnScroll';

export default function App() {
  const heroCtaRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative min-h-[100svh] w-full text-[#2c241e] selection:bg-[#df7d52]/20 selection:text-[#963c1a]">
      {/* FUNDO VIVO WEBGL: Praia com areia seca, areia molhada, mar e espuma orgânica */}
      <BeachShaderBackground />

      {/* CONTEÚDO PRINCIPAL SOBRE A PRAIA */}
      <main className="relative z-10 flex flex-col items-center w-full">
        {/* PRIMEIRA TELA / HERO (100svh) */}
        <Hero heroCtaRef={heroCtaRef} />

        {/* ÁREA DE INFORMAÇÕES DA LOJA (Loja física, Entregas, Horário) */}
        <FadeInOnScroll>
          <StoreInfo />
        </FadeInOnScroll>

        {/* SEÇÃO DE ACESSOS OFICIAIS */}
        <FadeInOnScroll>
          <QuickAccess />
        </FadeInOnScroll>

        {/* SEÇÃO GALERIA / UNIVERSO INSTAGRAM */}
        <FadeInOnScroll>
          <InstagramShowcase />
        </FadeInOnScroll>

        {/* SEÇÃO DE LOCALIZAÇÃO (MAPS E VISUALIZAÇÃO 360°) */}
        <FadeInOnScroll>
          <LocationSection />
        </FadeInOnScroll>
      </main>

      {/* RODAPÉ */}
      <FadeInOnScroll>
        <Footer />
      </FadeInOnScroll>

      {/* BOTÃO FLUTUANTE DO WHATSAPP (surge após rolar o hero) */}
      <FloatingWhatsApp heroCtaRef={heroCtaRef} />
    </div>
  );
}
