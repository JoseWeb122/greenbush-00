import Link from "next/link";
import { brand } from "@/data/site";
import { categories } from "@/data/products";
import { Logo } from "./Header";
import { NewsletterForm } from "./NewsletterForm";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/shop" },
      ...categories.map((c) => ({ label: c.name, href: `/shop?category=${c.slug}` })),
      { label: "Seven Sisters, Book 1", href: "/product/seven-sisters-the-lantern-of-humanity" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Our Story", href: "/our-story" },
      { label: "Community", href: "/community" },
      { label: "Artists & Creators", href: "/artists" },
      { label: "Stories & Events", href: "/stories" },
      { label: "Share Your Story", href: "/stories/share-your-story" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Shipping Policy", href: "/policies/shipping" },
      { label: "Returns & Refunds", href: "/policies/returns" },
      { label: "Privacy Policy", href: "/policies/privacy" },
      { label: "Terms & Conditions", href: "/policies/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-forest/10 bg-cream/70">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-charcoal/70">{brand.description}</p>
            <div className="mt-6">
              <p className="eyebrow mb-3 text-terracotta">Newsletter</p>
              <NewsletterForm compact />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow mb-4 text-evergreen">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className="text-sm text-charcoal/70 transition-colors hover:text-forest">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-forest/10 pt-6 text-xs text-charcoal/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brand.legalName}. All rights reserved.</p>
          <p className="max-w-xl">
            Redesign prototype. Social links, a mailing address, and phone number were not published on the current site, so none are shown here – they will be added once confirmed by the owner.{" "}
            <a href={brand.liveSite} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-forest">Current site ↗</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
