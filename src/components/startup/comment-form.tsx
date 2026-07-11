"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useTransition } from "react";

interface CommentFormProps {
  startupId: string;
  onCommentAdded: (comment: {
    _id: string;
    _createdAt: string;
    content: string;
    author: { _id: string; name: string; username: string | null; image: null };
  }) => void;
}

const MAX_LENGTH = 200;

export function CommentForm({
  startupId: _startupId,
  onCommentAdded,
}: Readonly<CommentFormProps>) {
  const { data: session } = useSession();
  const sessionId = (session as { id?: string })?.id;
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const charCount = content.length;
  const isOverLimit = charCount > MAX_LENGTH;
  const canSubmit = content.trim().length > 0 && !isOverLimit && !isPending;
  const charCountClass = isOverLimit
    ? "text-red-500"
    : charCount > MAX_LENGTH * 0.8
      ? "text-amber-500"
      : "text-neutral-400 dark:text-white/30";

  if (!session) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-dashed border-neutral-200 p-8 dark:border-white/10">
        <div className="text-center">
          <p className="mb-3 text-sm text-neutral-500 dark:text-white/50">
            Sign in to join the conversation
          </p>
          <button
            type="button"
            onClick={() => signIn("google")}
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-white/90"
          >
            <svg
              aria-label="Google"
              className="size-4"
              viewBox="0 0 24 24"
            >
              <path
                d="M21.805 10.023h-9.623v3.955h5.518c-.238 1.273-.955 2.351-2.029 3.071v2.549h3.287c1.924-1.771 3.047-4.381 3.047-7.485 0-.72-.064-1.412-.2-2.09Z"
                fill="#4285F4"
              />
              <path
                d="M12.182 22c2.758 0 5.072-.914 6.762-2.402l-3.287-2.549c-.914.614-2.082.973-3.475.973-2.672 0-4.94-1.803-5.75-4.228H3.036v2.629A10.21 10.21 0 0 0 12.182 22Z"
                fill="#34A853"
              />
              <path
                d="M6.432 13.794a6.143 6.143 0 0 1-.323-1.944c0-.677.118-1.333.323-1.944V7.277H3.036A10.21 10.21 0 0 0 2 11.85c0 1.638.391 3.189 1.036 4.573l3.396-2.629Z"
                fill="#FBBC05"
              />
              <path
                d="M12.182 5.678c1.5 0 2.844.518 3.902 1.53l2.926-2.926C17.25 2.646 14.94 1.7 12.182 1.7a10.21 10.21 0 0 0-9.146 5.577l3.396 2.629c.809-2.425 3.078-4.228 5.75-4.228Z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  function handleSubmit() {
    if (!canSubmit || !sessionId) return;
    setError(null);

    const optimisticComment = {
      _id: `temp-${Date.now()}`,
      _createdAt: new Date().toISOString(),
      content: content.trim(),
      author: {
        _id: sessionId,
        name: session?.user?.name ?? "",
        username: null,
        image: null as null,
      },
    };

    onCommentAdded(optimisticComment);
    const submittedContent = content.trim();
    setContent("");

    startTransition(async () => {
      await Promise.resolve();
      if (!submittedContent) {
        setError("Unable to post comment.");
      }
    });
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts on this pitch..."
          rows={3}
          maxLength={MAX_LENGTH + 10}
          className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-pink-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-pink-400 dark:border-white/10 dark:bg-white/3 dark:text-white dark:placeholder:text-white/30 dark:focus:border-pink-500/50 dark:focus:bg-white/5 dark:focus:ring-pink-500/50"
          disabled={isPending}
        />
        <span className={`absolute right-3 bottom-3 text-xs ${charCountClass}`}>
          {charCount}/{MAX_LENGTH}
        </span>
      </div>

      <div className="flex items-center justify-between">
        {error ? <p className="text-xs text-red-500">{error}</p> : <span />}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="ml-auto rounded-lg bg-pink-500 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-pink-500/20 transition hover:bg-pink-600 hover:shadow-md hover:shadow-pink-500/25 disabled:opacity-50 disabled:shadow-none disabled:hover:bg-pink-500"
        >
          {isPending ? "Posting..." : "Comment"}
        </button>
      </div>
    </div>
  );
}
