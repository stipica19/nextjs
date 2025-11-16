type NavLink = {
  href?: string;
  key: string;
  label: string;
  subLinks?: { href?: string; label: string; key?: string }[];
};

export const getNavLinks = (locale: string, user?: any): NavLink[] => {
  const links: NavLink[] = [
    {
      href: `/${locale}`,
      key: "home",
      label: locale === "de" ? "STARTSEITE" : "HOME",
    },
    {
      href: `/${locale}/anmeldung`,
      key: "anmeldung",
      label: locale === "de" ? "ANMELDUNG" : "REGISTRATION",
    },
    {
      href: `/${locale}/galerie`,
      key: "galerie",
      label: locale === "de" ? "GALERIE" : "GALLERY",
    },
    {
      href: `/${locale}/reisefuhrer`,
      key: "reiseführer",
      label: locale === "de" ? "REISEFÜHRER" : "TOUR GUIDE",
    },
    {
      href: `/${locale}/blog`,
      key: "blog",
      label: locale === "de" ? "blog" : "blog",
    },
    {
      href: `/${locale}/gastebuch`,
      key: "gästebuch",
      label: locale === "de" ? "GÄSTEBUCH" : "GUESTBOOK",
    },
    {
      href: `/${locale}/kontakt`,
      key: "kontakt",
      label: locale === "de" ? "KONTAKT" : "CONTACT",
    },
    {
      href: `/${locale}/termine`,
      key: "termine",
      label: locale === "de" ? "TERMINE" : "DATES",
    },
  ];

  if (user.isAdmin) {
    links.push({
      key: "admin",
      label: "ADMIN",
      subLinks: [
        {
          href: `/${locale}/admin/upload`,
          label: "Upload Images",
        },
        {
          href: `/${locale}/admin/list`,
          label: "Lista Prijava",
        },
        {
          key: "logout",
          label: "Logout",
        },
      ],
    });
  }

  return links;
};
