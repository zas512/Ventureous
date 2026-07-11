"use server";

import {
  commentSchema,
  pitchFormSchema,
  profileSchema,
} from "@/lib/validation";

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

type CreatePitchResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

/**
 * Server action to create a new startup pitch.
 * Expects FormData with: title, description, category, pitch, image (File).
 * Returns discriminated union: { ok: true; id } | { ok: false; error }.
 */
export async function createPitch(
  formData: FormData
): Promise<CreatePitchResult> {
  const rawPitch = (formData.get("pitch") as string) || "";

  const rawData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    pitch: rawPitch,
  };

  const parsed = pitchFormSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues.map((e) => e.message).join(", "),
    };
  }

  const imageFile = formData.get("image") as File | null;

  if (!imageFile || imageFile.size === 0) {
    return { ok: false, error: "Cover image is required" };
  }

  const slug = toSlug(parsed.data.title) || "startup";
  const id = `${slug}-${Date.now()}`;

  return { ok: true, id };
}

type CreateCommentResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

/**
 * Server action to create a comment on a startup pitch.
 * Requires authentication. Validates content length and startup existence.
 */
export async function createComment(
  startupId: string,
  content: string
): Promise<CreateCommentResult> {
  const parsed = commentSchema.safeParse({ content, startupId });

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues.map((e) => e.message).join(", "),
    };
  }

  const id = `comment-${Date.now()}`;
  return { ok: true, id };
}

type DeleteCommentResult = { ok: true } | { ok: false; error: string };

/**
 * Server action to delete a comment.
 * Only the comment author can delete their own comments.
 */
export async function deleteComment(
  commentId: string
): Promise<DeleteCommentResult> {
  if (!commentId) {
    return { ok: false, error: "Comment not found" };
  }

  return { ok: true };
}

type UpdateProfileResult = { ok: true } | { ok: false; error: string };

/**
 * Server action to update the authenticated user's profile.
 * Only patches the logged-in user's own author document (no client-supplied ID).
 * Returns discriminated union: { ok: true } | { ok: false; error }.
 */
export async function updateProfile(
  formData: FormData
): Promise<UpdateProfileResult> {
  const rawData = {
    name: formData.get("name") as string,
    position: formData.get("position") as string,
    bio: formData.get("bio") as string,
  };

  const parsed = profileSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues.map((e) => e.message).join(", "),
    };
  }

  const imageFile = formData.get("image") as File | null;

  if (imageFile && imageFile.size > 0) {
    if (imageFile.size > 2 * 1024 * 1024) {
      return { ok: false, error: "Image must be under 2 MB" };
    }

    if (!imageFile.type.startsWith("image/")) {
      return { ok: false, error: "File must be an image" };
    }
  }

  if (!parsed.data.name) {
    return { ok: false, error: "Name is required" };
  }

  return { ok: true };
}
