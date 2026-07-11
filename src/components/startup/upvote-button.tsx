"use client";

import { Flame } from "lucide-react";
import { useCallback, useState } from "react";

const STORAGE_PREFIX = "ventureous:upvoted:";

interface UpvoteButtonProps {
  startupId: string;
  initialCount: number;
}

export function UpvoteButton({
  startupId,
  initialCount,
}: Readonly<UpvoteButtonProps>) {
  const storageKey = `${STORAGE_PREFIX}${startupId}`;
  const [upvoted, setUpvoted] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(storageKey) === "1";
  });
  const [count, setCount] = useState(initialCount);
  const [animating, setAnimating] = useState(false);

  const handleClick = useCallback(async () => {
    if (upvoted) return;

    setAnimating(true);
    setUpvoted(true);
    setCount((current) => current + 1);
    localStorage.setItem(storageKey, "1");
    setTimeout(() => setAnimating(false), 800);
  }, [upvoted, storageKey]);

  return (
    <button
      type="button"
      onClick={handleClick}
      // disabled={upvoted}
      className="bg-linear-to-r group inline-flex items-center gap-2 rounded-full from-orange-500 to-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition hover:shadow-lg hover:shadow-orange-500/30 hover:brightness-110 disabled:opacity-70 disabled:shadow-sm disabled:hover:brightness-100"
    >
      <span className="relative">
        <Flame
          fill="currentColor"
          className={`size-4 ${animating ? "animate-flame" : ""}`}
        />
        {animating && (
          <Flame
            fill="currentColor"
            className="absolute inset-0 size-4 animate-ping text-white opacity-40"
          />
        )}
      </span>
      <span>Upvote</span>
      <span className="ml-0.5 rounded-full bg-white/20 px-2 py-0.5 text-xs">
        {count}
      </span>
    </button>
  );
}
