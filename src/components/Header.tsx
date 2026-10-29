"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, X, ChevronDown, ArrowRight } from "lucide-react";
import { mainNav } from "@/data/site";
import { categories } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { cx } from "@/lib/format";
import { SearchOverlay } from "./SearchOverlay";
import { MobileNavigation } from "./MobileNavigation";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cx("group flex items-center gap-2", className)} aria-label="Greenbush Twins home">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-ivory transition-colors group-hover:bg-evergreen">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M12 21V11" />
          <path d="M12 11c-4 0-7-3-7-7 4 0 7 3 7 7Z" />
          <path d="M12 15c0-4 3-7 7-7 0 4-3 7-7 7Z" />
        </svg>
      </span>
      <span className="font-serif text-xl leading-none tracking-tight text-evergreen sm:text-2xl">
        Greenbush <span className="text-forest/70">Twins</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const { itemCount, openDrawer, hydrated, bump } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setShopOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !searchOpen && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  return (
    <>
      <div className="bg-evergreen text-center text-[0.72rem] font-medium tracking-[0.12em] text-ivory/90">
        <p className="mx-auto max-w-7xl px-4 py-2">
          A COMMUNITY FOR MINDFUL, ECO-FRIENDLY LIVING · NOW AVAILABLE:{" "}
          <Link href="/product/seven-sisters-the-lantern-of-humanity" className="underline decoration-sage/60 underline-offset-4 hover:text-white">
            SEVEN SISTERS, BOOK 1
          </Link>
        </p>
      </div>

      <header
        className={cx(
          "sticky top-0 z-40 transition-all duration-500",
          scrolled ? "bg-ivory/90 shadow-[0_1px_0_0_rgba(40,72,58,0.08)] backdrop-blur-md" : "bg-ivory",
        )}
      >
        <div className={cx("mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 lg:px-8", scrolled ? "h-16" : "h-20")}>
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-evergreen hover:bg-forest/5"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {mainNav.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                if (item.label === "Shop") {
                  return (
                    <li
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setShopOpen(true)}
                      onMouseLeave={() => setShopOpen(false)}
                    >
                      <Link
                        href={item.href}
                        aria-expanded={shopOpen}
                        onFocus={() => setShopOpen(true)}
                        className={cx("flex items-center gap-1 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors hover:text-terracotta", active ? "text-terracotta" : "text-evergreen")}
                      >
                        {item.label}
                        <ChevronDown className={cx("h-3.5 w-3.5 transition-transform", shopOpen && "rotate-180")} aria-hidden />
                      </Link>
                      <div
                        className={cx(
                          "absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3 transition-all duration-300",
                          shopOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
                        )}
                        onBlur={(e) => {
                          if (!e.currentTarget.contains(e.relatedTarget as Node)) setShopOpen(false);
                        }}
                      >
                        <div className="rounded-2xl border border-forest/10 bg-white p-6 shadow-xl shadow-evergreen/10">
                          <div className="grid grid-cols-2 gap-4">
                            {categories.map((c) => (
                              <Link
                                key={c.slug}
                                href={`/shop?category=${c.slug}`}
                                className="group flex gap-4 rounded-xl p-2 transition-colors hover:bg-ivory"
                              >
                                <img src={c.image} alt="" className="h-16 w-16 flex-none rounded-lg object-cover" loading="lazy" />
                                <div>
                                  <p className="font-serif text-lg leading-tight text-evergreen group-hover:text-forest">{c.name}</p>
                                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-charcoal/60">{c.description}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-5 flex items-center justify-between border-t border-forest/10 pt-4">
                            <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-forest hover:text-terracotta">
                              View all products <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                            <Link href="/product/seven-sisters-the-lantern-of-humanity" className="text-xs text-charcoal/60 hover:text-forest">
                              Seven Sisters: The Lantern of Humanity →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cx("py-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors hover:text-terracotta", active ? "text-terracotta" : "text-evergreen")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="flex h-11 w-11 items-center justify-center rounded-full text-evergreen transition-colors hover:bg-forest/5"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={openDrawer}
              aria-label={`Open shopping bag, ${itemCount} items`}
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-evergreen transition-colors hover:bg-forest/5"
            >
              <ShoppingBag className="h-5 w-5" />
              {hydrated && itemCount > 0 && (
                <span
                  key={bump}
                  className="absolute right-1 top-1 flex h-5 min-w-5 animate-pop items-center justify-center rounded-full bg-terracotta px-1 text-[0.65rem] font-bold text-white"
                >
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} onSearch={() => { setMobileOpen(false); setSearchOpen(true); }} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export { X };
