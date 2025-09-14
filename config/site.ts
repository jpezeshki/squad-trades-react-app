export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Squad Trades",
  description: "A complete trading collaboration platform",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Trades",
      href: "/trades",
    },
    {
      label: "Market Data",
      href: "/market-data",
    },
    {
      label: "Earnings Calendar",
      href: "/earnings-calendar",
    },
    {
      label: "Trade Log",
      href: "/trade-log",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    logout: "tbd"
  },
};
