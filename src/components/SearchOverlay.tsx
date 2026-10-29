"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, ArrowRight, CornerDownLeft } from "lucide-react";
import { categories, searchProducts } from "@/data/products";
import { formatPrice, cx } from "@/lib/format";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => (query.trim() ? searchProducts(query).slice(0, 6) : []), [query]);
  const matchingCategories = useMemo(
    () => (query.trim() ? categories.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase())) : []),
    [query],
  );
  const items = [...results.map((p) => ({ href: `/product/${p.slug}` })), ...matchingCategories.map((c) => ({ href: `/shop?category=${c.slug}` }))];

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setActive(0);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const submit = () => {
    if (items[active] && query.trim()) {
      router.push(items[active].href);
    } else if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
    onClose();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(items.length, a + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (active === items.length || items.length === 0) {
        if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        onClose();
      } else submit();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-evergreen/50 p-3 pt-[8vh] backdrop-blur-sm sm:p-6 sm:pt-[10vh]" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="w-full max-w-2xl animate-fade-up overflow-hidden rounded-2xl bg-ivory shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-forest/10 px-4 py-3 sm:px-5">
          <Search className="h-5 w-5 flex-none text-forest" aria-hidden />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKey}
            placeholder="Search candles, bath, books, Carrie's Prairie…"
            aria-label="Search products"
            aria-activedescendant={items.length ? `search-item-${active}` : undefined}
            className="h-11 flex-1 bg-transparent text-base text-charcoal placeholder:text-charcoal/40 focus:outline-none"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="rounded-full p-2 text-charcoal/60 hover:bg-forest/5 hover:text-forest">
              <X className="h-4 w-4" />
            </button>
          )}
          <button type="button" onClick={onClose} className="hidden rounded-md border border-forest/15 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-charcoal/60 sm:block">
            Esc
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2 sm:p-3">
          {!query.trim() && (
            <div className="p-3">
              <p className="eyebrow mb-3 text-terracotta">Browse by category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Link key={c.slug} href={`/shop?category=${c.slug}`} onClick={onClose} className="rounded-full border border-forest/15 bg-white px-3.5 py-1.5 text-sm text-evergreen hover:border-forest">
                    {c.name}
                  </Link>
                ))}
              </div>
              <p className="mt-5 text-xs text-charcoal/50">Tip: press <kbd className="rounded border border-forest/20 px-1">/</kbd> anywhere to open search.</p>
            </div>
          )}

          {query.trim() && results.length === 0 && matchingCategories.length === 0 && (
            <div className="p-6 text-center">
              <p className="font-serif text-xl text-evergreen">No matches for “{query}”</p>
              <p className="mt-2 text-sm text-charcoal/60">Try “candle”, “bath bomb”, “book”, or “prairie” – or browse the full shop.</p>
              <Link href="/shop" onClick={onClose} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-forest">
                Browse all products <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}

          {results.length > 0 && (
            <ul role="listbox" aria-label="Product suggestions">
              {results.map((p, i) => (
                <li key={p.slug} id={`search-item-${i}`} role="option" aria-selected={active === i}>
                  <Link
                    href={`/product/${p.slug}`}
                    onClick={onClose}
                    onMouseEnter={() => setActive(i)}
                    className={cx("flex items-center gap-4 rounded-xl p-2.5 transition-colors", active === i ? "bg-white shadow-sm" : "hover:bg-white/60")}
                  >
                    <img src={p.images[0]} alt="" className="h-14 w-14 flex-none rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-evergreen">{p.name}</p>
                      <p className="truncate text-xs text-charcoal/55">{p.brand}</p>
                    </div>
                    <span className="text-sm font-semibold text-forest">{p.priceVerified ? formatPrice(p.price) : "Price TBC"}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {matchingCategories.length > 0 && (
            <div className="mt-2 border-t border-forest/10 p-3">
              <p className="eyebrow mb-2 text-terracotta">Categories</p>
              {matchingCategories.map((c, i) => {
                const idx = results.length + i;
                return (
                  <Link
                    key={c.slug}
                    id={`search-item-${idx}`}
                    href={`/shop?category=${c.slug}`}
                    onClick={onClose}
                    onMouseEnter={() => setActive(idx)}
                    className={cx("block rounded-lg px-3 py-2 text-sm text-evergreen", active === idx ? "bg-white" : "hover:bg-white/60")}
                  >
                    {c.name}
                  </Link>
                );
              })}
            </div>
          )}

          {query.trim() && (
            <button
              type="button"
              onMouseEnter={() => setActive(items.length)}
              onClick={() => {
                router.push(`/search?q=${encodeURIComponent(query.trim())}`);
                onClose();
              }}
              className={cx(
                "mt-2 flex w-full items-center justify-between rounded-xl border border-forest/15 px-4 py-3 text-sm font-semibold text-forest transition-colors",
                active === items.length ? "bg-forest text-ivory" : "hover:bg-white",
              )}
            >
              See all results for “{query}”
              <CornerDownLeft className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
