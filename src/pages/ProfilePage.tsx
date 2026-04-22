import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Icons } from '../components/Icons';
import '../styles/pages/ProfilePage.css';

type Tab = 'personal' | 'orders' | 'payment' | 'addresses';

export function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('personal');
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    currentPassword: '',
    newPassword: '',
  });

  // Payment methods mock data
  const [paymentMethods] = useState([
    { id: 1, type: 'visa', last4: '4242', expiry: '12/25', default: true },
    { id: 2, type: 'mastercard', last4: '8888', expiry: '08/26', default: false },
  ]);

  // Addresses mock data
  const [addresses] = useState([
    { id: 1, label: 'Home', street: '123 Main Street', city: 'New York', state: 'NY', zip: '10001', default: true },
    { id: 2, label: 'Office', street: '456 Business Ave', city: 'San Francisco', state: 'CA', zip: '94102', default: false },
  ]);

  // Orders mock data
  const [orders] = useState([
    { id: 'ORD-001', status: 'Delivered', total: 1599.99, items: 1, date: '2024-01-15' },
    { id: 'ORD-002', status: 'Shipped', total: 549.99, items: 2, date: '2024-01-20' },
    { id: 'ORD-003', status: 'Processing', total: 299.99, items: 1, date: '2024-01-22' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="bg-surface-elevated rounded-2xl border border-white/5 p-6 md:p-8">
            <h2 className="text-xl font-heading font-bold text-white border-b border-white/5 pb-4 mb-6">Order History</h2>
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white">{order.id}</h3>
                    <p className="text-sm text-slate-400">{order.items} item(s) • {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">${order.total.toFixed(2)}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/orders" className="btn-primary w-full mt-4 text-center block py-3">
              View All Orders
            </Link>
          </div>
        );

      case 'payment':
        return (
          <div className="bg-surface-elevated rounded-2xl border border-white/5 p-6 md:p-8">
            <h2 className="text-xl font-heading font-bold text-white border-b border-white/5 pb-4 mb-6">Payment Methods</h2>
            <div className="space-y-4">
              {paymentMethods.map(method => (
                <div key={method.id} className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                      {method.type === 'visa' ? (
                        <span className="text-blue-400 font-bold text-xs">VISA</span>
                      ) : (
                        <span className="text-red-400 font-bold text-xs">MC</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white">•••• {method.last4}</p>
                      <p className="text-sm text-slate-400">Expires {method.expiry}</p>
                    </div>
                  </div>
                  {method.default && (
                    <span className="text-xs bg-brand-primary/20 text-brand-primary px-2 py-1 rounded-full">Default</span>
                  )}
                </div>
              ))}
            </div>
            <button className="btn-primary w-full mt-4 py-3 flex items-center justify-center gap-2">
              <Icons.Plus size={18} /> Add New Card
            </button>
          </div>
        );

      case 'addresses':
        return (
          <div className="bg-surface-elevated rounded-2xl border border-white/5 p-6 md:p-8">
            <h2 className="text-xl font-heading font-bold text-white border-b border-white/5 pb-4 mb-6">Saved Addresses</h2>
            <div className="space-y-4">
              {addresses.map(address => (
                <div key={address.id} className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icons.MapPin size={18} className="text-brand-primary" />
                      <span className="font-bold text-white">{address.label}</span>
                      {address.default && (
                        <span className="text-xs bg-brand-primary/20 text-brand-primary px-2 py-1 rounded-full">Default</span>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm ml-6">{address.street}</p>
                  <p className="text-slate-400 text-sm ml-6">{address.city}, {address.state} {address.zip}</p>
                </div>
              ))}
            </div>
            <button className="btn-primary w-full mt-4 py-3 flex items-center justify-center gap-2">
              <Icons.Plus size={18} /> Add New Address
            </button>
          </div>
        );

      default:
        return (
          <div className="bg-surface-elevated rounded-2xl border border-white/5 p-6 md:p-8">
            <h2 className="text-xl font-heading font-bold text-white border-b border-white/5 pb-4 mb-6">Personal Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">First Name</label>
                  <input type="text" className="input-field" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Last Name</label>
                  <input type="text" className="input-field" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Email Address</label>
                  <input type="email" className="input-field opacity-50 cursor-not-allowed" value={formData.email} disabled />
                  <p className="text-xs text-slate-500">Email address cannot be changed.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Phone Number</label>
                  <input type="tel" className="input-field" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              <h2 className="text-xl font-heading font-bold text-white border-b border-white/5 pb-4 mb-6 mt-12">Change Password</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Current Password</label>
                  <input type="password" className="input-field" value={formData.currentPassword} onChange={(e) => setFormData({...formData, currentPassword: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">New Password</label>
                  <input type="password" className="input-field" value={formData.newPassword} onChange={(e) => setFormData({...formData, newPassword: e.target.value})} />
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button type="submit" className="btn-primary px-8 py-3">Save Changes</button>
              </div>
            </form>
          </div>
        );
    }
  };

  return (
    <div className="profile-page-container container mx-auto px-4 py-8 md:py-12 mt-20 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">My Profile</h1>
        <p className="text-slate-400">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Menu */}
        <div className="lg:col-span-1">
          <div className="bg-surface-elevated rounded-2xl border border-white/5 overflow-hidden sticky top-24">
            <div className="p-6 border-b border-white/5 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-accent rounded-full mx-auto flex items-center justify-center shadow-lg shadow-brand-primary/20 mb-4">
                <span className="text-2xl font-bold text-white">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </span>
              </div>
              <h3 className="font-heading font-bold text-white text-lg">{user?.firstName} {user?.lastName}</h3>
              <p className="text-sm text-slate-400">{user?.role}</p>
            </div>
            
            <nav className="p-2 flex flex-col gap-1">
              <button 
                onClick={() => setActiveTab('personal')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                  activeTab === 'personal' 
                    ? 'bg-white/5 text-white font-medium' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icons.User size={18} className={activeTab === 'personal' ? 'text-brand-primary' : ''} /> 
                Personal Info
              </button>
              
              <button 
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                  activeTab === 'orders' 
                    ? 'bg-white/5 text-white font-medium' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icons.Package size={18} className={activeTab === 'orders' ? 'text-brand-primary' : ''} /> 
                Order History
              </button>
              
              <button 
                onClick={() => setActiveTab('payment')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                  activeTab === 'payment' 
                    ? 'bg-white/5 text-white font-medium' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icons.CreditCard size={18} className={activeTab === 'payment' ? 'text-brand-primary' : ''} /> 
                Payment Methods
              </button>
              
              <button 
                onClick={() => setActiveTab('addresses')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                  activeTab === 'addresses' 
                    ? 'bg-white/5 text-white font-medium' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icons.MapPin size={18} className={activeTab === 'addresses' ? 'text-brand-primary' : ''} /> 
                Saved Addresses
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
