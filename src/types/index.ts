export type BlogImage = {
  id?: string | null;
  url?: string | null;
  alt?: string | null;
};

export type Blog = {
  _id: string;
  title: string | null;
  description: string | null;
  slug: string | null;
  publishedAt: string | null;
  image?: BlogImage | null;
};

export type Maybe<T> = T | null | undefined;

export type SanityImageProps = {
  id?: string | null;
  url?: string | null;
  src?: string | null;
  alt?: string | null;
  caption?: string | null;
  asset?: {
    url?: string | null;
  } | null;
};

export type SanityButtonProps = {
  _key: string;
  text: string;
  href?: string | null;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  openInNewTab?: boolean | null;
  className?: string;
};

export type ColumnLink = {
  _key: string;
  name: string;
  href?: string | null;
  description?: string | null;
  icon?: string | null;
};

export type NavColumn =
  | {
      _key: string;
      type: "link";
      name: string;
      href?: string | null;
    }
  | {
      _key: string;
      type: "column";
      title: string;
      links?: ColumnLink[];
    };

export type NavbarData = {
  columns?: NavColumn[];
  buttons?: SanityButtonProps[];
};

export type SettingsData = {
  siteTitle?: string | null;
  logo?: SanityImageProps | null;
};

export type NavigationData = {
  navbarData: NavbarData;
  settingsData: SettingsData;
};

export type MenuLinkProps = {
  name: string;
  href: string;
  description?: string;
  icon?: string | null;
  onClick?: () => void;
};

export type SanityTextChild = {
  _type?: string;
  _key?: string;
  text?: string;
  marks?: string[];
};

export type SanityRichTextBlock = {
  _type: string;
  _key?: string;
  style?: string;
  children?: SanityTextChild[];
  markDefs?: unknown[];
  href?: string;
  openInNewTab?: boolean;
  id?: string;
  caption?: string;
};

export type SanityRichTextProps = SanityRichTextBlock[];

export type PageBuilderBlockTypes =
  | "faqAccordion"
  | "heroSection"
  | "logoTickerSection"
  | "topPitchesSection"
  | "featureCardsIcon"
  | "integrationsSection"
  | "faqSection";

export type PageBuilderBlock = {
  _key: string;
  _type: PageBuilderBlockTypes | string;
  [key: string]: unknown;
};
