"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart, MAX_QTY } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { ShippingEstimator } from "./ShippingEstimator";
import { ButtonLink, DemoNote } from "./ui";

export function CartPage() {
  const { lines, subtotal, shippingEstimate, total, setQuantity, removeItem, itemCount, hydrated, clearCart } = useCart();

  if (!hydrated) return <div className="mx-auto max-w-7xl px-4 py-24 text-center text-sm text-charcoal/50">Loading your bag…</div>;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <ShoppingBag className="mx-auto h-12 w-12 text-sage" />
        <h1 className="mt-6 text-4xl text-evergreen">Your bag is empty</h1>
        <p className="mx-auto mt-3 max-w-md text-charcoal/65">Discover small-batch candles, bath goods, Carrie's Prairie, and Seven Sisters: The Lantern of Humanity.</p>
        <ButtonLink href="/shop" className="mt-8">Continue shopping</ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-terracotta">Your bag</p>
          <h1 className="mt-3 text-4xl text-evergreen sm:text-5xl">{itemCount} {itemCount === 1 ? "item" : "items"}</h1>
        </div>
        <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-forest hover:text-terracotta"><ArrowLeft className="h-3.5 w-3.5" /> Continue shopping</Link>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <ul className="divide-y divide-forest/10 rounded-2xl border border-forest/10 bg-white px-5">
            {lines.map((l) => (
              <li key={l.key} className="grid grid-cols-[80px_1fr] gap-4 py-5 sm:grid-cols-[112px_1fr_auto] sm:items-center">
                <Link href={`/product/${l.product.slug}`}>
                  <img src={l.product.images[0]} alt={l.product.name} className="aspect-square w-full rounded-lg object-cover" />
                </Link>
                <div className="min-w-0">
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-charcoal/50">{l.product.brand}</p>
                  <Link href={`/product/${l.product.slug}`} className="mt-0.5 block text-sm font-semibold text-evergreen hover:text-forest sm:text-base">{l.product.name}</Link>
                  {l.variation && <p className="mt-0.5 text-xs text-charcoal/55">{l.variation}</p>}
                  <p className="mt-1 text-xs text-charcoal/55">{formatPrice(l.product.price)} each</p>
                  <div className="mt-3 flex items-center gap-3 sm:hidden">
                    <Qty value={l.quantity} onChange={(n) => setQuantity(l.key, n)} />
                    <span className="ml-auto text-sm font-semibold text-forest">{formatPrice(l.lineTotal)}</span>
                  </div>
                </div>
                <div className="hidden items-center gap-5 sm:flex">
                  <Qty value={l.quantity} onChange={(n) => setQuantity(l.key, n)} />
                  <span className="w-20 text-right text-sm font-semibold text-forest">{formatPrice(l.lineTotal)}</span>
                  <button type="button" aria-label={`Remove ${l.product.name}`} onClick={() => removeItem(l.key)} className="p-1 text-charcoal/40 hover:text-terracotta"><Trash2 className="h-4 w-4" /></button>
                </div>
                <button type="button" onClick={() => removeItem(l.key)} className="col-span-2 text-left text-xs text-charcoal/50 underline-offset-2 hover:text-terracotta hover:underline sm:hidden">Remove</button>
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <button type="button" onClick={clearCart} className="text-xs text-charcoal/50 underline-offset-2 hover:text-terracotta hover:underline">Clear bag</button>
          </div>
          <ShippingEstimator />
        </div>

        <aside className="h-fit rounded-2xl border border-forest/10 bg-cream/60 p-6 lg:sticky lg:top-28">
          <h2 className="font-serif text-2xl text-evergreen">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-charcoal/70">Subtotal</dt><dd className="font-semibold">{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between">
              <dt className="text-charcoal/70">Shipping (sample estimate)</dt>
              <dd className="font-semibold">{shippingEstimate ? (shippingEstimate.amount === 0 ? "Free" : formatPrice(shippingEstimate.amount)) : <span className="font-normal text-charcoal/50">Enter address</span>}</dd>
            </div>
            <div className="flex justify-between text-charcoal/50"><dt>Taxes</dt><dd>Calculated at real checkout</dd></div>
            <div className="flex justify-between border-t border-forest/10 pt-3 text-lg"><dt className="font-semibold text-evergreen">Estimated total</dt><dd className="font-semibold text-evergreen">{formatPrice(total)}</dd></div>
          </dl>
          <ButtonLink href="/checkout" className="mt-6 w-full">Proceed to checkout</ButtonLink>
          <DemoNote className="mt-4">Demo cart. Checkout is a preview – no payment is collected and no order is created.</DemoNote>
        </aside>
      </div>
    </div>
  );
}

function Qty({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex h-10 items-center rounded-full border border-forest/20 bg-white">
      <button type="button" aria-label="Decrease quantity" onClick={() => onChange(value - 1)} className="flex h-full w-10 items-center justify-center text-evergreen hover:text-terracotta"><Minus className="h-3.5 w-3.5" /></button>
      <span className="w-8 text-center text-sm font-semibold" aria-live="polite">{value}</span>
      <button type="button" aria-label="Increase quantity" disabled={value >= MAX_QTY} onClick={() => onChange(value + 1)} className="flex h-full w-10 items-center justify-center text-evergreen hover:text-terracotta disabled:opacity-30"><Plus className="h-3.5 w-3.5" /></button>
    </div>
  );
}
