"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, Check } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart, MAX_QTY } from "@/lib/cart-context";
import { cx } from "@/lib/format";
import { Button, DemoNote } from "./ui";

export function AddToCartButton({ product, compact = false, onAdded }: { product: Product; compact?: boolean; onAdded?: () => void }) {
  const { addItem, openDrawer } = useCart();
  const [qty, setQty] = useState(1);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "added">("idle");

  if (!product.priceVerified) {
    return (
      <div className="space-y-3">
        <Button disabled className="w-full">Add to bag – price pending</Button>
        <DemoNote>
          This product exists on greenbushtwins.com but its price wasn't verified for the prototype, so it can't be added to the demo cart.{" "}
          <a href={product.sourceUrl} target="_blank" rel="noreferrer" className="underline">View the live listing</a>.
        </DemoNote>
      </div>
    );
  }

  const submit = () => {
    setError(null);
    if (!Number.isInteger(qty) || qty < 1) return setError("Quantity must be at least 1.");
    if (qty > MAX_QTY) return setError(`You can add up to ${MAX_QTY} of this item in the demo.`);
    for (const v of product.variations ?? []) {
      if (!selections[v.attribute]) return setError(`Please choose a ${v.attribute.toLowerCase()}.`);
    }
    const variation = product.variations?.map((v) => `${v.attribute}: ${selections[v.attribute]}`).join(" · ");
    if (addItem(product.slug, qty, variation)) {
      setState("added");
      setTimeout(() => {
        setState("idle");
        onAdded?.();
      }, 1200);
    }
  };

  return (
    <div className="space-y-4">
      {product.variations?.map((v) => (
        <fieldset key={v.attribute}>
          <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-evergreen">
            {v.attribute}
            {selections[v.attribute] && <span className="ml-2 font-normal normal-case tracking-normal text-charcoal/60">— {selections[v.attribute]}</span>}
          </legend>
          <div className="flex flex-wrap gap-2">
            {v.options.map((o) => {
              const active = selections[v.attribute] === o;
              return (
                <button
                  key={o}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelections((s) => ({ ...s, [v.attribute]: o }))}
                  className={cx("rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors", active ? "border-forest bg-forest text-ivory" : "border-forest/25 bg-white text-evergreen hover:border-forest")}
                >
                  {o}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className={cx("flex gap-3", compact ? "flex-col sm:flex-row" : "flex-col sm:flex-row")}>
        <div className="flex h-12 items-center self-start rounded-full border border-forest/25 bg-white">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-full w-11 items-center justify-center text-evergreen hover:text-terracotta">
            <Minus className="h-4 w-4" />
          </button>
          <label className="sr-only" htmlFor={`qty-${product.slug}`}>Quantity</label>
          <input
            id={`qty-${product.slug}`}
            type="number"
            min={1}
            max={MAX_QTY}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-10 bg-transparent text-center text-sm font-semibold focus:outline-none"
          />
          <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))} className="flex h-full w-11 items-center justify-center text-evergreen hover:text-terracotta">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <Button onClick={submit} className={cx("h-12 flex-1", state === "added" && "bg-sage text-evergreen hover:bg-sage")}>
          {state === "added" ? <><Check className="h-4 w-4" /> Added to bag</> : <><ShoppingBag className="h-4 w-4" /> Add to bag</>}
        </Button>
      </div>
      {error && <p className="text-xs text-terracotta" role="alert">{error}</p>}
      {state === "added" && (
        <button type="button" onClick={openDrawer} className="text-xs font-semibold uppercase tracking-[0.16em] text-forest underline-offset-4 hover:underline">
          View bag →
        </button>
      )}
    </div>
  );
}
