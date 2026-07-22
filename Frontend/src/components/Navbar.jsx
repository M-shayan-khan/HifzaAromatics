import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";

/**
 * Navbar — Hifza Aromatics
 *
 * Font setup (add once, e.g. in index.html <head> or index.css):
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;500&display=swap" rel="stylesheet">
 *
 * Tailwind config additions (tailwind.config.js):
 * theme: {
 *   extend: {
 *     colors: {
 *       obsidian: "#0B0B0C",
 *       gold: "#C9A876",
 *       ivory: "#F5F1E8",
 *       bronze: "#3A342A",
 *     },
 *     fontFamily: {
 *       serif: ["'Cormorant Garamond'", "serif"],
 *       sans: ["Inter", "sans-serif"],
 *     },
 *   },
 * }
 */

const NAV_LINKS = [
  { label: "Collections", href: "/collections" },
  { label: "Bestsellers", href: "/bestsellers" },
  { label: "The House", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ cartCount = 0, onCartClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-obsidian/95 backdrop-blur-sm border-b border-bronze">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex flex-col leading-none shrink-0">
            <span className="font-serif text-2xl tracking-[0.15em] text-ivory">
              HIFZA
            </span>
            <span className="font-sans text-[0.6rem] tracking-[0.45em] text-gold mt-1">
              AROMATICS
            </span>
          </a>

          {/* Desktop nav links — centered */}
          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative font-sans text-xs tracking-[0.2em] uppercase text-ivory/80 hover:text-ivory transition-colors duration-300"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right: cart + mobile toggle */}
          <div className="flex items-center gap-5">
            {/* Shopping Bag Button */}
            <button
              aria-label="Open cart"
              onClick={onCartClick}  // <-- Ye line lazmi add karni hai
              className="relative text-ivory hover:text-gold transition-colors duration-300"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[0.65rem] font-sans font-medium text-obsidian">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden text-ivory"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? (
                <X size={24} strokeWidth={1.5} />
              ) : (
                <Menu size={24} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-bronze bg-obsidian px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-xs tracking-[0.2em] uppercase text-ivory/80 hover:text-gold transition-colors duration-300"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
