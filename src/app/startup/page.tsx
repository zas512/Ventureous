import type { Metadata } from "next";
import { Rocket } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Tag } from "@/components/shared/tag";
import { StartupSearch } from "@/components/startup/startup-search";
import type { StartupCardItem } from "@/components/startup/startup-card";
import { getSEOMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return getSEOMetadata({
    title: "All Startup Pitches",
    description:
      "Browse innovative startup pitches from founders across every industry. Filter by category or search for something specific.",
    slug: "/startup"
  });
}

type Props = {
  searchParams: Promise<{ sort?: string; query?: string; category?: string }>;
};

const DUMMY_STARTUPS: StartupCardItem[] = [
  {
    _id: "startup-1",
    title: "PitchPilot",
    category: "SaaS",
    description:
      "AI-assisted startup storytelling for founders preparing investor updates.",
    image: "/images/avatar-ashwin-santiago.jpg",
    author: {
      name: "Ashwin Santiago",
      image: "/images/avatar-ashwin-santiago.jpg"
    },
    upvotes: 412,
    views: 1203,
    _createdAt: "2026-07-01"
  },
  {
    _id: "startup-2",
    title: "FlowDock",
    category: "Productivity",
    description:
      "A focused hub for async team updates, goals, and weekly momentum.",
    image: "/images/avatar-florence-shaw.jpg",
    author: {
      name: "Florence Shaw",
      image: "/images/avatar-florence-shaw.jpg"
    },
    upvotes: 356,
    views: 987,
    _createdAt: "2026-06-28"
  },
  {
    _id: "startup-3",
    title: "MangoMint",
    category: "Fintech",
    description:
      "Cashflow forecasting and runway alerts tailored for early-stage teams.",
    image: "/images/avatar-lula-meyers.jpg",
    author: { name: "Lula Meyers", image: "/images/avatar-lula-meyers.jpg" },
    upvotes: 501,
    views: 1420,
    _createdAt: "2026-07-06"
  },
  {
    _id: "startup-4",
    title: "RadarLoop",
    category: "Developer Tools",
    description:
      "Build feedback loops from bug reports to shipped fixes with zero friction.",
    image: "/images/avatar-owen-garcia.jpg",
    author: { name: "Owen Garcia", image: "/images/avatar-owen-garcia.jpg" },
    upvotes: 298,
    views: 834,
    _createdAt: "2026-07-03"
  },
  {
    _id: "startup-5",
    title: "CredFrame",
    category: "EdTech",
    description:
      "Create skill-based portfolios that map projects to measurable outcomes.",
    image: "/images/avatar-ashwin-santiago.jpg",
    author: { name: "Ari Monroe", image: "/images/avatar-florence-shaw.jpg" },
    upvotes: 267,
    views: 723,
    _createdAt: "2026-06-22"
  },
  {
    _id: "startup-6",
    title: "PatchNest",
    category: "HealthTech",
    description:
      "Lightweight remote care coordination for small clinics and practitioners.",
    image: "/images/avatar-lula-meyers.jpg",
    author: { name: "Nora Patel", image: "/images/avatar-owen-garcia.jpg" },
    upvotes: 189,
    views: 610,
    _createdAt: "2026-06-19"
  },
  {
    _id: "startup-7",
    title: "LedgerLeaf",
    category: "Fintech",
    description:
      "Simple bookkeeping automation for solo founders and indie teams.",
    image: "/images/avatar-owen-garcia.jpg",
    author: { name: "Mina Costa", image: "/images/avatar-lula-meyers.jpg" },
    upvotes: 331,
    views: 1002,
    _createdAt: "2026-07-08"
  },
  {
    _id: "startup-8",
    title: "CourseCrafter",
    category: "EdTech",
    description:
      "Build and publish interactive cohort lessons with reusable templates.",
    image: "/images/avatar-florence-shaw.jpg",
    author: { name: "Drew Kim", image: "/images/avatar-ashwin-santiago.jpg" },
    upvotes: 244,
    views: 691,
    _createdAt: "2026-06-30"
  }
];

