import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { Icons } from '../components/Icons';
import { useCart } from '../context/CartContext';

interface Component {
  id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
  specs?: string[];
}

interface BuildComponent {
  category: string;
  icon: React.ReactNode;
  selected: Component | null;
  required: boolean;
}

const COMPONENT_CATEGORIES = [
  { id: 'cpu', name: 'Processor', icon: <Icons.Zap className="w-5 h-5" />, required: true },
  { id: 'motherboard', name: 'Motherboard', icon: <Icons.Box className="w-5 h-5" />, required: true },
  { id: 'gpu', name: 'Graphics Card', icon: <Icons.Gauge className="w-5 h-5" />, required: false },
  { id: 'ram', name: 'Memory (RAM)', icon: <Icons.HardDrive className="w-5 h-5" />, required: true },
  { id: 'storage', name: 'Storage', icon: <Icons.Package className="w-5 h-5" />, required: true },
  { id: 'psu', name: 'Power Supply', icon: <Icons.Zap className="w-5 h-5" />, required: true },
  { id: 'case', name: 'Case', icon: <Icons.Box className="w-5 h-5" />, required: true },
  { id: 'cooler', name: 'CPU Cooler', icon: <Icons.ShieldCheck className="w-5 h-5" />, required: false },
];

export function PCBuilderPage() {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [selectedComponents, setSelectedComponents] = useState<Record<string, Component | null>>({
    cpu: null,
    motherboard: null,
    gpu: null,
    ram: null,
    storage: null,
    psu: null,
    case: null,
    cooler: null,
  });

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const calculateTotal = () => {
    return Object.values(selectedComponents)
      .filter((comp): comp is Component => comp !== null)
      .reduce((total, comp) => total + comp.price, 0);
  };

  const requiredComponents = COMPONENT_CATEGORIES.filter(cat => cat.required);
  const hasAllRequired = requiredComponents.every(cat => selectedComponents[cat.id] !== null);

  const handleAddComponent = (categoryId: string, component: Component) => {
    setSelectedComponents(prev => ({ ...prev, [categoryId]: component }));
    setActiveCategory(null);
  };

  const handleRemoveComponent = (categoryId: string) => {
    setSelectedComponents(prev => ({ ...prev, [categoryId]: null }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-surface-base pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Icons.Cpu className="w-6 h-6 text-brand-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">Build Your Dream PC</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black text-white mb-4">
            Custom PC Builder
          </h1>
          <p className="text-white/60 max-w-xl">
            Select components to build your perfect PC. Our compatibility checker ensures everything works together.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Component Selection */}
          <div className="lg:col-span-2 space-y-4">
            {COMPONENT_CATEGORIES.map((category) => {
              const selected = selectedComponents[category.id];
              const isActive = activeCategory === category.id;

              return (
                <div
                  key={category.id}
                  className={`glass rounded-2xl border transition-all ${
                    isActive ? 'border-brand-primary/50' : 'border-white/5'
                  }`}
                >
                  <button
                    onClick={() => setActiveCategory(isActive ? null : category.id)}
                    className="w-full p-6 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${
                        selected ? 'bg-brand-primary/20 text-brand-primary' : 'bg-white/5 text-white/40'
                      }`}>
                        {category.icon}
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{category.name}</span>
                          {category.required && (
                            <span className="text-[10px] bg-brand-primary/20 text-brand-primary px-2 py-0.5 rounded-full">
                              Required
                            </span>
                          )}
                        </div>
                        {selected ? (
                          <div className="text-sm text-white/60 mt-1">
                            {selected.name} · {formatPrice(selected.price)}
                          </div>
                        ) : (
                          <div className="text-sm text-white/40 mt-1">Not selected</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {selected ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveComponent(category.id);
                          }}
                          className="p-2 text-white/40 hover:text-status-error transition-colors"
                        >
                          <Icons.X className="w-5 h-5" />
                        </button>
                      ) : null}
                      <Icons.ChevronRight className={`w-5 h-5 text-white/40 transition-transform ${
                        isActive ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </button>

                  {/* Component Selection Panel */}
                  {isActive && (
                    <div className="px-6 pb-6 border-t border-white/5 pt-4">
                      <p className="text-white/60 text-sm mb-4">
                        Choose a {category.name.toLowerCase()} for your build:
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {/* Mock components - replace with actual data */}
                        {[1, 2, 3, 4].map((i) => (
                          <button
                            key={i}
                            onClick={() =>
                              handleAddComponent(category.id, {
                                id: `${category.id}-${i}`,
                                name: `${category.name} Option ${i}`,
                                category: category.id,
                                price: 299 + i * 100,
                                specs: ['High Performance', 'Reliable Brand'],
                              })
                            }
                            className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-brand-primary/30 rounded-xl transition-all text-left"
                          >
                            <div className="font-medium text-white mb-1">{category.name} Option {i}</div>
                            <div className="text-brand-primary font-bold">{formatPrice(299 + i * 100)}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Build Summary */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="glass rounded-2xl border border-white/5 p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Icons.ShoppingCart className="w-5 h-5 text-brand-primary" />
                Build Summary
              </h2>

              {/* Selected Components List */}
              <div className="space-y-3 mb-6">
                {Object.entries(selectedComponents)
                  .filter(([, comp]) => comp !== null)
                  .map(([categoryId, comp]) => {
                    const category = COMPONENT_CATEGORIES.find(c => c.id === categoryId);
                    return (
                      <div key={categoryId} className="flex items-center justify-between text-sm">
                        <span className="text-white/60">{category?.name}</span>
                        <span className="text-white font-medium">{formatPrice(comp!.price)}</span>
                      </div>
                    );
                  })}
                
                {Object.values(selectedComponents).every(c => c === null) && (
                  <p className="text-white/40 text-center py-4 text-sm">
                    No components selected yet
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-lg">Total</span>
                  <span className="text-2xl font-black text-brand-primary">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  disabled={!hasAllRequired}
                  onClick={() => {
                    if (!hasAllRequired) return;
                    
                    // Create a PC Build product with all selected components
                    const components = Object.entries(selectedComponents)
                      .filter(([, comp]) => comp !== null)
                      .map(([, comp]) => comp!);
                    
                    const buildProduct = {
                      id: `pc-build-${Date.now()}`,
                      name: 'Custom PC Build',
                      slug: `custom-pc-build-${Date.now()}`,
                      description: `Custom PC with ${components.map(c => c.name).join(', ')}`,
                      price: calculateTotal(),
                      category: 'Custom Build',
                      brand: 'PC Shop',
                      images: ['/images/custom-pc.jpg'],
                      stock: 1,
                      rating: 0,
                      reviewCount: 0,
                      features: components.map(c => c.name),
                      specs: components.reduce((acc, comp) => ({
                        ...acc,
                        [comp.category]: comp.name
                      }), {} as Record<string, string>),
                      isNew: true,
                    };
                    
                    addItem(buildProduct);
                    navigate('/cart');
                  }}
                  className={`w-full py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${
                    hasAllRequired
                      ? 'btn-primary hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]'
                      : 'bg-white/5 text-white/30 cursor-not-allowed'
                  }`}
                >
                  Add to Cart
                </button>
                
                {!hasAllRequired && (
                  <p className="text-[10px] text-white/40 text-center uppercase tracking-wider">
                    Add all required components to continue
                  </p>
                )}

                <button
                  onClick={() => setSelectedComponents({
                    cpu: null, motherboard: null, gpu: null, ram: null,
                    storage: null, psu: null, case: null, cooler: null,
                  })}
                  className="w-full py-3 rounded-xl text-white/40 hover:text-white text-xs uppercase tracking-widest transition-colors"
                >
                  Clear Build
                </button>
              </div>

              {/* Compatibility Status */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Icons.ShieldCheck className={`w-4 h-4 ${
                    hasAllRequired ? 'text-green-400' : 'text-white/40'
                  }`} />
                  <span className={`text-sm font-medium ${
                    hasAllRequired ? 'text-green-400' : 'text-white/40'
                  }`}>
                    {hasAllRequired ? 'Build Compatible' : 'Incomplete Build'}
                  </span>
                </div>
                <p className="text-xs text-white/40">
                  {hasAllRequired
                    ? 'All required components selected. Your build is ready!'
                    : `${requiredComponents.filter(c => !selectedComponents[c.id]).length} required components remaining`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
