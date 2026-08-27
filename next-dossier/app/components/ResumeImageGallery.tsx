"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IconX } from "@tabler/icons-react";

interface ResumeImageGalleryProps {
  images: string[];
  description: string;
}

const ResumeImageGallery = ({ images, description }: ResumeImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedImage) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedImage]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-9">
        {images.map((imageUrl, index) => (
          <button
            key={`${imageUrl}-${index}`}
            type="button"
            onClick={() => setSelectedImage(imageUrl)}
            className="relative w-full cursor-zoom-in overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4bd89]"
            aria-label={`View timeline image ${index + 1} at full size`}
          >
            <Image
              src={imageUrl}
              alt={`${description} project image ${index + 1}`}
              width={1200}
              height={1200}
              sizes="(min-width: 1536px) 650px, (min-width: 1280px) 350px, (min-width: 1024px) 260px, (min-width: 768px) 40vw, 45vw"
              quality={95}
              className="h-20 w-full object-cover md:h-44 lg:h-60 shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset"
            />
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full-size resume image"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 md:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/70 p-2 text-white transition hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4bd89] md:right-8 md:top-8"
            aria-label="Close full-size image"
          >
            <IconX size={28} />
          </button>

          <div
            className="relative h-full w-full max-w-7xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt={description}
              fill
              priority
              sizes="100vw"
              quality={100}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ResumeImageGallery;
