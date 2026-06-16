'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useProductStore } from '@/stores/productStore';
import { useState } from 'react';

interface ProductDetailClientProps {
  slug: string;
}

export default function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const product = useProductStore((state) => state.getProductBySlug(slug));
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <>
        <div className="min-h-screen pt-24 pb-20 bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-light mb-4">Product Not Found</h1>
            <p className="text-gray-400 mb-8">The product you are looking for does not exist.</p>
            <a href="/shop" className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Back to Shop
            </a>
          </div>
        </div>
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
    <div className="min-h-screen pt-24 pb-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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

            <div className="mb-8">
              <span className={`text-sm ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold transition-colors ${
                added
                  ? 'bg-green-600 text-white'
                  : product.stock > 0
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart size={20} />
              {added ? 'Added to Cart!' : product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>

            <div className="mt-8 pt-8 border-t border-white/10">
              <Link href="/shop" className="text-gray-400 hover:text-white transition-colors text-sm">
                ← Back to Shop
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
