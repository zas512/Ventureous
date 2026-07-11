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

const DUMMY_PICKS: StartupCardItem[] = [
  {
    _id: "demo-pick-1",
    title: "PulseBoard",
    category: "SaaS",
    description: "A live dashboard for product signal and roadmap confidence.",
    _createdAt: "2026-01-10T08:00:00.000Z",
    views: 3240,
    upvotes: 215,
  },
  {
    _id: "demo-pick-2",
    title: "FieldNote AI",
    category: "Productivity",
    description: "Turns meetings and voice notes into clear sprint actions.",
    _createdAt: "2026-02-02T10:00:00.000Z",
    views: 2710,
    upvotes: 181,
  },
  {
    _id: "demo-pick-3",
    title: "Nexa Recruit",
    category: "HR Tech",
    description: "Candidate scoring and role matching built for startup teams.",
    _createdAt: "2026-03-18T15:00:00.000Z",
    views: 1987,
    upvotes: 149,
  },
];

/**
 * Server component that fetches the "editors-picks" playlist from Sanity
 * and renders the startups in a carousel.
 * Returns null when the playlist is empty or not found.
 */
export async function EditorPicks() {
  const picks = DUMMY_PICKS;

  if (!picks || picks.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-6 pt-20">
      <div className="mb-8 border-t border-neutral-200 dark:border-white/10 pt-12">
        <Tag>Editor Picks</Tag>
        <h2 className="mt-4 text-3xl font-bold tracking-tight">
          More pitches you might like
        </h2>
      </div>

      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-4">
          {picks.map((pick) => (
            <CarouselItem
              key={pick._id}
              className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
            >
              <StartupCard post={pick} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 size-10 border-neutral-200/60 dark:border-white/10 bg-neutral-50 shadow-sm dark:bg-neutral-900 dark:shadow-none hover:bg-neutral-100 hover:shadow-md dark:hover:bg-neutral-800 dark:hover:shadow-none" />
        <CarouselNext className="right-0 size-10 border-neutral-200/60 dark:border-white/10 bg-neutral-50 shadow-sm dark:bg-neutral-900 dark:shadow-none hover:bg-neutral-100 hover:shadow-md dark:hover:bg-neutral-800 dark:hover:shadow-none" />
      </Carousel>
    </section>
  );
}
