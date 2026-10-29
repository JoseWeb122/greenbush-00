import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal, DemoNote } from "@/components/ui";
import { artisans } from "@/data/site";

export const metadata: Metadata = {
  title: "Artists & Creators",
  description: "Meet the artisans and creators whose work is featured by Greenbush Twins & Company.",
};

export default function ArtistsPage() {
  return (
    <>
      <PageHero eyebrow="Artists & creators" title="The People Behind the Work." text="Whether your art tells stories through texture, color, or form, this is your space to shine." />
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {artisans.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 4) * 70}>
              <Link href={`/artists/${a.slug}`} className="group block">
                <div className="overflow-hidden rounded-2xl bg-cream">
                  <img src={a.image} alt={a.name} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-terracotta">{a.role}</p>
                <h2 className="mt-1 text-2xl text-evergreen group-hover:text-forest">{a.name}</h2>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-charcoal/65">{a.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-forest">View profile <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
        <DemoNote className="mt-14 max-w-3xl">
          Artisan names and product links are taken from the current site's Artisans menu. Portrait photography and biographies were not available while building this prototype, so placeholder imagery is used and no biography text has been invented – each profile links to the original page for migration.
        </DemoNote>
        <div className="mt-12 rounded-3xl bg-cream p-8 sm:p-12">
          <p className="eyebrow text-terracotta">Collaborate with us</p>
          <h2 className="mt-3 max-w-xl text-3xl text-evergreen sm:text-4xl">Are you an artist, maker, or dreamer?</h2>
          <p className="mt-3 max-w-xl text-charcoal/70">Connect with fellow creators, share your work with a conscious audience, and be part of a collective that celebrates authenticity, craftsmanship, and purpose.</p>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-ivory hover:bg-evergreen">Get in touch</Link>
        </div>
      </section>
    </>
  );
}
