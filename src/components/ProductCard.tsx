import { Link } from "react-router-dom";
import { Icons } from './Icons';
import { Product } from "../lib/mockData";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCompare } from "../context/CompareContext";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const { addItem: addToCompare, isInCompare } = useCompare();
  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  return (
    <div className="glass rounded-2xl border border-white/5 overflow-hidden flex flex-col h-full group relative hover:border-brand-primary/30 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
      {/* Radial Glow on Hover */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-brand-primary text-surface-base text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-lg shadow-brand-primary/20">
            New
          </span>
        )}
        {product.compareToPrice && (
          <span className="bg-white text-surface-base text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-lg shadow-white/20">
            Sale
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addToWishlist(product);
        }}
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-surface-elevated/80 border border-white/10 hover:border-brand-primary/50 hover:bg-surface-elevated transition-all backdrop-blur-md"
        title={inWishlist ? "In wishlist" : "Add to wishlist"}
      >
        <Icons.Heart 
          size={16} 
          className={`transition-colors ${inWishlist ? 'fill-brand-primary text-brand-primary' : 'text-white/60 hover:text-white'}`}
        />
      </button>

      {/* Compare Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addToCompare(product);
        }}
        className="absolute top-4 right-14 z-10 p-2.5 rounded-full bg-surface-elevated/80 border border-white/10 hover:border-brand-primary/50 hover:bg-surface-elevated transition-all backdrop-blur-md"
        title={inCompare ? "In compare list" : "Add to compare"}
      >
        <Icons.Cpu 
          size={16} 
          className={`transition-colors ${inCompare ? 'fill-brand-primary text-brand-primary' : 'text-white/60 hover:text-white'}`}
        />
      </button>

      {/* Image */}
      <Link to={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent border-b border-white/5 p-8 flex items-center justify-center">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl relative z-10"
        />
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary/80">{product.category}</span>
          <div className="flex items-center gap-1.5 bg-surface-elevated px-2 py-1 rounded border border-white/5">
            <Icons.Star className="w-3 h-3 fill-brand-primary text-brand-primary" />
            <span className="text-[10px] font-bold text-white/90">{product.rating}</span>
          </div>
        </div>

        <Link to={`/products/${product.slug}`} className="mb-4 block">
          <h3 className="font-heading font-medium text-base leading-tight text-white/90 line-clamp-2 group-hover:text-brand-secondary transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-4 border-t border-white/5 flex items-end justify-between">
          <div className="flex flex-col">
            {product.compareToPrice && (
              <span className="text-[11px] font-medium tracking-wide text-white/40 line-through mb-0.5">
                ${product.compareToPrice.toFixed(2)}
              </span>
            )}
            <span className="text-xl font-bold text-white tracking-tight">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            disabled={product.stock === 0}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 border ${
              product.stock > 0
                ? "bg-white text-surface-base border-transparent hover:bg-brand-primary hover:scale-105"
                : "bg-surface-elevated text-white/30 border-white/5 cursor-not-allowed"
            }`}
            title={product.stock > 0 ? "Add to cart" : "Out of stock"}
          >
            <Icons.ShoppingCart size={18} className={product.stock > 0 ? "transition-transform group-hover:translate-x-0.5" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
}
