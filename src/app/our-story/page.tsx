import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Reveal, SectionHeading, DemoNote } from "@/components/ui";
import { getProduct } from "@/data/products";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Meet Sidney Greenbush and the story behind Greenbush Twins & Company – a community for mindful, eco-friendly living.",
};

const values = [
  { title: "Mindful creation", text: "We welcome artists, makers, and dreamers who believe in mindful creation and meaningful connection." },
  { title: "Eco-friendly living", text: "A community built around conscious, eco-friendly choices – from small-batch candles to plastic-free packaging." },
  { title: "Real stories", text: "We believe that real stories connect people. Your voice could encourage, inspire, or give someone the confidence to take their next step." },
  { title: "Honoring heritage", text: "Carrie's Prairie gives $2.00 from each purchase to preserving the history and legacy of the Ingalls and Wilder families." },
];

export default function OurStoryPage() {
  const book = getProduct("seven-sisters-the-lantern-of-humanity")!;
  return (
    <>
      <PageHero eyebrow="Our story" title="Rooted in Connection. Inspired by Possibility." text="Join and support a community for mindful, eco-friendly living." image="/images/prairie.jpg" />

      <section className="mx-auto grid max-w-7xl items-start gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8 lg:py-28">
        <Reveal>
          <img src="/images/hero.jpg" alt="Candle, books, and wildflowers on a farmhouse table" loading="lazy" className="aspect-[4/5] w-full rounded-3xl rounded-tr-[5rem] object-cover" />
        </Reveal>
        <Reveal delay={100} className="prose-gb lg:pt-6">
          <SectionHeading eyebrow="Meet Sidney Greenbush" title="From Walnut Grove to a Community of Makers." />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal/75">
            <p>
              Sidney Greenbush shared the role of Carrie Ingalls on <em>Little House on the Prairie</em> with her twin sister, Lindsay. Today she has found a new purpose beyond Hollywood: the morals and life lessons at the heart of the show inspired her to write her own children's book while building an online community.
            </p>
            <p>
              Greenbush Twins &amp; Company is that community – an eco-conscious space for mindful living and a maker network. It brings together small-batch goods from independent makers Sidney hand-picks, the Carrie's Prairie tribute collection, work from community artisans, and her first children's book, <em>Seven Sisters: The Lantern of Humanity</em>.
            </p>
            <p>
              We're more than curators – we're collaborators in creativity. Together, we're redefining what it means to create: slowly, thoughtfully, and beautifully.
            </p>
          </div>
          <DemoNote className="mt-6">
            This page uses only publicly verified facts (the live site and June 2026 press coverage). Additional founder history and milestones should come from Sidney before publication; nothing has been invented.
          </DemoNote>
        </Reveal>
      </section>

      <section className="bg-cream/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal><SectionHeading eyebrow="What we stand for" title="Mission & Values" align="center" /></Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="rounded-2xl border border-forest/10 bg-white p-6">
                <span className="font-serif text-3xl text-sage">0{i + 1}</span>
                <h3 className="mt-3 text-xl text-evergreen">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
        <Reveal>
          <img src={book.images[0]} alt="Seven Sisters: The Lantern of Humanity" loading="lazy" className="aspect-square w-full rounded-3xl object-cover" />
        </Reveal>
        <Reveal delay={100}>
          <SectionHeading eyebrow="The book" title="Seven Sisters: The Lantern of Humanity" text={book.description[2]} />
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href={`/product/${book.slug}`}>Shop the book</ButtonLink>
            <Link href="/artists" className="inline-flex items-center gap-2 self-center text-xs font-semibold uppercase tracking-[0.16em] text-forest hover:text-terracotta">Meet the creative community <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
        </Reveal>
      </section>

      <section className="bg-forest text-ivory">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl">Explore the collection</h2>
          <ButtonLink href="/shop" variant="light">Shop now</ButtonLink>
        </div>
      </section>
    </>
  );
}
