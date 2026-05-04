import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Icons } from '../components/Icons';
import { ProductCard } from "../components/ProductCard";
import { mockProducts, mockCategories, mockBrands } from "../lib/mockData";

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filters state
  const categoryFilter = searchParams.get("category") || "All";
  const searchFilter = searchParams.get("search") || "";
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  // Filtering logic
  const filteredProducts = useMemo(() => {
    let result = mockProducts;

    if (categoryFilter !== "All") {
      result = result.filter(p => p.category === categoryFilter);
    }

    if (searchFilter) {
      const lowerQuery = searchFilter.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.brand.toLowerCase().includes(lowerQuery)
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    if (inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' keeps default mock data order
        break;
    }

    return result;
  }, [categoryFilter, searchFilter, selectedBrands, inStockOnly, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleCategoryChange = (category: string) => {
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-20 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-2 tracking-tight">
            {categoryFilter === "All" ? "All Hardware" : categoryFilter}
          </h1>
          <p className="text-slate-400 font-medium">
            {filteredProducts.length} items found
          </p>
        </div>

        {searchFilter && (
          <div className="bg-brand-primary/20 text-brand-secondary px-4 py-2 rounded-xl flex items-center gap-2 border border-brand-primary/30 w-fit">
            <span>Search: "{searchFilter}"</span>
            <button 
              onClick={() => { searchParams.delete("search"); setSearchParams(searchParams); }}
              className="hover:text-white"
            >
              <Icons.X size={16} />
            </button>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button 
            className="md:hidden btn-secondary px-4 py-2 flex items-center gap-2"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <Icons.Filter size={18} />
            Filters
          </button>

          <div className="relative group z-30">
            <button className="btn-secondary px-4 py-2 flex items-center gap-2 min-w-[180px] justify-between">
              Sort by: {sortBy === 'featured' ? 'Featured' : sortBy === 'price-asc' ? 'Low to High' : sortBy === 'price-desc' ? 'High to Low' : 'Top Rated'}
              <Icons.ChevronDown size={16} />
            </button>
            <div className="absolute right-0 top-full mt-2 w-full bg-surface-elevated border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <button onClick={() => setSortBy("featured")} className="w-full text-left px-4 py-3 hover:bg-white/5 text-sm text-slate-300 hover:text-white transition-colors">Featured</button>
              <button onClick={() => setSortBy("price-asc")} className="w-full text-left px-4 py-3 hover:bg-white/5 text-sm text-slate-300 hover:text-white transition-colors">Price: Low to High</button>
              <button onClick={() => setSortBy("price-desc")} className="w-full text-left px-4 py-3 hover:bg-white/5 text-sm text-slate-300 hover:text-white transition-colors">Price: High to Low</button>
              <button onClick={() => setSortBy("rating")} className="w-full text-left px-4 py-3 hover:bg-white/5 text-sm text-slate-300 hover:text-white transition-colors">Top Rated</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`fixed inset-0 z-50 bg-surface-base/95 backdrop-blur-md p-6 overflow-y-auto transform transition-transform duration-300 md:relative md:inset-auto md:bg-transparent md:backdrop-blur-none md:p-0 md:w-64 md:flex-shrink-0 md:transform-none ${isMobileFiltersOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between mb-8 md:hidden">
            <h2 className="text-xl font-heading font-bold text-white">Filters</h2>
            <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 bg-white/5 rounded-lg text-slate-300 hover:text-white">
              <Icons.X size={20} />
            </button>
          </div>

          <div className="space-y-8 sticky top-32">
            {/* Categories */}
            <div>
              <h3 className="font-heading font-bold text-white mb-4 uppercase tracking-wider text-xs">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleCategoryChange("All")}
                    className={`text-sm transition-colors ${categoryFilter === "All" ? "text-brand-primary font-bold" : "text-slate-400 hover:text-white"}`}
                  >
                    All Parts
                  </button>
                </li>
                {mockCategories.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => handleCategoryChange(cat)}
                      className={`text-sm transition-colors ${categoryFilter === cat ? "text-brand-primary font-bold" : "text-slate-400 hover:text-white"}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="border-white/10" />

            {/* Brands */}
            <div>
              <h3 className="font-heading font-bold text-white mb-4 uppercase tracking-wider text-xs">Brands</h3>
              <ul className="space-y-3">
                {mockBrands.map(brand => {
                  const isSelected = selectedBrands.includes(brand);
                  return (
                    <li key={brand}>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${isSelected ? "bg-brand-primary" : "bg-surface-elevated border border-white/10 group-hover:border-white/30"}`}>
                          {isSelected && <Icons.Check size={14} className="text-white" />}
                        </div>
                        <span className={`text-sm ${isSelected ? "text-white font-medium" : "text-slate-400 group-hover:text-white font-medium"}`}>{brand}</span>
                      </label>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={isSelected}
                        onChange={() => toggleBrand(brand)}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>

            <hr className="border-white/10" />

            {/* Availability */}
            <div>
              <h3 className="font-heading font-bold text-white mb-4 uppercase tracking-wider text-xs">Availability</h3>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-10 h-5 rounded-full p-1 transition-colors ${inStockOnly ? "bg-brand-primary" : "bg-surface-elevated border border-white/10"}`}>
                  <div className={`w-3 h-3 rounded-full bg-white transition-transform ${inStockOnly ? "translate-x-5" : "translate-x-0"}`} />
                </div>
                <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">In Stock Only</span>
                <input type="checkbox" className="hidden" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
              </label>
            </div>
          </div>
          
          <div className="mt-8 md:hidden">
            <button className="btn-primary w-full py-3 shadow-lg shadow-brand-primary/20" onClick={() => setIsMobileFiltersOpen(false)}>
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, idx) => (
                <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-surface-elevated border border-white/5 rounded-3xl flex flex-col items-center justify-center py-24 px-4 text-center">
              <div className="w-20 h-20 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mb-6 ring-8 ring-brand-primary/5">
                <Icons.Search size={40} />
              </div>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">No products found</h2>
              <p className="text-slate-400 max-w-md">
                We couldn't find any hardware matching your current filters. Try removing some filters or searching for a different component.
              </p>
              <button 
                className="mt-8 btn-secondary px-6 py-3"
                onClick={() => {
                  if (categoryFilter !== "All") handleCategoryChange("All");
                  if (searchFilter) { searchParams.delete("search"); setSearchParams(searchParams); }
                  setSelectedBrands([]);
                  setInStockOnly(false);
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
