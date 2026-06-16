'use client';

import { useLanguage } from './LanguageContext';
import { motion } from 'framer-motion';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-zinc-900 border border-white/10 rounded-full p-1 relative z-50">
      <button
        onClick={() => setLanguage('ar')}
        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors relative ${
          language === 'ar' ? 'text-black' : 'text-gray-400 hover:text-white'
        }`}
      >
        {language === 'ar' && (
          <motion.span
            layoutId="activeLang"
            className="absolute inset-0 bg-white rounded-full -z-10"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        العربية
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors relative ${
          language === 'en' ? 'text-black' : 'text-gray-400 hover:text-white'
        }`}
      >
        {language === 'en' && (
          <motion.span
            layoutId="activeLang"
            className="absolute inset-0 bg-white rounded-full -z-10"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        EN
      </button>
    </div>
  );
};
