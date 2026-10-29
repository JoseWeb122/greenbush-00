"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import { destinations, methodsFor, validateShippingAddress, type ShippingAddress } from "@/data/shipping";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { Button, ButtonLink, DemoNote, Field, inputClass } from "./ui";

interface Form {
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
}

export function CheckoutPreview() {
  const { lines, subtotal, shippingEstimate, total, shippingAddress, setShippingAddress, hydrated, clearCart, itemCount } = useCart();
  const [form, setForm] = useState<Form>({ email: "", firstName: "", lastName: "", address1: "", address2: "", city: "" });
  const [ship, setShip] = useState<ShippingAddress>(shippingAddress);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<{ ref: string; total: number; count: number } | null>(null);

  const dest = destinations.find((d) => d.code === ship.country);
  const methods = methodsFor(ship.country);

  const updateShip = (patch: Partial<ShippingAddress>) => {
    const next = { ...ship, ...patch };
    if (patch.country !== undefined) {
      next.region = "";
      next.methodId = methodsFor(patch.country)[0]?.id ?? "";
    }
    setShip(next);
    if (!Object.keys(validateShippingAddress(next)).length) setShippingAddress(next);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = "Please enter a valid email address.";
    if (!form.firstName.trim()) errs.firstName = "First name is required.";
    if (!form.lastName.trim()) errs.lastName = "Last name is required.";
    if (!form.address1.trim()) errs.address1 = "Street address is required.";
    if (!form.city.trim()) errs.city = "City is required.";
    Object.assign(errs, validateShippingAddress(ship));
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(Object.keys(errs)[0] === "email" ? "co-email" : "checkout-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setShippingAddress(ship);
    const ref = "DEMO-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setDone({ ref, total, count: itemCount });
    clearCart();
  };

  if (!hydrated) return <div className="py-24 text-center text-sm text-charcoal/50">Loading…</div>;

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-forest" />
        <p className="eyebrow mt-6 text-terracotta">Demo confirmation</p>
        <h1 className="mt-3 text-4xl text-evergreen">Checkout preview complete</h1>
        <p className="mt-4 text-charcoal/70">
          Reference <span className="font-mono font-semibold text-evergreen">{done.ref}</span> · {done.count} {done.count === 1 ? "item" : "items"} · estimated total {formatPrice(done.total)}
        </p>
        <DemoNote className="mt-6 text-left">
          This is a prototype confirmation only. No payment was taken, no order was created, and nothing will ship. In production, this step hands off to the existing WooCommerce checkout and payment gateway.
        </DemoNote>
        <ButtonLink href="/shop" className="mt-8">Back to the shop</ButtonLink>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-4xl text-evergreen">Nothing to check out yet</h1>
        <p className="mt-3 text-charcoal/65">Add something to your bag first.</p>
        <ButtonLink href="/shop" className="mt-8">Explore the shop</ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Link href="/cart" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-forest hover:text-terracotta"><ArrowLeft className="h-3.5 w-3.5" /> Back to bag</Link>
      <h1 className="mt-4 text-4xl text-evergreen sm:text-5xl">Checkout preview</h1>
      <DemoNote className="mt-4 max-w-2xl">Validation works, but this form does not collect payment or create an order. Payment fields are intentionally omitted.</DemoNote>

      <form id="checkout-form" onSubmit={submit} noValidate className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-10">
          <section aria-labelledby="co-contact">
            <h2 id="co-contact" className="font-serif text-2xl text-evergreen">Contact</h2>
            <div className="mt-4">
              <Field label="Email" id="co-email" error={errors.email}>
                <input id="co-email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} aria-invalid={!!errors.email} />
              </Field>
            </div>
          </section>

          <section aria-labelledby="co-ship">
            <h2 id="co-ship" className="font-serif text-2xl text-evergreen">Shipping address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="First name" id="co-first" error={errors.firstName}><input id="co-first" autoComplete="given-name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className={inputClass} aria-invalid={!!errors.firstName} /></Field>
              <Field label="Last name" id="co-last" error={errors.lastName}><input id="co-last" autoComplete="family-name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className={inputClass} aria-invalid={!!errors.lastName} /></Field>
              <div className="sm:col-span-2"><Field label="Street address" id="co-addr1" error={errors.address1}><input id="co-addr1" autoComplete="address-line1" value={form.address1} onChange={(e) => setForm({ ...form, address1: e.target.value })} className={inputClass} aria-invalid={!!errors.address1} /></Field></div>
              <div className="sm:col-span-2"><Field label="Apartment, suite, etc." id="co-addr2" optional><input id="co-addr2" autoComplete="address-line2" value={form.address2} onChange={(e) => setForm({ ...form, address2: e.target.value })} className={inputClass} /></Field></div>
              <Field label="City" id="co-city" error={errors.city}><input id="co-city" autoComplete="address-level2" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputClass} aria-invalid={!!errors.city} /></Field>
              <Field label="Country / region" id="co-country" error={errors.country}>
                <select id="co-country" value={ship.country} onChange={(e) => updateShip({ country: e.target.value })} className={inputClass} autoComplete="country">
                  {destinations.map((d) => <option key={d.code} value={d.code}>{d.name}</option>)}
                </select>
              </Field>
              {dest && (
                <Field label={dest.regionLabel} id="co-region" error={errors.region}>
                  <select id="co-region" value={ship.region} onChange={(e) => updateShip({ region: e.target.value })} className={inputClass} autoComplete="address-level1">
                    <option value="">Select…</option>
                    {dest.regions.map((r) => <option key={r.code} value={r.code}>{r.name}</option>)}
                  </select>
                </Field>
              )}
              {dest && (
                <Field label={dest.postalLabel} id="co-postal" error={errors.postalCode} hint={dest.postalHint}>
                  <input id="co-postal" autoComplete="postal-code" value={ship.postalCode} onChange={(e) => updateShip({ postalCode: e.target.value })} className={inputClass} aria-invalid={!!errors.postalCode} />
                </Field>
              )}
            </div>
          </section>

          <section aria-labelledby="co-method">
            <h2 id="co-method" className="font-serif text-2xl text-evergreen">Shipping method</h2>
            <fieldset className="mt-4 space-y-2">
              <legend className="sr-only">Shipping method</legend>
              {methods.map((m) => (
                <label key={m.id} className={`flex cursor-pointer items-center justify-between rounded-xl border bg-white px-4 py-3 text-sm ${ship.methodId === m.id ? "border-forest ring-2 ring-forest/15" : "border-forest/15"}`}>
                  <span className="flex items-center gap-3">
                    <input type="radio" name="method" value={m.id} checked={ship.methodId === m.id} onChange={() => updateShip({ methodId: m.id })} className="accent-forest" />
                    <span><span className="font-semibold text-evergreen">{m.name}</span><span className="block text-xs text-charcoal/55">{m.description}{m.freeOver ? ` · free over ${formatPrice(m.freeOver)} (sample rule)` : ""}</span></span>
                  </span>
                  <span className="text-xs text-charcoal/55">from {formatPrice(m.base)}</span>
                </label>
              ))}
              {errors.methodId && <p className="text-xs text-terracotta" role="alert">{errors.methodId}</p>}
            </fieldset>
          </section>

          <section className="rounded-xl border border-dashed border-forest/25 bg-white p-5 text-sm text-charcoal/65">
            <p className="flex items-center gap-2 font-semibold text-evergreen"><Lock className="h-4 w-4" /> Payment</p>
            <p className="mt-1">Payment is handled by the live WooCommerce checkout and its configured gateway. No card fields are shown in this prototype.</p>
          </section>

          <Button type="submit" className="h-12 w-full sm:w-auto">Complete demo checkout</Button>
        </div>

        <aside className="h-fit rounded-2xl border border-forest/10 bg-cream/60 p-6 lg:sticky lg:top-28">
          <h2 className="font-serif text-2xl text-evergreen">Order summary</h2>
          <ul className="mt-5 divide-y divide-forest/10">
            {lines.map((l) => (
              <li key={l.key} className="flex items-center gap-3 py-3 text-sm">
                <img src={l.product.images[0]} alt="" className="h-14 w-14 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-evergreen">{l.product.name}</p>
                  <p className="text-xs text-charcoal/55">{l.variation ? `${l.variation} · ` : ""}Qty {l.quantity}</p>
                </div>
                <span className="font-semibold">{formatPrice(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-forest/10 pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-charcoal/70">Subtotal</dt><dd className="font-semibold">{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-charcoal/70">Shipping (sample)</dt><dd className="font-semibold">{shippingEstimate ? (shippingEstimate.amount === 0 ? "Free" : formatPrice(shippingEstimate.amount)) : <span className="font-normal text-charcoal/50">Complete address</span>}</dd></div>
            <div className="flex justify-between border-t border-forest/10 pt-3 text-lg"><dt className="font-semibold text-evergreen">Estimated total</dt><dd className="font-semibold text-evergreen">{formatPrice(total)}</dd></div>
          </dl>
        </aside>
      </form>
    </div>
  );
}
