'use client';

import { Navbar, Footer } from '@/components';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, MapPin, Phone, User, MessageCircle, CheckCircle } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { formatCurrency } from '@/utils/helpers';
import { useState } from 'react';

interface OrderForm {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
}

export default function CartPage() {
  const { items, getTotalPrice, removeItem, updateQuantity, clearCart } = useCartStore();
  const { settings } = useSettingsStore();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [form, setForm] = useState<OrderForm>({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const buildWhatsAppMessage = () => {
    const itemsList = items
      .map(
        (item, i) =>
          `${i + 1}. ${item.name} x${item.quantity} = ${formatCurrency(item.price * item.quantity)}`
      )
      .join('\n');

    const subtotal = getTotalPrice();
    const message = `طلب جديد - Sightness Expert\n\n📦 المنتجات:\n${itemsList}\n\n💰 المجموع: ${formatCurrency(subtotal)}\n🚚 الشحن: مجاني\n💵 الإجمالي: ${formatCurrency(subtotal)}\n💳 الدفع: نقداً عند الاستلام\n\n👤 معلومات الزبون:\nالاسم: ${form.fullName}\nالهاتف: ${form.phone}\nالمحافظة: ${form.city}\nالعنوان: ${form.address}${form.notes ? '\nملاحظات: ' + form.notes : ''}`;

    return encodeURIComponent(message);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const message = buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappUrl, '_blank');
    setOrderSent(true);
    clearCart();
  };

  const isFormValid = form.fullName && form.phone && form.city && form.address;

  // Order sent successfully
  if (orderSent) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 px-4 bg-black text-white flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <CheckCircle size={64} className="mx-auto mb-6 text-green-400" />
            <h1 className="text-3xl font-light mb-4">Order Sent Successfully!</h1>
            <p className="text-gray-400 mb-4">
              Your order has been sent via WhatsApp. We will contact you shortly to confirm.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Payment method: Cash on Delivery
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

  // Empty cart
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
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex gap-4 md:gap-6 border border-white/10 p-4 md:p-6 rounded-lg hover:border-white/20 transition-colors"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-light mb-1 truncate">{item.name}</h3>
                      <p className="text-gray-400 text-sm mb-3">{formatCurrency(item.price)}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-white/10 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, Math.max(1, item.quantity - 1))
                            }
                            className="px-3 py-1 hover:bg-white/20 transition-colors rounded-l-lg"
                          >
                            −
                          </button>
                          <span className="px-3 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-white/20 transition-colors rounded-r-lg"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary & Checkout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Summary */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 sticky top-24">
                <h2 className="text-lg font-light mb-6 tracking-wide">Order Summary</h2>
                <div className="space-y-4 mb-6 border-b border-white/10 pb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal ({items.length} items)</span>
                    <span>{formatCurrency(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                </div>
                <div className="flex justify-between mb-4 text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(getTotalPrice())}</span>
                </div>
                <div className="flex items-center gap-2 mb-6 text-sm text-gray-400 bg-white/5 p-3 rounded-lg">
                  <MessageCircle size={16} className="text-green-400 flex-shrink-0" />
                  <span>Cash on Delivery - Order via WhatsApp</span>
                </div>

                {!showCheckout ? (
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} />
                    Proceed to Order
                  </button>
                ) : null}

                <a
                  href="/shop"
                  className="block text-center text-sm text-gray-400 hover:text-white transition-colors mt-3"
                >
                  Continue Shopping
                </a>
              </div>

              {/* Checkout Form */}
              <AnimatePresence>
                {showCheckout && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white/5 border border-white/10 rounded-lg p-6"
                  >
                    <h2 className="text-lg font-light mb-6 tracking-wide">Delivery Information</h2>
                    <form onSubmit={handleSubmitOrder} className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Full Name *</label>
                        <div className="relative">
                          <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                          <input
                            type="text"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            required
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Phone Number *</label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleInputChange}
                            placeholder="07xxxxxxxxx"
                            required
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-1">City *</label>
                        <div className="relative">
                          <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                          <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleInputChange}
                            placeholder="Your city"
                            required
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Full Address *</label>
                        <div className="relative">
                          <MapPin size={16} className="absolute left-3 top-3 text-gray-500" />
                          <textarea
                            name="address"
                            value={form.address}
                            onChange={handleInputChange}
                            placeholder="Street, building, floor..."
                            required
                            rows={2}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none resize-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Notes (optional)</label>
                        <textarea
                          name="notes"
                          value={form.notes}
                          onChange={handleInputChange}
                          placeholder="Any special instructions..."
                          rows={2}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                          isFormValid
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <MessageCircle size={20} />
                        Send Order via WhatsApp
                      </button>

                      <p className="text-xs text-gray-500 text-center">
                        Your order will be sent to our WhatsApp. We'll confirm shortly.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
