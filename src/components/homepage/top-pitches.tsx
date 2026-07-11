"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/carousel";
import { Eye, Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Tag } from "@/components/shared/tag";

type DummyStartup = {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  authorName: string;
  authorImage: string;
  upvotes: number;
  views: number;
  createdAt: string;
};

const DUMMY_STARTUPS: DummyStartup[] = [
  {
    _id: "demo-1",
    title: "PitchPilot",
    category: "SaaS",
    description:
      "AI-assisted startup storytelling for founders preparing investor updates.",
    image: "/images/avatar-ashwin-santiago.jpg",
    authorName: "Ashwin Santiago",
    authorImage: "/images/avatar-ashwin-santiago.jpg",
    upvotes: 412,
    views: 1203,
    createdAt: "2026-07-01"
  },
  {
    _id: "demo-2",
    title: "FlowDock",
    category: "Productivity",
    description:
      "A focused hub for async team updates, goals, and weekly momentum.",
    image: "/images/avatar-florence-shaw.jpg",
    authorName: "Florence Shaw",
    authorImage: "/images/avatar-florence-shaw.jpg",
    upvotes: 356,
    views: 987,
    createdAt: "2026-06-28"
  },
  {
    _id: "demo-3",
    title: "MangoMint",
    category: "Fintech",
    description:
      "Cashflow forecasting and runway alerts tailored for early-stage teams.",
    image: "/images/avatar-lula-meyers.jpg",
    authorName: "Lula Meyers",
    authorImage: "/images/avatar-lula-meyers.jpg",
    upvotes: 501,
    views: 1420,
    createdAt: "2026-07-06"
  },
  {
    _id: "demo-4",
    title: "RadarLoop",
    category: "Developer Tools",
    description:
      "Build feedback loops from bug reports to shipped fixes with zero friction.",
    image: "/images/avatar-owen-garcia.jpg",
    authorName: "Owen Garcia",
    authorImage: "/images/avatar-owen-garcia.jpg",
    upvotes: 298,
    views: 834,
    createdAt: "2026-07-03"
  },
  {
    _id: "demo-5",
    title: "CredFrame",
    category: "EdTech",
    description:
      "Create skill-based portfolios that map projects to measurable outcomes.",
    image: "/images/avatar-ashwin-santiago.jpg",
    authorName: "Ari Monroe",
    authorImage: "/images/avatar-florence-shaw.jpg",
    upvotes: 267,
    views: 723,
    createdAt: "2026-06-22"
  },
  {
    _id: "demo-6",
    title: "PatchNest",
    category: "HealthTech",
    description:
      "Lightweight remote care coordination for small clinics and practitioners.",
    image: "/images/avatar-lula-meyers.jpg",
    authorName: "Nora Patel",
    authorImage: "/images/avatar-owen-garcia.jpg",
    upvotes: 189,
    views: 610,
    createdAt: "2026-06-19"
  }
];

function DummyStartupCard({ startup }: Readonly<{ startup: DummyStartup }>) {
  const formattedDate = new Date(startup.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric"
    }
  );

  return (
    <article className="group relative h-full overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-200/80 transition duration-300 hover:ring-pink-300/60 hover:shadow-lg hover:shadow-pink-500/5 dark:bg-neutral-900 dark:ring-white/10 dark:hover:ring-pink-500/30 dark:hover:shadow-pink-500/10">
      <Link
        href={`/startup/${startup._id}`}
        className="flex h-full flex-col"
        prefetch={false}
      >
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={startup.image}
            alt={startup.title}
            fill
            sizes="(max-width: 768px) 90vw, 33vw"
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          <span className="absolute top-3 left-3 rounded-full bg-pink-500/90 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
            {startup.category}
          </span>

          <div className="absolute top-3 right-3 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
              <Flame className="size-3" fill="currentColor" />
              {startup.upvotes}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
              <Eye className="size-3" />
              {startup.views}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 px-4 pb-3">
            <h3 className="text-lg font-bold leading-snug tracking-tight text-white drop-shadow-sm">
              {startup.title}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-4 pt-3 pb-4">
          <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500 dark:text-white/50">
            {startup.description}
          </p>

          <div className="mt-auto flex items-center justify-between pt-3">
            <div className="flex items-center gap-2">
              <div className="relative size-6 shrink-0 overflow-hidden rounded-full ring-1 ring-neutral-200 dark:ring-white/10">
                <Image
                  src={startup.authorImage}
                  alt={startup.authorName}
                  fill
                  sizes="24px"
                  className="size-full object-cover"
                />
              </div>
              <span className="text-xs font-medium text-neutral-600 dark:text-white/60">
                {startup.authorName}
              </span>
            </div>

            <span className="text-xs text-neutral-400 dark:text-white/30">
              {formattedDate}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function TopPitches({
  eyebrow,
  title,
  count
}: Readonly<{ eyebrow?: string; title?: string; count?: number }>) {
  const startups = DUMMY_STARTUPS.slice(0, count ?? 6);

  return (
    <section className="py-16">
      {/* Title — contained */}
      <div className="container flex flex-col items-center">
        {eyebrow && <Tag>{eyebrow}</Tag>}
        <h2 className="my-6 text-center text-6xl font-medium">
          {title ?? (
            <>
              Top Pitches on the <span className="text-pink-400">Rise</span>
            </>
          )}
        </h2>
      </div>

      {/* Carousel — edge-to-edge, left aligned with container */}
      {startups.length > 0 ? (
        <Carousel opts={{ align: "start" }} className="mt-6 w-full">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-background to-transparent sm:w-16" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-background to-transparent sm:w-16" />

            <CarouselContent
              className="ml-0 py-1"
              style={{
                paddingLeft: "max(1rem, calc((100vw - 80rem) / 2 + 1rem))"
              }}
            >
              {startups.map((startup) => (
                <CarouselItem
                  key={startup._id}
                  className="basis-4/5 pl-4 sm:basis-[46%] lg:basis-[31%] 2xl:basis-[28%]"
                >
                  <DummyStartupCard startup={startup} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>

          <div className="container mt-8 flex items-center justify-end gap-2">
            <CarouselPrevious className="static translate-x-0 translate-y-0 size-10 border-neutral-200/60 dark:border-white/10 bg-neutral-50 shadow-sm dark:bg-neutral-900 dark:shadow-none hover:bg-neutral-100 hover:shadow-md dark:hover:bg-neutral-800 dark:hover:shadow-none" />
            <CarouselNext className="static translate-x-0 translate-y-0 size-10 border-neutral-200/60 dark:border-white/10 bg-neutral-50 shadow-sm dark:bg-neutral-900 dark:shadow-none hover:bg-neutral-100 hover:shadow-md dark:hover:bg-neutral-800 dark:hover:shadow-none" />
          </div>
        </Carousel>
      ) : null}
    </section>
  );
}
