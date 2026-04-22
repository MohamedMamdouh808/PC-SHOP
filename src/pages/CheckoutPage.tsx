import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Icons } from '../components/Icons';
import '../styles/pages/CheckoutPage.css';
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export function CheckoutPage() {
  const { items, subtotal, clearCart, itemCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1); // 1: Address, 2: Payment
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Address Form State
  const [address, setAddress] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US"
  });

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 mt-20 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
        <Link to="/products" className="btn-primary px-8 py-3">Back to Store</Link>
      </div>
    );
  }

  const shippingEstimate = subtotal > 1000 ? 0 : 25;
  const taxEstimate = subtotal * 0.08;
  const total = subtotal + shippingEstimate + taxEstimate;

  const handleAddressSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call to backend /api/orders
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 mt-20 max-w-2xl animate-fade-in">
        <div className="bg-surface-elevated rounded-3xl p-8 md:p-12 text-center border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
          <div className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icons.CheckCircle2 size={48} />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Order Confirmed!</h1>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Thank you for your purchase. We've received your order and are getting it ready to ship. You'll receive a confirmation email shortly.
          </p>
          <div className="space-y-4 max-w-sm mx-auto">
            <Link to="/orders" className="btn-primary w-full py-3 text-lg justify-center block">
              View Order Status
            </Link>
            <Link to="/products" className="btn-secondary w-full py-3 text-lg justify-center block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-20">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Shipping Address */}
          <div className="bg-surface-elevated rounded-2xl border border-white/5 overflow-hidden transition-all duration-300">
            <div className={`p-6 border-b border-white/5 flex items-center justify-between ${step === 1 ? "bg-brand-primary/5" : ""}`}>
              <h2 className="flex items-center gap-3 text-xl font-heading font-bold text-white">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 1 ? "bg-brand-primary text-white" : "bg-white/10 text-slate-400"}`}>1</span>
                Shipping Address
              </h2>
              {step === 2 && (
                <button onClick={() => setStep(1)} className="text-brand-primary text-sm font-medium hover:text-brand-secondary">
                  Edit
                </button>
              )}
            </div>

            {step === 1 ? (
              <form onSubmit={handleAddressSubmit} className="p-6 space-y-4 animate-fade-in">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">First Name</label>
                    <input required type="text" className="input-field" value={address.firstName} onChange={e => setAddress({...address, firstName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Last Name</label>
                    <input required type="text" className="input-field" value={address.lastName} onChange={e => setAddress({...address, lastName: e.target.value})} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Street Address</label>
                  <input required type="text" className="input-field" value={address.addressLine1} onChange={e => setAddress({...address, addressLine1: e.target.value})} placeholder="123 Main St" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">City</label>
                    <input required type="text" className="input-field" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">State / Province</label>
                    <input required type="text" className="input-field" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">ZIP / Postal Code</label>
                    <input required type="text" className="input-field" value={address.postalCode} onChange={e => setAddress({...address, postalCode: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Country</label>
                    <select className="input-field appearance-none" value={address.country} onChange={e => setAddress({...address, country: e.target.value})}>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button type="submit" className="btn-primary py-3 px-8 flex items-center gap-2">
                    Continue to Payment <Icons.ChevronRight size={18} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 text-slate-300 text-sm flex items-start gap-3">
                <Icons.MapPin className="text-brand-primary flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-medium text-white">{address.firstName} {address.lastName}</p>
                  <p>{address.addressLine1}</p>
                  <p>{address.city}, {address.state} {address.postalCode}</p>
                  <p>{address.country}</p>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Payment Method */}
          <div className="bg-surface-elevated rounded-2xl border border-white/5 overflow-hidden transition-all duration-300">
            <div className={`p-6 border-b border-white/5 flex items-center justify-between ${step === 2 ? "bg-brand-primary/5" : ""}`}>
              <h2 className="flex items-center gap-3 text-xl font-heading font-bold text-white">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 2 ? "bg-brand-primary text-white" : "bg-white/10 text-slate-400"}`}>2</span>
                Payment Method
              </h2>
            </div>
            
            {step === 2 ? (
              <form onSubmit={handlePaymentSubmit} className="p-6 space-y-6 animate-fade-in">
                
                {/* Mock Card Input UI */}
                <div className="bg-[#0F0F23] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-4 text-brand-secondary">
                    <Icons.CreditCard size={20} />
                    <span className="font-medium text-white">Credit / Debit Card</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Card Number</label>
                      <div className="relative">
                        <input required type="text" className="input-field font-mono" placeholder="0000 0000 0000 0000" maxLength={19} />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                          <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Expiry (MM/YY)</label>
                        <input required type="text" className="input-field font-mono" placeholder="MM/YY" maxLength={5} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">CVC</label>
                        <input required type="text" className="input-field font-mono" placeholder="123" maxLength={4} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button 
                    type="submit" 
                    disabled={isProcessing}
                    className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Icons.Lock size={18} />
                        Pay ${total.toFixed(2)}
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 text-slate-400 text-sm italic">
                Please complete the shipping address first.
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface-elevated rounded-2xl border border-white/5 sticky top-24">
            <div className="p-5 border-b border-white/5 flex items-center gap-3 text-white">
              <Icons.Box size={20} className="text-brand-primary" />
              <h2 className="font-heading font-bold text-lg">Order Summary</h2>
            </div>
            
            <div className="p-5 flex flex-col gap-4 max-h-[300px] overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-16 h-16 bg-white/5 rounded-lg flex-shrink-0 p-1 flex items-center justify-center">
                    <img src={item.images[0]} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-screen" />
                    <span className="absolute -top-2 -right-2 bg-slate-600 text-[10px] font-bold text-white w-5 h-5 flex items-center justify-center rounded-full border-2 border-surface-elevated">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-medium truncate">{item.name}</h4>
                    <p className="text-slate-400 text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 bg-black/20 border-t border-white/5">
              <div className="space-y-3 mb-4 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Shipping</span>
                  <span className="text-white">
                    {shippingEstimate === 0 ? <span className="text-emerald-400">Free</span> : `$${shippingEstimate.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Taxes (8%)</span>
                  <span className="text-white">${taxEstimate.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                <span className="text-base font-bold text-white">Total</span>
                <span className="text-2xl font-heading font-bold text-brand-primary">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
