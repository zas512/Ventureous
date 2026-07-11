import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/carousel";

import { Tag } from "@/components/shared/tag";
import type { StartupCardItem } from "./startup-card";
import { StartupCard } from "./startup-card";

type Props = {
  categoryRef: string;
  excludeId: string;
};

const DUMMY_RELATED: StartupCardItem[] = [
  {
    _id: "demo-related-1",
    title: "MetricNest",
    category: "Analytics",
    description: "Startup KPI walls with collaborative annotation.",
    _createdAt: "2026-04-05T09:00:00.000Z",
    views: 1620,
    upvotes: 96,
  },
  {
    _id: "demo-related-2",
    title: "Orbit Desk",
    category: "Operations",
    description: "Run recurring founder ops from one lightweight console.",
    _createdAt: "2026-02-25T12:00:00.000Z",
    views: 2398,
    upvotes: 134,
  },
  {
    _id: "demo-related-3",
    title: "Signal Mint",
    category: "Marketing",
    description: "Launch social campaigns from idea to analytics in one pass.",
    _createdAt: "2026-03-11T11:30:00.000Z",
    views: 1804,
    upvotes: 109,
  },
  {
    _id: "demo-related-4",
    title: "Ops Atlas",
    category: "Infrastructure",
    description: "Infrastructure cost planning for pre-seed to Series A teams.",
    _createdAt: "2026-01-29T14:00:00.000Z",
    views: 1422,
    upvotes: 88,
  },
  {
    _id: "demo-related-5",
    title: "PitchPilot",
    category: "Fundraising",
    description: "A cleaner workflow for investor updates and deck versions.",
    _createdAt: "2026-02-17T16:30:00.000Z",
    views: 2071,
    upvotes: 121,
  },
  {
    _id: "demo-related-6",
    title: "Team Loom",
    category: "Collaboration",
    description: "Async team rituals that keep execution velocity high.",
    _createdAt: "2026-03-03T10:45:00.000Z",
    views: 1538,
    upvotes: 101,
  },
];

/**
 * Server component showing related startups from the same category.
 * Falls back to top pitches when the category has fewer than 3 others.
 */
export async function RelatedStartups({ categoryRef, excludeId }: Props) {
  const startups = DUMMY_RELATED.filter(
    (startup) => startup._id !== excludeId
  ).slice(0, 6);
  const heading = categoryRef ? "More in this category" : "Top Pitches";
  const tag = categoryRef ? "Related" : "Trending";

  if (startups.length === 0) {
    return null;
  }

  return (
    <section className="pt-20">
      {/* Title — contained */}
      <div className="container flex flex-col items-center">
        <Tag>{tag}</Tag>
        <h2 className="my-6 text-center text-3xl font-bold tracking-tight md:text-4xl">
          {heading}
        </h2>
      </div>

      {/* Carousel — edge-to-edge with container-aligned left edge */}
      <Carousel opts={{ align: "start" }} className="mt-2 w-full">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent sm:w-16" />

          <CarouselContent
            className="ml-0 py-1"
            style={{
              paddingLeft: "max(1rem, calc((100vw - 80rem) / 2 + 1rem))",
            }}
          >
            {startups.map((startup) => (
              <CarouselItem
                key={startup._id}
                className="basis-4/5 pl-4 sm:basis-[46%] lg:basis-[31%] 2xl:basis-[28%]"
              >
                <StartupCard post={startup} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>

        <div className="container mt-8 flex items-center justify-end gap-2">
          <CarouselPrevious className="static size-10 translate-x-0 translate-y-0 border-neutral-200/60 bg-neutral-50 shadow-sm hover:bg-neutral-100 hover:shadow-md dark:border-white/10 dark:bg-neutral-900 dark:shadow-none dark:hover:bg-neutral-800 dark:hover:shadow-none" />
          <CarouselNext className="static size-10 translate-x-0 translate-y-0 border-neutral-200/60 bg-neutral-50 shadow-sm hover:bg-neutral-100 hover:shadow-md dark:border-white/10 dark:bg-neutral-900 dark:shadow-none dark:hover:bg-neutral-800 dark:hover:shadow-none" />
        </div>
      </Carousel>
    </section>
  );
}
