import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/globals.css';
import { LanguageProvider } from '@/components/LanguageContext'; // 👈 السطر الجديد لاستيراد نظام اللغات

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Sightness Expert - Premium Creative Visual Brand',
  description:
    'Discover premium visual products and creative services from Sightness Expert. Ultra-luxury e-commerce platform showcasing exclusive designs and portfolio.',
  keywords: [
    'luxury',
    'creative',
    'visual',
    'premium',
    'design',
    'e-commerce',
    'portfolio',
  ],
  authors: [{ name: 'Sightness Expert' }],
  
  // شعار النظارات الفخم الخاص بك
  icons: {
    icon: '/logo.png',
  },
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'Sightness Expert - Premium Creative Visual Brand',
    description:
      'Discover premium visual products and creative services from Sightness Expert.',
    siteName: 'Sightness Expert',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sightness Expert',
    description: 'Premium creative visual brand',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-black text-white">
        {/* 👇 قمنا بتغليف الموقع بالكامل هنا ليتحكم باللغتين العربي والإنجليزي وتغيير اتجاه النصوص تلقائياً */}
        <LanguageProvider>
          <div className="relative min-h-screen">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
