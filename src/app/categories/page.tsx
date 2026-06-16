'use client';

import { Navbar, Footer } from '@/components';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CategoriesPage() {
  const categories = [
    {
      name: 'Visual',
      description: 'Premium visual products for enhanced clarity',
      count: 2,
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&h=500&fit=crop',
    },
    {
      name: 'Design',
      description: 'Luxury designs crafted with precision',
      count: 2,
      image: 'https://images.unsplash.com/photo-1598930113854-38c6a72d0e0f?w=500&h=500&fit=crop',
    },
    {
      name: 'Portfolio',
      description: 'Exclusive portfolio collections',
      count: 1,
      image: 'https://images.unsplash.com/photo-1606115915156-f7e3f0d3c7ba?w=500&h=500&fit=crop',
    },
    {
      name: 'Creative',
      description: 'Creative solutions for professionals',
      count: 1,
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop',
    },
    {
      name: 'Collection',
      description: 'Curated collections of premium items',
      count: 1,
      image: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=500&h=500&fit=crop',
    },
    {
      name: 'Series',
      description: 'Signature series of excellence',
      count: 1,
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',
    },
    {
      name: 'Elite',
      description: 'Elite luxury products',
      count: 1,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    },
    {
      name: 'Essentials',
      description: 'Essential premium everyday items',
      count: 1,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-4">
              Categories
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse our products by category
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, i) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/shop?category=${category.name}`}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-lg aspect-square mb-4 bg-white/5">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-xl font-light tracking-wide">{category.name}</h3>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm font-light">{category.description}</p>
                  <p className="text-gray-500 text-xs mt-1">{category.count} products</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
