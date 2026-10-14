import React from 'react';
import { Instagram, MessageCircle, MapPin, Compass, ArrowUpRight } from 'lucide-react';
import { BELLA_LINKS } from '../constants/links';

interface AccessItem {
  id: string;
  title: string;
  subtitle: string;
  link: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  accentBorder: string;
}

const ACCESS_ITEMS: AccessItem[] = [
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    subtitle: 'Fale diretamente com a Bella Praiana',
    link: BELLA_LINKS.whatsapp,
    icon: MessageCircle,
    iconBg: 'bg-[#d96f43]/10 text-[#d96f43]',
    iconColor: 'text-[#d96f43]',
    accentBorder: 'hover:border-[#d96f43]/40',
  },
  {
    id: 'instagram',
    title: 'Instagram',
    subtitle: 'Veja novidades e acompanhe a Bella Praiana',
    link: BELLA_LINKS.instagram,
    icon: Instagram,
    iconBg: 'bg-[#2b7a8c]/10 text-[#2b7a8c]',
    iconColor: 'text-[#2b7a8c]',
    accentBorder: 'hover:border-[#2b7a8c]/40',
  },
  {
    id: 'maps',
    title: 'Como chegar',
    subtitle: 'Abra nossa localização no Google Maps',
    link: BELLA_LINKS.maps,
    icon: MapPin,
    iconBg: 'bg-[#e8a735]/15 text-[#b07415]',
    iconColor: 'text-[#b07415]',
    accentBorder: 'hover:border-[#e8a735]/40',
  },
  {
    id: 'maps360',
    title: 'Localização em 360°',
    subtitle: 'Explore a rua e o entorno da loja pelo Google Maps.',
    link: BELLA_LINKS.maps360,
    icon: Compass,
    iconBg: 'bg-[#2b7a8c]/10 text-[#2b7a8c]',
    iconColor: 'text-[#2b7a8c]',
    accentBorder: 'hover:border-[#2b7a8c]/40',
  },
];

export const QuickAccess: React.FC = () => {
  return (
    <section id="acessos" className="relative w-full py-12 sm:py-16 px-4 sm:px-6 z-10 scroll-mt-6">
      <div className="max-w-xl md:max-w-2xl mx-auto">
        {/* Título da seção */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] uppercase text-[#965535] block mb-1.5 font-sans">
            Canais Oficiais
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#2c241e] tracking-tight">
            Encontre a Bella Praiana
          </h2>
          <div className="w-12 h-0.5 bg-[#df7d52]/50 mx-auto mt-2.5 rounded-full" />
        </div>

        {/* Grade de cartões de acesso: 1 coluna no celular, 2 em telas médias/desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {ACCESS_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.title} - ${item.subtitle}`}
                className={`group relative p-4 sm:p-5 rounded-2xl beach-glass-card flex items-center justify-between gap-3.5 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d96f43] ${item.accentBorder}`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${item.iconBg}`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                  </div>
                  <div className="text-left min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-[#2c241e] group-hover:text-[#963c1a] transition-colors truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#685c52] line-clamp-2 sm:line-clamp-none leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 text-[#a89584] group-hover:text-[#2c241e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
