'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, Mail, X, MessageCircle, ShoppingBag, Camera, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from './LanguageContext';

const TiktokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const Footer = () => {
  const { language, isRtl } = useLanguage();
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
  const whatsappNumber = "+9647700000000"; 

  // النصوص باللغتين
  const content = {
    en: {
      newsletterTitle: 'Stay Updated',
      newsletterDesc: 'Subscribe to our newsletter to receive the latest updates on our exclusive offers and collections.',
      emailPlaceholder: 'Enter your email',
      subscribeBtn: 'Subscribe',
      aboutTitle: 'About Us',
      aboutDesc: 'Premium e-commerce store for luxury eyewear and professional contact lenses.',
      hours: 'Available 24/7 for you.',
      shopTitle: 'Shop',
      visionTitle: 'Our Vision',
      visionSub: 'Medical grade, global aesthetics.',
      visionDesc: 'Global standards for unmatched vision. We adhere to the highest optical medical standards and strict quality checks to ensure your eye safety and elegant look.',
      visionBullet1: '• Medical & sunglasses collection',
      visionBullet2: '• Premium contact lenses',
      visionBullet3: '• Precise prescription fulfillment',
      visionFooter: 'We combine clinical precision with global trends, delivering certified medical eyewear crafted to perfection.',
      legalTitle: 'Legal Policies',
      privacyLink: 'Privacy Policy & DMCA',
      whatsappLink: 'How to Order via WhatsApp',
      modalTitle: 'WhatsApp Order & Shipping',
      modalSub: 'Fast and automated process for your optical orders.',
      step1Title: '1. Product Screenshot',
      step1Desc: 'Take a screenshot of the glasses or lenses you chose from our store.',
      step2Title: '2. Attach Prescription',
      step2Desc: 'If ordering prescription glasses, attach a clear photo of your eye exam report.',
      step3Title: '3. Submit to Chat',
      step3Desc: 'Click the button below to be redirected to our live chat to provide your details.',
      step4Title: '4. Fast Shipping',
      step4Desc: 'Your order will be precisely prepared in our lab, then handed over to the carrier.',
      modalBtn: 'Proceed to Order'
    },
    ar: {
      newsletterTitle: 'ابقَ على اطلاع',
      newsletterDesc: 'اشترك في القائمة البريدية ليصلك كل جديد عن عروضنا وتشكيلاتنا الحصرية.',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      subscribeBtn: 'اشترك الآن',
      aboutTitle: 'من نحن',
      aboutDesc: 'متجر إلكتروني رائد لبيع النظارات الفاخرة والعدسات اللاصقة الطبية والتجميلية.',
      hours: 'متاحون لخدمتك طوال اليوم (24/7).',
      shopTitle: 'تسوق معنا',
      visionTitle: 'رؤيتنا',
      visionSub: 'معايير طبية، جمالية عالمية.',
      visionDesc: 'ملتزمون بأعلى المعايير الطبية البصرية وأدق فحوصات الجودة لضمان سلامة عينيك وأناقة إطلالتك برؤية فريدة لا مثيل لها.',
      visionBullet1: '• كولكشن نظارات طبيّة وشمسية فاخرة',
      visionBullet2: '• عدسات لاصقة ذات جودة متميزة (Premium)',
      visionBullet3: '• تجهيز دقيق ومطابق لوصفتك الطبيّه',
      visionFooter: 'نحن نجمع بين الدقة السريرية وأحدث الصيحات العالمية، لنقدم لك نظارات طبية معتمدة صُنعت بامتياز.',
      legalTitle: 'سياساتنا',
      privacyLink: 'سياسة الخصوصية وحماية المحتوى (DMCA)',
      whatsappLink: 'كيفية الطلب والشحن عبر الواتساب',
      modalTitle: 'سياسة الشحن والطلب عبر الواتساب',
      modalSub: 'آلية مؤتمتة وسريعة لمعالجة وتجهيز طلبك الطبي.',
      step1Title: '1. لقطة شاشة للمنتج',
      step1Desc: 'خذ لقطة شاشة (Screenshot) للنظارة أو العدسة التي اخترتها من المتجر.',
      step2Title: '2. إرفاق الوصفة الطبية',
      step2Desc: 'إذا كان طلبك نظارة طبية، أرفق صورة واضحة لتقرير فحص النظر الخاص بك.',
      step3Title: '3. نقل الطلب للمختص',
      step3Desc: 'عند ضغطك على الزر بالأسفل، سيتم توجيهك فوراً للمحادثة المباشرة لتزويدنا بتفاصيلك.',
      step4Title: '4. الشحن والتسليم الفوري',
      step4Desc: 'يتم فحص وتجهيز طلبك مخبرياً بدقة عالية، ثم يسلم لشركة الشحن ليصلك لباب البيت.',
      modalBtn: 'الانتقال للطلب والشحن المباشر'
    }
  };

  const t = content[language];

  const shopLinks = [
    { label: isRtl ? 'المنتجات' : 'Products', href: '/shop' },
    { label: isRtl ? 'الفئات' : 'Categories', href: '/categories' },
    { label: isRtl ? 'التخفيضات' : 'Sale', href: '/shop?filter=sale' },
    { label: isRtl ? 'وصل حديثاً' : 'New Arrivals', href: '/shop?sort=newest' },
  ];

  return (
    <>
      <footer className="bg-black border-t border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Newsletter */}
          <div className="mb-16 pb-16 border-b border-white/10">
            <div className="max-w-md">
              <h3 className="text-2xl font-light mb-4 tracking-wide">{t.newsletterTitle}</h3>
              <p className="text-gray-400 text-sm mb-6">{t.newsletterDesc}</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder={t.emailPlaceholder} className="flex-1 bg-white/5 border border-white/20 px-4 py-3 text-sm focus:border-white outline-none text-white" />
                <button type="submit" className="px-6 py-3 bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors">{t.subscribeBtn}</button>
              </form>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            
            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold tracking-wider uppercase text-white">{t.aboutTitle}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{t.aboutDesc}</p>
              <div className="pt-2 space-y-2">
                <a href="mailto:sightnessexpert@gmail.com" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <Mail size={16} /> sightnessexpert@gmail.com
                </a>
                <p className="text-xs text-gray-500 leading-relaxed">{t.hours}</p>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-white">{t.shopTitle}</h4>
              <ul className="space-y-3">
                {shopLinks.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div>
              <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-white">{t.visionTitle}</h4>
              <div className="text-sm text-gray-400 space-y-3 leading-relaxed">
                <p className="font-semibold text-white">{t.visionSub}</p>
                <p className="text-gray-300 font-medium">{t.visionDesc}</p>
                <ul className="space-y-1 text-xs pt-1 text-gray-400">
                  <li>{t.visionBullet1}</li>
                  <li>{t.visionBullet2}</li>
                  <li>{t.visionBullet3}</li>
                </ul>
                <div className="pt-2 border-t border-white/5">
                  <p className="text-[11px] text-gray-500 italic">{t.visionFooter}</p>
                </div>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-white">{t.legalTitle}</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">{t.privacyLink}</Link>
                </li>
                <li>
                  <button onClick={() => setIsWhatsappModalOpen(true)} className="text-sm text-gray-400 hover:text-white transition-colors text-right">
                    {t.whatsappLink}
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Sightness Expert. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="https://www.instagram.com/sightness_expert/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="https://www.facebook.com/sightnessexpert" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="https://www.tiktok.com/@sightness_expert" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><TiktokIcon size={20} /></a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Modal */}
      <AnimatePresence>
        {isWhatsappModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsWhatsappModalOpen(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-zinc-900 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl">
              <button onClick={() => setIsWhatsappModalOpen(false)} className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} text-gray-400 hover:text-white transition-colors`}>
                <X size={20} />
              </button>

              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t.modalTitle}</h3>
                <p className="text-sm text-gray-400">{t.modalSub}</p>
              </div>

              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0 mt-0.5"><ShoppingBag size={14} /></div>
                  <div>
                    <h4 className="text-white font-medium text-sm">{t.step1Title}</h4>
                    <p className="text-gray-400 text-xs mt-0.5">{t.step1Desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0 mt-0.5"><Camera size={14} /></div>
                  <div>
                    <h4 className="text-white font-medium text-sm">{t.step2Title}</h4>
                    <p className="text-gray-400 text-xs mt-0.5">{t.step2Desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0 mt-0.5"><Send size={14} /></div>
                  <div>
                    <h4 className="text-white font-medium text-sm">{t.step3Title}</h4>
                    <p className="text-gray-400 text-xs mt-0.5">{t.step3Desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0 mt-0.5"><CheckCircle size={14} /></div>
                  <div>
                    <h4 className="text-white font-medium text-sm">{t.step4Title}</h4>
                    <p className="text-gray-400 text-xs mt-0.5">{t.step4Desc}</p>
                  </div>
                </div>
              </div>

              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-300">
                <MessageCircle size={18} />
                {t.modalBtn}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
