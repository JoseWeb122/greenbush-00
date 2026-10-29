"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { cx } from "@/lib/format";

export function NewsletterForm({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), firstName: firstName.trim() || undefined }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !data.ok) throw new Error(data.message || "Something went wrong.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const input = cx(
    "h-12 w-full rounded-full border px-5 text-sm focus:outline-none focus:ring-2",
    light ? "border-ivory/20 bg-white/10 text-ivory placeholder:text-ivory/50 focus:ring-sage/50" : "border-forest/20 bg-white text-charcoal placeholder:text-charcoal/40 focus:ring-forest/20",
  );

  if (status === "success") {
    return (
      <div role="status" className={cx("rounded-2xl border p-6", light ? "border-ivory/20 bg-white/5 text-ivory" : "border-forest/15 bg-white text-evergreen")}>
        <p className="flex items-center gap-2 font-serif text-xl"><Check className="h-5 w-5 text-sage" /> Thank you{firstName ? `, ${firstName}` : ""}.</p>
        <p className={cx("mt-2 text-sm", light ? "text-ivory/70" : "text-charcoal/65")}>
          Your address has been saved to the prototype's private list. No email has been sent – connecting a mailing provider is part of the WordPress implementation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-3">
      <div className={cx("grid gap-3", compact ? "" : "sm:grid-cols-[1fr_1.4fr_auto]")}>
        {!compact && (
          <div>
            <label htmlFor="nl-first" className="sr-only">First name (optional)</label>
            <input id="nl-first" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name (optional)" className={input} autoComplete="given-name" />
          </div>
        )}
        <div>
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <input
            id="nl-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            aria-invalid={!!error}
            aria-describedby={error ? "nl-error" : undefined}
            className={input}
            autoComplete="email"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className={cx("inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[0.78rem] font-semibold uppercase tracking-[0.14em] transition-colors disabled:opacity-60", light ? "bg-ivory text-forest hover:bg-white" : "bg-forest text-ivory hover:bg-evergreen")}
        >
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Subscribe
        </button>
      </div>
      {error && <p id="nl-error" role="alert" className={cx("text-xs", light ? "text-terracotta brightness-150" : "text-terracotta")}>{error}</p>}
      <p className={cx("text-xs", light ? "text-ivory/55" : "text-charcoal/50")}>
        We respect your inbox. Read our <Link href="/policies/privacy" className="underline underline-offset-2">privacy policy</Link>.
      </p>
    </form>
  );
}
