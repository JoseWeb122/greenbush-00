import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { policies } from "@/data/site";
import { DemoNote } from "@/components/ui";

export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = policies[slug];
  return p ? { title: p.title, description: p.intro.slice(0, 150) } : { title: "Not found" };
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = policies[slug];
  if (!policy) notFound();
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <p className="eyebrow text-terracotta">Policies</p>
      <h1 className="mt-3 text-4xl text-evergreen sm:text-5xl">{policy.title}</h1>
      <p className="mt-5 text-lg leading-relaxed text-charcoal/70">{policy.intro}</p>
      <div className="mt-10 space-y-8">
        {policy.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-2xl text-evergreen">{s.heading}</h2>
            <p className="mt-2 leading-relaxed text-charcoal/70">{s.body}</p>
          </section>
        ))}
      </div>
      <DemoNote className="mt-10">Policy text is a placeholder structure for the redesign. The owner's actual WooCommerce policies will replace it verbatim.</DemoNote>
      <nav className="mt-10 flex flex-wrap gap-3 text-sm" aria-label="Other policies">
        {Object.entries(policies).filter(([k]) => k !== slug).map(([k, v]) => (
          <Link key={k} href={`/policies/${k}`} className="rounded-full border border-forest/20 bg-white px-4 py-2 text-evergreen hover:border-forest">{v.title}</Link>
        ))}
      </nav>
    </div>
  );
}
