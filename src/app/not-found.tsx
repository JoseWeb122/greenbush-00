import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="eyebrow text-terracotta">404</p>
      <h1 className="mt-3 text-4xl text-evergreen sm:text-5xl">We couldn't find that page.</h1>
      <p className="mt-4 text-charcoal/65">It may have moved during the redesign. Try the shop or head back home.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/shop">Explore the shop</ButtonLink>
        <ButtonLink href="/" variant="secondary">Home</ButtonLink>
      </div>
    </div>
  );
}
