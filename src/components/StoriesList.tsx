"use client";

import { useState } from "react";
import { stories, type StoryKind } from "@/data/site";
import { StoryCard } from "./StoryCard";
import { cx } from "@/lib/format";

const kinds: ("All" | StoryKind)[] = ["All", "Story", "Press", "Community", "Event"];

export function StoriesList() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const list = kind === "All" ? stories : stories.filter((s) => s.kind === kind);
  const [lead, ...rest] = list;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter stories">
        {kinds.map((k) => (
          <button key={k} type="button" role="tab" aria-selected={kind === k} onClick={() => setKind(k)} className={cx("rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors", kind === k ? "border-forest bg-forest text-ivory" : "border-forest/20 bg-white text-evergreen hover:border-forest")}>
            {k}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-charcoal/60" aria-live="polite">{list.length} {list.length === 1 ? "item" : "items"}</p>

      {list.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-forest/20 bg-white px-6 py-14 text-center">
          <p className="font-serif text-2xl text-evergreen">No {kind.toLowerCase()} items yet</p>
          <p className="mt-2 text-sm text-charcoal/60">{kind === "Event" ? "No upcoming events are currently confirmed. New dates will be listed here once scheduled." : "Check back soon."}</p>
        </div>
      ) : (
        <div className="mt-10 space-y-16">
          <StoryCard story={lead} featured />
          {rest.length > 0 && (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((s) => <StoryCard key={s.slug} story={s} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
