import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Story } from "@/data/site";
import { formatDate, cx } from "@/lib/format";

export function StoryCard({ story, featured = false, href }: { story: Story; featured?: boolean; href?: string }) {
  const link = href ?? `/stories/${story.slug}`;
  return (
    <article className={cx("group flex flex-col", featured && "lg:flex-row lg:gap-10")}>
      <Link href={link} className={cx("block overflow-hidden rounded-xl bg-cream", featured ? "aspect-[4/3] lg:w-3/5 lg:flex-none" : "aspect-[4/3]")}>
        <img src={story.image} alt={story.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </Link>
      <div className={cx("pt-5", featured && "lg:flex lg:flex-col lg:justify-center lg:pt-0")}>
        <div className="flex flex-wrap items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em]">
          <span className="rounded-full bg-forest/10 px-2.5 py-1 text-forest">{story.kind}</span>
          {story.date && <span className="text-charcoal/50">{formatDate(story.date)}</span>}
          {story.status === "past" && <span className="rounded-full bg-charcoal/10 px-2.5 py-1 text-charcoal/60">Archived</span>}
        </div>
        <h3 className={cx("mt-3 leading-tight text-evergreen", featured ? "text-3xl lg:text-4xl" : "text-xl")}>
          <Link href={link} className="hover:text-forest">{story.title}</Link>
        </h3>
        <p className={cx("mt-3 text-sm leading-relaxed text-charcoal/65", !featured && "line-clamp-3")}>{story.excerpt}</p>
        <Link href={link} className="mt-4 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-forest hover:text-terracotta">
          Read more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
