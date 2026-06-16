'use client';

import { Navbar, Footer } from '@/components';
import { motion } from 'framer-motion';

export default function PortfolioPage() {
  const portfolioItems = [
    {
      id: '1',
      title: 'Luxury Eyewear Collection',
      description: 'Premium sunglasses designed for the modern visionary.',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop',
      category: 'Eyewear',
    },
    {
      id: '2',
      title: 'Medical Vision Solutions',
      description: 'State-of-the-art contact lenses for medical-grade vision correction.',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop',
      category: 'Medical',
    },
    {
      id: '3',
      title: 'Designer Frames',
      description: 'Handcrafted frames from world-renowned designers.',
      image: 'https://images.unsplash.com/photo-1606115915156-f7e3f0d3c7ba?w=800&h=600&fit=crop',
      category: 'Design',
    },
    {
      id: '4',
      title: 'Smart Vision Tech',
      description: 'Cutting-edge technology meets elegant design.',
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop',
      category: 'Technology',
    },
    {
      id: '5',
      title: 'Exclusive Collection',
      description: 'Limited edition pieces for the discerning collector.',
      image: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800&h=600&fit=crop',
      category: 'Exclusive',
    },
    {
      id: '6',
      title: 'Signature Series',
      description: 'Our flagship collection representing the pinnacle of craftsmanship.',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=600&fit=crop',
      category: 'Signature',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-4">
              Our Portfolio
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our curated collection of premium visual products and creative designs
            </p>
          </motion.div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 text-xs rounded-full border border-white/20">
                      {item.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-light mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm font-light">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
