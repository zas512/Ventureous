import { notFound } from "next/navigation";

type DummyContentBlock = {
  _key: string;
  _type: "heading" | "paragraph";
  title?: string;
  text?: string;
};

type DummySlugPage = {
  title: string;
  pageBuilder: DummyContentBlock[];
};

const DUMMY_SLUG_PAGES: Record<string, DummySlugPage> = {
  "/about": {
    title: "About Ventureous",
    pageBuilder: [
      {
        _key: "about-h-1",
        _type: "heading",
        title: "Built For Builders"
      },
      {
        _key: "about-p-1",
        _type: "paragraph",
        text: "Ventureous is a demo-first platform for exploring startup ideas, sharing pitches, and learning from founder stories."
      },
      {
        _key: "about-p-2",
        _type: "paragraph",
        text: "This page is rendered from local dummy data with no external CMS or API calls."
      }
    ]
  },
  "/features": {
    title: "Features",
    pageBuilder: [
      {
        _key: "features-h-1",
        _type: "heading",
        title: "What You Can Explore"
      },
      {
        _key: "features-p-1",
        _type: "paragraph",
        text: "Discover startup cards, rich pitch pages, editorial blog content, and responsive UI blocks across the app."
      },
      {
        _key: "features-p-2",
        _type: "paragraph",
        text: "Everything on this route is static and safe for local development demos."
      }
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(DUMMY_SLUG_PAGES).map((path) => ({
    slug: path.split("/").filter(Boolean)
  }));
}

export default async function SlugPage({
  params
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugString = `/${slug.join("/")}`;
  const pageData = DUMMY_SLUG_PAGES[slugString];

  if (!pageData) {
    return notFound();
  }

  const { title, pageBuilder } = pageData;

  return !Array.isArray(pageBuilder) || pageBuilder?.length === 0 ? (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 font-semibold text-2xl capitalize">{title}</h1>
      <p className="mb-6 text-muted-foreground">
        This page has no content blocks yet.
      </p>
    </div>
  ) : (
    <main className="flex flex-col">
      {pageBuilder.map((block) => (
        <section className="container py-8" key={block._key}>
          {block._type === "heading" ? (
            <h2 className="font-semibold text-2xl">{block.title}</h2>
          ) : (
            <p className="max-w-3xl text-muted-foreground text-base leading-relaxed">
              {block.text}
            </p>
          )}
        </section>
      ))}
    </main>
  );
}
