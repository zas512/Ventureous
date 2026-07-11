import { sanityFetch } from "@workspace/sanity/live";
import { queryHomePageData } from "@workspace/sanity/query";
import { PageBuilder } from "@/components/pagebuilder";
import { getSEOMetadata } from "@/lib/seo";
import type { PageBuilderBlock } from "@/types";

type HomePageData = {
  _id: string;
  _type: string;
  seoTitle?: string;
  seoDescription?: string;
  pageBuilder?: PageBuilderBlock[];
};

async function fetchHomePageData() {
  return await sanityFetch({ query: queryHomePageData });
}

export async function generateMetadata() {
  const { data } = await fetchHomePageData();
  const homeData = (data ?? null) as HomePageData | null;

  return getSEOMetadata({
    title: homeData?.seoTitle ?? undefined,
    description: homeData?.seoDescription ?? undefined,
    slug: "/",
    contentId: homeData?._id,
    contentType: homeData?._type,
  });
}

export default async function Page() {
  const { data } = await fetchHomePageData();
  const homeData = (data ?? null) as HomePageData | null;

  if (!homeData) {
    return (
      <main className="container py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-neutral-900 dark:border-white/10 dark:bg-white/5 dark:text-white">
          <h1 className="text-xl font-semibold">Home page content is not set up yet.</h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-white/70">
            Open Sanity Studio and create or publish a Home Page document, then
            refresh this page.
          </p>
          <a
            className="mt-4 inline-flex rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-white/90"
            href="http://localhost:3333"
            rel="noreferrer"
            target="_blank"
          >
            Open Sanity Studio
          </a>
        </div>
      </main>
    );
  }

  return (
    <PageBuilder
      id={homeData._id}
      pageBuilder={homeData.pageBuilder ?? []}
      type={homeData._type}
    />
  );
}