function getCategoryCounts(startups: StartupCardItem[]) {
  const counts = new Map<string, number>();
  for (const startup of startups) {
    const key = startup.category?.trim();
    if (!key) {
      continue;
    }
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([title, count]) => ({
      _id: `cat-${title.toLowerCase().replace(/\s+/g, "-")}`,
      title,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      count
    }));
}

/**
 * All startups page with category filters, sorting, and fuzzy search.
 */
export default async function StartupsPage({ searchParams }: Readonly<Props>) {
  const { sort = "recent", category } = await searchParams;

  const allCategories = getCategoryCounts(DUMMY_STARTUPS);

  const byCategory = category
    ? DUMMY_STARTUPS.filter(
        (startup) => startup.category?.toLowerCase() === category.toLowerCase()
      )
    : DUMMY_STARTUPS;

  const startups = [...byCategory].sort((a, b) => {
    if (sort === "upvotes") {
      return (b.upvotes ?? 0) - (a.upvotes ?? 0);
    }

    if (sort === "views") {
      return (b.views ?? 0) - (a.views ?? 0);
    }

    const aDate = a._createdAt ? new Date(a._createdAt).getTime() : 0;
    const bDate = b._createdAt ? new Date(b._createdAt).getTime() : 0;
    return bDate - aDate;
  });

  return (
    <main className="min-h-screen pb-24">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-pink-500/5 via-transparent to-transparent" />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Tag>All Pitches</Tag>
          <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-6xl">
            Discover Startup <span className="text-pink-400">Pitches</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-500 dark:text-white/50">
            Browse innovative ideas from founders across every industry. Filter
            by category or search for something specific.
          </p>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="mx-auto max-w-5xl px-6 pb-12">
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/startup"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200/60 dark:border-white/10 bg-neutral-50 shadow-sm dark:bg-white/5 dark:shadow-none px-4 py-2 text-sm font-medium text-neutral-600 dark:text-white/80 transition hover:border-pink-500/30 hover:bg-pink-500/10 hover:text-pink-400 hover:shadow-md dark:hover:shadow-none"
          >
            <Rocket className="size-4" />
            All
            <span className="ml-1 text-xs text-neutral-300 dark:text-white/30">
              {startups.length}
            </span>
          </Link>
          {allCategories.map((cat) => {
            const categoryHref = sort
              ? `/startup?category=${cat.slug}&sort=${sort}`
              : `/startup?category=${cat.slug}`;

            return (
              <Link
                key={cat._id}
                href={categoryHref}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200/60 dark:border-white/10 bg-neutral-50 shadow-sm dark:bg-white/5 dark:shadow-none px-4 py-2 text-sm font-medium text-neutral-600 dark:text-white/80 transition hover:border-pink-500/30 hover:bg-pink-500/10 hover:text-pink-400 hover:shadow-md dark:hover:shadow-none"
              >
                {cat.title}
                {cat.count > 0 && (
                  <span className="text-xs text-neutral-300 dark:text-white/30">
                    {cat.count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Sort ── */}
      <section className="mx-auto max-w-5xl px-6 pb-8">
        <div className="flex items-center justify-center gap-2">
          {[
            { value: "recent", label: "Recent" },
            { value: "upvotes", label: "Most Upvoted" },
            { value: "views", label: "Most Viewed" }
          ].map((option) => {
            const sortHref = category
              ? `/startup?sort=${option.value}&category=${category}`
              : `/startup?sort=${option.value}`;

            return (
              <Link
                key={option.value}
                href={sortHref}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  sort === option.value
                    ? "bg-pink-500/20 text-pink-400 ring-1 ring-pink-500/30"
                    : "text-neutral-400 hover:text-pink-400 dark:text-white/40 dark:hover:text-pink-400"
                }`}
              >
                {option.label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Search + Grid ── */}
      <section className="mx-auto max-w-6xl px-6">
        <Suspense>
          <StartupSearch startups={startups} />
        </Suspense>
      </section>
    </main>
  );
}
