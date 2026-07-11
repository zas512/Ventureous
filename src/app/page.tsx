import { Hero } from "@/components/homepage/hero";
import { Integrations } from "@/components/homepage/integrations";
import { TopPitches } from "@/components/homepage/top-pitches";

const HERO_DATA = {
  badge: "Now in Demo Mode",
  title: "Launch Brilliant Startup Ideas Faster",
  subtitle:
    "A fully static home experience with curated sample content, animations, and polished UI.",
  buttons: [
    {
      _key: "hero-btn-1",
      text: "Explore Startups",
      href: "/startup",
      variant: "default"
    },
    {
      _key: "hero-btn-2",
      text: "Read the Blog",
      href: "/blog",
      variant: "outline"
    }
  ]
};

const INTEGRATIONS_DATA = {
  eyebrow: "Integrations",
  title: "Connected To Your Workflow",
  subtitle:
    "Plug into the tools your team already uses with a clean, visual-first experience.",
  integrations: [
    {
      _key: "int-1",
      name: "GitHub",
      description: "Sync repos, issues, and release planning in one place."
    },
    {
      _key: "int-2",
      name: "Notion",
      description: "Turn notes and docs into structured product briefs."
    },
    {
      _key: "int-3",
      name: "Figma",
      description:
        "Attach designs directly to startup ideas and feedback loops."
    },
    {
      _key: "int-4",
      name: "Slack",
      description: "Get instant updates when your top pitches start trending."
    },
    {
      _key: "int-5",
      name: "Linear",
      description: "Move validated ideas to actionable product roadmaps."
    },
    {
      _key: "int-6",
      name: "Vercel",
      description: "Deploy prototypes quickly with preview links for teammates."
    }
  ]
};

export default function Page() {
  return (
    <main className="flex flex-col">
      <Hero {...HERO_DATA} />
      <TopPitches
        eyebrow="Trending This Week"
        title="Top Pitches on the Rise"
      />
      <Integrations {...INTEGRATIONS_DATA} />
    </main>
  );
}
