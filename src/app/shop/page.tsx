'use client';

import { Navbar, Footer } from '@/components';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, X, SlidersHorizontal, ShoppingCart } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { useProductStore } from '@/stores/productStore';
import Link from 'next/link';

const categories = ['All', 'Visual', 'Design', 'Portfolio', 'Creative', 'Collection', 'Series', 'Elite', 'Essentials'];

type SortOption = 'latest' | 'price-asc' | 'price-desc' | 'name-asc';

const ShopPage = () => {
  const { products, getActiveProducts } = useProductStore();
  const activeProducts = getActiveProducts();
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(500);
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const filteredProducts = useMemo(() => {
    let result = [...activeProducts];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter((product) => product.category === selectedCategory);
    }

    result = result.filter((product) => product.price <= priceRange);

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'latest':
      default:
        break;
    }

    return result;
  }, [activeProducts, searchQuery, selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange(500);
    setSortBy('latest');
  };

  const hasActiveFilters = !!(searchQuery) || selectedCategory !== 'All' || priceRange < 500 || sortBy !== 'latest';

  const handleAddToCart = (product: typeof activeProducts[0]) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-20 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-4">
              Explore Our Collection
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Discover our curated selection of premium visual products and exclusive designs
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </motion.div>

          <div className="md:hidden mb-6">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 p-3 border border-white/20 rounded-lg hover:bg-white/5"
            >
              <SlidersHorizontal size={20} />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-white rounded-full" />
              )}
            </button>
          </div>

          <div className="flex gap-8">
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:block w-64 flex-shrink-0"
            >
              <FilterPanel
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                sortBy={sortBy}
                setSortBy={setSortBy}
                hasActiveFilters={hasActiveFilters}
                clearFilters={clearFilters}
              />
            </motion.aside>

            <AnimatePresence>
              {filterOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 md:hidden"
                >
                  <div
                    className="absolute inset-0 bg-black/80"
                    onClick={() => setFilterOpen(false)}
                  />
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'tween', duration: 0.3 }}
                    className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-black border-r border-white/10 p-6 overflow-y-auto"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-light">Filters</h2>
                      <button
                        onClick={() => setFilterOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-lg"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <FilterPanel
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      sortBy={sortBy}
                      setSortBy={setSortBy}
                      hasActiveFilters={hasActiveFilters}
                      clearFilters={clearFilters}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-400">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
                  >
                    <X size={14} />
                    Clear all filters
                  </button>
                )}
              </div>

              {filteredProducts.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: i * 0.03 }}
                        whileHover={{ y: -5 }}
                        className="group cursor-pointer"
                      >
                        <div className="relative overflow-hidden rounded-lg mb-4 bg-white/5 aspect-square">
                          <Link href={`/products/${product.slug}`}>
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </Link>
                          {product.originalPrice && (
                            <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 text-xs font-bold rounded-full">
                              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                            </div>
                          )}
                          <div className="absolute top-4 left-4">
                            <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 text-xs rounded-full border border-white/20">
                              {product.category}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <button
                              onClick={() => handleAddToCart(product)}
                              className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
                                addedProductId === product.id
                                  ? 'bg-green-600 text-white'
                                  : 'bg-white text-black hover:bg-gray-200'
                              }`}
                            >
                              <ShoppingCart size={16} />
                              {addedProductId === product.id ? 'Added!' : 'Add to Cart'}
                            </button>
                          </div>
                        </div>
                        <Link href={`/products/${product.slug}`}>
                          <h3 className="text-sm font-light mb-2 group-hover:text-gray-300">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <Search size={48} className="text-gray-600 mb-4" />
                  <h3 className="text-xl font-light mb-2">No products found</h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2 border border-white/30 rounded-lg hover:bg-white/10 text-sm"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

interface FilterPanelProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  priceRange: number;
  setPriceRange: (price: number) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

const FilterPanel = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  hasActiveFilters,
  clearFilters,
}: FilterPanelProps) => {
  return (
    <div className="space-y-6 bg-white/5 p-6 rounded-lg border border-white/10">
      <div>
        <h3 className="font-light text-lg mb-4 tracking-wide">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-light transition-colors ${
                selectedCategory === cat
                  ? 'bg-white text-black'
                  : 'hover:bg-white/10 text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 pt-6">
        <h3 className="font-light text-lg mb-4 tracking-wide">Price Range</h3>
        <input
          type="range"
          min="100"
          max="500"
          step="10"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-white cursor-pointer"
        />
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>$100</span>
          <span className="text-white font-medium">Up to ${priceRange}</span>
          <span>$500</span>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6">
        <h3 className="font-light text-lg mb-4 tracking-wide">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white cursor-pointer"
        >
          <option value="latest">Latest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
        </select>
      </div>

      {hasActiveFilters && (
        <div className="border-t border-white/10 pt-6">
          <button
            onClick={clearFilters}
            className="w-full py-2 text-sm border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
