import { Plus } from "lucide-react";

/**
 * ProductCard — Hifza Aromatics
 *
 * Usage:
 * <ProductCard
 *   image="/products/oud-royale.jpg"
 *   name="Oud Royale"
 *   category="Eau de Parfum"
 *   price={185}
 *   onAddToCart={() => handleAdd(product.id)}
 * />
 *
 * Relies on the same Tailwind color/font tokens as Navbar.jsx
 * (obsidian, gold, ivory, bronze / font-serif, font-sans).
 */

export default function ProductCard({
  image,
  name,
  category,
  price,
  onAddToCart,
}) {
  return (
    <div className="group relative w-full max-w-sm">
      {/* Image frame — hairline gold border draws in on hover */}
      <div className="relative overflow-hidden bg-bronze/10">
        <div className="pointer-events-none absolute inset-0 z-10 border border-gold/0 group-hover:border-gold/70 transition-all duration-500" />

        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover scale-100 group-hover:scale-[1.06] transition-transform duration-700 ease-out"
          />
        </div>

        {/* Add to cart — slides up from bottom on hover (desktop), always visible on touch */}
        <button
          onClick={onAddToCart}
          className="absolute inset-x-4 bottom-4 z-20 flex items-center justify-center gap-2
                     bg-obsidian/90 backdrop-blur-sm border border-gold/60 text-ivory
                     font-sans text-[0.7rem] tracking-[0.2em] uppercase py-3
                     translate-y-[130%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                     transition-all duration-500 ease-out
                     hover:bg-gold hover:text-obsidian hover:border-gold"
        >
          <Plus size={14} strokeWidth={1.75} />
          Add to Cart
        </button>
      </div>

      {/* Details */}
      <div className="pt-4 px-1">
        <p className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-gold/90">
          {category}
        </p>
        <h3 className="font-serif text-xl text-ivory mt-1">{name}</h3>
        <p className="font-sans text-sm text-ivory/70 mt-1">
          ${Number(price).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
