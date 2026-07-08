"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { signIn } from "next-auth/react";

type SignInModalProps = {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
};

/**
 * Sign-in modal with Google OAuth.
 * Styled to match the dark glassmorphism aesthetic.
 */
export function SignInModal({ open, onOpenChange }: SignInModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-neutral-200 dark:border-white/10 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl sm:max-w-sm">
        <DialogHeader className="items-center text-center">
          {/* Gradient icon */}
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-6 text-white"
              aria-hidden="true"
            >
              <path d="M12 2L8 10h8l-4-8z" fill="currentColor" opacity="0.9" />
              <path d="M10 10l-2 6 4-3 4 3-2-6H10z" fill="currentColor" />
              <path
                d="M9.5 18l2.5-2 2.5 2-1 3h-3l-1-3z"
                fill="currentColor"
                opacity="0.7"
              />
            </svg>
          </div>
          <DialogTitle className="text-lg text-neutral-900 dark:text-white">
            Sign in to Ventureous
          </DialogTitle>
          <DialogDescription className="text-sm text-neutral-400 dark:text-white/40">
            Submit your startup ideas and connect with entrepreneurs
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-2">
          <Button className="w-full" size="lg" onClick={() => signIn("google")}>
            <svg
              aria-label="Google"
              className="mr-2 size-5"
              role="img"
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
            Continue with Google
          </Button>
          <p className="text-center text-xs text-neutral-400 dark:text-white/30">
            We only access your public profile
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
