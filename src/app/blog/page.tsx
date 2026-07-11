import { BlogPageContent } from "@/components/blog-page-content";

import {
  calculatePaginationMetadata,
  getBlogPaginationStartEnd
} from "@/lib/utils";

const BLOG_INDEX_DATA = {
  title: "Ideas, Strategy, and Founder Notes",
  description:
    "Practical write-ups on launching products, validating startup ideas, and building momentum.",
  displayFeaturedBlogs: true,
  featuredBlogsCount: "2"
};

const DUMMY_BLOGS = [
  {
    _id: "blog-1",
    title: "How We Validated 12 Startup Ideas in 30 Days",
    description:
      "A tactical framework for testing assumptions quickly with tiny experiments.",
    slug: "/blog/how-we-validated-12-startup-ideas",
    publishedAt: "2026-07-01",
    image: null
  },
  {
    _id: "blog-2",
    title: "Founder Updates That Investors Actually Read",
    description:
      "Structure your monthly updates with clarity, traction, and honest risk reporting.",
    slug: "/blog/founder-updates-that-investors-read",
    publishedAt: "2026-06-27",
    image: null
  },
  {
    _id: "blog-3",
    title: "From Landing Page to First 100 Users",
    description:
      "The messaging, channels, and launch cadence we used to find early traction.",
    slug: "/blog/from-landing-page-to-first-100-users",
    publishedAt: "2026-06-24",
    image: null
  },
  {
    _id: "blog-4",
    title: "Designing Onboarding for Product-Led Growth",
    description:
      "A practical onboarding checklist that improves activation without adding friction.",
    slug: "/blog/designing-onboarding-for-plg",
    publishedAt: "2026-06-20",
    image: null
  },
  {
    _id: "blog-5",
    title: "Pricing Experiments for Early-Stage SaaS",
    description:
      "What we learned from packaging tests, willingness-to-pay interviews, and usage tiers.",
    slug: "/blog/pricing-experiments-for-early-stage-saas",
    publishedAt: "2026-06-15",
    image: null
  },
  {
    _id: "blog-6",
    title: "A Lightweight Weekly Dashboard for Startups",
    description:
      "Track the metrics that matter without drowning your team in reporting overhead.",
    slug: "/blog/lightweight-weekly-dashboard",
    publishedAt: "2026-06-10",
    image: null
  },
  {
    _id: "blog-7",
    title: "How to Run Better Customer Discovery Calls",
    description:
      "Question prompts and interview patterns that uncover real pains and budgets.",
    slug: "/blog/better-customer-discovery-calls",
    publishedAt: "2026-06-05",
    image: null
  },
  {
    _id: "blog-8",
    title: "Building a Roadmap Your Team Can Trust",
    description:
      "Tie roadmap bets to outcomes, confidence levels, and decision deadlines.",
    slug: "/blog/building-a-roadmap-your-team-can-trust",
    publishedAt: "2026-06-01",
    image: null
  },
  {
    _id: "blog-9",
    title: "The Pre-Launch Checklist We Actually Use",
    description:
      "A practical release process covering QA, comms, analytics, and rollback plans.",
    slug: "/blog/pre-launch-checklist",
    publishedAt: "2026-05-27",
    image: null
  },
  {
    _id: "blog-10",
    title: "Turning Product Feedback Into Prioritized Work",
    description:
      "A repeatable method to cluster user requests and prioritize by impact.",
    slug: "/blog/turning-feedback-into-prioritized-work",
    publishedAt: "2026-05-22",
    image: null
  }
];

type BlogPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function BlogIndexPage({
  searchParams
}: Readonly<BlogPageProps>) {
  const { page } = await searchParams;
  const currentPage = page ? Number(page) : 1;
  const totalCount = DUMMY_BLOGS.length;

  const featuredBlogsCount = BLOG_INDEX_DATA.displayFeaturedBlogs
    ? Number(BLOG_INDEX_DATA.featuredBlogsCount) || 0
    : 0;

  const paginationMetadata = calculatePaginationMetadata(
    totalCount,
    currentPage
  );

  const { start, end } = getBlogPaginationStartEnd(currentPage);
  const blogStart = currentPage === 1 ? 0 : start + featuredBlogsCount;
  const blogEnd = end + featuredBlogsCount;

  const blogs = DUMMY_BLOGS.slice(blogStart, blogEnd);

  return (
    <BlogPageContent
      blogs={blogs}
      indexPageData={BLOG_INDEX_DATA}
      paginationMetadata={paginationMetadata}
    />
  );
}
