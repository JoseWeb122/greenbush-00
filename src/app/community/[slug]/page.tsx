import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { communityPages } from "@/data/site";
import { ButtonLink, DemoNote } from "@/components/ui";
import { ShareButtons } from "@/components/ShareButtons";

export function generateStaticParams() {
  return communityPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = communityPages.find((p) => p.slug === slug);
  return page ? { title: page.title, description: page.excerpt } : { title: "Not found" };
}

export default async function CommunityDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = communityPages.find((p) => p.slug === slug);
  if (!page) notFound();
  const others = communityPages.filter((p) => p.slug !== slug);
  return (
    <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-charcoal/55">
        <Link href="/" className="hover:text-forest">Home</Link><ChevronRight className="h-3 w-3" />
        <Link href="/community" className="hover:text-forest">Community</Link><ChevronRight className="h-3 w-3" />
        <span className="text-evergreen">{page.title}</span>
      </nav>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <img src={page.image} alt="" className="aspect-[4/5] w-full rounded-3xl object-cover" />
        <div>
          <p className="eyebrow text-terracotta">Community</p>
          <h1 className="mt-3 text-4xl leading-[1.05] text-evergreen sm:text-5xl">{page.title}</h1>
          <div className="prose-gb mt-6 text-base leading-relaxed text-charcoal/75">
            {page.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          {page.body.length < 2 && (
            <DemoNote className="mt-6">Full copy for this section lives on the current site and will be migrated as-is. <a href={page.sourceUrl} target="_blank" rel="noreferrer" className="underline">View the original page</a>.</DemoNote>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Get in touch</ButtonLink>
            <ButtonLink href="/shop" variant="secondary">Explore the shop</ButtonLink>
          </div>
          <div className="mt-8"><ShareButtons title={page.title} /></div>
        </div>
      </div>
      <section className="mt-20 border-t border-forest/10 pt-10">
        <h2 className="text-2xl text-evergreen">More from the community</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {others.map((o) => (
            <li key={o.slug}><Link href={`/community/${o.slug}`} className="rounded-full border border-forest/20 bg-white px-4 py-2 text-sm text-evergreen hover:border-forest">{o.title}</Link></li>
          ))}
          <li><Link href="/our-story" className="rounded-full border border-forest/20 bg-white px-4 py-2 text-sm text-evergreen hover:border-forest">Our Story</Link></li>
        </ul>
      </section>
    </article>
  );
}
