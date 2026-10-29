"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button, DemoNote, Field, inputClass } from "./ui";

type Form = { name: string; email: string; subject: string; message: string };
const empty: Form = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Form>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): Partial<Form> => {
    const e: Partial<Form> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Please enter a valid email address.";
    if (form.subject.trim().length < 3) e.subject = "Please add a subject.";
    if (form.message.trim().length < 10) e.message = "Please write at least a short message (10+ characters).";
    return e;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setServerError(null);
    if (Object.keys(errs).length) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = (await res.json()) as { ok: boolean; errors?: Partial<Form>; message?: string };
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.message || "Please check the highlighted fields.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-forest/15 bg-white p-8">
        <CheckCircle2 className="h-8 w-8 text-forest" />
        <h2 className="mt-4 text-2xl text-evergreen">Thank you, {form.name.split(" ")[0]}.</h2>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/70">Your message has been saved in the prototype's database. No email notification is sent yet – connecting the owner's inbox (or the existing WordPress contact plugin) is part of the implementation.</p>
        <button type="button" onClick={() => { setForm(empty); setStatus("idle"); }} className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-forest hover:text-terracotta">Send another message</button>
      </div>
    );
  }

  const bind = (k: keyof Form) => ({
    id: `c-${k}`,
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value }),
    "aria-invalid": !!errors[k],
    className: inputClass,
  });

  return (
    <form onSubmit={submit} noValidate className="space-y-5 rounded-2xl border border-forest/10 bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" id="c-name" error={errors.name}><input {...bind("name")} autoComplete="name" /></Field>
        <Field label="Email" id="c-email" error={errors.email}><input {...bind("email")} type="email" autoComplete="email" /></Field>
      </div>
      <Field label="Subject" id="c-subject" error={errors.subject}><input {...bind("subject")} placeholder="Orders, collaborations, sharing your story…" /></Field>
      <Field label="Message" id="c-message" error={errors.message}><textarea {...bind("message")} rows={6} className={inputClass + " resize-y"} /></Field>
      {serverError && <p className="text-sm text-terracotta" role="alert">{serverError}</p>}
      <Button type="submit" disabled={status === "loading"} className="h-12 w-full sm:w-auto">
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />} Send message
      </Button>
      <DemoNote>Submissions are stored in the prototype database for review; no email is delivered until an integration is connected.</DemoNote>
    </form>
  );
}
