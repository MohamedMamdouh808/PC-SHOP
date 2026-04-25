import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from './Icons';
import { useCompare } from '../context/CompareContext';

export function CompareBar() {
  const { items, removeItem, clearCompare } = useCompare();

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className="fixed top-20 left-0 right-0 bg-surface-elevated border-b border-white/10 z-40 shadow-2xl"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 overflow-x-auto">
                <span className="text-white font-bold whitespace-nowrap">
                  Compare ({items.length})
                </span>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 bg-surface-base rounded-lg px-3 py-2 min-w-fit"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-10 h-10 object-contain"
                    />
                    <span className="text-sm text-white line-clamp-1 max-w-[150px]">
                      {item.name}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-white"
                    >
                      <Icons.X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={clearCompare}
                  className="text-slate-400 hover:text-white text-sm"
                >
                  Clear
                </button>
                <Link
                  to="/compare"
                  className="btn-primary px-6 py-2 text-sm"
                >
                  Compare Now
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
