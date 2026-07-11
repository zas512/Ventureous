import { Rocket } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentProps } from "react";
import { CommentSection } from "@/components/startup/comment-section";
import { Tag } from "@/components/shared/tag";
import {
  StartupCard,
  type StartupCardItem
} from "@/components/startup/startup-card";
import { StartupDetail } from "@/components/startup/startup-detail";
import { getSEOMetadata } from "@/lib/seo";

type StartupDetailData = ComponentProps<typeof StartupDetail>["startup"];
type StartupCommentsData = ComponentProps<
  typeof CommentSection
>["initialComments"];

type Props = {
  params: Promise<{ id: string }>;
};

type DummyComment = {
  _id: string;
  content: string;
  _createdAt: string;
  author: {
    _id: string;
    name: string;
    username?: string;
    image?: string;
  };
};

type DummyStartup = StartupCardItem & {
  _type?: string;
  pitch: string;
  categoryRef?: string;
  author?: {
    _id: string;
    name: string;
    username?: string;
    bio?: string;
    image?: unknown;
  };
  aiAnalysis?: {
    overallScore?: number;
    analyzedAt?: string;
    clarity?: { score?: number; feedback?: string };
    marketPositioning?: { score?: number; feedback?: string };
    uniqueness?: { score?: number; feedback?: string };
    suggestions?: string[];
  };
};

const DUMMY_STARTUPS: DummyStartup[] = [
  {
    _id: "startup-1",
    _type: "startup",
    title: "PitchPilot",
    category: "SaaS",
    categoryRef: "cat-saas",
    description:
      "AI-assisted startup storytelling for founders preparing investor updates.",
    image: "/images/avatar-ashwin-santiago.jpg",
    author: {
      _id: "author-1",
      name: "Ashwin Santiago",
      username: "ashwin",
      bio: "Founder building founder-first storytelling workflows.",
      image: "/images/avatar-ashwin-santiago.jpg"
    },
    views: 1203,
    upvotes: 412,
    _createdAt: "2026-07-01",
    pitch:
      "## The Problem\nFounders lose momentum because status updates are fragmented across docs and chats.\n\n## Our Approach\nPitchPilot turns progress into investor-ready narratives with reusable templates and AI-assisted drafting.\n\n## Why Now\nTeams are moving faster, but communication debt is growing just as quickly.",
    aiAnalysis: {
      overallScore: 84,
      analyzedAt: "2026-07-02",
      clarity: {
        score: 86,
        feedback: "Clear positioning and concise problem framing."
      },
      marketPositioning: {
        score: 82,
        feedback: "Strong wedge in founder workflow tooling."
      },
      uniqueness: {
        score: 79,
        feedback: "Differentiation is good; keep sharpening defensibility."
      },
      suggestions: ["Add customer proof points", "Show measurable time saved"]
    }
  },
  {
    _id: "startup-2",
    title: "FlowDock",
    category: "Productivity",
    categoryRef: "cat-productivity",
    description:
      "A focused hub for async team updates, goals, and weekly momentum.",
    image: "/images/avatar-florence-shaw.jpg",
    author: {
      _id: "author-2",
      name: "Florence Shaw",
      image: "/images/avatar-florence-shaw.jpg"
    },
    views: 987,
    upvotes: 356,
    _createdAt: "2026-06-28",
    pitch: "## FlowDock\nAsync-first collaboration for distributed teams."
  },
  {
    _id: "startup-3",
    title: "MangoMint",
    category: "Fintech",
    categoryRef: "cat-fintech",
    description:
      "Cashflow forecasting and runway alerts tailored for early-stage teams.",
    image: "/images/avatar-lula-meyers.jpg",
    author: {
      _id: "author-3",
      name: "Lula Meyers",
      image: "/images/avatar-lula-meyers.jpg"
    },
    views: 1420,
    upvotes: 501,
    _createdAt: "2026-07-06",
    pitch: "## MangoMint\nFinancial visibility for startup operators."
  },
  {
    _id: "startup-4",
    title: "RadarLoop",
    category: "Developer Tools",
    categoryRef: "cat-devtools",
    description:
      "Build feedback loops from bug reports to shipped fixes with zero friction.",
    image: "/images/avatar-owen-garcia.jpg",
    author: {
      _id: "author-4",
      name: "Owen Garcia",
      image: "/images/avatar-owen-garcia.jpg"
    },
    views: 834,
    upvotes: 298,
    _createdAt: "2026-07-03",
    pitch:
      "## RadarLoop\nIssue triage and release loops for modern product teams."
  }
];

const DUMMY_COMMENTS: Record<string, DummyComment[]> = {
  "startup-1": [
    {
      _id: "comment-1",
      content: "Love this. The investor update angle is very practical.",
      _createdAt: "2026-07-03",
      author: {
        _id: "author-2",
        name: "Florence Shaw",
        username: "florence",
        image: "/images/avatar-florence-shaw.jpg"
      }
    },
    {
      _id: "comment-2",
      content:
        "Would be great to see template examples for seed vs Series A updates.",
      _createdAt: "2026-07-04",
      author: {
        _id: "author-3",
        name: "Lula Meyers",
        username: "lula",
        image: "/images/avatar-lula-meyers.jpg"
      }
    }
  ]
};

function getStartupById(id: string): DummyStartup | undefined {
  return DUMMY_STARTUPS.find((startup) => startup._id === id);
}

function getRelatedStartups(startup: DummyStartup): StartupCardItem[] {
  const byCategory = DUMMY_STARTUPS.filter(
    (candidate) =>
      candidate._id !== startup._id &&
      candidate.categoryRef === startup.categoryRef
  );

  if (byCategory.length >= 3) {
    return byCategory.slice(0, 6);
  }

  const fallback = DUMMY_STARTUPS.filter(
    (candidate) => candidate._id !== startup._id
  );
  return [...byCategory, ...fallback].slice(0, 6);
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const startup = getStartupById(id);

  return getSEOMetadata({
    title: startup?.title ?? "Startup Pitch",
    description: startup?.description ?? undefined,
    slug: `/startup/${id}`,
    contentId: startup?._id,
    contentType: startup?._type
  });
}

/**
 * Dynamic route for a single startup pitch.
 * Renders StartupDetail hero + pitch body, followed by related startups.
 * Returns 404 when the startup is not found.
 */
export default async function StartupPage({ params }: Readonly<Props>) {
  const { id } = await params;
  const startup = getStartupById(id);
  const comments = DUMMY_COMMENTS[id] ?? [];

  if (!startup) {
    notFound();
  }
  const related = getRelatedStartups(startup);

  return (
    <main className="min-h-screen pb-12">
      <StartupDetail startup={startup as StartupDetailData}>
        <CommentSection
          startupId={id}
          initialComments={comments as StartupCommentsData}
          currentUserId={undefined}
        />
      </StartupDetail>

      {related.length > 0 && (
        <section className="pt-20">
          <div className="container flex flex-col items-center">
            <Tag>{startup.category ? "Related" : "Trending"}</Tag>
            <h2 className="my-6 text-center text-3xl font-bold tracking-tight md:text-4xl">
              {startup.category ? "More in this category" : "Top Pitches"}
            </h2>
          </div>

          <div className="container mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <StartupCard key={item._id} post={item} />
            ))}
          </div>

          <div className="container mt-8 flex justify-center">
            <Link
              href="/startup"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200/60 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900 px-5 py-2.5 text-sm font-medium transition hover:border-pink-500/30 hover:bg-pink-500/10 hover:text-pink-400"
            >
              <Rocket className="size-4" />
              Browse All Pitches
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
