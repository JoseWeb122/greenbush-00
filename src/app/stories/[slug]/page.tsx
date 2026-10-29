import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ExternalLink } from "lucide-react";
import { stories } from "@/data/site";
import { formatDate } from "@/lib/format";
import { StoryCard } from "@/components/StoryCard";
import { ButtonLink } from "@/components/ui";
import { ShareButtons } from "@/components/ShareButtons";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = stories.find((x) => x.slug === slug);
  return s ? { title: s.title, description: s.excerpt } : { title: "Not found" };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = stories.find((x) => x.slug === slug);
  if (!story) notFound();
  const related = stories.filter((s) => s.slug !== slug).slice(0, 2);

  return (
    <article>
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-charcoal/55">
          <Link href="/" className="hover:text-forest">Home</Link><ChevronRight className="h-3 w-3" />
          <Link href="/stories" className="hover:text-forest">Stories &amp; Events</Link><ChevronRight className="h-3 w-3" />
          <span className="truncate text-evergreen">{story.title}</span>
        </nav>
        <div className="mt-8 flex flex-wrap items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em]">
          <span className="rounded-full bg-forest/10 px-2.5 py-1 text-forest">{story.kind}</span>
          {story.date && <span className="text-charcoal/50">{formatDate(story.date)}</span>}
          {story.status === "past" && <span className="rounded-full bg-charcoal/10 px-2.5 py-1 text-charcoal/60">Archived</span>}
        </div>
        <h1 className="mt-4 text-4xl leading-[1.05] text-evergreen sm:text-5xl">{story.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-charcoal/70">{story.excerpt}</p>
      </div>
      <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
        <img src={story.image} alt="" className="aspect-[16/9] w-full rounded-3xl object-cover" />
      </div>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="prose-gb text-base leading-relaxed text-charcoal/75">{story.body.map((p, i) => <p key={i}>{p}</p>)}</div>
        {story.externalUrl && (
          <a href={story.externalUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-forest hover:text-terracotta">
            Read the original feature <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-forest/10 py-6">
          <ShareButtons title={story.title} />
          {story.slug === "share-your-story" ? <ButtonLink href="/contact">Share your story</ButtonLink> : <ButtonLink href="/shop" variant="secondary">Explore the shop</ButtonLink>}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <h2 className="text-2xl text-evergreen">Keep reading</h2>
        <div className="mt-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s) => <StoryCard key={s.slug} story={s} />)}
          <div className="flex flex-col justify-center rounded-2xl bg-cream p-6">
            <p className="font-serif text-2xl text-evergreen">Our story</p>
            <p className="mt-2 text-sm text-charcoal/65">Meet Sidney Greenbush and the purpose behind Greenbush Twins &amp; Company.</p>
            <Link href="/our-story" className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-forest">Read it →</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
