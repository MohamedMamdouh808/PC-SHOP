import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Icons } from './Icons';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { MobileNav } from './MobileNav';

export function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'top-4 mx-4 md:mx-8 lg:mx-12 rounded-2xl glass-dark shadow-2xl py-3 border border-white/10' 
          : 'top-0 py-6 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Logo size="lg" />

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-10 text-xs font-bold uppercase tracking-[0.2em]">
            <Link
              to="/products"
              className={`transition-all duration-300 hover:text-brand-secondary ${isActive('/products') ? 'text-brand-secondary' : 'text-stone-400'}`}
            >
              Hardware
            </Link>
            <Link
              to="/products?category=Graphics+Cards"
              className="text-stone-400 hover:text-brand-secondary transition-all duration-300"
            >
              GPUs
            </Link>
            <Link
              to="/products?category=Processors"
              className="text-stone-400 hover:text-brand-secondary transition-all duration-300"
            >
              CPUs
            </Link>
            <Link
              to="/pc-builder"
              className={`transition-all duration-300 hover:text-brand-secondary ${isActive('/pc-builder') ? 'text-brand-secondary' : 'text-stone-400'}`}
            >
              PC Builder
            </Link>
            <Link
              to="/deals"
              className="relative text-accent group transition-all hover:text-accent/80"
            >
              <span>Elite Deals</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:flex p-2.5 text-stone-400 hover:text-brand-secondary transition-colors cursor-pointer rounded-full hover:bg-brand-primary/10">
              <Icons.Search className="w-5 h-5" />
            </button>

            <Link 
              to="/cart" 
              className={`relative p-2.5 transition-colors rounded-full hover:bg-brand-primary/10 ${itemCount > 0 ? 'text-brand-secondary' : 'text-stone-400 hover:text-brand-secondary'}`}
            >
              <Icons.ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 bg-brand-primary text-[10px] font-black text-white w-5 h-5 flex items-center justify-center rounded-full border-2 border-stone-900 shadow-xl shadow-brand-primary/30 animate-pulse">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />

            {user ? (
              <div className="hidden sm:flex items-center space-x-1">
                <Link to="/profile" className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${isActive('/profile') ? 'bg-brand-primary/20 text-brand-secondary border border-brand-primary/30' : 'text-stone-300 hover:bg-brand-primary/10'}`}>
                  <div className="w-6 h-6 rounded-full bg-brand-primary/30 flex items-center justify-center border border-brand-secondary/30 text-[10px] font-bold text-brand-secondary">
                    {user.firstName?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-bold text-xs uppercase tracking-widest">{user.firstName}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2.5 text-stone-500 hover:text-status-error transition-colors cursor-pointer"
                  title="Logout"
                >
                  <Icons.LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="!hidden lg:!flex btn px-6 py-2.5 text-[10px] bg-brand-primary/20 hover:bg-brand-primary/30 text-white border border-brand-primary/30 hover:border-brand-secondary/50 rounded-xl transition-all hover:shadow-[0_0_15px_rgba(124,58,237,0.3)]"
              >
                Sign In
              </Link>
            )}

            <button
              className="lg:hidden p-2.5 text-stone-300 hover:text-brand-secondary cursor-pointer rounded-full transition-colors hover:bg-brand-primary/10"
              onClick={() => setIsMobileNavOpen(true)}
            >
              <Icons.Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
      
      <MobileNav 
        isOpen={isMobileNavOpen} 
        onClose={() => setIsMobileNavOpen(false)} 
      />
    </>
  );
}
