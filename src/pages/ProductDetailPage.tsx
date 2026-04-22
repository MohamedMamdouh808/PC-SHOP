import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Icons } from '../components/Icons';
import '../styles/pages/ProductDetailPage.css';
import { mockProducts, Product } from "../lib/mockData";
import { useCart } from "../context/CartContext";

export function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const found = mockProducts.find(p => p.slug === slug);
    if (!found) {
      // Could redirect to 404
      navigate('/products');
      return;
    }
    setProduct(found);
    setActiveImage(0);
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  if (!product) return null;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product, quantity);
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  // Helper to get category icon
  const getCategoryIcon = () => {
    switch (product.category) {
      case "Processors": return <Icons.Cpu className="text-brand-primary" />;
      case "Storage": return <Icons.HardDrive className="text-brand-primary" />;
      default: return <Icons.Box className="text-brand-primary" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-20 animate-fade-in">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 overflow-x-auto pb-4">
        <Link to="/" className="hover:text-white whitespace-nowrap">Home</Link>
        <Icons.ChevronRight size={14} />
        <Link to="/products" className="hover:text-white whitespace-nowrap">Products</Link>
        <Icons.ChevronRight size={14} />
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-white whitespace-nowrap">{product.category}</Link>
        <Icons.ChevronRight size={14} />
        <span className="text-white font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="bg-white/5 rounded-3xl aspect-square flex items-center justify-center p-8 lg:p-12 border border-white/5 relative group overflow-hidden">
            <img 
              src={product.images[activeImage]} 
              alt={product.name} 
              className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
            />
            {product.isNew && (
              <span className="absolute top-6 left-6 bg-brand-primary text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider shadow-lg">
                New
              </span>
            )}
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-5 gap-3">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square rounded-xl bg-white/5 border-2 overflow-hidden flex items-center justify-center p-2 transition-all w-full cursor-pointer hover:bg-white/10 ${
                    activeImage === idx ? "border-brand-primary opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="max-w-full max-h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          <div className="mb-4 flex items-center gap-4">
            <span className="text-sm font-bold uppercase tracking-widest text-brand-secondary bg-brand-primary/10 px-3 py-1 rounded-full">
              {product.brand}
            </span>
            <div className="flex items-center gap-1.5 ml-auto sm:ml-0 bg-surface-elevated px-3 py-1 rounded-full border border-white/5">
              <Icons.Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-white">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 tracking-tight leading-tight">
            {product.name}
          </h1>

          <div className="mb-8 flex items-end gap-3 pb-8 border-b border-white/10">
            <span className="text-4xl font-bold font-heading text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              ${product.price.toFixed(2)}
            </span>
            {product.compareToPrice && (
              <span className="text-xl text-slate-500 line-through font-medium mb-1 relative">
                ${product.compareToPrice.toFixed(2)}
                <span className="absolute -top-6 left-0 bg-accent/20 text-accent text-xs font-bold px-2 py-0.5 rounded shadow-[0_0_10px_rgba(244,63,94,0.3)]">
                  SAVE ${(product.compareToPrice - product.price).toFixed(2)}
                </span>
              </span>
            )}
          </div>

          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-8">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Icons.Check className="text-brand-primary w-4 h-4" /> 
              Key Features
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-300 bg-surface-elevated px-4 py-3 rounded-xl border border-white/5 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/80" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-8 border-t border-white/10">
            <div className="flex items-center justify-between mb-6">
              <span className={`text-sm font-bold flex items-center gap-2 ${product.stock > 0 ? "text-emerald-400" : "text-red-400"}`}>
                <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
                {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Quantity */}
              <div className="flex items-center bg-surface-elevated border border-white/10 rounded-xl p-1 h-[60px] w-full sm:w-auto">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                >
                  -
                </button>
                <div className="w-12 h-full flex items-center justify-center text-white font-bold text-lg">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-12 h-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 h-[60px] font-bold text-lg rounded-xl flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group ${
                  product.stock > 0 
                    ? "bg-brand-primary text-white hover:bg-brand-primary/90 shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] cursor-pointer" 
                    : "bg-surface-elevated text-slate-500 cursor-not-allowed"
                }`}
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                
                {isAdding ? (
                  <span className="flex items-center gap-2">
                    <Icons.Check className="w-5 h-5 animate-scale-in" />
                    Added
                  </span>
                ) : (
                  <>
                    <Icons.ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Specs Section */}
      <div className="mt-20 pt-16 border-t border-white/5">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30">
            {getCategoryIcon()}
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">Technical Specifications</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10 rounded-2xl overflow-hidden bg-surface-elevated/50 backdrop-blur-sm">
          {Object.entries(product.specs).map(([key, value], idx) => (
            <div key={key} className={`flex flex-col sm:flex-row border-white/10 ${idx % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"} ${idx !== Object.entries(product.specs).length - 1 ? "border-b md:border-b-0" : ""}`}>
              <div className="w-full sm:w-1/3 py-4 px-6 text-slate-400 font-medium text-sm sm:text-base border-b sm:border-b-0 sm:border-r border-white/5">
                {key}
              </div>
              <div className="w-full sm:w-2/3 py-4 px-6 text-white font-medium text-sm sm:text-base border-b sm:border-b-0 border-white/5 md:border-b md:last:border-b-0">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
