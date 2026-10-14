import React, { useRef, useState, useEffect } from 'react';
import { Instagram, MessageCircle } from 'lucide-react';
import { BELLA_LINKS } from '../constants/links';

const SHOWCASE_CARDS = [
  {
    title: 'Verão',
    imageWebp: '/media/images/showcase-verao.webp',
    imageWebpMobile: '/media/images/showcase-verao-360w.webp',
    imageFallback: '/media/images/showcase-verao.png',
    externalFallback: 'https://i.postimg.cc/rm3LTNSr/Recepcao-Bella-Praiana-Iluminada.png',
    alt: 'Bella Praiana - Coleção Verão',
    objectPosition: 'object-[center_top]',
    width: 450,
    height: 800,
  },
  {
    title: 'Moda Praia',
    imageWebp: '/media/images/showcase-moda-praia.webp',
    imageWebpMobile: '/media/images/showcase-moda-praia-360w.webp',
    imageFallback: '/media/images/showcase-moda-praia.png',
    externalFallback: 'https://i.postimg.cc/bJWjP9QR/Bella-Praiana-Retrato-Tropical-Boutique.png',
    alt: 'Bella Praiana - Moda Praia',
    objectPosition: 'object-[center_top]',
    width: 450,
    height: 800,
  },
  {
    title: 'Estilo',
    imageWebp: '/media/images/showcase-estilo.webp',
    imageWebpMobile: '/media/images/showcase-estilo-400w.webp',
    imageFallback: '/media/images/showcase-estilo.png',
    externalFallback: 'https://i.postimg.cc/rm3LTNSJ/Estilo-Praiano-na-Boutique-Moderna.png',
    alt: 'Bella Praiana - Estilo',
    objectPosition: 'object-[center_top]',
    width: 685,
    height: 800,
  },
];

