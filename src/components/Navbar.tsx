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
          ? 'top-2 md:top-4 mx-2 md:mx-8 lg:mx-12 rounded-xl md:rounded-2xl glass-dark shadow-2xl py-2 md:py-3 border border-white/10' 
          : 'top-0 py-4 md:py-6 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-3 md:px-6 flex items-center justify-between">
          {/* Logo - Smaller on mobile */}
          <div className="md:hidden">
            <Logo size="sm" />
          </div>
          <div className="hidden md:block">
            <Logo size="lg" />
          </div>

          {/* Desktop & Tablet Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-10 text-xs font-bold uppercase tracking-[0.15em] lg:tracking-[0.2em]">
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
              className={`hidden lg:block transition-all duration-300 hover:text-brand-secondary ${isActive('/compare') ? 'text-brand-secondary' : 'text-stone-400'}`}
            >
              Compare
            </Link>
            <Link
              to="/"
              className="hidden lg:block relative text-accent group transition-all hover:text-accent/80"
            >
              <span>Home</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search - Mobile: icon only, shown inline */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex md:hidden p-2 text-stone-400 hover:text-brand-secondary transition-colors cursor-pointer rounded-full hover:bg-brand-primary/10"
              aria-label="Search"
            >
              <Icons.Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex p-2.5 text-stone-400 hover:text-brand-secondary transition-colors cursor-pointer rounded-full hover:bg-brand-primary/10"
            >
              <Icons.Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle - Hidden on mobile (in drawer instead) */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Wishlist - Available to all */}
            <Link to="/wishlist" className="relative p-2 md:p-2.5 text-stone-400 hover:text-brand-secondary transition-colors rounded-full hover:bg-brand-primary/10">
              <Icons.Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 bg-cta text-[10px] font-black text-black w-4 h-4 flex items-center justify-center rounded-full shadow-lg">
                  {wishlistItems.length > 9 ? '9+' : wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart - Available to all */}
            <Link 
              to="/cart" 
              className={`relative p-2 md:p-2.5 transition-colors rounded-full hover:bg-brand-primary/10 ${itemCount > 0 ? 'text-brand-secondary' : 'text-stone-400 hover:text-brand-secondary'} ${cartBounce ? 'cart-icon-bounce' : ''}`}
            >
              <Icons.ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 bg-brand-primary text-[10px] font-black text-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-surface-base shadow-xl shadow-brand-primary/30 animate-pulse">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />

            {/* User Section */}
            {user ? (
              <div className="hidden md:flex items-center gap-1">
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
                className="!hidden md:!flex btn w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-brand-primary hover:bg-brand-secondary text-black rounded-xl transition-all hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              >
                Sign In
              </Link>
            )}

            {/* Hamburger Menu - Show on mobile and tablet */}
            <button
              className="lg:hidden p-2 md:p-2.5 text-stone-300 hover:text-brand-secondary cursor-pointer rounded-full transition-colors hover:bg-brand-primary/10"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <Icons.Menu className="w-5 h-5 md:w-6 md:h-6" />
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
