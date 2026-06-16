'use client';

import { Navbar, Footer } from '@/components';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category: string;
  slug: string;
}

const allProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Visual Experience',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&h=500&fit=crop',
    description: 'Experience premium visual clarity with our flagship product. Designed for those who demand the best in optical excellence.',
    category: 'Visual',
    slug: 'premium-visual-experience',
  },
  {
    id: '2',
    name: 'Luxury Design Collection',
    price: 199,
    image: 'https://images.unsplash.com/photo-1598930113854-38c6a72d0e0f?w=500&h=500&fit=crop',
    description: 'A curated collection of luxury designs that blend aesthetics with functionality.',
    category: 'Design',
    slug: 'luxury-design-collection',
  },
  {
    id: '3',
    name: 'Exclusive Portfolio Set',
    price: 249,
    originalPrice: 349,
    image: 'https://images.unsplash.com/photo-1606115915156-f7e3f0d3c7ba?w=500&h=500&fit=crop',
    description: 'Our exclusive portfolio set featuring limited edition pieces.',
    category: 'Portfolio',
    slug: 'exclusive-portfolio-set',
  },
  {
    id: '4',
    name: 'Creative Master Edition',
    price: 349,
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop',
    description: 'The master edition for creative professionals seeking perfection.',
    category: 'Creative',
    slug: 'creative-master-edition',
  },
  {
    id: '5',
    name: 'Premium Collection Vol 2',
    price: 279,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=500&h=500&fit=crop',
    description: 'Volume 2 of our premium collection with enhanced features.',
    category: 'Collection',
    slug: 'premium-collection-vol-2',
  },
  {
    id: '6',
    name: 'Signature Series',
    price: 229,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',
    description: 'Our signature series representing the pinnacle of craftsmanship.',
    category: 'Series',
    slug: 'signature-series',
  },
  {
    id: '7',
    name: 'Elite Luxury Pack',
    price: 449,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'The elite pack for those who accept nothing but the finest.',
    category: 'Elite',
    slug: 'elite-luxury-pack',
  },
  {
    id: '8',
    name: 'Premium Essentials',
    price: 179,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    description: 'Essential premium products for everyday luxury.',
    category: 'Essentials',
    slug: 'premium-essentials',
  },
];

interface ProductDetailClientProps {
  slug: string;
}

export default function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const product = allProducts.find((p) => p.slug === slug);
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 pb-20 bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-light mb-4">Product Not Found</h1>
            <p className="text-gray-400 mb-8">The product you are looking for does not exist.</p>
            <a href="/shop" className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Back to Shop
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-square rounded-lg overflow-hidden bg-white/5"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount && (
                <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 text-xs font-bold rounded-full">
                  -{discount}%
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-center"
            >
              <span className="text-sm text-gray-400 mb-4">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-light tracking-tighter mb-6">
                {product.name}
              </h1>
              <p className="text-gray-400 font-light mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-semibold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold transition-colors ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                <ShoppingCart size={20} />
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
