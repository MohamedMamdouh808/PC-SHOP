import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Icons } from '../components/Icons';
import { mockOrders } from '../lib/mockData';

export function OrderDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  
  // Find order
  const order = mockOrders.find((o: any) => o.id === id);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 mt-20 text-center">
        <h1 className="text-3xl font-heading font-bold text-white mb-4">Order Not Found</h1>
        <p className="text-slate-400 mb-8">The order you're looking for doesn't exist or you don't have permission to view it.</p>
        <Link to="/orders" className="btn-primary px-8 py-3">Back to Orders</Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'processing': return 'text-brand-secondary bg-brand-primary/10 border-brand-primary/20';
      case 'shipped': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'delivered': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-slate-400 bg-white/10 border-white/20';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-20 animate-fade-in">
      <Link to="/orders" className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors mb-6">
        <Icons.ChevronRight className="rotate-180 mr-1" size={16} /> Back to Orders
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">Order #{order.id}</h1>
          <p className="text-slate-400">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <div className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider border inline-flex items-center gap-2 w-fit ${getStatusColor(order.status)}`}>
          {order.status.toLowerCase() === 'delivered' && <Icons.CheckCircle2 size={16} />}
          {order.status.toLowerCase() === 'shipped' && <Icons.Truck size={16} />}
          {order.status.toLowerCase() === 'processing' && <Icons.Loader2 className="animate-spin" size={16} />}
          {order.status}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-elevated rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-lg font-heading font-bold text-white">Items Ordered</h2>
            </div>
            <div className="divide-y divide-white/5">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="p-6 flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-xl border border-white/10 p-2 flex-shrink-0 flex items-center justify-center text-slate-500">
                    {/* Mock product image placeholder since order data only has ids */}
                    <Icons.Box size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate"><Link to={`/products/${item.productId}`} className="hover:text-brand-primary transition-colors">Product ID: {item.productId}</Link></h3>
                    <p className="text-sm text-slate-400 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">${(item.unitPrice * item.quantity).toFixed(2)}</p>
                    {item.quantity > 1 && <p className="text-xs text-slate-400 mt-1">${item.unitPrice.toFixed(2)} each</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Summary & Details */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface-elevated rounded-2xl border border-white/5 p-6">
            <h2 className="text-lg font-heading font-bold text-white mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span>${(order.totalAmount - 25).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Shipping</span>
                <span>$25.00</span>
              </div>
            </div>
            <div className="border-t border-white/10 pt-4 flex justify-between items-end">
              <span className="font-bold text-white">Total</span>
              <span className="text-2xl font-heading font-bold text-brand-primary">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-surface-elevated rounded-2xl border border-white/5 p-6">
            <h2 className="text-lg font-heading font-bold text-white mb-4">Shipping Information</h2>
            <div className="text-sm text-slate-300 space-y-1">
              <p className="font-medium text-white mb-2">{user?.firstName} {user?.lastName}</p>
              <p>123 PC Builder Lane</p>
              <p>Suite 404</p>
              <p>Tech City, TX 78701</p>
              <p>United States</p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/5">
              <h2 className="text-lg font-heading font-bold text-white mb-4">Payment Method</h2>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Icons.CreditCard size={18} className="text-brand-secondary" />
                <span>Visa ending in 4242</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
