import { Eye, Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type StartupCardAuthor = {
  name?: string | null;
  image?: unknown;
};

/** Generic startup card item that works with local dummy data and legacy page consumers. */
export type StartupCardItem = {
  _id: string;
  title: string;
  category?: string | null;
  description?: string | null;
  image?: unknown;
  author?: StartupCardAuthor | null;
  views?: number | null;
  upvotes?: number | null;
  _createdAt?: string | null;
};

function resolveImageSource(image: unknown): string | null {
  if (!image) {
    return null;
  }

  if (typeof image === "string") {
    return image;
  }

  if (typeof image === "object") {
    const maybeObject = image as {
      url?: unknown;
      src?: unknown;
      asset?: { url?: unknown } | null;
    };

    if (typeof maybeObject.url === "string") {
      return maybeObject.url;
    }

    if (typeof maybeObject.src === "string") {
      return maybeObject.src;
    }

    if (typeof maybeObject.asset?.url === "string") {
      return maybeObject.asset.url;
    }
  }

  return null;
}

/**
 * Card for a single startup pitch.
 * Cover image with gradient overlay, category badge, stats, and author row.
 */
export function StartupCard({ post }: Readonly<{ post: StartupCardItem }>) {
  const { _id, title, category, description, image } = post;

  const createdAt = post._createdAt ?? null;
  const author = post.author ?? null;
  const views = post.views ?? null;
  const upvotes = post.upvotes ?? null;
  const coverImage = resolveImageSource(image);
  const authorImage = resolveImageSource(author?.image);

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <article className="group relative h-full overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-200/80 transition duration-300 hover:ring-pink-300/60 hover:shadow-lg hover:shadow-pink-500/5 dark:bg-neutral-900 dark:ring-white/10 dark:hover:ring-pink-500/30 dark:hover:shadow-pink-500/10">
      <Link
        href={`/startup/${_id}`}
        className="flex h-full flex-col"
        prefetch={false}
      >
        {/* Cover image */}
        <div className="relative aspect-video w-full overflow-hidden">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 90vw, 33vw"
              className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="size-full bg-linear-to-br from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900" />
          )}

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          {/* Category badge */}
          {category && (
            <span className="absolute top-3 left-3 rounded-full bg-pink-500/90 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
              {category}
            </span>
          )}

          {/* Stats row on image */}
          {(views != null || upvotes != null) && (
            <div className="absolute top-3 right-3 flex items-center gap-2">
              {upvotes != null && (
                <span className="flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                  <Flame className="size-3" fill="currentColor" />
                  {upvotes}
                </span>
              )}
              {views != null && (
                <span className="flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                  <Eye className="size-3" />
                  {views}
                </span>
              )}
            </div>
          )}

          {/* Title on image */}
          <div className="absolute inset-x-0 bottom-0 px-4 pb-3">
            <h3 className="text-lg font-bold leading-snug tracking-tight text-white drop-shadow-sm">
              {title}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col px-4 pt-3 pb-4">
          {/* Description */}
          {description && (
            <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500 dark:text-white/50">
              {description}
            </p>
          )}

          {/* Author + Date */}
          <div className="mt-auto flex items-center justify-between pt-3">
            {author ? (
              <div className="flex items-center gap-2">
                <div className="size-6 shrink-0 overflow-hidden rounded-full ring-1 ring-neutral-200 dark:ring-white/10">
                  {authorImage ? (
                    <div className="relative size-full">
                      <Image
                        src={authorImage}
                        alt={author.name ?? "Author"}
                        fill
                        sizes="24px"
                        className="size-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex size-full items-center justify-center bg-neutral-100 text-xs font-medium text-neutral-500 dark:bg-neutral-800 dark:text-white/50">
                      {author.name?.charAt(0)}
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium text-neutral-600 dark:text-white/60">
                  {author.name}
                </span>
              </div>
            ) : (
              <span />
            )}
            {formattedDate && (
              <span className="text-xs text-neutral-400 dark:text-white/30">
                {formattedDate}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
