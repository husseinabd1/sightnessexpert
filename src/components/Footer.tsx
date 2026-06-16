'use client';

import Link from 'next/link';
import { Instagram, Facebook, Mail } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const TiktokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const Footer = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      aboutTitle: 'Sightness Expert',
      aboutDesc: 'Premium E-commerce — 24 Hours',
      shopTitle: 'Shop',
      products: 'Products',
      categories: 'Categories',
      sale: 'Sale',
      newArrivals: 'New Arrivals',
      companyTitle: 'Company',
      aboutUs: 'About',
      contactUs: 'Contact',
      legalTitle: 'Legal Policies',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      shipping: 'Shipping Policy',
      refunds: 'Refund Policy',
    },
    ar: {
      aboutTitle: 'اتصال',
      aboutDesc: 'متجر إلكتروني — 24 ساعة',
      shopTitle: 'المتجر',
      products: 'منتجات',
      categories: 'فئات',
      sale: 'أوكازيون',
      newArrivals: 'الوافدون الجدد',
      companyTitle: 'الشركة',
      aboutUs: 'عنّا',
      contactUs: 'اتصل بنا',
      legalTitle: 'السياسات القانونية',
      privacy: 'سياسة الخصوصية',
      terms: 'الشروط والأحكام',
      shipping: 'سياسة الشحن',
      refunds: 'سياسة الإرجاع',
    }
  };

  const t = content[language];

  return (
    <footer className="bg-black border-t border-white/10 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center sm:text-left">
          
          {/* Contact & Email */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white">{t.aboutTitle}</h4>
            <div className="pt-2 space-y-3">
              <a 
                href="mailto:sightnessexpert@gmail.com" 
                className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 justify-center sm:justify-start"
              >
                <Mail size={16} /> sightnessexpert@gmail.com
              </a>
              <p className="text-xs text-gray-500 font-light tracking-wide">{t.aboutDesc}</p>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-white">{t.shopTitle}</h4>
            <ul className="space-y-3">
              <li><Link href="/shop" className="text-sm text-gray-400 hover:text-white transition-colors">{t.products}</Link></li>
              <li><Link href="/categories" className="text-sm text-gray-400 hover:text-white transition-colors">{t.categories}</Link></li>
              <li><Link href="/shop" className="text-sm text-gray-400 hover:text-white transition-colors">{t.sale}</Link></li>
              <li><Link href="/shop" className="text-sm text-gray-400 hover:text-white transition-colors">{t.newArrivals}</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-white">{t.companyTitle}</h4>
            <ul className="space-y-3">
              <li><Link href="/portfolio" className="text-sm text-gray-400 hover:text-white transition-colors">{t.aboutUs}</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">{t.contactUs}</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-white">{t.legalTitle}</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">{t.privacy}</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">{t.terms}</Link></li>
              <li><Link href="/shipping" className="text-sm text-gray-400 hover:text-white transition-colors">{t.shipping}</Link></li>
              <li><Link href="/refunds" className="text-sm text-gray-400 hover:text-white transition-colors">{t.refunds}</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} Sightness Expert. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/sightness_expert/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Instagram size={18} /></a>
            <a href="https://www.facebook.com/sightnessexpert" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Facebook size={18} /></a>
            <a href="https://www.tiktok.com/@sightness_expert" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><TiktokIcon size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
