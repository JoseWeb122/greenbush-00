import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { StoriesList } from "@/components/StoriesList";
import { DemoNote } from "@/components/ui";

export const metadata: Metadata = {
  title: "Stories & Events",
  description: "Stories, press features, community updates, and events from Greenbush Twins & Company.",
};

export default function StoriesPage() {
  return (
    <>
      <PageHero eyebrow="Stories & events" title="From the Journal." text="Real stories connect people. Here you'll find updates, press features, and community moments." compact />
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <StoriesList />
        <DemoNote className="mt-14 max-w-3xl">
          Dated items are marked “Archived” once their date has passed, so nothing expired is ever shown as upcoming. Blog posts from the current site's /blog/ will be imported into this list during the WordPress implementation.
        </DemoNote>
      </div>
    </>
  );
}
