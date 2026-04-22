import { Link } from "react-router-dom";
import { Icons } from './Icons';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-[#0C0A09] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-slate-400 max-w-sm">
              The ultimate destination for premium PC hardware, custom builds, and enthusiast gear.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-[#7C3AED] hover:text-white transition-colors">
                <Icons.Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-[#7C3AED] hover:text-white transition-colors">
                <Icons.Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-[#7C3AED] hover:text-white transition-colors">
                <Icons.Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-[#7C3AED] hover:text-white transition-colors">
                <Icons.Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-white">Shop Hardware</h3>
            <ul className="space-y-3">
              <li><Link to="/products?category=Graphics+Cards" className="text-slate-400 hover:text-[#7C3AED] transition-colors">Graphics Cards (GPUs)</Link></li>
              <li><Link to="/products?category=Processors" className="text-slate-400 hover:text-[#7C3AED] transition-colors">Processors (CPUs)</Link></li>
              <li><Link to="/products?category=Motherboards" className="text-slate-400 hover:text-[#7C3AED] transition-colors">Motherboards</Link></li>
              <li><Link to="/products?category=Memory" className="text-slate-400 hover:text-[#7C3AED] transition-colors">Memory (RAM)</Link></li>
              <li><Link to="/products?category=Storage" className="text-slate-400 hover:text-[#7C3AED] transition-colors">Storage (SSD/HDD)</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-white">Customer Support</h3>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-slate-400 hover:text-[#7C3AED] transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-slate-400 hover:text-[#7C3AED] transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-slate-400 hover:text-[#7C3AED] transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/track-order" className="text-slate-400 hover:text-[#7C3AED] transition-colors">Track Order</Link></li>
              <li><Link to="/warranty" className="text-slate-400 hover:text-[#7C3AED] transition-colors">Warranty Info</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-white">Stay in the Loop</h3>
            <p className="text-slate-400 mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="input-field py-2"
                required
              />
              <button type="submit" className="btn-primary px-4">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} PC Shop System. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
