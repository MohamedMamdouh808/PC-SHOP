import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Icons } from './Icons';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ThemeToggle } from './ThemeToggle';
import { MobileNav } from './MobileNav';
import { SearchAutocomplete } from './SearchAutocomplete';

export function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger cart bounce animation when itemCount changes
  useEffect(() => {
    if (itemCount > 0) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 300);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

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
              to="/pc-builder"
              className={`transition-all duration-300 hover:text-brand-secondary ${isActive('/pc-builder') ? 'text-brand-secondary' : 'text-stone-400'}`}
            >
              PC Builder
            </Link>
            <Link
              to="/compare"
              className={`transition-all duration-300 hover:text-brand-secondary ${isActive('/compare') ? 'text-brand-secondary' : 'text-stone-400'}`}
            >
              Compare
            </Link>
            <Link
              to="/"
              className="relative text-accent group transition-all hover:text-accent/80"
            >
              <span>Home</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex p-2.5 text-stone-400 hover:text-brand-secondary transition-colors cursor-pointer rounded-full hover:bg-brand-primary/10"
            >
              <Icons.Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle - Available to all */}
            <ThemeToggle />

            {/* Wishlist - Available to all */}
            <Link to="/wishlist" className="relative p-2.5 text-stone-400 hover:text-brand-secondary transition-colors rounded-full hover:bg-brand-primary/10">
              <Icons.Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 bg-red-500 text-[10px] font-black text-white w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistItems.length > 9 ? '9+' : wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart - Available to all */}
            <Link 
              to="/cart" 
              className={`relative p-2.5 transition-colors rounded-full hover:bg-brand-primary/10 ${itemCount > 0 ? 'text-brand-secondary' : 'text-stone-400 hover:text-brand-secondary'} ${cartBounce ? 'cart-icon-bounce' : ''}`}
            >
              <Icons.ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 bg-brand-primary text-[10px] font-black text-white w-5 h-5 flex items-center justify-center rounded-full border-2 border-stone-900 shadow-xl shadow-brand-primary/30 animate-pulse">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />

            {/* User Section */}
            {user ? (
              <div className="hidden sm:flex items-center gap-1">
                <Link to="/profile" className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all ${isActive('/profile') ? 'bg-brand-primary/20 text-brand-secondary border border-brand-primary/30' : 'text-stone-300 hover:bg-brand-primary/10'}`}>
                  <div className="w-7 h-7 rounded-full bg-brand-primary/30 flex items-center justify-center border border-brand-secondary/30 text-xs font-bold text-brand-secondary">
                    {user.firstName?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-bold text-xs uppercase tracking-widest hidden xl:block">{user.firstName}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2.5 text-stone-500 hover:text-red-400 transition-colors cursor-pointer rounded-full hover:bg-red-500/10"
                  title="Logout"
                >
                  <Icons.LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden lg:flex btn px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-brand-primary hover:bg-brand-secondary text-white rounded-xl transition-all hover:shadow-[0_0_15px_rgba(124,58,237,0.3)]"
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
      
      <SearchAutocomplete 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}
