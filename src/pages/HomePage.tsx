import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../components/Icons';
import { ProductCard } from '../components/ProductCard';
import { mockProducts } from '../lib/mockData';

const CATEGORIES = [
  { name: 'Processors', icon: Icons.Cpu },
  { name: 'Graphics Cards', icon: Icons.Zap },
  { name: 'Motherboards', icon: Icons.Box },
  { name: 'Memory', icon: Icons.Box },
  { name: 'Storage', icon: Icons.Box },
  { name: 'Power Supplies', icon: Icons.Zap },
  { name: 'Cases', icon: Icons.Box },
  { name: 'Cooling', icon: Icons.Gauge },
];

const FEATURES = [
  {
    icon: Icons.Cpu,
    title: 'Next-Gen Tech',
    desc: 'Always stocked with the latest processors, GPUs, and high-speed memory.',
    accent: 'gold',
  },
  {
    icon: Icons.Zap,
    title: 'Insane Speed',
    desc: 'Ultra-fast NVMe storage and DDR5 memory to eliminate every bottleneck.',
    accent: 'gold',
  },
  {
    icon: Icons.ShieldCheck,
    title: 'Lifetime Support',
    desc: 'Every component comes with expert advice and long-term warranty coverage.',
    accent: 'white',
  },
  {
    icon: Icons.Gauge,
    title: 'Benchmarked',
    desc: 'Real-world performance data for every hardware combo we sell.',
    accent: 'white',
  },
];

export function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-surface-base" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,175,55,0.12),transparent)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center pt-32 pb-16">
            {/* Left: Copy */}
            <div className="animate-slide-up">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2.5 bg-brand-primary/10 border border-brand-primary/25 px-4 py-2 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-secondary">
                  RTX 50-Series Now In Stock
                </span>
              </div>

              <h1 className="font-heading text-6xl md:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-8">
                Build Your{' '}
                <span className="block text-gradient">
                  Perfect Rig.
                </span>
              </h1>

              <p className="text-white/50 text-lg leading-relaxed max-w-lg mb-12">
                Premium components, expertly curated. From the world's fastest GPUs
                to server-grade cooling — everything your build demands.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-primary text-surface-base font-bold rounded-2xl hover:bg-brand-secondary transition-all duration-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(212,175,55,0.25)]"
                >
                  <span>Shop Hardware</span>
                  <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/pc-builder"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <Icons.Box className="w-5 h-5 text-brand-primary" />
                  <span>Custom PC Builder</span>
                </Link>
              </div>

              {/* Trust bar */}
              <div className="flex items-center gap-8 mt-14 pt-10 border-t border-white/5">
                {[['10K+', 'Happy Builders'], ['4.9★', 'Average Rating'], ['24h', 'Fast Shipping']].map(([val, label]) => (
                  <div key={label}>
                    <div className="text-2xl font-bold font-heading text-white">{val}</div>
                    <div className="text-[11px] text-white/40 uppercase tracking-wider mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative flex items-center justify-center animate-fade-in">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] blur-2xl" />
              <img
                src="/hero-gaming-pc.png"
                alt="Premium Gaming PC Build"
                className="relative z-10 w-full max-w-[540px] drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] animate-float"
              />
              {/* Floating spec card */}
              <div className="absolute bottom-8 left-0 glass border border-brand-primary/20 rounded-2xl p-4 z-20 shadow-xl min-w-[180px]">
                <div className="text-[10px] uppercase tracking-widest text-brand-secondary/80 mb-1.5">Featured Build</div>
                <div className="text-sm font-heading font-bold text-white leading-tight">RTX 5090 Ti</div>
                <div className="text-[11px] text-white/40 mt-0.5">Ultimate Gaming Beast</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-surface-base to-transparent pointer-events-none" />
      </section>

      {/* ═══════════════════════════════ FEATURES ═══════════════════════════════ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(212,175,55,0.04),transparent)]" />
        <div className="container mx-auto px-6">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-secondary/70">Why Choose Us</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="glass p-8 rounded-3xl border border-white/5 hover:border-brand-primary/20 transition-all duration-500 group hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6 group-hover:bg-brand-primary/20 transition-colors">
                  <Icon className="text-brand-primary w-6 h-6" />
                </div>
                <h3 className="text-base font-heading font-bold mb-3 text-white group-hover:text-brand-secondary transition-colors">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ FEATURED PRODUCTS ═══════════════════════════════ */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-secondary/70 mb-4">Handpicked For You</div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
                Featured{' '}<span className="text-gradient">Hardware</span>
              </h2>
            </div>
            <Link
              to="/products"
              className="group hidden sm:flex items-center gap-2 text-sm font-bold text-white/50 hover:text-brand-secondary transition-colors"
            >
              <span>View All</span>
              <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mockProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center mt-10 sm:hidden">
            <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-brand-secondary">
              <span>View All Products</span>
              <Icons.ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ CATEGORIES ═══════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(212,175,55,0.03),transparent)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-secondary/70 mb-4">Browse by Category</div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Build Your{' '}
              <span className="text-gradient-neon">Dream Machine</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto mt-5 text-sm leading-relaxed">
              Pick your components and start crafting the ultimate gaming experience.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES.map(({ name, icon: Icon }) => (
              <Link
                key={name}
                to={`/products?category=${name}`}
                className="glass p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center hover:border-brand-primary/30 hover:bg-brand-primary/5 hover:-translate-y-1 transition-all duration-300 group gap-3"
              >
                <div className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center group-hover:bg-brand-primary/10 group-hover:border-brand-primary/20 transition-all">
                  <Icon className="w-5 h-5 text-white/50 group-hover:text-brand-primary transition-colors" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 group-hover:text-white/80 transition-colors leading-tight">{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ BOTTOM CTA ═══════════════════════════════ */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-surface-elevated">
            {/* Background glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-primary/8 blur-[80px] rounded-full -translate-x-1/3 translate-y-1/3" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.08),transparent_60%)]" />
            {/* Top gold line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />

            <div className="relative z-10 text-center py-24 px-6 md:px-20">
              <div className="inline-flex items-center gap-2.5 bg-brand-primary/10 border border-brand-primary/25 px-4 py-2 rounded-full mb-8">
                <Icons.Zap className="w-3.5 h-3.5 text-brand-primary" />
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-secondary">
                  10,000+ Satisfied Builders
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
                Ready to{' '}<span className="text-gradient">Upgrade?</span>
              </h2>
              <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
                Join the community of elite builders who trust us with their most important purchase.
                Expert support, premium parts, unbeatable prices.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-brand-primary text-surface-base font-bold rounded-2xl hover:bg-brand-secondary transition-all duration-300 hover:scale-[1.02] shadow-[0_0_40px_rgba(212,175,55,0.25)]"
                >
                  <span>Create Free Account</span>
                  <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  Browse Components
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
