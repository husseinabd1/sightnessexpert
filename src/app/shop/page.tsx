'use client';

import { Navbar, Footer } from '@/components';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { useState } from 'react';

const ShopPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  const products = [
    {
      id: '1',
      name: 'Premium Visual Experience',
      price: 299,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&h=500&fit=crop',
      category: 'Visual',
    },
    {
      id: '2',
      name: 'Luxury Design Collection',
      price: 199,
      image: 'https://images.unsplash.com/photo-1598930113854-38c6a72d0e0f?w=500&h=500&fit=crop',
      category: 'Design',
    },
    {
      id: '3',
      name: 'Exclusive Portfolio Set',
      price: 249,
      originalPrice: 349,
      image: 'https://images.unsplash.com/photo-1606115915156-f7e3f0d3c7ba?w=500&h=500&fit=crop',
      category: 'Portfolio',
    },
    {
      id: '4',
      name: 'Creative Master Edition',
      price: 349,
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop',
      category: 'Creative',
    },
    {
      id: '5',
      name: 'Premium Collection Vol 2',
      price: 279,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=500&h=500&fit=crop',
      category: 'Collection',
    },
    {
      id: '6',
      name: 'Signature Series',
      price: 229,
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',
      category: 'Series',
    },
    {
      id: '7',
      name: 'Elite Luxury Pack',
      price: 449,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
      category: 'Elite',
    },
    {
      id: '8',
      name: 'Premium Essentials',
      price: 179,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
      category: 'Essentials',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-20 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-4">
              Explore Our Collection
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Discover our curated selection of premium visual products and exclusive designs
            </p>
          </motion.div>

          <div className="flex gap-8">
            {/* Filters - Mobile button */}
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="md:hidden flex items-center gap-2 mb-6 p-3 border border-white/20 rounded-lg"
            >
              <Filter size={20} />
              Filters
            </button>

            {/* Sidebar Filters */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`hidden md:block w-64 flex-shrink-0`}
            >
              <div className="space-y-6 bg-white/5 p-6 rounded-lg border border-white/10">
                <div>
                  <h3 className="font-light text-lg mb-4 tracking-wide">Categories</h3>
                  <div className="space-y-2">
                    {['All', 'Visual', 'Design', 'Portfolio', 'Creative', 'Collection'].map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" defaultChecked={cat === 'All'} />
                        <span className="text-sm font-light">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h3 className="font-light text-lg mb-4 tracking-wide">Price</h3>
                  <input type="range" min="0" max="500" className="w-full" />
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h3 className="font-light text-lg mb-4 tracking-wide">Sort By</h3>
                  <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm">
                    <option>Latest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Most Popular</option>
                  </select>
                </div>
              </div>
            </motion.aside>

            {/* Products Grid */}
            <div className="flex-1">
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-lg mb-4 bg-white/5 aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.originalPrice && (
                        <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 text-xs font-bold rounded-full">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                    <h3 className="text-sm font-light mb-2 group-hover:text-gray-300">
                      {product.name}
                    </h3>
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
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopPage;
