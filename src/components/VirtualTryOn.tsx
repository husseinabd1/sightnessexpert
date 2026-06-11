'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, ScanFace, Loader2 } from 'lucide-react';

interface VirtualTryOnProps {
  isOpen: boolean;
  onClose: () => void;
  // مسار صورة النظارة المفرغة (PNG) للتجربة
  glassesImage?: string; 
}

export const VirtualTryOn = ({ isOpen, onClose, glassesImage = '/glasses-placeholder.png' }: VirtualTryOnProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      if (!isOpen) return;
      
      try {
        setIsLoading(true);
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' } // استخدام الكاميرا الأمامية
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        setError('يرجى السماح بالوصول إلى الكاميرا لتجربة النظارة.');
        setHasPermission(false);
      } finally {
        setIsLoading(false);
      }
    };

    startCamera();

    // إغلاق الكاميرا عند إغلاق النافذة
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-md bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          dir="rtl"
        >
          {/* شريط العنوان */}
          <div className="absolute top-0 inset-x-0 z-10 flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-2 text-white">
              <ScanFace size={20} className="text-green-400" />
              <span className="font-semibold text-sm">القياس الافتراضي المدعم بالذكاء الاصطناعي</span>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* منطقة الكاميرا */}
          <div className="relative aspect-[3/4] w-full bg-black flex items-center justify-center overflow-hidden">
            
            {isLoading && (
              <div className="flex flex-col items-center text-gray-400 gap-3">
                <Loader2 className="animate-spin" size={32} />
                <p className="text-sm">جاري تشغيل الكاميرا...</p>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center text-red-400 gap-3 p-6 text-center">
                <Camera size={48} className="opacity-50" />
                <p className="text-sm">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-6 py-2 bg-white/10 rounded-full text-white text-sm hover:bg-white/20"
                >
                  إعادة المحاولة
                </button>
              </div>
            )}

            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              style={{ transform: 'scaleX(-1)' }} // قلب الكاميرا لتبدو كالمرآة
            />

            {/* تأثير المسح (Scanning Effect) والنظارة */}
            {hasPermission && !isLoading && (
              <>
                {/* إطار تحديد الوجه */}
                <div className="absolute inset-0 border-[2px] border-white/20 rounded-3xl m-8 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-400 rounded-tl-2xl"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-400 rounded-tr-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-400 rounded-bl-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-400 rounded-br-2xl"></div>
                </div>

                {/* خط المسح المتحرك */}
                <motion.div
                  animate={{ top: ['10%', '90%', '10%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-8 right-8 h-[2px] bg-green-400/50 shadow-[0_0_15px_rgba(74,222,128,0.5)] pointer-events-none z-20"
                />

                {/* النظارة الافتراضية (مؤقتة حتى يتم ربط الـ AI) */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 pointer-events-none z-30">
                  {/* استبدل src بصورة النظارة المفرغة الخاصة بك */}
                  <img 
                    src={glassesImage} 
                    alt="Glasses" 
                    className="w-full h-auto drop-shadow-2xl"
                  />
                </div>
              </>
            )}
          </div>

          {/* شريط التعليمات السفلي */}
          <div className="p-4 bg-zinc-900 text-center border-t border-white/5">
            <p className="text-xs text-gray-400">
              يرجى توجيه وجهك داخل الإطار لتجربة النظارة. <br/>
              <span className="text-white font-medium">القياسات تعتمد على معايير الوجه التقريبية.</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
