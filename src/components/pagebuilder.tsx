"use client";

import { useCallback } from "react";

import { Faqs } from "@/components/homepage/faqs";
import { Hero } from "@/components/homepage/hero";
import { Integrations } from "@/components/homepage/integrations";
import { LogoTicker } from "@/components/homepage/logo-ticker";
import { TopPitches } from "@/components/homepage/top-pitches";
import type { PageBuilderBlock, PageBuilderBlockTypes } from "@/types";
import { FaqAccordion } from "./sections/faq-accordion";
import { FeatureCardsWithIcon } from "./sections/feature-cards-with-icon";

export type PageBuilderProps = {
  readonly pageBuilder?: PageBuilderBlock[];
  readonly id: string;
  readonly type: string;
};

// Strongly typed component mapping with proper component signatures
const BLOCK_COMPONENTS = {
  faqAccordion: FaqAccordion,
  heroSection: Hero,
  logoTickerSection: LogoTicker,
  topPitchesSection: TopPitches,
  featureCardsIcon: FeatureCardsWithIcon,
  integrationsSection: Integrations,
  faqSection: Faqs,
  // biome-ignore lint/suspicious/noExplicitAny: <any is used to allow for dynamic component rendering>
} as const satisfies Record<PageBuilderBlockTypes, React.ComponentType<any>>;

/**
 * Error fallback component for unknown block types
 */
function UnknownBlockError({
  blockType,
  blockKey,
}: {
  blockType: string;
  blockKey: string;
}) {
  return (
    <div
      aria-label={`Unknown block type: ${blockType}`}
      className="flex items-center justify-center rounded-lg border-2 border-muted-foreground/20 border-dashed bg-muted p-8 text-center text-muted-foreground"
      key={`${blockType}-${blockKey}`}
      role="alert"
    >
      <div className="space-y-2">
        <p>Component not found for block type:</p>
        <code className="rounded bg-background px-2 py-1 font-mono text-sm">
          {blockType}
        </code>
      </div>
    </div>
  );
}

/**
 * Custom hook for block component rendering logic
 */
function useBlockRenderer() {
  const renderBlock = useCallback(
    (block: PageBuilderBlock, _index: number) => {
      const Component =
        BLOCK_COMPONENTS[block._type as keyof typeof BLOCK_COMPONENTS];

      if (!Component) {
        return (
          <UnknownBlockError
            blockKey={block._key}
            blockType={block._type}
            key={`${block._type}-${block._key}`}
          />
        );
      }

      return (
        <div key={`${block._type}-${block._key}`}>
          {/** biome-ignore lint/suspicious/noExplicitAny: <any is used to allow for dynamic component rendering> */}
          <Component {...(block as any)} />
        </div>
      );
    },
    []
  );

  return { renderBlock };
}

/**
 * PageBuilder component for rendering dynamic content blocks from Sanity CMS
 */
export function PageBuilder({
  pageBuilder: initialBlocks = [],
  id: _id,
  type: _type,
}: PageBuilderProps) {
  const blocks = initialBlocks;
  const { renderBlock } = useBlockRenderer();

  if (!blocks.length) {
    return null;
  }

  return (
    <main className="flex flex-col">
      {blocks.map((block, index) => renderBlock(block, index))}
    </main>
  );
}
