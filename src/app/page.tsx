import Link from "next/link";
import { ArrowRight, Leaf, HeartHandshake, BookOpen } from "lucide-react";
import { categories, getProduct, products, sortProducts } from "@/data/products";
import { artisans, stories } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { ButtonLink, Reveal, SectionHeading } from "@/components/ui";
import { ProductGrid } from "@/components/ProductGrid";
import { StoryCard } from "@/components/StoryCard";
import { NewsletterForm } from "@/components/NewsletterForm";

export default function HomePage() {
  const featured = sortProducts(products, "featured").filter((p) => p.priceVerified).slice(0, 8);
  const book = getProduct("seven-sisters-the-lantern-of-humanity")!;
  const [lead, ...rest] = stories;

  return (
    <>
      {/* A: Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="animate-fade-up">
            <p className="eyebrow text-terracotta">Greenbush Twins &amp; Company</p>
            <h1 className="mt-5 text-[2.6rem] leading-[1.02] text-evergreen sm:text-6xl lg:text-[4.4rem]">
              Discover a More Thoughtful Way to Live, Create &amp; Connect.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-charcoal/70 sm:text-lg">
              Explore thoughtfully curated products, inspiring stories, creative voices, and a community built around meaningful connections.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/shop">Explore the Collection</ButtonLink>
              <ButtonLink href="/our-story" variant="secondary">Discover Our Story</ButtonLink>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs font-medium uppercase tracking-[0.14em] text-charcoal/55">
              <li className="flex items-center gap-2"><Leaf className="h-4 w-4 text-sage" /> Small-batch makers</li>
              <li className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-sage" /> Seven Sisters, Book 1</li>
              <li className="flex items-center gap-2"><HeartHandshake className="h-4 w-4 text-sage" /> Community first</li>
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -left-6 -top-6 hidden h-40 w-40 rounded-full bg-sage/30 blur-2xl lg:block" aria-hidden />
            <div className="absolute -bottom-8 -right-4 hidden h-56 w-56 rounded-full bg-terracotta/15 blur-3xl lg:block" aria-hidden />
            <div className="relative overflow-hidden rounded-[2rem] rounded-tl-[6rem] shadow-2xl shadow-evergreen/15">
              <img
                src="/images/hero.jpg"
                alt="A sunlit farmhouse table with a hand-poured candle, hardcover books, and wildflowers overlooking a green meadow"
                width={1536}
                height={1024}
                fetchPriority="high"
                className="aspect-[4/5] w-full animate-slow-zoom object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
              />
            </div>
            <div className="absolute bottom-6 left-6 hidden max-w-[220px] rounded-xl bg-ivory/95 p-4 shadow-lg backdrop-blur sm:block">
              <p className="eyebrow text-terracotta">Now available</p>
              <p className="mt-1 font-serif text-lg leading-tight text-evergreen">Seven Sisters: The Lantern of Humanity</p>
              <Link href={`/product/${book.slug}`} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-forest">
                {formatPrice(book.price)} · Shop <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* B: Brand intro */}
      <section className="bg-cream/60">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Meet Sidney Greenbush"
              title="A Little More Meaning in the Everyday."
              text="Greenbush Twins brings together thoughtful discoveries, creative expression, inspiring stories, and products that invite you to explore what matters. Join and support a community for mindful, eco-friendly living."
            />
            <div className="mt-8 flex flex-wrap gap-6">
              <Link href="/our-story" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-forest hover:text-terracotta">Our story <ArrowRight className="h-3.5 w-3.5" /></Link>
              <Link href="/community/join-our-community" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-forest hover:text-terracotta">Join the community <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
          </Reveal>
          <Reveal delay={120} className="relative">
            <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
              <img src="/images/prairie.jpg" alt="Tallgrass prairie at golden hour" loading="lazy" className="aspect-[4/5] w-full rounded-2xl rounded-br-[4rem] object-cover" />
              <div className="flex flex-col gap-4">
                <img src="/images/products/half-moon-candle.jpg" alt="Hand-poured ceramic candle" loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
                <div className="flex flex-1 flex-col justify-center rounded-2xl bg-forest p-5 text-ivory">
                  <p className="font-serif text-2xl leading-tight">Mindful. Eco-friendly. Together.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* C: Shop the collection */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Shop the collection" title="Thoughtfully Chosen for Families Who Value Care, Comfort, and Conscious Living." />
          <ButtonLink href="/shop" variant="secondary" className="flex-none">View all products</ButtonLink>
        </Reveal>
        <Reveal className="mt-12" delay={100}>
          <ProductGrid products={featured} />
        </Reveal>
      </section>

      {/* D: Shop by category */}
      <section className="bg-evergreen text-ivory">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal>
            <SectionHeading light eyebrow="Shop by category" title="Find Your Way In." text="Four collections, each with its own story – from Sidney's own creations to the makers she hand-picks." />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-6">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 80} className={i === 0 || i === 3 ? "md:col-span-4" : "md:col-span-2"}>
                <Link href={`/shop?category=${c.slug}`} className="group relative block h-72 overflow-hidden rounded-2xl md:h-80">
                  <img src={c.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-evergreen/90 via-evergreen/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-2xl text-ivory">{c.name}</h3>
                    <p className="mt-1 line-clamp-2 max-w-md text-sm text-ivory/75">{c.description}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-sage">Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* E: Featured spotlight */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <p className="eyebrow text-terracotta">Featured · Sidney's Creations</p>
            <h2 className="mt-4 text-4xl leading-[1.05] text-evergreen sm:text-5xl">Stories That Spark Imagination.</h2>
            <p className="mt-5 text-lg leading-relaxed text-charcoal/70">{book.shortDescription}</p>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/65">{book.description[0]}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              {book.details.slice(0, 4).map((d) => (
                <div key={d.label}>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-charcoal/50">{d.label}</dt>
                  <dd className="mt-0.5 text-evergreen">{d.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href={`/product/${book.slug}`}>Shop the book · {formatPrice(book.price)}</ButtonLink>
              <Link href={`/product/${book.slug}`} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-forest hover:text-terracotta">Discover the story <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
          </Reveal>
          <Reveal delay={100} className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute inset-0 -rotate-3 rounded-3xl bg-sage/30" aria-hidden />
              <img src={book.images[0]} alt="Seven Sisters: The Lantern of Humanity hardcover" loading="lazy" className="relative aspect-square w-full rounded-3xl object-cover shadow-xl" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* F: Story */}
      <section className="relative overflow-hidden bg-forest text-ivory">
        <img src="/images/prairie.jpg" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-20" loading="lazy" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-sage">The Greenbush Twins story</p>
            <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">Rooted in Connection. Inspired by Possibility.</h2>
            <p className="mt-6 text-lg leading-relaxed text-ivory/80">
              Sidney Greenbush – who shared the role of Carrie Ingalls on <em>Little House on the Prairie</em> with her twin sister Lindsay – founded Greenbush Twins &amp; Company as an eco-conscious online community and maker network. The morals and life lessons at the heart of the show inspired her to write <em>Seven Sisters: The Lantern of Humanity</em> while building a place where real stories connect people.
            </p>
            <div className="mt-8">
              <ButtonLink href="/our-story" variant="light">Read our story</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* G: Community voices */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Community & creative voices" title="Artists, Makers, and Dreamers." text="We're more than curators – we're collaborators in creativity. Meet some of the artisans whose work lives in the Greenbush Twins collection." />
          <ButtonLink href="/artists" variant="secondary" className="flex-none">All artists &amp; creators</ButtonLink>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artisans.slice(0, 3).map((a, i) => (
            <Reveal key={a.slug} delay={i * 80}>
              <Link href={`/artists/${a.slug}`} className="group block">
                <div className="overflow-hidden rounded-2xl bg-cream">
                  <img src={a.image} alt={a.name} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-terracotta">{a.role}</p>
                <h3 className="mt-1 text-2xl text-evergreen group-hover:text-forest">{a.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-charcoal/65">{a.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-forest">Read more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* H: Stories & events */}
      <section className="bg-cream/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Stories, events & updates" title="From the Journal." />
            <ButtonLink href="/stories" variant="secondary" className="flex-none">All stories</ButtonLink>
          </Reveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <Reveal><StoryCard story={lead} featured /></Reveal>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
              {rest.slice(0, 2).map((s, i) => (
                <Reveal key={s.slug} delay={i * 80}><StoryCard story={s} /></Reveal>
              ))}
            </div>
          </div>
          <Reveal className="mt-10 rounded-xl border border-forest/10 bg-white px-5 py-4 text-sm text-charcoal/65">
            <strong className="text-evergreen">Upcoming events:</strong> no upcoming events are currently confirmed. Past features are marked as archived above; new dates will appear here once scheduled.
          </Reveal>
        </div>
      </section>

      {/* I: Newsletter */}
      <section className="bg-evergreen text-ivory">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
          <Reveal>
            <SectionHeading light eyebrow="Newsletter" title="A Thoughtful Note, Now and Then." text="Discover new products, creative stories, and meaningful updates from Greenbush Twins." />
          </Reveal>
          <Reveal delay={100}><NewsletterForm light /></Reveal>
        </div>
      </section>

      {/* J: Final CTA */}
      <section className="relative overflow-hidden">
        <img src="/images/hero.jpg" alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-evergreen/60" />
        <div className="relative mx-auto max-w-7xl px-4 py-28 text-center sm:px-6 lg:px-8 lg:py-40">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-4xl leading-[1.05] text-ivory sm:text-5xl lg:text-6xl">Find Something Meaningful to Bring Into Your World.</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/shop" variant="light">Explore the Shop</ButtonLink>
              <ButtonLink href="/contact" className="border border-ivory/60 bg-transparent text-ivory hover:bg-ivory hover:text-forest">Get in Touch</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
