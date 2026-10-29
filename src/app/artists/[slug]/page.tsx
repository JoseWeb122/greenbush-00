import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { artisans } from "@/data/site";
import { getProduct } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";
import { ButtonLink, DemoNote } from "@/components/ui";
import { ShareButtons } from "@/components/ShareButtons";

export function generateStaticParams() {
  return artisans.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = artisans.find((x) => x.slug === slug);
  return a ? { title: a.name, description: a.excerpt } : { title: "Not found" };
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artisan = artisans.find((x) => x.slug === slug);
  if (!artisan) notFound();
  const items = artisan.productSlugs.map(getProduct).filter((p): p is NonNullable<typeof p> => !!p);
  const others = artisans.filter((a) => a.slug !== slug).slice(0, 4);

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-charcoal/55">
        <Link href="/" className="hover:text-forest">Home</Link><ChevronRight className="h-3 w-3" />
        <Link href="/artists" className="hover:text-forest">Artists &amp; Creators</Link><ChevronRight className="h-3 w-3" />
        <span className="text-evergreen">{artisan.name}</span>
      </nav>
      <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <img src={artisan.image} alt={artisan.name} className="aspect-[4/5] w-full rounded-3xl rounded-bl-[5rem] object-cover" />
        <div>
          <p className="eyebrow text-terracotta">{artisan.role}</p>
          <h1 className="mt-3 text-4xl leading-[1.05] text-evergreen sm:text-5xl">{artisan.name}</h1>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/75">{artisan.excerpt}</p>
          <div className="prose-gb mt-4 text-base leading-relaxed text-charcoal/70">{artisan.body.map((p, i) => <p key={i}>{p}</p>)}</div>
          <DemoNote className="mt-6">
            Biography and portrait to be migrated from the <a href={artisan.sourceUrl} target="_blank" rel="noreferrer" className="underline">original profile page</a>. No background details have been invented.
          </DemoNote>
          <div className="mt-8"><ShareButtons title={artisan.name} /></div>
        </div>
      </div>

      {items.length > 0 && (
        <section className="mt-20">
          <h2 className="text-3xl text-evergreen">Work by {artisan.name}</h2>
          <div className="mt-8"><ProductGrid products={items} /></div>
        </section>
      )}

      <section className="mt-20 border-t border-forest/10 pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl text-evergreen">More artists &amp; creators</h2>
          <ButtonLink href="/shop" variant="secondary">Explore the shop</ButtonLink>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/artists/${o.slug}`} className="group flex items-center gap-3 rounded-xl border border-forest/10 bg-white p-3 hover:border-forest/40">
                <img src={o.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
                <span>
                  <span className="block text-sm font-semibold text-evergreen group-hover:text-forest">{o.name}</span>
                  <span className="block text-xs text-charcoal/55">{o.role}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
