import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { getCategory, getProduct, products, relatedProducts } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { ProductGallery } from "@/components/ProductGallery";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductGrid } from "@/components/ProductGrid";
import { Accordion, DemoNote } from "@/components/ui";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return { title: product.name, description: product.shortDescription };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category)!;
  const related = relatedProducts(product, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    offers: product.priceVerified
      ? { "@type": "Offer", priceCurrency: "USD", price: product.price.toFixed(2), availability: "https://schema.org/InStock", url: product.sourceUrl }
      : undefined,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-charcoal/55">
        <Link href="/" className="hover:text-forest">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="hover:text-forest">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/shop?category=${category.slug}`} className="hover:text-forest">{category.name}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-evergreen" aria-current="page">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          {product.brand && <p className="eyebrow text-terracotta">{product.brand}</p>}
          <h1 className="mt-3 text-3xl leading-[1.08] text-evergreen sm:text-4xl lg:text-[2.75rem]">{product.name}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            {product.priceVerified ? (
              <p className="text-2xl font-semibold text-forest">{formatPrice(product.price)}</p>
            ) : (
              <p className="text-base font-semibold text-terracotta">Price to be confirmed</p>
            )}
            <span className="text-xs uppercase tracking-[0.14em] text-charcoal/50">USD</span>
          </div>
          <p className="mt-5 text-base leading-relaxed text-charcoal/75">{product.shortDescription}</p>

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>

          {product.note && <DemoNote className="mt-5">{product.note}</DemoNote>}

          <ul className="mt-8 grid gap-3 text-sm text-charcoal/70 sm:grid-cols-3">
            <li className="flex items-start gap-2"><Truck className="mt-0.5 h-4 w-4 flex-none text-forest" /> Shipping estimated in your bag</li>
            <li className="flex items-start gap-2"><RotateCcw className="mt-0.5 h-4 w-4 flex-none text-forest" /> <Link href="/policies/returns" className="underline-offset-2 hover:underline">Returns information</Link></li>
            <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-forest" /> Independent small-batch makers</li>
          </ul>

          <div className="mt-10">
            <Accordion
              items={[
                {
                  title: "Description",
                  content: <div className="prose-gb">{product.description.map((p, i) => <p key={i}>{p}</p>)}</div>,
                },
                ...(product.details.length
                  ? [{
                      title: "Details",
                      content: (
                        <dl className="space-y-2">
                          {product.details.map((d) => (
                            <div key={d.label} className="grid gap-1 sm:grid-cols-[160px_1fr]">
                              <dt className="font-semibold text-evergreen">{d.label}</dt>
                              <dd>{d.value}</dd>
                            </div>
                          ))}
                        </dl>
                      ),
                    }]
                  : []),
                {
                  title: "Shipping & delivery",
                  content: (
                    <p>
                      Use the estimator in your <Link href="/cart" className="underline">bag</Link> to preview a sample shipping cost by destination. Final rates and delivery windows come from the store's configured shipping zones – see the <Link href="/policies/shipping" className="underline">shipping policy</Link>.
                    </p>
                  ),
                },
                {
                  title: "Returns",
                  content: <p>The owner's returns and refunds policy will be shown here. Read the current <Link href="/policies/returns" className="underline">returns page</Link> or <Link href="/contact" className="underline">contact us</Link> with questions.</p>,
                },
              ]}
            />
          </div>
          <p className="mt-6 text-xs text-charcoal/45">
            WooCommerce source: <a href={product.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-forest">live listing ↗</a>
          </p>
        </div>
      </div>

      <section className="mt-24" aria-labelledby="related">
        <div className="flex items-end justify-between">
          <h2 id="related" className="text-3xl text-evergreen sm:text-4xl">You May Also Like</h2>
          <Link href={`/shop?category=${category.slug}`} className="text-xs font-semibold uppercase tracking-[0.16em] text-forest hover:text-terracotta">More in {category.name}</Link>
        </div>
        <div className="mt-8">
          <ProductGrid products={related} />
        </div>
      </section>
    </div>
  );
}
