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
