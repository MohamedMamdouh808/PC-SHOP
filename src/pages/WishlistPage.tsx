import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icons } from '../components/Icons';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

export function WishlistPage() {
  const { items, clearWishlist, removeItem } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = (product: typeof items[0]) => {
    addItem(product, 1);
    removeItem(product.id);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-20 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
            My Wishlist
          </h1>
          <p className="text-slate-400">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
          >
            <Icons.Trash2 size={18} />
            Clear All
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <Icons.Heart className="mx-auto mb-4 text-slate-600" size={64} />
          <h2 className="text-xl font-heading text-white mb-2">Your wishlist is empty</h2>
          <p className="text-slate-400 mb-6">Save items you love and view them here</p>
          <Link to="/products" className="btn-primary px-8 py-3 inline-block">
            Browse Products
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {items.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative group"
            >
              <ProductCard product={product} />
              <button
                onClick={() => handleMoveToCart(product)}
                className="absolute bottom-4 right-4 bg-brand-primary hover:bg-brand-secondary text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
                title="Move to cart"
              >
                <Icons.ShoppingCart size={20} />
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
