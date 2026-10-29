"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X, ShoppingBag, Minus, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { useCart, MAX_QTY } from "@/lib/cart-context";
import { formatPrice, cx } from "@/lib/format";
import { ButtonLink } from "./ui";

export function CartDrawer() {
  const { drawerOpen, closeDrawer, lines, subtotal, shippingEstimate, total, setQuantity, removeItem, itemCount, toast } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen, closeDrawer]);

  return (
    <>
      {/* Toast */}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex justify-center px-4">
        <div
          className={cx(
            "flex items-center gap-2 rounded-full bg-evergreen px-5 py-3 text-sm text-ivory shadow-xl transition-all duration-300",
            toast ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <CheckCircle2 className="h-4 w-4 text-sage" /> {toast}
        </div>
      </div>

      <div className={cx("fixed inset-0 z-50", drawerOpen ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!drawerOpen}>
        <div className={cx("absolute inset-0 bg-evergreen/40 backdrop-blur-sm transition-opacity duration-300", drawerOpen ? "opacity-100" : "opacity-0")} onClick={closeDrawer} />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Shopping bag"
          className={cx(
            "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ivory shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
            drawerOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-forest/10 px-5">
            <h2 className="font-serif text-xl text-evergreen">
              Your Bag <span className="font-sans text-sm text-charcoal/50">({itemCount})</span>
            </h2>
            <button ref={closeRef} type="button" onClick={closeDrawer} aria-label="Close bag" className="flex h-11 w-11 items-center justify-center rounded-full text-evergreen hover:bg-forest/5">
              <X className="h-5 w-5" />
            </button>
          </div>

          {lines.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <ShoppingBag className="h-10 w-10 text-sage" />
              <p className="mt-4 font-serif text-2xl text-evergreen">Your bag is empty</p>
              <p className="mt-2 text-sm text-charcoal/60">Discover candles, bath goods, and Seven Sisters.</p>
              <ButtonLink href="/shop" className="mt-6" variant="primary">
                <span onClick={closeDrawer}>Explore the Shop</span>
              </ButtonLink>
            </div>
          ) : (
            <>
              <ul className="flex-1 divide-y divide-forest/10 overflow-y-auto px-5">
                {lines.map((l) => (
                  <li key={l.key} className="flex gap-4 py-4">
                    <Link href={`/product/${l.product.slug}`} onClick={closeDrawer} className="flex-none">
                      <img src={l.product.images[0]} alt={l.product.name} className="h-20 w-20 rounded-lg object-cover" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link href={`/product/${l.product.slug}`} onClick={closeDrawer} className="line-clamp-2 text-sm font-semibold text-evergreen hover:text-forest">
                        {l.product.name}
                      </Link>
                      {l.variation && <p className="mt-0.5 text-xs text-charcoal/55">{l.variation}</p>}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-forest/20">
                          <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(l.key, l.quantity - 1)} className="flex h-8 w-8 items-center justify-center text-evergreen hover:text-terracotta">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold" aria-live="polite">{l.quantity}</span>
                          <button type="button" aria-label="Increase quantity" disabled={l.quantity >= MAX_QTY} onClick={() => setQuantity(l.key, l.quantity + 1)} className="flex h-8 w-8 items-center justify-center text-evergreen hover:text-terracotta disabled:opacity-30">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-forest">{formatPrice(l.lineTotal)}</span>
                      </div>
                    </div>
                    <button type="button" aria-label={`Remove ${l.product.name}`} onClick={() => removeItem(l.key)} className="self-start p-1 text-charcoal/40 hover:text-terracotta">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="border-t border-forest/10 bg-cream/60 px-5 py-5">
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><dt className="text-charcoal/70">Subtotal</dt><dd className="font-semibold">{formatPrice(subtotal)}</dd></div>
                  <div className="flex justify-between">
                    <dt className="text-charcoal/70">Shipping estimate</dt>
                    <dd className="font-semibold">{shippingEstimate ? (shippingEstimate.amount === 0 ? "Free (sample rule)" : formatPrice(shippingEstimate.amount)) : <span className="font-normal text-charcoal/50">Calculated in cart</span>}</dd>
                  </div>
                  <div className="flex justify-between border-t border-forest/10 pt-2 text-base"><dt className="font-semibold text-evergreen">Estimated total</dt><dd className="font-semibold text-evergreen">{formatPrice(total)}</dd></div>
                </dl>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link href="/cart" onClick={closeDrawer} className="inline-flex items-center justify-center rounded-full border border-forest/50 px-4 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-forest hover:bg-forest hover:text-ivory">
                    View Bag
                  </Link>
                  <Link href="/checkout" onClick={closeDrawer} className="inline-flex items-center justify-center rounded-full bg-forest px-4 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ivory hover:bg-evergreen">
                    Checkout
                  </Link>
                </div>
                <p className="mt-3 text-center text-[0.68rem] text-charcoal/50">Demo cart · no payment is taken</p>
              </div>
            </>
          )}
        </aside>
      </div>
    </>
  );
}
