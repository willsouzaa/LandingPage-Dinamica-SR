"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SafeImageProps = ImageProps & {
  placeholderClassName?: string;
};

export function SafeImage({ className, placeholderClassName, alt, ...props }: SafeImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-white/5 ${
          props.fill ? "absolute inset-0" : ""
        } ${placeholderClassName ?? className ?? ""}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-8 text-white/20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">
          Imagem em breve
        </span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}
