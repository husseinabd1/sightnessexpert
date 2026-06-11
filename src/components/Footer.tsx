'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Mail } from 'lucide-react';

// أيقونة التيك توك المخصصة لتجنب أخطاء سيرفر Vercel
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
    <footer className="bg-black border-t border-white/10 text-white">
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
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-left"
        >
          {/* العمود الأول: من نحن */}
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

          {/* العمود الثاني: تسوق معنا */}
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

          {/* العمود الثالث: نبذة عنا (الكليشة الحصرية مالتك) */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-white">نبذة عنا</h4>
            <div className="text-sm text-gray-400 space-y-2 leading-relaxed">
              <p className="font-semibold text-white">Medical grade, global aesthetics.</p>
              <p className="text-gray-300 font-medium">معايير عالمية لرؤية لا مثيل لها.</p>
              <ul className="space-y-1 text-xs pt-1 text-gray-400">
                <li>• كولكشن نظارات طبيّة وشمسية</li>
                <li>• عدسات لاصقة (Premium)</li>
                <li>• تجهيز دقيق لوصفتك الطبيّه</li>
              </ul>
            </div>
          </motion.div>

          {/* العمود الرابع: السياسات */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-white">سياساتنا</h4>
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
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* حقوق الحفظ والتأليف */}
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Sightness Expert. All rights reserved.
          </p>

          {/* روابط التواصل الاجتماعي */}
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
