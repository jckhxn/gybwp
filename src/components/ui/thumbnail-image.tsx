"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

const FALLBACK = "/images/logo.webp";

type ThumbnailImageProps = Omit<ImageProps, "onError"> & {
  fallback?: string;
};

export function ThumbnailImage({ src, fallback = FALLBACK, alt, ...props }: ThumbnailImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
    />
  );
}
