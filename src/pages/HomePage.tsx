import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../components/Icons';
import { ProductCard } from '../components/ProductCard';
import { mockProducts } from '../lib/mockData';
import '../styles/pages/HomePage.css';

export function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-hero-glow opacity-60 blur-3xl animate-pulse" />
        
        <div className="container mx-auto px-4 relative z-10 text-center animate-slide-up pt-20">
          <div className="inline-flex items-center space-x-2 bg-brand-primary/10 border border-brand-primary/30 px-4 py-2 rounded-full text-xs font-medium mb-8 shadow-[0_0_20px_rgba(124,58,237,0.4)] animate-pulse">
            <span className="bg-brand-secondary w-2 h-2 rounded-full animate-ping shadow-[0_0_20px_rgba(167,139,250,1),0_0_40px_rgba(124,58,237,0.8)]" />
            <span className="text-white uppercase tracking-widest">New RTX 50-Series Stock Arriving Soon</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight">
            Elevate Your <br />
            <span className="text-gradient">Gaming Reality</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover the most powerful PC hardware on the planet. Built for speed, 
            engineered for performance, and designed for winners.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products"
              className="w-full sm:w-auto px-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-primary/30 hover:shadow-brand-primary/50"
            >
              <span>Explore Hardware</span>
              <Icons.ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              to="/pc-builder"
              className="w-full sm:w-auto px-8 py-4 glass hover:bg-brand-primary/20 text-white rounded-2xl font-bold transition-all border border-brand-primary/20 hover:border-brand-primary/40"
            >
              Custom PC Builder
            </Link>
          </div>
        </div>

        {/* Floating Hardware Graphic (Visual Placeholder/Concept) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-linear-to-t from-surface-base to-transparent pointer-events-none" />
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-surface-base/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="glass p-8 rounded-3xl hover-card group">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/20 flex items-center justify-center mb-6 group-hover:bg-brand-primary/30 transition-colors shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                <Icons.Cpu className="text-white w-8 h-8 drop-shadow-[0_0_10px_rgba(124,58,237,1)]" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-brand-secondary transition-colors">Next-Gen Tech</h3>
              <p className="text-white/50 text-sm">Always stocked with the latest processors, GPUs, and high-speed memory.</p>
            </div>
            <div className="glass p-8 rounded-3xl hover-card group">
              <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors shadow-[0_0_15px_rgba(202,138,4,0.3)]">
                <Icons.Zap className="text-white w-8 h-8 drop-shadow-[0_0_10px_rgba(124,58,237,1)]" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">Insane Speed</h3>
              <p className="text-white/50 text-sm">Ultra-fast NVMe storage and DDR5 memory to eliminate every bottleneck.</p>
            </div>
            <div className="glass p-8 rounded-3xl hover-card group">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <Icons.ShieldCheck className="text-white w-8 h-8 drop-shadow-[0_0_10px_rgba(124,58,237,1)]" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-300 transition-colors">Lifetime Support</h3>
              <p className="text-white/50 text-sm">Every component comes with expert advice and long-term warranty coverage.</p>
            </div>
            <div className="glass p-8 rounded-3xl hover-card group">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-6 group-hover:bg-orange-500/30 transition-colors shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                <Icons.Gauge className="text-white w-8 h-8 drop-shadow-[0_0_10px_rgba(124,58,237,1)]" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-orange-300 transition-colors">Benchmarked</h3>
              <p className="text-white/50 text-sm">Real-world performance data for every hardware combo we sell.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">Featured <span className="text-gradient">Hardware</span></h2>
              <p className="text-white/50 max-w-lg">Hand-picked components for your next ultimate gaming rig.</p>
            </div>
            <Link to="/products" className="group flex items-center space-x-2 text-brand-secondary font-bold transition-all hover:text-brand-primary">
              <span>View All</span>
              <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories / Explore Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-primary/5 -skew-y-3 translate-y-12" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Build Your <span className="text-gradient-neon">Dream Machine</span></h2>
            <p className="text-white/60 max-w-2xl mx-auto">Pick your components and start building the future of your gaming experience.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {['Processors', 'Graphics Cards', 'Motherboards', 'Memory', 'Storage', 'Power Supplies', 'Cases', 'Cooling'].map((cat) => (
              <Link 
                key={cat} 
                to={`/products?category=${cat}`}
                className="glass p-6 rounded-2xl flex flex-col items-center justify-center text-center hover-card transition-all"
              >
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-primary/20 transition-colors">
                  <Icons.Box className="w-6 h-6 text-brand-primary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="glass p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary/20 blur-[120px] rounded-full" />
            
            <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Ready to <span className="text-gradient">Upgrade?</span></h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 relative z-10 leading-relaxed">
              Join thousands of gamers who have built their ultimate battle stations with our premium hardware and expert support.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <Link to="/register" className="w-full sm:w-auto px-12 py-5 bg-brand-primary hover:bg-brand-secondary text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-primary/30">
                Join the Community
              </Link>
              <Link to="/products" className="w-full sm:w-auto px-12 py-5 border border-white/10 hover:border-brand-primary/30 hover:bg-brand-primary/5 text-white rounded-2xl font-bold transition-all">
                Shop Components
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
