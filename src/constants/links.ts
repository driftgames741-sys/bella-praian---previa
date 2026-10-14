/**
 * Links e Assets Oficiais da Bella Praiana
 * Centralizados para facilitar manutenção e alterações futuras.
 */
export const BELLA_LINKS = {
  // Imagem do logotipo oficial
  logo: "/media/images/logo-bella-praiana.webp",
  logoPng: "/media/images/logo-bella-praiana.png",
  logo400w: "/media/images/logo-bella-praiana-400w.webp",
  logoExternal: "https://i.postimg.cc/MZDYBBF4/Logo-Bella-Praiana-com-Sol-e-Ondas.png",

  // Links oficiais de contato e localização
  instagram: "https://www.instagram.com/bellaapraiana/",
  whatsapp: "https://api.whatsapp.com/send/?phone=558198108862&text&type=phone_number&app_absent=0&utm_source=ig",
  maps: "https://maps.app.goo.gl/ixfdN3MbCW4R62Mz8",
  maps360: "https://maps.app.goo.gl/aNNyDZgnraZrrbRZ7",
  handle: "@bellaapraiana",
} as const;

export type BellaLinks = typeof BELLA_LINKS;
