import { cx } from "@/lib/format";

export function PageHero({ eyebrow, title, text, image, compact = false }: { eyebrow: string; title: string; text?: string; image?: string; compact?: boolean }) {
  if (!image) {
    return (
      <div className={cx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", compact ? "py-12 lg:py-16" : "py-16 lg:py-24")}>
        <div className="max-w-2xl animate-fade-up">
          <p className="eyebrow text-terracotta">{eyebrow}</p>
          <h1 className="mt-3 text-4xl leading-[1.05] text-evergreen sm:text-5xl lg:text-6xl">{title}</h1>
          {text && <p className="mt-5 text-lg leading-relaxed text-charcoal/70">{text}</p>}
        </div>
      </div>
    );
  }
  return (
    <section className="relative overflow-hidden bg-evergreen text-ivory">
      <img src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full animate-slow-zoom object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-evergreen via-evergreen/40 to-evergreen/20" />
      <div className="relative mx-auto flex min-h-[52vh] max-w-7xl items-end px-4 pb-14 pt-28 sm:px-6 lg:px-8 lg:pb-20">
        <div className="max-w-2xl animate-fade-up">
          <p className="eyebrow text-sage">{eyebrow}</p>
          <h1 className="mt-3 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h1>
          {text && <p className="mt-5 text-lg leading-relaxed text-ivory/80">{text}</p>}
        </div>
      </div>
    </section>
  );
}
