import {
  BookMarked,
  CogIcon,
  File,
  FileText,
  HomeIcon,
  ListMusic,
  type LucideIcon,
  MessageCircle,
  Tag,
  PanelBottom,
  PanelBottomIcon,
  Rocket,
  Settings2,
  TrendingUpDown,
  User,
} from "lucide-react";
import type {
  StructureBuilder,
  StructureResolverContext,
} from "sanity/structure";

import type { SchemaType, SingletonType } from "@/schemaTypes/index";
import { getTitleCase } from "@/utils/helper";

type Base<T = SchemaType> = {
  id?: string;
  type: T;
  preview?: boolean;
  title?: string;
  icon?: LucideIcon;
};

type CreateSingleTon = {
  S: StructureBuilder;
} & Base<SingletonType>;

const createSingleTon = ({ S, type, title, icon }: CreateSingleTon) => {
  const newTitle = title ?? getTitleCase(type);
  return S.listItem()
    .title(newTitle)
    .icon(icon ?? File)
    // Wrapped in a callback to prevent instant execution loops
    .child(() => S.document().schemaType(type).documentId(type));
};

type CreateList = {
  S: StructureBuilder;
} & Base;

const createList = ({ S, type, icon, title, id }: CreateList) => {
  const newTitle = title ?? getTitleCase(type);
  return S.documentTypeListItem(type)
    .id(id ?? type)
    .title(newTitle)
    .icon(icon ?? File);
};

export const structure = (
  S: StructureBuilder,
  context: StructureResolverContext
) =>
  S.list()
    .title("Content")
    .items([
      createSingleTon({ S, type: "homePage", icon: HomeIcon }),
      S.divider(),
      createList({
        S,
        type: "page",
        title: "Pages",
        icon: File,
      }),
      createSingleTon({
        S,
        type: "blogIndex",
        title: "Blog Index",
        icon: BookMarked,
      }),
      createList({
        S,
        type: "blog",
        title: "Blogs",
        icon: FileText,
      }),
      createList({
        S,
        type: "startup",
        title: "Startups",
        icon: Rocket,
      }),
      createList({
        S,
        type: "category",
        title: "Categories",
        icon: Tag,
      }),
      createList({
        S,
        type: "playlist",
        title: "Playlists",
        icon: ListMusic,
      }),
      createList({
        S,
        type: "faq",
        title: "FAQs",
        icon: MessageCircle,
      }),
      createList({ S, type: "author", title: "Authors", icon: User }),
      createList({
        S,
        type: "redirect",
        title: "Redirects",
        icon: TrendingUpDown,
      }),
      S.divider(),
      S.listItem()
        .title("Site Configuration")
        .icon(Settings2)
        // ✅ FIXED: Wrapped inside an arrow function callback () => 
        .child(() =>
          S.list()
            .title("Site Configuration")
            .items([
              createSingleTon({
                S,
                type: "navbar",
                title: "Navigation",
                icon: PanelBottom,
              }),
              createSingleTon({
                S,
                type: "footer",
                title: "Footer",
                icon: PanelBottomIcon,
              }),
              createSingleTon({
                S,
                type: "settings",
                title: "Global Settings",
                icon: CogIcon,
              }),
            ])
        ),
    ]);
