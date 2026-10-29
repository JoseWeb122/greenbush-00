"use client";

import { useEffect, useState } from "react";
import { Truck, Info } from "lucide-react";
import { destinations, methodsFor, unsupportedDestinations, validateShippingAddress, type ShippingAddress, type ShippingErrors } from "@/data/shipping";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { Button, DemoNote, Field, inputClass } from "./ui";

export function ShippingEstimator() {
  const { shippingAddress, setShippingAddress, shippingEstimate, itemCount, subtotal } = useCart();
  const [form, setForm] = useState<ShippingAddress>(shippingAddress);
  const [errors, setErrors] = useState<ShippingErrors>({});
  const [touched, setTouched] = useState(false);

  useEffect(() => setForm(shippingAddress), [shippingAddress]);

  const dest = destinations.find((d) => d.code === form.country);
  const methods = methodsFor(form.country);

  const update = (patch: Partial<ShippingAddress>) => {
    const next = { ...form, ...patch };
    if (patch.country !== undefined) {
      next.region = "";
      next.methodId = methodsFor(patch.country)[0]?.id ?? "";
    }
    setForm(next);
    // Recalculate live once the visitor has already calculated once.
    if (touched) {
      const errs = validateShippingAddress(next);
      setErrors(errs);
      if (!Object.keys(errs).length) setShippingAddress(next);
    }
  };

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validateShippingAddress(form);
    setErrors(errs);
    if (!Object.keys(errs).length) setShippingAddress(form);
  };

  return (
    <section aria-labelledby="ship-heading" className="rounded-2xl border border-forest/10 bg-white p-5 sm:p-6">
      <h2 id="ship-heading" className="flex items-center gap-2 font-serif text-xl text-evergreen">
        <Truck className="h-5 w-5 text-forest" /> Estimate shipping
      </h2>
      <form onSubmit={calculate} noValidate className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Country / region" id="ship-country" error={errors.country}>
          <select id="ship-country" value={form.country} onChange={(e) => update({ country: e.target.value })} className={inputClass} aria-invalid={!!errors.country}>
            {destinations.map((d) => <option key={d.code} value={d.code}>{d.name}</option>)}
            <optgroup label="Not yet supported">
              {unsupportedDestinations.map((d) => <option key={d.code} value={d.code}>{d.name}</option>)}
            </optgroup>
          </select>
        </Field>
        {dest && (
          <Field label={dest.regionLabel} id="ship-region" error={errors.region}>
            <select id="ship-region" value={form.region} onChange={(e) => update({ region: e.target.value })} className={inputClass} aria-invalid={!!errors.region}>
              <option value="">Select…</option>
              {dest.regions.map((r) => <option key={r.code} value={r.code}>{r.name}</option>)}
            </select>
          </Field>
        )}
        {dest && (
          <Field label={dest.postalLabel} id="ship-postal" error={errors.postalCode} hint={dest.postalHint}>
            <input id="ship-postal" value={form.postalCode} onChange={(e) => update({ postalCode: e.target.value })} className={inputClass} inputMode={dest.code === "US" ? "numeric" : "text"} autoComplete="postal-code" aria-invalid={!!errors.postalCode} />
          </Field>
        )}
        {dest && methods.length > 0 && (
          <Field label="Shipping method" id="ship-method" error={errors.methodId}>
            <select id="ship-method" value={form.methodId} onChange={(e) => update({ methodId: e.target.value as ShippingAddress["methodId"] })} className={inputClass} aria-invalid={!!errors.methodId}>
              {methods.map((m) => <option key={m.id} value={m.id}>{m.name} — {m.description}</option>)}
            </select>
          </Field>
        )}
        <div className="sm:col-span-2">
          <Button type="submit" className="w-full sm:w-auto" disabled={itemCount === 0}>Calculate shipping</Button>
          {itemCount === 0 && <p className="mt-2 text-xs text-charcoal/55">Add an item to your bag to estimate shipping.</p>}
        </div>
      </form>

      {!dest && form.country && (
        <p className="mt-4 flex items-start gap-2 rounded-md bg-cream px-3 py-2 text-sm text-charcoal/80" role="status">
          <Info className="mt-0.5 h-4 w-4 flex-none text-terracotta" />
          We can't estimate shipping to this destination yet. Please <a href="/contact" className="mx-1 underline">contact us</a> for a quote.
        </p>
      )}

      {touched && shippingEstimate && (
        <div className="mt-4 rounded-xl bg-forest/5 p-4 text-sm" role="status" aria-live="polite">
          <p className="font-semibold text-evergreen">
            {shippingEstimate.method.name}: {shippingEstimate.amount === 0 ? "Free" : formatPrice(shippingEstimate.amount)}
          </p>
          <p className="mt-1 text-charcoal/65">
            To {shippingEstimate.address.region}, {shippingEstimate.address.postalCode.toUpperCase()} · {itemCount} item{itemCount === 1 ? "" : "s"} · subtotal {formatPrice(subtotal)}
            {shippingEstimate.freeShippingApplied && ` · sample free-shipping threshold of ${formatPrice(shippingEstimate.method.freeOver!)} reached`}
          </p>
        </div>
      )}

      <DemoNote className="mt-4">
        Rates shown are illustrative sample rules for review only – not Greenbush Twins' real shipping prices. In production this estimator will read the WooCommerce shipping zones or carrier integration.
      </DemoNote>
    </section>
  );
}
