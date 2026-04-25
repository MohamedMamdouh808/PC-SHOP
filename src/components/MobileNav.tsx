import { Link, useNavigate } from "react-router-dom";
import { Icons } from './Icons';
import { Logo } from './Logo';
import { useAuth } from "../context/AuthContext";
import { ThemeToggle } from './ThemeToggle';
import { useState } from "react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  
  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search)}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />
      
      {/* Drawer - Full width on small screens, max width on larger */}
      <div className="relative ml-auto w-full sm:max-w-[320px] bg-stone-950 h-full shadow-2xl flex flex-col transition-all duration-500 glass-dark border-l border-white/5">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/5">
          <Logo size="md" />
          <button 
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-white/5 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <Icons.X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 sm:py-6">
          {/* Search */}
          <form className="px-4 sm:px-6 mb-6 sm:mb-8" onSubmit={handleSearch}>
            <div className="relative group">
              <Icons.Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-accent transition-colors" size={16} />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..." 
                className="w-full bg-stone-900/50 border border-white/5 rounded-xl sm:rounded-2xl pl-10 sm:pl-12 pr-4 py-3 text-white placeholder-stone-600 focus:outline-none focus:border-accent/30 transition-all font-sans text-sm"
              />
            </div>
          </form>

          <nav className="flex flex-col px-2 sm:px-3 space-y-1">
            {[
              { label: 'Home', path: '/' },
              { label: 'All Hardware', path: '/products' },
              { label: 'PC Builder', path: '/pc-builder', highlight: true },
              { label: 'Compare', path: '/compare' },
              { label: 'Wishlist', path: '/wishlist' },
              { label: 'Graphics Cards', path: '/products?category=Graphics+Cards', sub: true },
              { label: 'Processors', path: '/products?category=Processors', sub: true },
            ].map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                onClick={onClose} 
                className={`px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl flex items-center justify-between transition-all font-bold text-xs uppercase tracking-widest ${
                  item.sub
                    ? 'text-stone-500 hover:bg-white/5 hover:text-stone-300 ml-3 sm:ml-4 text-[10px]'
                    : item.highlight 
                      ? 'text-brand-primary hover:bg-brand-primary/10 hover:text-brand-secondary'
                      : 'text-stone-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <Icons.ChevronRight size={14} className="opacity-30" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Theme Toggle in Mobile Nav */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-stone-400 text-xs uppercase tracking-widest font-bold">Theme</span>
            <ThemeToggle />
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t border-white/5 bg-stone-950/50 backdrop-blur-xl">
          {user ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4 px-1">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center text-lg font-black italic">
                  {user.firstName?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <p className="text-white font-bold truncate tracking-tight">{user.firstName} {user.lastName}</p>
                  <p className="text-stone-500 text-xs truncate uppercase tracking-widest font-medium opacity-60">{user.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/profile" onClick={onClose} className="btn bg-white/5 text-white py-3 text-[10px] border border-white/10 rounded-xl hover:bg-white/10 transition-all">Profile</Link>
                <Link to="/orders" onClick={onClose} className="btn bg-white/5 text-white py-3 text-[10px] border border-white/10 rounded-xl hover:bg-white/10 transition-all">Orders</Link>
              </div>
              <button 
                onClick={() => { logout(); onClose(); }}
                className="w-full text-center text-stone-600 hover:text-status-error transition-colors text-[10px] font-black uppercase tracking-[0.2em] pt-2"
              >
                Terminate Session
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={onClose} className="btn bg-white/5 text-white py-4 text-xs border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-center">Sign In</Link>
          )}
        </div>
      </div>
    </div>
  );
}
