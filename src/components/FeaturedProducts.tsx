'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { formatCurrency, calculateDiscount } from '@/utils/helpers';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
  featured?: boolean;
}

const ProductCard = ({ id, name, price, originalPrice, image, slug, featured }: ProductCardProps) => {
  const discount = originalPrice ? calculateDiscount(originalPrice, price) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link href={`/products/${slug}`}>
        <div className="relative overflow-hidden rounded-lg mb-4 bg-white/5 aspect-square">
          {/* Product Image */}
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Discount Badge */}
          {discount && (
            <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 text-xs font-bold tracking-wider rounded-full">
              -{discount}%
            </div>
          )}

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 left-4 border border-white px-3 py-1 text-xs font-light tracking-wider rounded-full">
              FEATURED
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-white text-black px-6 py-3 font-semibold text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors">
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Product Info */}
        <h3 className="text-sm font-light tracking-wide mb-2 group-hover:text-gray-300 transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">{formatCurrency(price)}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatCurrency(originalPrice)}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

interface FeaturedProductsProps {
  products?: ProductCardProps[];
}

export const FeaturedProducts = ({ products = [] }: FeaturedProductsProps) => {
  // Empty products - all products should be added via admin dashboard
  const defaultProducts: ProductCardProps[] = [
    {
      id: '1',
      name: 'Premium Visual Experience',
      price: 299,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&h=500&fit=crop',
      slug: 'premium-visual-experience',
      featured: true,
    },
    {
      id: '2',
      name: 'Luxury Design Collection',
      price: 199,
      image: 'https://images.unsplash.com/photo-1598930113854-38c6a72d0e0f?w=500&h=500&fit=crop',
      slug: 'luxury-design-collection',
    },
    {
      id: '3',
      name: 'Exclusive Portfolio Set',
      price: 249,
      originalPrice: 349,
      image: 'https://images.unsplash.com/photo-1606115915156-f7e3f0d3c7ba?w=500&h=500&fit=crop',
      slug: 'exclusive-portfolio-set',
      featured: true,
    },
    {
      id: '4',
      name: 'Creative Master Edition',
      price: 349,
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop',
      slug: 'creative-master-edition',
    },
  ];

  const displayProducts = products.length > 0 ? products : defaultProducts;

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tighter mb-4">
            Featured Collection
          </h2>
          <p className="text-gray-400 font-light max-w-2xl mx-auto">
            Discover our curated selection of premium visual products and exclusive designs
          </p>
        </motion.div>

        {/* Products Grid or Empty State */}
        {displayProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <Link
                href="/shop"
                className="inline-block px-8 py-4 border-2 border-white text-white font-semibold text-sm tracking-wider hover:bg-white hover:text-black transition-colors duration-300"
              >
                View All Products
              </Link>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center py-20 border border-white/10 rounded-lg bg-white/5"
          >
            <h3 className="text-2xl font-light mb-4">No Products Available</h3>
            <p className="text-gray-400 font-light mb-6">Start by adding products through the admin dashboard</p>
            <Link
              href="/auth/login"
              className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Go to Admin Dashboard
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};