export const InstagramShowcase: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Sincroniza o indicador circular com a fotografia visível no carrossel mobile
  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const carouselCenter = el.scrollLeft + el.clientWidth / 2;
    const slides = Array.from(el.children) as HTMLElement[];
    let closestIndex = 0;
    let minDiff = Infinity;

    slides.forEach((slide, idx) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const diff = Math.abs(carouselCenter - slideCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    setActiveSlide(closestIndex);
  };

  // Permite clicar nos indicadores para navegar
  const scrollToSlide = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const slides = Array.from(el.children) as HTMLElement[];
    if (slides[idx]) {
      slides[idx].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setActiveSlide(idx);
    }
  };

  return (
    <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 z-10 overflow-hidden">
      <div className="max-w-xl md:max-w-2xl mx-auto">
        {/* Cartão container com superfície translúcida de praia */}
        <div className="rounded-3xl beach-glass p-5 sm:p-8 md:p-10 text-center transition-all duration-300 hover:shadow-md">
          {/* Título da seção */}
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] uppercase text-[#965535] block mb-1.5 font-sans">
            Galeria & Universo
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#2c241e] tracking-tight mb-3">
            Um pouco da Bella Praiana
          </h2>
          <div className="w-12 h-0.5 bg-[#df7d52]/50 mx-auto mb-4 rounded-full" />

          {/* Texto de atmosfera da marca */}
          <p className="text-xs sm:text-sm text-[#5d4a3b] leading-relaxed max-w-lg mx-auto mb-2.5 font-sans">
            Inspirada na leveza dos dias ensolarados e no balanço do mar. Peças e modelagens
            feitas para realçar sua beleza natural com conforto e sofisticação.
          </p>

          {/* Frase complementar editorial refinada: tamanho aumentado e alto contraste */}
          <p className="font-serif italic text-[15px] sm:text-base text-[#1b5d6c] mb-6 max-w-md mx-auto leading-relaxed font-normal">
            Descubra modelos, cores e estilos que combinam com você.
          </p>

          {/* =========================================================================
              1. CARROSSEL MOBILE EXCLUSIVO (sm:hidden) - UMA FOTOGRAFIA GRANDE POR VEZ
              ========================================================================= */}
          <div className="sm:hidden -mx-5 mb-3">
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth py-1 px-[7%] gap-3.5"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {SHOWCASE_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="w-[86%] flex-shrink-0 snap-center aspect-[4/5] rounded-[24px] overflow-hidden border border-white/70 shadow-sm relative bg-[#f0e6da]"
                >
                  <picture className="w-full h-full block">
                    <source type="image/webp" srcSet={card.imageWebpMobile} />
                    <img
                      src={card.imageFallback}
                      alt={card.alt}
                      width={card.width}
                      height={card.height}
                      className={`w-full h-full object-cover ${card.objectPosition}`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== card.externalFallback) {
                          target.src = card.externalFallback;
                        }
                      }}
                    />
                  </picture>
                  {/* Gradiente escuro translúcido na base */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  {/* Nome da fotografia: 13px - 14px em semibold para legibilidade no mobile */}
                  <div className="absolute bottom-0 inset-x-0 pb-3.5 px-3 text-center pointer-events-none">
                    <span className="text-[13.5px] tracking-wider text-white uppercase font-semibold drop-shadow-sm block">
                      {card.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Três pequenos indicadores circulares discretos abaixo do carrossel */}
            <div className="flex items-center justify-center gap-2 mt-3.5 mb-5" role="tablist">
              {SHOWCASE_CARDS.map((card, idx) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => scrollToSlide(idx)}
                  aria-label={`Visualizar fotografia ${card.title} (${idx + 1} de 3)`}
                  aria-selected={activeSlide === idx}
                  className="p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d96f43] rounded-full"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      activeSlide === idx
                        ? 'w-2.5 h-2.5 bg-[#d96f43] scale-110 shadow-xs'
                        : 'w-2 h-2 bg-[#d2c0ab] hover:bg-[#bba58e]'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* =========================================================================
              2. GRADE DESKTOP PRESERVADA (hidden sm:grid) - TRÊS FOTOGRAFIAS LADO A LADO
              ========================================================================= */}
          <div className="hidden sm:grid grid-cols-3 gap-3 sm:gap-3.5 mb-6">
            {SHOWCASE_CARDS.map((card) => (
              <div
                key={card.title}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/60 shadow-xs bg-[#f0e6da]"
              >
                {/* Fotografia vertical com zoom sutil no hover */}
                <picture className="w-full h-full block">
                  <source type="image/webp" srcSet={card.imageWebp} />
                  <img
                    src={card.imageFallback}
                    alt={card.alt}
                    width={card.width}
                    height={card.height}
                    className={`w-full h-full object-cover ${card.objectPosition} transition-transform duration-500 ease-out group-hover:scale-[1.025]`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== card.externalFallback) {
                        target.src = card.externalFallback;
                      }
                    }}
                  />
                </picture>

                {/* Leve gradiente inferior para garantir leitura límpida do nome */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none" />

                {/* Nome correspondente na parte inferior */}
                <div className="absolute bottom-0 inset-x-0 pb-2.5 sm:pb-3 px-1 text-center pointer-events-none">
                  <span className="text-[11px] sm:text-xs tracking-wider text-white uppercase font-semibold drop-shadow-sm block">
                    {card.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chamada comercial simplificada e direta */}
          <p className="text-xs sm:text-sm text-[#685c52] max-w-md mx-auto mb-5 sm:mb-6 leading-relaxed font-sans font-medium">
            Gostou de alguma peça? Consulte pelo WhatsApp.
          </p>

          {/* =========================================================================
              3. BOTÕES REFINADOS NO DESKTOP (Linha única no desktop / empilhados no mobile)
              ========================================================================= */}
          <div className="w-full max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5">
            {/* CTA Primário: Instagram */}
            <a
              href={BELLA_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver novidades e fotos no Instagram da Bella Praiana"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-2xl bg-gradient-to-r from-[#2b7a8c] to-[#1e5d6b] hover:from-[#236877] hover:to-[#174b57] text-white font-medium text-sm sm:text-[14px] whitespace-nowrap shadow-sm hover:shadow active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7a8c] focus-visible:ring-offset-2 transition-all duration-200"
            >
              <Instagram className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white stroke-[2.2] flex-shrink-0" />
              <span>Ver novidades no Instagram</span>
            </a>

            {/* CTA Secundário: WhatsApp */}
            <a
              href={BELLA_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar com a Bella Praiana no WhatsApp sobre peças e modelos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-2xl bg-white/80 hover:bg-white text-[#d96f43] font-medium text-sm sm:text-[14px] whitespace-nowrap border border-[#d96f43]/30 shadow-xs hover:shadow active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d96f43] focus-visible:ring-offset-2 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#d96f43] stroke-[2.2] flex-shrink-0" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
