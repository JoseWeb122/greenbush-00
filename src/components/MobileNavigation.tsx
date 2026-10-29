"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X, Search, ChevronRight } from "lucide-react";
import { mainNav } from "@/data/site";
import { categories } from "@/data/products";
import { cx } from "@/lib/format";

export function MobileNavigation({ open, onClose, onSearch }: { open: boolean; onClose: () => void; onSearch: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div className={cx("fixed inset-0 z-50 lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
      <div
        className={cx("absolute inset-0 bg-evergreen/40 backdrop-blur-sm transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cx(
          "absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-ivory shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-forest/10 px-4">
          <span className="font-serif text-xl text-evergreen">Menu</span>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center rounded-full text-evergreen hover:bg-forest/5">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <button
            type="button"
            onClick={onSearch}
            className="mb-4 flex w-full items-center gap-3 rounded-full border border-forest/15 bg-white px-4 py-3 text-left text-sm text-charcoal/60"
          >
            <Search className="h-4 w-4" /> Search products…
          </button>
          <ul className="divide-y divide-forest/10">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={onClose} className="flex items-center justify-between py-3.5 text-base font-semibold text-evergreen">
                  {item.label}
                  <ChevronRight className="h-4 w-4 text-sage" />
                </Link>
                {item.label === "Shop" && (
                  <ul className="mb-2 space-y-1 pl-3">
                    {categories.map((c) => (
                      <li key={c.slug}>
                        <Link href={`/shop?category=${c.slug}`} onClick={onClose} className="block py-2 text-sm text-charcoal/75 hover:text-forest">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-forest/10 p-4 text-xs text-charcoal/60">
          Greenbush Twins &amp; Company · Mindful, eco-friendly living
        </div>
      </div>
    </div>
  );
}
