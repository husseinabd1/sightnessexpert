'use client';

import { useLanguage } from './LanguageContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function ContactSection() {
  const { language } = useLanguage();

  const content = {
    en: {
      heading: 'Get in Touch',
      // تم استبدال علامة الاقتباس لتجنب مشاكل الـ Build نهائياً
      subheading: 'Have questions? We would love to hear from you. Contact us today.',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      hoursTitle: 'Business Hours',
      hoursWeek: 'Monday - Friday: 9:00 AM - 6:00 PM EST',
      hoursSat: 'Saturday: 10:00 AM - 4:00 PM EST',
      hoursSun: 'Sunday: Closed',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      subjectPlaceholder: 'Subject',
      messagePlaceholder: 'Your Message',
      btn: 'Send Message'
    },
    ar: {
      heading: 'تواصل معنا',
      subheading: 'هل لديك أي استفسارات؟ يسعدنا دائماً سماع رأيك والتواصل معك في أي وقت.',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      address: 'العنوان',
      hoursTitle: 'أوقات العمل',
      hoursWeek: 'الاثنين - الجمعة: 9:00 صباحاً - 6:00 مساءً',
      hoursSat: 'السبت: 10:00 صباحاً - 4:00 مساءً',
      hoursSun: 'الأحد: مغلق',
      namePlaceholder: 'الاسم الكريم',
      emailPlaceholder: 'البريد الإلكتروني للاتصال',
      subjectPlaceholder: 'عنوان الرسالة',
      messagePlaceholder: 'اكتب رسالتك هنا...',
      btn: 'إرسال الرسالة'
    }
  };

  const t = content[language];

  return (
    <section className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-light tracking-wide mb-4">{t.heading}</h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto font-light leading-relaxed">{t.subheading}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 space-y-8 bg-zinc-900/30 p-8 border border-white/5 rounded-2xl text-start">
            <div className="flex items-start gap-4">
              <Mail className="text-gray-400 mt-1 shrink-0" size={20} />
              <div>
                <h4 className="text-sm font-semibold text-gray-300">{t.email}</h4>
                <p className="text-sm text-gray-400 mt-1 break-all">sightnessexpert@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-gray-400 mt-1 shrink-0" size={20} />
              <div>
                <h4 className="text-sm font-semibold text-gray-300">{t.phone}</h4>
                <p className="text-sm text-gray-400 mt-1" dir="ltr">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="text-gray-400 mt-1 shrink-0" size={20} />
              <div>
                <h4 className="text-sm font-semibold text-gray-300">{t.address}</h4>
                <p className="text-sm text-gray-400 mt-1">
                  {language === 'ar' ? 'نيويورك، الولايات المتحدة الأمريكية' : 'New York, NY 10001, USA'}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <h4 className="text-xs font-bold tracking-wider uppercase text-white mb-3">{t.hoursTitle}</h4>
              <ul className="text-xs text-gray-400 space-y-2 font-light">
                <li>{t.hoursWeek}</li>
                <li>{t.hoursSat}</li>
                <li>{t.hoursSun}</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-8 bg-zinc-900/50 p-6 sm:p-8 border border-white/10 rounded-2xl">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input type="text" placeholder={t.namePlaceholder} className="w-full bg-black/40 border border-white/10 focus:border-white px-4 py-3 rounded-xl text-sm outline-none transition-colors text-white" />
                <input type="email" placeholder={t.emailPlaceholder} className="w-full bg-black/40 border border-white/10 focus:border-white px-4 py-3 rounded-xl text-sm outline-none transition-colors text-white" />
              </div>
              <input type="text" placeholder={t.subjectPlaceholder} className="w-full bg-black/40 border border-white/10 focus:border-white px-4 py-3 rounded-xl text-sm outline-none transition-colors text-white" />
              <textarea rows={5} placeholder={t.messagePlaceholder} className="w-full bg-black/40 border border-white/10 focus:border-white px-4 py-3 rounded-xl text-sm outline-none transition-colors text-white resize-none"></textarea>
              
              <button type="submit" className={`flex items-center gap-2 px-6 py-3 bg-white text-black font-medium text-sm rounded-xl hover:bg-gray-200 transition-colors duration-300 ${language === 'ar' ? 'mr-auto' : 'ml-auto'}`}>
                <Send size={16} className={language === 'ar' ? 'rotate-180' : ''} />
                {t.btn}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
