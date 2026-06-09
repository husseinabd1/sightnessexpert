'use client';

import { Navbar, Footer } from '@/components';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { formatCurrency } from '@/utils/helpers';

export default function CartPage() {
  const { items, getTotalPrice, removeItem, updateQuantity } = useCartStore();

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 px-4 bg-black text-white flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <ShoppingCart size={64} className="mx-auto mb-6 text-gray-400" />
            <h1 className="text-3xl font-light mb-4">Your cart is empty</h1>
            <p className="text-gray-400 mb-8">
              Discover our premium collection and add items to your cart.
            </p>
            <a
              href="/shop"
              className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Continue Shopping
            </a>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 pb-20 px-4 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl font-light mb-12 tracking-wide"
          >
            Shopping Cart
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-6 border border-white/10 p-6 rounded-lg hover:border-white/20 transition-colors"
                >
                  <div className="w-24 h-24 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-light mb-2">{item.name}</h3>
                    <p className="text-gray-400 text-sm">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white/10 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="px-3 py-1 hover:bg-white/20 transition-colors"
                      >
                        −
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="px-3 py-1 hover:bg-white/20 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                      <Heart size={20} fill="currentColor" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-lg p-6 h-fit sticky top-24"
            >
              <h2 className="text-lg font-light mb-6 tracking-wide">Order Summary</h2>
              <div className="space-y-4 mb-6 border-b border-white/10 pb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span>{formatCurrency(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tax</span>
                  <span>{formatCurrency(getTotalPrice() * 0.1)}</span>
                </div>
              </div>
              <div className="flex justify-between mb-6 text-lg font-semibold">
                <span>Total</span>
                <span>{formatCurrency(getTotalPrice() * 1.1)}</span>
              </div>
              <button className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors mb-3">
                Checkout
              </button>
              <a
                href="/shop"
                className="block text-center text-sm text-gray-400 hover:text-white transition-colors"
              >
                Continue Shopping
              </a>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
