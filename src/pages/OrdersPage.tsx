import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Icons } from '../components/Icons';
import { mockOrders } from '../lib/mockData';
import '../styles/pages/OrdersPage.css';

export function OrdersPage() {
  const { user } = useAuth();
  
  // In a real app we'd fetch orders based on user.id
  // Here we just use the mock orders and filter to show something, or just show all mocks
  const [orders, setOrders] = useState(mockOrders);

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'processing': return 'text-brand-secondary bg-brand-primary/10 border-brand-primary/20';
      case 'shipped': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'delivered': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-slate-400 bg-white/10 border-white/20';
    }
  };

  return (
    <div className="orders-page-container container mx-auto px-4 py-8 md:py-12 mt-20 animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">My Orders</h1>
          <p className="text-slate-400">View and track your past purchases</p>
        </div>
        <Link to="/products" className="hidden sm:flex btn-secondary px-4 py-2 text-sm gap-2">
          <Icons.ShoppingCart size={16} /> Continue Shopping
        </Link>
      </div>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="bg-surface-elevated rounded-2xl border border-white/5 p-12 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icons.Package className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">No orders yet</h3>
            <p className="text-slate-400 mb-6">Looks like you haven't made any purchases.</p>
            <Link to="/products" className="btn-primary px-6 py-3">Start Shopping</Link>
          </div>
        ) : (
          orders.map((order: any) => (
            <div key={order.id} className="bg-surface-elevated rounded-xl border border-white/5 overflow-hidden">
              {/* Order Header */}
              <div className="bg-black/20 p-4 sm:p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full sm:w-auto">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Order Placed</p>
                    <p className="text-sm text-white font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total</p>
                    <p className="text-sm text-white font-medium">${order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Ship To</p>
                    <p className="text-sm text-brand-primary cursor-pointer hover:underline">
                      {user?.firstName} {user?.lastName}
                    </p>
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex items-center sm:justify-end">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </div>
                  </div>
                </div>
                
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-white/5 sm:border-0">
                  <span className="text-sm text-slate-400">Order #<span className="text-white">{order.id}</span></span>
                  <Link to={`/orders/${order.id}`} className="text-sm text-brand-primary hover:text-brand-secondary flex items-center gap-1">
                    View Details <Icons.ChevronRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Order Items Summary */}
              <div className="p-4 sm:p-6">
                <div className="flex flex-wrap gap-4">
                  {order.items.slice(0, 4).map((item: any, idx: number) => (
                    <Link key={idx} to={`/products/${item.productId}`} className="relative group">
                      <div className="w-20 h-20 bg-white/5 rounded-lg p-2 border border-white/10 group-hover:border-brand-primary/50 transition-colors">
                        {/* Assuming we only have the product ID in a real app, but mock data currently has order object shape. Let's mock a grey box or an icon for now since mockData order items don't have images locally. */}
                        <div className="w-full h-full bg-surface-base rounded flex items-center justify-center text-slate-500">
                           <Icons.Box size={24} />
                        </div>
                      </div>
                      <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-surface-elevated">
                        {item.quantity}
                      </span>
                    </Link>
                  ))}
                  {order.items.length > 4 && (
                    <div className="w-20 h-20 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 font-medium">
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
