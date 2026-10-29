"use client";

import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import {
  categories,
  priceRanges,
  products,
  searchProducts,
  sortOptions,
  sortProducts,
  type CategorySlug,
  type PriceRangeId,
  type SortKey,
} from "@/data/products";
import { cx } from "@/lib/format";
import { ProductGrid } from "./ProductGrid";
import { Button, inputClass } from "./ui";

export function ProductFilters({ heading }: { heading?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const q = params.get("q") ?? "";
  const category = (params.get("category") ?? "") as CategorySlug | "";
  const price = (params.get("price") ?? "") as PriceRangeId | "";
  const sort = (params.get("sort") ?? "featured") as SortKey;

  const setParam = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(params.toString());
      Object.entries(patch).forEach(([k, v]) => {
        if (v) next.set(k, v);
        else next.delete(k);
      });
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  const results = useMemo(() => {
    let list = searchProducts(q, products);
    if (category) list = list.filter((p) => p.category === category);
    if (price) {
      const r = priceRanges.find((x) => x.id === price);
      if (r) list = list.filter((p) => p.priceVerified && p.price >= r.min && p.price <= r.max);
    }
    return sortProducts(list, sort);
  }, [q, category, price, sort]);

  const activeChips = [
    q && { key: "q", label: `Search: “${q}”` },
    category && { key: "category", label: categories.find((c) => c.slug === category)?.name ?? category },
    price && { key: "price", label: priceRanges.find((r) => r.id === price)?.label ?? price },
  ].filter(Boolean) as { key: string; label: string }[];

  const reset = () => router.replace(pathname, { scroll: false });

  const sidebar = (
    <div className="space-y-8">
      <div>
        <p className="eyebrow mb-3 text-evergreen">Category</p>
        <ul className="space-y-1">
          <li>
            <button type="button" onClick={() => setParam({ category: null })} className={cx("w-full rounded-md px-2 py-1.5 text-left text-sm", !category ? "bg-forest/10 font-semibold text-forest" : "text-charcoal/70 hover:text-forest")}>
              All products <span className="text-charcoal/40">({products.length})</span>
            </button>
          </li>
          {categories.map((c) => {
            const count = products.filter((p) => p.category === c.slug).length;
            return (
              <li key={c.slug}>
                <button type="button" onClick={() => setParam({ category: category === c.slug ? null : c.slug })} aria-pressed={category === c.slug} className={cx("w-full rounded-md px-2 py-1.5 text-left text-sm", category === c.slug ? "bg-forest/10 font-semibold text-forest" : "text-charcoal/70 hover:text-forest")}>
                  {c.name} <span className="text-charcoal/40">({count})</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p className="eyebrow mb-3 text-evergreen">Price</p>
        <ul className="space-y-1">
          {priceRanges.map((r) => (
            <li key={r.id}>
              <button type="button" onClick={() => setParam({ price: price === r.id ? null : r.id })} aria-pressed={price === r.id} className={cx("w-full rounded-md px-2 py-1.5 text-left text-sm", price === r.id ? "bg-forest/10 font-semibold text-forest" : "text-charcoal/70 hover:text-forest")}>
                {r.label}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[0.68rem] text-charcoal/45">Price filters apply to items with confirmed prices.</p>
      </div>
      {activeChips.length > 0 && (
        <Button variant="secondary" onClick={reset} className="w-full">Reset filters</Button>
      )}
    </div>
  );

  return (
    <div>
      {/* Search + sort bar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/45" aria-hidden />
          <label htmlFor="shop-search" className="sr-only">Search products</label>
          <input
            id="shop-search"
            type="search"
            value={q}
            onChange={(e) => setParam({ q: e.target.value || null })}
            placeholder="Search by name, scent, maker, or category…"
            className={cx(inputClass, "h-12 rounded-full pl-11 pr-11")}
          />
          {q && (
            <button type="button" onClick={() => setParam({ q: null })} aria-label="Clear search" className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-charcoal/50 hover:bg-forest/5 hover:text-forest">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => setMobileFiltersOpen((o) => !o)} aria-expanded={mobileFiltersOpen} className="inline-flex h-12 items-center gap-2 rounded-full border border-forest/20 bg-white px-4 text-sm font-medium text-evergreen lg:hidden">
            <SlidersHorizontal className="h-4 w-4" /> Filters {activeChips.length > 0 && <span className="rounded-full bg-forest px-1.5 text-[0.65rem] text-ivory">{activeChips.length}</span>}
          </button>
          <div className="flex-1 md:flex-none">
            <label htmlFor="shop-sort" className="sr-only">Sort by</label>
            <select id="shop-sort" value={sort} onChange={(e) => setParam({ sort: e.target.value === "featured" ? null : e.target.value })} className={cx(inputClass, "h-12 rounded-full pr-9")}>
              {sortOptions.map((o) => <option key={o.value} value={o.value}>Sort: {o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Active chips + count */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <p className="mr-2 text-sm text-charcoal/65" aria-live="polite">
          <span className="font-semibold text-evergreen">{results.length}</span> {results.length === 1 ? "product" : "products"}
          {heading ? ` for ${heading}` : ""}
        </p>
        {activeChips.map((chip) => (
          <button key={chip.key} type="button" onClick={() => setParam({ [chip.key]: null })} className="inline-flex items-center gap-1.5 rounded-full bg-forest/10 py-1 pl-3 pr-2 text-xs font-medium text-forest hover:bg-forest/15">
            {chip.label} <X className="h-3 w-3" aria-hidden /> <span className="sr-only">Remove filter</span>
          </button>
        ))}
        {activeChips.length > 0 && (
          <button type="button" onClick={reset} className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta hover:underline">Reset</button>
        )}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className={cx("lg:block", mobileFiltersOpen ? "block rounded-2xl border border-forest/10 bg-white p-5" : "hidden")} aria-label="Filters">
          {sidebar}
        </aside>
        <div>
          {results.length > 0 ? (
            <ProductGrid products={results} columns={4} />
          ) : (
            <div className="rounded-2xl border border-dashed border-forest/20 bg-white px-6 py-16 text-center">
              <p className="font-serif text-2xl text-evergreen">No products match{q ? ` “${q}”` : " these filters"}</p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-charcoal/60">Try a broader search such as “candle”, “bath”, or “prairie”, or clear a filter.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button onClick={reset}>Reset filters</Button>
                <Link href="/shop" className="inline-flex items-center rounded-full border border-forest/40 px-6 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-forest">Browse all</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
