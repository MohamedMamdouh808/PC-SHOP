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
          className="fixed top-16 md:top-20 left-0 right-0 bg-surface-elevated border-b border-white/10 z-40 shadow-2xl"
        >
          <div className="container mx-auto px-2 md:px-4 py-2 md:py-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 md:gap-4 overflow-x-auto scrollbar-hide">
                <span className="text-white font-bold text-sm md:text-base whitespace-nowrap">
                  Compare ({items.length})
                </span>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-1.5 md:gap-2 bg-surface-base rounded-lg px-2 md:px-3 py-1.5 md:py-2 min-w-fit"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-8 h-8 md:w-10 md:h-10 object-contain"
                    />
                    <span className="text-xs md:text-sm text-white line-clamp-1 max-w-[100px] md:max-w-[150px]">
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

              <div className="flex items-center gap-2 md:gap-3 shrink-0">
                <button
                  onClick={clearCompare}
                  className="text-slate-400 hover:text-white text-xs md:text-sm"
                >
                  Clear
                </button>
                <Link
                  to="/compare"
                  className="btn-primary px-3 md:px-6 py-1.5 md:py-2 text-xs md:text-sm"
                >
                  Compare
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
