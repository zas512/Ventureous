import { ArrowLeft, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@/components/elements/rich-text";
import { TableOfContent } from "@/components/elements/table-of-content";

import type { SanityRichTextProps } from "@/types";

type DummyBlogArticle = {
  _id: string;
  _type: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  image?: string | null;
  richText: SanityRichTextProps;
};

const DUMMY_BLOG_ARTICLES: DummyBlogArticle[] = [
  {
    _id: "blog-1",
    _type: "blog",
    slug: "how-we-validated-12-startup-ideas",
    title: "How We Validated 12 Startup Ideas in 30 Days",
    description:
      "A tactical framework for testing assumptions quickly with tiny experiments.",
    publishedAt: "2026-07-01",
    image: "/images/avatar-ashwin-santiago.jpg",
    richText: [
      {
        _key: "p1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p1c1",
            _type: "span",
            marks: [],
            text: "Great ideas become businesses only after they survive contact with real users."
          }
        ],
        markDefs: []
      },
      {
        _key: "h2-1",
        _type: "block",
        style: "h2",
        children: [
          {
            _key: "h2-1c1",
            _type: "span",
            marks: [],
            text: "Start With Strong Assumptions"
          }
        ],
        markDefs: []
      },
      {
        _key: "p2",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p2c1",
            _type: "span",
            marks: [],
            text: "For each idea, define the core risk: demand, willingness to pay, or retention."
          }
        ],
        markDefs: []
      }
    ]
  },
  {
    _id: "blog-2",
    _type: "blog",
    slug: "founder-updates-that-investors-read",
    title: "Founder Updates That Investors Actually Read",
    description:
      "Structure your monthly updates with clarity, traction, and honest risk reporting.",
    publishedAt: "2026-06-27",
    image: "/images/avatar-florence-shaw.jpg",
    richText: [
      {
        _key: "p1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p1c1",
            _type: "span",
            marks: [],
            text: "Your investor update should be short, specific, and easy to skim in under two minutes."
          }
        ],
        markDefs: []
      }
    ]
  },
  {
    _id: "blog-3",
    _type: "blog",
    slug: "from-landing-page-to-first-100-users",
    title: "From Landing Page to First 100 Users",
    description:
      "The messaging, channels, and launch cadence we used to find early traction.",
    publishedAt: "2026-06-24",
    image: "/images/avatar-lula-meyers.jpg",
    richText: [
      {
        _key: "p1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p1c1",
            _type: "span",
            marks: [],
            text: "Early growth is less about scale and more about learning velocity."
          }
        ],
        markDefs: []
      }
    ]
  }
];

function getBlogArticleBySlug(slug: string): DummyBlogArticle | undefined {
  return DUMMY_BLOG_ARTICLES.find((article) => article.slug === slug);
}

export async function generateStaticParams() {
  return DUMMY_BLOG_ARTICLES.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = true;

export default async function BlogSlugPage({
  params
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const data = getBlogArticleBySlug(slug);

  if (!data) {
    return notFound();
  }

  const { title, description, image, richText, publishedAt } = data ?? {};

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : null;

  return (
    <main className="min-h-screen pb-24">
      <div className="mx-auto max-w-6xl px-6 pt-28">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-pink-400"
        >
          <ArrowLeft className="size-3.5" />
          Back to Blog
        </Link>

        <div className="flex gap-10 lg:gap-16">
          {/* Main content column */}
          <div className="min-w-0 flex-1">
            {/* Date */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {formattedDate && (
                <time dateTime={publishedAt ?? ""}>{formattedDate}</time>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {Math.max(
                  3,
                  Math.ceil((description ?? "").split(/\s+/).length / 40)
                )}{" "}
                min read
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
            )}

            {/* Cover image */}
            {image && (
              <div className="mt-8 overflow-hidden rounded-2xl">
                <div className="relative aspect-video w-full">
                  <Image
                    alt={title}
                    src={image}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 896px"
                    className="w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="mt-10 h-px bg-border" />

            {/* Article body */}
            <article className="mt-10">
              <RichText
                richText={richText}
                className="prose prose-base md:prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:mt-8 prose-h2:md:mt-10 prose-h2:mb-3 prose-h2:md:mb-4 prose-h2:border-none prose-h3:text-lg prose-h3:sm:text-xl prose-h3:mt-6 prose-h3:md:mt-8 prose-p:text-neutral-600 prose-p:leading-relaxed dark:prose-p:text-white/60 prose-a:text-pink-500 dark:prose-a:text-pink-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-neutral-800 dark:prose-strong:text-white/80 prose-blockquote:border-l-pink-500/40 prose-blockquote:text-neutral-500 dark:prose-blockquote:text-white/45 prose-blockquote:not-italic prose-code:text-pink-600 dark:prose-code:text-pink-300 prose-code:bg-neutral-100 dark:prose-code:bg-white/5 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-li:text-neutral-600 dark:prose-li:text-white/60 prose-li:marker:text-pink-400/60 prose-hr:border-neutral-200 dark:prose-hr:border-white/10"
              />
            </article>
          </div>

          {/* Right sidebar — ToC (sticky) */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-28">
              <TableOfContent richText={richText ?? []} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
