'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Mail } from 'lucide-react';

// رسمة أيقونة التيك توك المخصصة لتجنب أخطاء Vercel
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
  const links = {
    shop: [
      { label: 'المنتجات (Products)', href: '/shop' },
      { label: 'الفئات (Categories)', href: '/categories' },
      { label: 'التخفيضات (Sale)', href: '/shop?filter=sale' },
      { label: 'وصل حديثاً (New Arrivals)', href: '/shop?sort=newest' },
    ],
    legal: [
      { label: 'سياسة الخصوصية (Privacy Policy)', href: '/privacy' },
      { label: 'الشروط والأحكام (Terms & Conditions)', href: '/terms' },
      // سياسة الشحن عبر الواتساب
      { label: 'سياسة الطلب والشحن عبر الواتساب', href: '#' }, 
    ],
    social: [
      { icon: Instagram, href: 'https://www.instagram.com/sightness_expert/', label: 'Instagram' },
      { icon: Facebook, href: 'https://www.facebook.com/sightnessexpert', label: 'Facebook' },
      { icon: TiktokIcon, href: 'https://www.tiktok.com/@sightness_expert', label: 'TikTok' },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-black border-t border-white/10" dir="rtl">
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
              ابقَ على اطلاع
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              اشترك في القائمة البريدية ليصلك كل جديد عن عروضنا وتشكيلاتنا الحصرية.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()} dir="ltr">
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
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-right"
        >
          {/* Shop Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-bold mb-6 tracking-wider">تسوق معنا</h4>
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

          {/* About Us (الكليشة الجديدة المخصصة) */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-bold mb-6 tracking-wider">من نحن</h4>
            <div className="text-sm text-gray-400 space-y-3 leading-relaxed">
              <p className="font-semibold text-white" dir="ltr">Medical grade, global aesthetics.</p>
              <p className="text-white font-medium">معايير عالمية لرؤية لا مثيل لها.</p>
              <ul className="space-y-2 mt-2">
                <li>• كولكشن نظارات طبية وشمسية</li>
                <li>• عدسات لاصقة (Premium)</li>
                <li>• تجهيز دقيق لوصفتك الطبية</li>
                <li>• جودة فائقة وتصاميم حصرية تناسب ذوقك</li>
              </ul>
            </div>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-bold mb-6 tracking-wider">سياسات وقوانين</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
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

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-bold mb-6 tracking-wider">تواصل معنا</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:sightnessexpert@gmail.com"
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-end gap-2"
                  dir="ltr"
                >
                  sightnessexpert@gmail.com
                  <Mail size={16} />
                </a>
              </li>
              <li className="text-sm text-gray-400 mt-4 leading-relaxed">
                متاح طوال اليوم، على مدار 24 ساعة <br />
                للرد على استفساراتكم وتلبية طلباتكم. <br />
                <span className="text-xs text-gray-500">(Available 24/7)</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 flex flex-col-reverse md:flex-row justify-between items-center gap-6"
        >
          {/* Copyright */}
          <p className="text-sm text-gray-500" dir="ltr">
            © {new Date().getFullYear()} Sightness Expert. All rights reserved.
          </p>

          {/* Social Links */}
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
  );
};
