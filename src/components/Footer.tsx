'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, Mail, X, MessageCircle, ShoppingBag, Camera, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const TiktokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const Footer = () => {
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
  const whatsappNumber = "+9647700000000"; // 💡 Put your full WhatsApp number here with country code

  const links = {
    shop: [
      { label: 'Products', href: '/shop' },
      { label: 'Categories', href: '/categories' },
      { label: 'Sale', href: '/shop?filter=sale' },
      { label: 'New Arrivals', href: '/shop?sort=newest' },
    ],
    legal: [
      { label: 'Privacy Policy & DMCA', href: '/privacy' },
      { label: 'How to Order via WhatsApp', onClick: () => setIsWhatsappModalOpen(true) },
    ],
    social: [
      { icon: Instagram, href: 'https://www.instagram.com/sightness_expert/', label: 'Instagram' },
      { icon: Facebook, href: 'https://www.facebook.com/sightnessexpert', label: 'Facebook' },
      { icon: TiktokIcon, href: 'https://www.tiktok.com/@sightness_expert', label: 'TikTok' },
    ],
  };

  return (
    <>
      <footer className="bg-black border-t border-white/10 text-white" dir="ltr">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Newsletter */}
          <div className="mb-16 pb-16 border-b border-white/10">
            <div className="max-w-md">
              <h3 className="text-2xl font-light mb-4 tracking-wide">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-6">Subscribe to our newsletter to receive the latest updates on our exclusive offers and collections.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Enter your email" className="flex-1 bg-white/5 border border-white/20 px-4 py-3 text-sm focus:border-white outline-none text-white" />
                <button type="submit" className="px-6 py-3 bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors">Subscribe</button>
              </form>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 text-left">
            
            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold tracking-wider uppercase text-white">Contact Info</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Premium e-commerce store for eyewear and contact lenses.
              </p>
              <div className="pt-2 space-y-2">
                <a href="mailto:sightnessexpert@gmail.com" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <Mail size={16} /> sightnessexpert@gmail.com
                </a>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Available 24/7 for you.
                </p>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-white">Shop</h4>
              <ul className="space-y-3">
                {links.shop.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Vision */}
            <div>
              <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-white">Our Vision</h4>
              <div className="text-sm text-gray-400 space-y-3 leading-relaxed">
                <p className="font-semibold text-white">Medical grade, global aesthetics.</p>
                <p className="text-gray-300 font-medium">
                  Global standards for unmatched vision. We adhere to the highest optical medical standards and strict quality checks to ensure your eye safety and elegant look.
                </p>
                <ul className="space-y-1 text-xs pt-1 text-gray-400">
                  <li>• Medical & sunglasses collection</li>
                  <li>• Premium contact lenses</li>
                  <li>• Precise prescription fulfillment</li>
                </ul>
                <div className="pt-2 border-t border-white/5">
                  <p className="text-[11px] text-gray-500 italic">
                    We combine clinical precision with global trends, delivering certified medical eyewear crafted to perfection.
                  </p>
                </div>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-white">Legal</h4>
              <ul className="space-y-3">
                {links.legal.map((link, index) => (
                  <li key={index}>
                    {link.onClick ? (
                      <button onClick={link.onClick} className="text-sm text-gray-400 hover:text-white transition-colors text-left">{link.label}</button>
                    ) : (
                      <Link href={link.href!} className="text-sm text-gray-400 hover:text-white transition-colors">{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Sightness Expert. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {links.social.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Order Modal */}
      <AnimatePresence>
        {isWhatsappModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsWhatsappModalOpen(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-zinc-900 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl" dir="ltr">
              <button onClick={() => setIsWhatsappModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>

              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">WhatsApp Order & Shipping</h3>
                <p className="text-sm text-gray-400">Fast and automated process for your optical orders.</p>
              </div>

              <div className="space-y-5 mb-8 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0 mt-0.5"><ShoppingBag size={14} /></div>
                  <div>
                    <h4 className="text-white font-medium text-sm">1. Product Screenshot</h4>
                    <p className="text-gray-400 text-xs mt-0.5">Take a screenshot of the glasses or lenses you chose from our store.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0 mt-0.5"><Camera size={14} /></div>
                  <div>
                    <h4 className="text-white font-medium text-sm">2. Attach Prescription</h4>
                    <p className="text-gray-400 text-xs mt-0.5">If ordering prescription glasses, attach a clear photo of your eye exam report.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0 mt-0.5"><Send size={14} /></div>
                  <div>
                    <h4 className="text-white font-medium text-sm">3. Submit to Chat</h4>
                    <p className="text-gray-400 text-xs mt-0.5">Click the button below to be redirected to our live chat to provide your location and full name.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0 mt-0.5"><CheckCircle size={14} /></div>
                  <div>
                    <h4 className="text-white font-medium text-sm">4. Fast & Calibrated Shipping</h4>
                    <p className="text-gray-400 text-xs mt-0.5">Your order will be precisely prepared in our lab, then handed over to the shipping carrier.</p>
                  </div>
                </div>
              </div>

              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-300">
                <MessageCircle size={18} />
                Proceed to Order
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
