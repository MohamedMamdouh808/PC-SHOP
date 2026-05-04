import { Link, useNavigate } from "react-router-dom";
import { Icons } from '../components/Icons';
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, itemCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 mt-20 text-center animate-fade-in flex flex-col items-center">
        <div className="w-24 h-24 bg-surface-elevated rounded-full flex items-center justify-center mb-6">
          <Icons.ShoppingCart className="w-12 h-12 text-slate-400" />
        </div>
        <h1 className="text-3xl font-heading font-bold text-white mb-4">Your cart is empty</h1>
        <p className="text-slate-400 mb-8 max-w-md">
          Looks like you haven't added any premium PC hardware to your cart yet. Let's get you geared up!
        </p>
        <Link to="/products" className="btn-primary px-8 py-3 w-fit text-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  const shippingEstimate = subtotal > 1000 ? 0 : 25;
  const taxEstimate = subtotal * 0.08;
  const total = subtotal + shippingEstimate + taxEstimate;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-20 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">Shopping Cart</h1>
        <p className="text-slate-400">{itemCount} items in your order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-elevated rounded-2xl border border-white/5 overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-sm font-bold text-slate-400 uppercase tracking-wider bg-black/20">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
              <div className="col-span-1 text-center"></div>
            </div>

            <div className="divide-y divide-white/5">
              {items.map(item => (
                <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center relative">
                  {/* Product Info */}
                  <div className="col-span-6 flex items-center gap-4 mb-4 sm:mb-0">
                    <Link to={`/products/${item.slug}`} className="w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-xl p-2 flex-shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain mix-blend-screen" />
                    </Link>
                    <div>
                      <Link to={`/products/${item.slug}`}>
                        <h3 className="font-heading font-bold text-white hover:text-brand-primary transition-colors line-clamp-2 sm:line-clamp-none text-sm sm:text-base">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-slate-400 mt-1">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>

                  {/* Mobile-only Price (hidden on desktop) */}
                  <div className="sm:hidden flex items-center justify-between mt-2 mb-4 border-t border-white/5 pt-4">
                    <span className="text-slate-400 text-sm">Unit Price</span>
                    <span className="text-white font-medium">${item.price.toFixed(2)}</span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-span-3 flex justify-between sm:justify-center items-center">
                    <span className="sm:hidden text-slate-400 text-sm">Quantity</span>
                    <div className="flex items-center bg-surface-base border border-white/10 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <div className="w-8 h-8 flex items-center justify-center text-white font-medium text-sm">
                        {item.quantity}
                      </div>
                      <button 
                        onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                        className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total & Remove */}
                  <div className="hidden sm:block col-span-2 text-right">
                    <span className="font-bold text-white text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  
                  <div className="absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 sm:col-span-1 flex justify-end">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Icons.Trash2 size={18} />
                    </button>
                  </div>

                  {/* Mobile Total */}
                  <div className="sm:hidden flex items-center justify-between mt-4 border-t border-white/5 pt-4">
                    <span className="text-slate-400 text-sm font-medium">Subtotal</span>
                    <span className="font-bold text-white text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center px-2">
            <Link to="/products" className="text-brand-primary hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
              <Icons.ArrowRight className="rotate-180" size={16} /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-surface-elevated rounded-2xl border border-white/5 sticky top-24 p-6">
            <h2 className="text-xl font-heading font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-medium text-white">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-slate-300">
                <span>Shipping Estimate</span>
                <span className="font-medium text-white">
                  {shippingEstimate === 0 ? <span className="text-emerald-400">Free</span> : `$${shippingEstimate.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Estimated Tax</span>
                <span className="font-medium text-white">${taxEstimate.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 mb-8 flex justify-between items-end">
              <span className="text-lg font-bold text-white">Total</span>
              <span className="text-3xl font-heading font-bold text-brand-primary">
                ${total.toFixed(2)}
              </span>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full btn-primary py-4 text-lg mb-4 flex items-center justify-center gap-2 cursor-pointer"
            >
              Proceed to Checkout
              <Icons.ChevronRight size={20} />
            </button>

            <div className="flex items-start gap-3 p-4 bg-[#0F0F23] rounded-xl border border-white/5">
              <Icons.ShieldCheck className="text-emerald-400 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-xs text-slate-400 leading-relaxed">
                Secure checkout. Your data is protected by industry-leading encryption. We do not store your full credit card details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
