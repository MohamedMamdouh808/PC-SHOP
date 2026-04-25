import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { Product } from '../lib/mockData';

interface CompareContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  maxItems: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const COMPARE_STORAGE_KEY = 'pc-shop-compare';
const MAX_COMPARE_ITEMS = 4;

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(COMPARE_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      if (prev.find((item) => item.id === product.id)) {
        toast.info(`${product.name} is already in compare list`);
        return prev;
      }
      if (prev.length >= MAX_COMPARE_ITEMS) {
        toast.error(`You can only compare up to ${MAX_COMPARE_ITEMS} products`);
        return prev;
      }
      toast.success(`${product.name} added to compare`);
      return [...prev, product];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (item) {
        toast.info(`${item.name} removed from compare`);
      }
      return prev.filter((item) => item.id !== productId);
    });
  };

  const isInCompare = (productId: string) => {
    return items.some((item) => item.id === productId);
  };

  const clearCompare = () => {
    setItems([]);
    toast.info('Compare list cleared');
  };

  return (
    <CompareContext.Provider
      value={{ items, addItem, removeItem, isInCompare, clearCompare, maxItems: MAX_COMPARE_ITEMS }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
