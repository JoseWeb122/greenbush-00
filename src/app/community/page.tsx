import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Reveal, SectionHeading } from "@/components/ui";
import { communityPages, artisans } from "@/data/site";

export const metadata: Metadata = {
  title: "Community",
  description: "Join a community for mindful, eco-friendly living – artists, makers, and dreamers who believe in meaningful connection.",
};

export default function CommunityPage() {
  return (
    <>
      <PageHero eyebrow="Community" title="More Than Curators – Collaborators in Creativity." text="At Greenbush Twins & Co., we welcome artists, makers, and dreamers who believe in mindful creation and meaningful connection." image="/images/hero.jpg" />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal><SectionHeading eyebrow="Spaces in our community" title="Where to Begin" /></Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {communityPages.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <Link href={`/community/${p.slug}`} className="group grid overflow-hidden rounded-2xl border border-forest/10 bg-white sm:grid-cols-[180px_1fr]">
                <img src={p.image} alt="" loading="lazy" className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-full" />
                <div className="p-6">
                  <span className="eyebrow text-terracotta">Community</span>
                  <h3 className="mt-2 text-2xl text-evergreen group-hover:text-forest">{p.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-charcoal/65">{p.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-forest">Read more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-cream/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Creative voices" title="Artists & Creators" />
            <ButtonLink href="/artists" variant="secondary">All profiles</ButtonLink>
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            {artisans.map((a) => (
              <Link key={a.slug} href={`/artists/${a.slug}`} className="rounded-full border border-forest/20 bg-white px-4 py-2 text-sm text-evergreen transition-colors hover:border-forest hover:bg-forest hover:text-ivory">{a.name}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="rounded-3xl bg-evergreen px-6 py-14 text-center text-ivory sm:px-12">
          <p className="eyebrow text-sage">Share your story</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl sm:text-4xl">Your story has the power to inspire someone else.</h2>
          <p className="mx-auto mt-4 max-w-xl text-ivory/75">Whether you've faced challenges, discovered new opportunities, or learned an important lesson – we'd love to hear from you.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/stories/share-your-story" variant="light">Learn more</ButtonLink>
            <ButtonLink href="/contact" className="border border-ivory/60 bg-transparent text-ivory hover:bg-ivory hover:text-forest">Get in touch</ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
