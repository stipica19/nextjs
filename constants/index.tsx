export const getNavLinks = (locale: string) => [
  { href: `/${locale}`, key: "home", label: locale === "de" ? "STARTSEITE" : "HOME" },
  { href: `/${locale}/anmeldung`, key: "anmeldung", label: locale === "de" ? "ANMELDUNG" : "REGISTRATION" },
  { href: `/${locale}/galerie`, key: "galerie", label: locale === "de" ? "Galerie" : "GALLERY" },
  { href: `/${locale}/reisefuhrer`, key: "reiseführer", label: locale === "de" ? "Reiseführer" : "TOUR GUIDE" },
  { href: `/${locale}/gastebuch`, key: "gästebuch", label: locale === "de" ? "Gästebuch" : "GUESTBOOK" },
  { href: `/${locale}/kontakt`, key: "kontakt", label: locale === "de" ? "Kontakt" : "CONTACT" },
  { href: `/${locale}/termine`, key: "termine", label: locale === "de" ? "Termine" : "DATES" },
];
