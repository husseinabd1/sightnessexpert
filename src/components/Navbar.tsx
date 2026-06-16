'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useCartStore } from '@/stores/cartStore';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, isRtl } = useLanguage();
  const itemCount = useCartStore((state) => state.getItemCount());

  const content = {
    en: {
      home: 'Home',
      shop: 'Shop',
      portfolio: 'Portfolio',
      about: 'About',
      contact: 'Contact',
      brandName: 'SIGHTNESS EXPERT',
    },
    ar: {
      home: 'الرئيسية',
      shop: 'المتجر',
      portfolio: 'أعمالنا',
      about: 'من نحن',
      contact: 'اتصل بنا',
      brandName: 'سايتنس إكسبرت',
    },
  };

  const t = content[language];

  const navLinks = [
    { href: '/', label: t.home },
    { href: '/shop', label: t.shop },
    { href: '/portfolio', label: t.portfolio },
    { href: '/contact', label: t.contact },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group hover:opacity-80 transition-opacity">
            <Image 
              src="/logo.png" 
              alt="Sightness Expert"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
              priority
            />
            <span className="hidden sm:inline text-sm font-light tracking-widest text-white uppercase">
              {t.brandName}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors font-light text-sm tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Language Switcher, Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            
            {/* زر تغيير اللغة */}
            <LanguageSwitcher />

            {/* Cart with live badge */}
            <Link href="/cart" className="relative text-white hover:text-gray-300 transition-colors">
              <ShoppingCart size={24} />
              <span className={`absolute -top-2 ${isRtl ? '-left-2' : '-right-2'} bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold transition-transform ${itemCount > 0 ? 'scale-100' : 'scale-0'}`}>
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-lg py-4 border-b border-white/10"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 text-gray-400 hover:text-white transition-colors font-light text-sm ${isRtl ? 'text-right' : 'text-left'}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
