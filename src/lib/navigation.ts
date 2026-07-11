import type { NavigationData } from "@/types";

const NAVIGATION_DATA: NavigationData = {
  navbarData: {
    columns: [
      {
        _key: "nav-link-home",
        type: "link",
        name: "Home",
        href: "/"
      },
      {
        _key: "nav-column-startups",
        type: "column",
        title: "Startups",
        links: [
          {
            _key: "startups-browse",
            name: "Browse Startups",
            href: "/startup",
            description: "Explore curated startup pitches",
            icon: "rocket"
          },
          {
            _key: "startups-create",
            name: "Submit a Pitch",
            href: "/startup/create",
            description: "Share your idea with the community",
            icon: "file-plus-2"
          }
        ]
      },
      {
        _key: "nav-link-blog",
        type: "link",
        name: "Blog",
        href: "/blog"
      }
    ],
    buttons: [
      {
        _key: "nav-btn-create",
        text: "Pitch Your Startup",
        href: "/startup/create",
        variant: "default"
      }
    ]
  },
  settingsData: {
    siteTitle: "Ventureous",
    logo: null
  }
};

export const getNavigationData = async () => {
  return NAVIGATION_DATA;
};
