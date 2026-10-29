import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductFilters } from "@/components/ProductFilters";

export const metadata: Metadata = { title: "Search", description: "Search the Greenbush Twins collection." };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <p className="eyebrow text-terracotta">Search results</p>
      <h1 className="mt-3 text-4xl leading-[1.05] text-evergreen sm:text-5xl">{q ? <>Results for “{q}”</> : "Search the collection"}</h1>
      <div className="mt-10">
        <Suspense fallback={<p className="text-sm text-charcoal/60">Searching…</p>}>
          <ProductFilters />
        </Suspense>
      </div>
    </div>
  );
}
