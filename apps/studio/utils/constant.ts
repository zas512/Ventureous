import {
  Icon,
} from "@sanity/icons";
import { createElement } from "react";
import type { FieldGroupDefinition } from "sanity";

const ComposeSymbolIcon = () => createElement(Icon, { symbol: "compose" });
const SearchSymbolIcon = () => createElement(Icon, { symbol: "search" });
const InsertAboveSymbolIcon = () =>
  createElement(Icon, { symbol: "insert-above" });
const BlockElementSymbolIcon = () =>
  createElement(Icon, { symbol: "block-element" });
const InlineElementSymbolIcon = () =>
  createElement(Icon, { symbol: "inline-element" });

export const GROUP = {
  SEO: "seo",
  MAIN_CONTENT: "main-content",
  CARD: "card",
  RELATED: "related",
  OG: "og",
};

export const GROUPS: FieldGroupDefinition[] = [
  // { name: CONST.MAIN_CONTENT, default: true },
  {
    name: GROUP.MAIN_CONTENT,
    icon: ComposeSymbolIcon,
    title: "Content",
    default: true,
  },
  { name: GROUP.SEO, icon: SearchSymbolIcon, title: "SEO" },
  {
    name: GROUP.OG,
    icon: InsertAboveSymbolIcon,
    title: "Open Graph",
  },
  {
    name: GROUP.CARD,
    icon: BlockElementSymbolIcon,
    title: "Card",
  },
  {
    name: GROUP.RELATED,
    icon: InlineElementSymbolIcon,
    title: "Related",
  },
];

export const API_VERSION =
  process.env.SANITY_STUDIO_API_VERSION ?? "2025-05-08";
