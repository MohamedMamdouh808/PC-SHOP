import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from './Icons';
import { mockProducts } from '../lib/mockData';

interface SearchAutocompleteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchAutocomplete({ isOpen, onClose }: SearchAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof mockProducts>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  const handleProductClick = (slug: string) => {
    navigate(`/products/${slug}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50"
          >
            <div className="bg-surface-elevated rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
              <form onSubmit={handleSubmit} className="flex items-center p-4 border-b border-white/10">
                <Icons.Search className="w-5 h-5 text-slate-400 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, brands, categories..."
                  className="flex-1 bg-transparent text-white text-lg placeholder-slate-400 outline-none"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <Icons.X className="w-5 h-5" />
                </button>
              </form>

              {suggestions.length > 0 && (
                <div className="max-h-80 overflow-y-auto">
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.slug)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-left"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-contain bg-white/5 rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-white font-medium">{product.name}</p>
                        <p className="text-sm text-slate-400">
                          {product.brand} • {product.category}
                        </p>
                      </div>
                      <span className="text-brand-primary font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {query.length > 0 && suggestions.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-slate-400">No products found</p>
                </div>
              )}

              <div className="p-4 bg-surface-base border-t border-white/10">
                <p className="text-xs text-slate-500">
                  Press Enter to search or ESC to close
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
