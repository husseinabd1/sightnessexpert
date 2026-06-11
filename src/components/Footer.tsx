'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, Mail, X, MessageCircle, ShoppingBag, Camera, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

// أيقونة التيك توك المخصصة لتجنب أخطاء Vercel
const TiktokIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const Footer = () => {
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
  const whatsappNumber = "+964XXXXXXXXX"; // 💡 ضع رقم الواتساب هنا

  const links = {
    shop: [
      { label: 'المنتجات (Products)', href: '/shop' },
      { label: 'الفئات (Categories)', href: '/categories' },
      { label: 'التخفيضات (Sale)', href: '/shop?filter=sale' },
      { label: 'وصل حديثاً (New Arrivals)', href: '/shop?sort=newest' },
    ],
    legal: [
      // DMCA هو اختصار قانوني عالمي لحماية حقوق النشر والملاحقة القانونية للمسروقات
      { label: 'سياسة الخصوصية وحماية المحتوى (DMCA)', href: '/privacy' },
      { 
        label: 'كيفية الطلب عبر الواتساب (How to Order)', 
        onClick: () => setIsWhatsappModalOpen(true) 
      },
    ],
    social: [
      { icon: Instagram, href: 'https://www.instagram.com/sightness_expert/', label: 'Instagram' },
      { icon: Facebook, href: 'https://www.facebook.com/sightnessexpert', label: 'Facebook' },
      { icon: TiktokIcon, href: 'https://www.tiktok.com/@sightness_expert', label: 'TikTok' },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <footer className="bg-black border-t border-white/10 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 pb-16 border-b border-white/10"
          >
            <div className="max-w-md">
              <h3 className="text-2xl font-light mb-4 tracking-wide">
                Stay Updated
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                اشترك في القائمة البريدية ليصلك كل جديد عن عروضنا وتشكيلاتنا الحصرية.
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/5 border border-white/20 px-4 py-3 text-sm focus:border-white outline-none transition-colors text-white"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>

          {/* Links Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 text-left"
          >
            {/* 1. من نحن */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-sm font-bold tracking-wider uppercase text-white">من نحن</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                متجر إلكتروني لبيع النظارات والعدسات اللاصقة.
              </p>
              <div className="pt-2 space-y-2">
                <a
                  href="mailto:sightnessexpert@gmail.com"
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail size={16} />
                  sightnessexpert@gmail.com
                </a>
                <p className="text-xs text-gray-500 leading-relaxed">
                  متاح طوال اليوم (24/7) <br />
                  Available 24/7 for you.
                </p>
              </div>
            </motion.div>

            {/* 2. تسوق معنا */}
            <motion.div variants={itemVariants}>
              <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-white">تسوق معنا</h4>
              <ul className="space-y-3">
                {links.shop.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* 3. نبذة عنا (تم التحديث بمعايير طبية فخمة ولغتين) */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-white">نبذة عنا</h4>
              <div className="text-sm text-gray-400 space-y-3 leading-relaxed">
                <p className="font-semibold text-white">Medical grade, global aesthetics.</p>
                
                {/* الجزء العربي */}
                <p className="text-gray-300 font-medium leading-relaxed" dir="rtl">
                  معايير عالمية لرؤية لا مثيل لها. نلتزم بأعلى المعايير الطبية وأدق أجهزة الفحص لضمان صحة وسلامة عينيك.
                </p>
                <ul className="space-y-1 text-xs pt-1 text-gray-400" dir="rtl">
                  <li>• كولكشن نظارات طبيّة وشمسية</li>
                  <li>• عدسات لاصقة (Premium)</li>
                  <li>• تجهيز دقيق ومطابق لوصفتك الطبيّه</li>
                </ul>

                {/* الجزء الإنجليزي */}
                <div className="pt-3 mt-3 border-t border-white/10">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    We adhere to the highest clinical standards, utilizing cutting-edge technology to ensure flawless vision and ultimate eye safety.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 4. سياساتنا */}
            <motion.div variants={itemVariants}>
              <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-white">سياساتنا</h4>
              <ul className="space-y-3">
                {links.legal.map((link, index) => (
                  <li key={index}>
                    {link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="text-sm text-gray-400 hover:text-white transition-colors text-left flex items-center gap-2"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href!}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Sightness Expert. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {links.social.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </footer>

      {/* نافذة طريقة الطلب عبر الواتساب (Modal) */}
      <AnimatePresence>
        {isWhatsappModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsWhatsappModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl"
              dir="rtl"
            >
              <button
                onClick={() => setIsWhatsappModalOpen(false)}
                className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">الطلب عبر الواتساب</h3>
                <p className="text-sm text-gray-400">خطوات بسيطة لإتمام طلبك بكل سهولة وسرعة</p>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0 mt-1">
                    <ShoppingBag size={16} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">1. اختر منتجاتك</h4>
                    <p className="text-gray-400 text-xs mt-1">تصفح المتجر واختر النظارة أو العدسات التي تناسبك.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0 mt-1">
                    <Camera size={16} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">2. التقط صورة (Screenshot)</h4>
                    <p className="text-gray-400 text-xs mt-1">خذ لقطة شاشة للمنتج أو قم بنسخ الرابط الخاص به.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0 mt-1">
                    <Send size={16} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">3. تواصل معنا مع الوصفة الطبية</h4>
                    <p className="text-gray-400 text-xs mt-1">أرسل الصورة مع وصفتك الطبية (إن وجدت) لفريقنا المختص.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0 mt-1">
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">4. تأكيد الطلب والشحن</h4>
                    <p className="text-gray-400 text-xs mt-1">سنقوم بمراجعة طلبك، تأكيده، وشحنه مباشرة إليك.</p>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-300"
              >
                <MessageCircle size={18} />
                ابدأ المحادثة الآن
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
