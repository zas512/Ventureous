import { cn } from "@/lib/utils";
import Link from "next/link";

import type { SanityRichTextProps } from "@/types";
import { SanityImage } from "./sanity-image";

type RichTextChild = {
  _type?: string;
  text?: string;
};

type RichTextBlock = {
  _type?: string;
  _key?: string;
  style?: string;
  children?: RichTextChild[];
  href?: string;
  openInNewTab?: boolean;
  caption?: string;
  id?: string;
};

function getBlockText(block: RichTextBlock): string {
  return (block.children ?? [])
    .map((child) => child.text ?? "")
    .join("")
    .trim();
}

function renderTextBlock(block: RichTextBlock) {
  const text = getBlockText(block);
  const style = block.style ?? "normal";

  switch (style) {
    case "h2":
      return (
        <h2 className="scroll-m-20 border-b pb-2 font-semibold text-xl sm:text-2xl md:text-3xl first:mt-0">
          {text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="scroll-m-20 font-semibold text-lg sm:text-xl md:text-2xl">
          {text}
        </h3>
      );
    case "h4":
      return (
        <h4 className="scroll-m-20 font-semibold text-base sm:text-lg md:text-xl">
          {text}
        </h4>
      );
    case "h5":
      return (
        <h5 className="scroll-m-20 font-semibold text-base md:text-lg">
          {text}
        </h5>
      );
    case "h6":
      return (
        <h6 className="scroll-m-20 font-semibold text-sm md:text-base">
          {text}
        </h6>
      );
    default:
      return <p>{text}</p>;
  }
}

export function RichText<T extends SanityRichTextProps>({
  richText,
  className
}: Readonly<{
  richText?: T | null;
  className?: string;
}>) {
  if (!richText) {
    return null;
  }

  return (
    <div
      className={cn(
        "prose prose-base md:prose-lg prose-zinc dark:prose-invert max-w-none prose-headings:scroll-m-24 prose-h2:border-b prose-h2:pb-2 prose-h2:font-semibold prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:md:text-3xl prose-headings:text-opacity-90 prose-ol:text-opacity-80 prose-p:text-opacity-80 prose-ul:text-opacity-80 prose-h2:first:mt-0",
        className
      )}
    >
      {(richText as RichTextBlock[]).map((block, index) => {
        if (!block) {
          return null;
        }

        if (block._type === "image") {
          return (
            <figure className="my-4" key={block._key ?? `image-${index}`}>
              <SanityImage
                className="h-auto w-full rounded-lg"
                height={900}
                image={block}
                width={1600}
              />
              {block.caption && (
                <figcaption className="mt-2 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        if (block._type === "link" && block.href) {
          return (
            <p key={block._key ?? `link-${index}`}>
              <Link
                aria-label={`Link to ${block.href}`}
                className="font-medium text-neutral-500 underline underline-offset-4 transition hover:text-pink-400 dark:text-white/60"
                href={block.href}
                prefetch={false}
                target={block.openInNewTab ? "_blank" : "_self"}
              >
                {getBlockText(block) || block.href}
              </Link>
            </p>
          );
        }

        return (
          <div key={block._key ?? `block-${index}`}>
            {renderTextBlock(block)}
          </div>
        );
      })}
    </div>
  );
}
