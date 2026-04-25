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
    <div className="bg-surface-elevated rounded-2xl border border-white/5 overflow-hidden hover-card flex flex-col h-full group relative hover:border-brand-primary/30 transition-all duration-300">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-brand-primary text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-lg shadow-brand-primary/50 animate-pulse">
            New
          </span>
        )}
        {product.compareToPrice && (
          <span className="bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-lg shadow-accent/50">
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
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-all"
        title={inWishlist ? "In wishlist" : "Add to wishlist"}
      >
        <Icons.Heart 
          size={18} 
          className={`transition-colors ${inWishlist ? 'fill-red-500 text-red-500' : 'text-white/80 hover:text-white'}`}
        />
      </button>

      {/* Compare Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addToCompare(product);
        }}
        className="absolute top-4 right-14 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-all"
        title={inCompare ? "In compare list" : "Add to compare"}
      >
        <Icons.Cpu 
          size={18} 
          className={`transition-colors ${inCompare ? 'fill-brand-primary text-brand-primary' : 'text-white/80 hover:text-white'}`}
        />
      </button>

      {/* Image */}
      <Link to={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-white/5 p-8 flex items-center justify-center">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
        />
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary">{product.category}</span>
          <div className="flex items-center gap-1 bg-surface-base px-2 py-1 rounded-full border border-white/5">
            <Icons.Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-white">{product.rating}</span>
          </div>
        </div>

        <Link to={`/products/${product.slug}`} className="mb-4">
          <h3 className="font-heading font-medium text-[15px] sm:text-base leading-snug text-white line-clamp-2 group-hover:text-brand-secondary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            {product.compareToPrice && (
              <span className="text-xs text-slate-500 line-through">
                ${product.compareToPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg sm:text-xl font-bold text-white">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            disabled={product.stock === 0}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              product.stock > 0
                ? "bg-brand-primary text-white hover:bg-brand-secondary hover:shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                : "bg-surface-base text-slate-500 cursor-not-allowed"
            }`}
            title={product.stock > 0 ? "Add to cart" : "Out of stock"}
          >
            <Icons.ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
