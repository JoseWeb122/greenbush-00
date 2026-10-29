"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Eye, ShoppingBag, Check, X, ArrowRight } from "lucide-react";
import { getCategory, type Product } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { formatPrice, cx } from "@/lib/format";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [quick, setQuick] = useState(false);
  const category = getCategory(product.category);
  const hasVariations = !!product.variations?.length;

  const quickAdd = () => {
    if (hasVariations) {
      setQuick(true);
      return;
    }
    if (addItem(product.slug, 1)) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    }
  };

  return (
    <>
      <article className="group flex h-full flex-col" style={{ animationDelay: `${index * 40}ms` }}>
        <div className="relative overflow-hidden rounded-xl bg-cream">
          <Link href={`/product/${product.slug}`} className="block aspect-square" aria-label={product.name}>
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              width={800}
              height={800}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Link>
          <span className="absolute left-3 top-3 rounded-full bg-ivory/90 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-forest backdrop-blur">
            {category?.name}
          </span>
          <div className="absolute inset-x-3 bottom-3 flex translate-y-2 gap-2 opacity-0 transition-all duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 max-sm:translate-y-0 max-sm:opacity-100">
            <button
              type="button"
              onClick={() => setQuick(true)}
              className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-ivory/95 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-evergreen backdrop-blur hover:bg-white"
            >
              <Eye className="h-3.5 w-3.5" /> Quick view
            </button>
            {product.priceVerified && (
              <button
                type="button"
                onClick={quickAdd}
                aria-label={`Add ${product.name} to bag`}
                className={cx("flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full text-[0.68rem] font-semibold uppercase tracking-[0.12em] transition-colors", added ? "bg-sage text-evergreen" : "bg-forest text-ivory hover:bg-evergreen")}
              >
                {added ? <><Check className="h-3.5 w-3.5" /> Added</> : <><ShoppingBag className="h-3.5 w-3.5" /> {hasVariations ? "Choose" : "Add"}</>}
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col pt-4">
          {product.brand && <p className="text-[0.68rem] uppercase tracking-[0.16em] text-charcoal/50">{product.brand}</p>}
          <h3 className="mt-1 font-sans text-[0.95rem] font-semibold leading-snug text-evergreen">
            <Link href={`/product/${product.slug}`} className="hover:text-forest">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-charcoal/60">{product.shortDescription}</p>
          <div className="mt-auto pt-3">
            {product.priceVerified ? (
              <p className="text-sm font-semibold text-forest">{formatPrice(product.price)}</p>
            ) : (
              <p className="text-xs font-medium text-terracotta">Price to be confirmed</p>
            )}
          </div>
        </div>
      </article>
      {quick && <QuickView product={product} onClose={() => setQuick(false)} />}
    </>
  );
}

function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-evergreen/50 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view: ${product.name}`}
        onClick={(e) => e.stopPropagation()}
        className="grid max-h-[92vh] w-full max-w-3xl animate-fade-up overflow-y-auto rounded-t-2xl bg-ivory shadow-2xl sm:grid-cols-2 sm:rounded-2xl"
      >
        <img src={product.images[0]} alt={product.name} className="aspect-square w-full object-cover sm:h-full" />
        <div className="relative p-6 sm:p-8">
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close quick view" className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-evergreen hover:bg-forest/5">
            <X className="h-5 w-5" />
          </button>
          <p className="eyebrow text-terracotta">{getCategory(product.category)?.name}</p>
          <h2 className="mt-2 pr-8 text-2xl leading-tight text-evergreen">{product.name}</h2>
          {product.priceVerified ? (
            <p className="mt-3 text-lg font-semibold text-forest">{formatPrice(product.price)}</p>
          ) : (
            <p className="mt-3 text-sm font-medium text-terracotta">Price to be confirmed with the owner</p>
          )}
          <p className="mt-4 text-sm leading-relaxed text-charcoal/70">{product.shortDescription}</p>
          <div className="mt-6">
            <AddToCartButton product={product} compact onAdded={onClose} />
          </div>
          <Link href={`/product/${product.slug}`} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-forest hover:text-terracotta">
            Full details <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
