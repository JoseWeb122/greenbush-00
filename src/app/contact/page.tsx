import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Users, Globe } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { brand } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Greenbush Twins & Company – questions, collaborations, or to share your story.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="We'd Love to Hear From You." text="Questions about an order, a collaboration idea, or a story to share – send us a note." compact />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-24 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
        <aside className="space-y-8">
          <div className="flex gap-4">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-forest/10 text-forest"><Mail className="h-5 w-5" /></span>
            <div>
              <h2 className="text-xl text-evergreen">Contact details</h2>
              <p className="mt-1 text-sm leading-relaxed text-charcoal/65">
                The current site doesn't publish an email address, phone number, or mailing address, so none are listed here. Use the form, or the{" "}
                <a href={brand.contactPage} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-forest">existing contact page ↗</a>.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-forest/10 text-forest"><Users className="h-5 w-5" /></span>
            <div>
              <h2 className="text-xl text-evergreen">Collaborate with us</h2>
              <p className="mt-1 text-sm leading-relaxed text-charcoal/65">Artists, makers, and dreamers who believe in mindful creation are welcome. Tell us about your work in the form.</p>
              <Link href="/community/join-our-community" className="mt-2 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-forest hover:text-terracotta">Join our community →</Link>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-forest/10 text-forest"><Globe className="h-5 w-5" /></span>
            <div>
              <h2 className="text-xl text-evergreen">Social</h2>
              <p className="mt-1 text-sm leading-relaxed text-charcoal/65">Social profile links will be added once confirmed by the owner – none have been invented for this prototype.</p>
            </div>
          </div>
        </aside>
        <ContactForm />
      </div>
    </>
  );
}
