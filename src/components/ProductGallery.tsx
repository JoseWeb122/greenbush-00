"use client";

import { useEffect, useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { cx } from "@/lib/format";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (!zoom) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [zoom]);

  return (
    <div className="lg:sticky lg:top-28">
      <div className="group relative overflow-hidden rounded-2xl bg-cream">
        <img src={images[active]} alt={name} width={1024} height={1024} className="aspect-square w-full object-cover" />
        <button
          type="button"
          onClick={() => setZoom(true)}
          aria-label="Zoom image"
          className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/90 text-evergreen shadow backdrop-blur transition hover:bg-white"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((src, i) => (
            <button key={src + i} type="button" onClick={() => setActive(i)} aria-label={`View image ${i + 1}`} aria-current={active === i} className={cx("overflow-hidden rounded-lg border-2", active === i ? "border-forest" : "border-transparent")}>
              <img src={src} alt="" className="h-20 w-20 object-cover" />
            </button>
          ))}
        </div>
      )}
      {zoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-evergreen/90 p-4" onClick={() => setZoom(false)} role="dialog" aria-modal="true" aria-label={`${name} enlarged`}>
          <button type="button" onClick={() => setZoom(false)} aria-label="Close" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20">
            <X className="h-5 w-5" />
          </button>
          <img src={images[active]} alt={name} className="max-h-[90vh] max-w-full animate-fade-up rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
