"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cx } from "@/lib/format";

type Variant = "primary" | "secondary" | "ghost" | "light";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-ivory hover:bg-evergreen hover:shadow-lg hover:shadow-forest/20 active:scale-[0.98]",
  secondary:
    "border border-forest/50 text-forest hover:border-forest hover:bg-forest hover:text-ivory active:scale-[0.98]",
  ghost: "text-forest hover:text-terracotta px-2",
  light: "bg-ivory text-forest hover:bg-white active:scale-[0.98]",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={cx(base, variants[variant], className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className,
  href,
  children,
  ...rest
}: {
  variant?: Variant;
  className?: string;
  href: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  return (
    <Link href={href} className={cx(base, variants[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cx("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cx(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      {eyebrow && <p className={cx("eyebrow mb-4", light ? "text-sage" : "text-terracotta")}>{eyebrow}</p>}
      <h2 className={cx("text-3xl leading-[1.1] sm:text-4xl lg:text-5xl", light ? "text-ivory" : "text-evergreen")}>
        {title}
      </h2>
      {text && <p className={cx("mt-5 text-base leading-relaxed sm:text-lg", light ? "text-ivory/75" : "text-charcoal/70")}>{text}</p>}
    </div>
  );
}

export function Accordion({ items }: { items: { title: string; content: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-forest/10 border-y border-forest/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between py-4 text-left font-sans text-sm font-semibold tracking-wide text-evergreen"
              >
                {item.title}
                <ChevronDown className={cx("h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")} aria-hidden />
              </button>
            </h3>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="pb-5 text-sm leading-relaxed text-charcoal/75">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function DemoNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("rounded-md border border-terracotta/30 bg-terracotta/5 px-3 py-2 text-xs leading-relaxed text-charcoal/80", className)}>
      <span className="font-semibold text-terracotta">Prototype note: </span>
      {children}
    </p>
  );
}

export function Field({
  label,
  id,
  error,
  hint,
  children,
  optional,
}: {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-evergreen">
        {label}
        {optional && <span className="ml-1 font-normal normal-case tracking-normal text-charcoal/50">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-charcoal/55">{hint}</p>}
      {error && (
        <p className="mt-1 text-xs text-terracotta" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass =
  "w-full rounded-md border border-forest/20 bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 aria-[invalid=true]:border-terracotta";
