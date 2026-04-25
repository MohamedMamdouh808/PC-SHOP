import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

interface PromoCode {
  code: string;
  discountPercent: number;
  minOrderAmount: number;
  expiryDate: string;
}

interface PromoContextType {
  appliedPromo: PromoCode | null;
  applyPromo: (code: string, subtotal: number) => boolean;
  removePromo: () => void;
  getDiscount: (subtotal: number) => number;
}

const VALID_PROMOS: PromoCode[] = [
  { code: 'PCBUILD10', discountPercent: 10, minOrderAmount: 500, expiryDate: '2025-12-31' },
  { code: 'WELCOME15', discountPercent: 15, minOrderAmount: 300, expiryDate: '2025-12-31' },
  { code: 'FLASH20', discountPercent: 20, minOrderAmount: 1000, expiryDate: '2024-06-30' },
  { code: 'FREESHIP', discountPercent: 0, minOrderAmount: 200, expiryDate: '2025-12-31' }, // Free shipping only
];

const PromoContext = createContext<PromoContextType | undefined>(undefined);

export function PromoProvider({ children }: { children: ReactNode }) {
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

  const applyPromo = (code: string, subtotal: number): boolean => {
    const promo = VALID_PROMOS.find(
      (p) => p.code.toUpperCase() === code.toUpperCase()
    );

    if (!promo) {
      toast.error('Invalid promo code');
      return false;
    }

    if (new Date(promo.expiryDate) < new Date()) {
      toast.error('This promo code has expired');
      return false;
    }

    if (subtotal < promo.minOrderAmount) {
      toast.error(`Minimum order amount is $${promo.minOrderAmount}`);
      return false;
    }

    setAppliedPromo(promo);
    toast.success(`Promo code applied! ${promo.discountPercent}% off`);
    return true;
  };

  const removePromo = () => {
    setAppliedPromo(null);
    toast.info('Promo code removed');
  };

  const getDiscount = (subtotal: number): number => {
    if (!appliedPromo) return 0;
    return (subtotal * appliedPromo.discountPercent) / 100;
  };

  return (
    <PromoContext.Provider value={{ appliedPromo, applyPromo, removePromo, getDiscount }}>
      {children}
    </PromoContext.Provider>
  );
}

export function usePromo() {
  const context = useContext(PromoContext);
  if (context === undefined) {
    throw new Error('usePromo must be used within a PromoProvider');
  }
  return context;
}
