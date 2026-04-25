import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icons } from '../components/Icons';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';

export function ComparePage() {
  const { items, removeItem, clearCompare } = useCompare();
  const { addItem } = useCart();

  const allSpecs = Array.from(
    new Set(items.flatMap((item) => Object.keys(item.specs)))
  );

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="text-center">
          <Icons.Cpu className="mx-auto mb-4 text-slate-600" size={64} />
          <h1 className="text-2xl font-bold text-white mb-2">No Products to Compare</h1>
          <p className="text-slate-400 mb-6">Add products to compare their specifications side by side</p>
          <Link to="/products" className="btn-primary px-8 py-3 inline-block">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Compare Products</h1>
          <p className="text-slate-400 text-sm sm:text-base">Compare up to 4 products side by side</p>
        </div>
        <button
          onClick={clearCompare}
          className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2 text-sm"
        >
          <Icons.Trash2 size={18} />
          Clear All
        </button>
      </div>

      {/* Desktop Table Layout (>1024px) */}
      <div className="hidden lg:block overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Product Headers */}
          <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}>
            <div className="font-bold text-slate-400">Product</div>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface-elevated rounded-xl p-4 relative"
              >
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-2 right-2 text-slate-400 hover:text-white p-1"
                >
                  <Icons.X size={20} />
                </button>
                <Link to={`/products/${item.slug}`}>
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-32 object-contain mb-3"
                  />
                  <h3 className="font-bold text-white text-sm line-clamp-2">{item.name}</h3>
                </Link>
                <p className="text-brand-primary font-bold mt-2">${item.price.toFixed(2)}</p>
                <button
                  onClick={() => addItem(item)}
                  className="btn-primary w-full py-2 mt-3 text-sm"
                  disabled={item.stock === 0}
                >
                  {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Specs Rows */}
          <div className="space-y-2">
            {/* Brand */}
            <div className="grid gap-4 items-center" style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}>
              <div className="text-slate-400 font-medium">Brand</div>
              {items.map((item) => (
                <div key={item.id} className="bg-surface-elevated/50 rounded-lg p-3 text-white text-center">
                  {item.brand}
                </div>
              ))}
            </div>

            {/* Category */}
            <div className="grid gap-4 items-center" style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}>
              <div className="text-slate-400 font-medium">Category</div>
              {items.map((item) => (
                <div key={item.id} className="bg-surface-elevated/50 rounded-lg p-3 text-white text-center">
                  {item.category}
                </div>
              ))}
            </div>

            {/* Rating */}
            <div className="grid gap-4 items-center" style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}>
              <div className="text-slate-400 font-medium">Rating</div>
              {items.map((item) => (
                <div key={item.id} className="bg-surface-elevated/50 rounded-lg p-3 text-white text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Icons.Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stock */}
            <div className="grid gap-4 items-center" style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}>
              <div className="text-slate-400 font-medium">Stock</div>
              {items.map((item) => (
                <div key={item.id} className="bg-surface-elevated/50 rounded-lg p-3 text-white text-center">
                  <span className={item.stock > 0 ? 'text-green-400' : 'text-red-400'}>
                    {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
              ))}
            </div>

            {/* Dynamic Specs */}
            {allSpecs.map((specKey) => (
              <div
                key={specKey}
                className="grid gap-4 items-center"
                style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}
              >
                <div className="text-slate-400 font-medium capitalize">{specKey.replace(/-/g, ' ')}</div>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-surface-elevated/50 rounded-lg p-3 text-white text-center text-sm"
                  >
                    {item.specs[specKey] || '-'}
                  </div>
                ))}
              </div>
            ))}

            {/* Features */}
            <div className="grid gap-4 items-start" style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}>
              <div className="text-slate-400 font-medium">Features</div>
              {items.map((item) => (
                <div key={item.id} className="bg-surface-elevated/50 rounded-lg p-3">
                  <ul className="text-sm text-slate-300 space-y-1">
                    {item.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icons.Check size={14} className="text-brand-primary mt-1 flex-shrink-0" />
                        <span className="line-clamp-2">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Card Layout (<1024px) */}
      <div className="lg:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface-elevated rounded-2xl overflow-hidden"
            >
              {/* Product Header */}
              <div className="p-4 border-b border-white/5">
                <div className="flex items-start gap-4">
                  <Link to={`/products/${item.slug}`} className="w-24 h-24 bg-white/5 rounded-xl flex-shrink-0 flex items-center justify-center p-2">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="float-right text-slate-400 hover:text-white p-1"
                    >
                      <Icons.X size={18} />
                    </button>
                    <Link to={`/products/${item.slug}`}>
                      <h3 className="font-bold text-white text-sm line-clamp-2 mb-1">{item.name}</h3>
                    </Link>
                    <p className="text-brand-primary font-bold">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Icons.Star size={12} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-slate-400">{item.rating}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => addItem(item)}
                  className="btn-primary w-full py-2 mt-4 text-sm"
                  disabled={item.stock === 0}
                >
                  {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>

              {/* Specs List */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Brand</span>
                  <span className="text-white font-medium">{item.brand}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Category</span>
                  <span className="text-white font-medium">{item.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Stock</span>
                  <span className={item.stock > 0 ? 'text-green-400' : 'text-red-400'}>
                    {item.stock > 0 ? 'In Stock' : 'Out of stock'}
                  </span>
                </div>
                
                {/* Dynamic Specs */}
                {allSpecs.map((specKey) => (
                  <div key={specKey} className="flex justify-between text-sm">
                    <span className="text-slate-400 capitalize">{specKey.replace(/-/g, ' ')}</span>
                    <span className="text-white font-medium text-right">{item.specs[specKey] || '-'}</span>
                  </div>
                ))}

                {/* Features */}
                <div className="pt-2 border-t border-white/5">
                  <span className="text-slate-400 text-sm block mb-2">Features</span>
                  <ul className="space-y-2">
                    {item.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                        <Icons.Check size={14} className="text-brand-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
