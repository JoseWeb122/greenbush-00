import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductFilters } from "@/components/ProductFilters";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse Sidney's Creations, Carrie's Prairie, small-batch candles and bath goods, and artisan collaborations from Greenbush Twins & Company.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="max-w-2xl">
        <p className="eyebrow text-terracotta">Shop</p>
        <h1 className="mt-3 text-4xl leading-[1.05] text-evergreen sm:text-5xl">The Collection</h1>
        <p className="mt-4 text-base leading-relaxed text-charcoal/70">
          Products thoughtfully chosen for families who value care, comfort, and conscious living – {products.length} items across four collections. Search, filter, and sort to find exactly what you're after.
        </p>
      </div>
      <div className="mt-10">
        <Suspense fallback={<p className="text-sm text-charcoal/60">Loading products…</p>}>
          <ProductFilters />
        </Suspense>
      </div>
    </div>
  );
}
