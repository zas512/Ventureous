"use client";

import { memo } from "react";

type ImageLike = {
  id?: string | null;
  url?: string | null;
  src?: string | null;
  alt?: string | null;
  asset?: {
    url?: string | null;
  } | null;
};

type SanityImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  image?: ImageLike | null;
};

function resolveImageSrc(image?: ImageLike | null): string | null {
  if (!image) {
    return null;
  }

  if (image.url) {
    return image.url;
  }

  if (image.src) {
    return image.src;
  }

  if (image.asset?.url) {
    return image.asset.url;
  }

  if (image.id && (image.id.startsWith("http://") || image.id.startsWith("https://"))) {
    return image.id;
  }

  return null;
}

function SanityImageUnmemorized({ image, alt, ...props }: SanityImageProps) {
  const src = resolveImageSrc(image);

  if (!src) {
    return null;
  }

  return <img alt={alt ?? image?.alt ?? ""} src={src} {...props} />;
}

export const SanityImage = memo(SanityImageUnmemorized);
