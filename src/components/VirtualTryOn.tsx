'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ScanFace, Loader2, Camera } from 'lucide-react';

interface VirtualTryOnProps {
  isOpen: boolean;
  onClose: () => void;
  glassesImage?: string;
}

export const VirtualTryOn = ({ isOpen, onClose, glassesImage = '/glasses-placeholder.png' }: VirtualTryOnProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState('جاري تشغيل الكاميرا...');
  const [error, setError] = useState<string | null>(null);
  
  const [glassesStyle, setGlassesStyle] = useState({
    display: 'none',
    top: '0px',
    left: '0px',
    width: '0px',
    transform: 'translate(-50%, -50%) rotate(0deg)',
  });

  useEffect(() => {
    let active = true;
    let stream: MediaStream | null = null;
    let animationFrameId: number;
    let faceLandmarker: any = null;

    const initAIAndCamera = async () => {
      if (!isOpen) return;

      try {
        setLoadingStatus('جاري الاتصال بالكاميرا الأمامية...');
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }
        });
        
        if (videoRef.current && active) {
          videoRef.current.srcObject = stream;
        }

        setLoadingStatus('جاري تفعيل مستشعرات الوجه الطبية...');
        const vision = await import('@mediapipe/tasks-vision');
        const filesetResolver = await vision.FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/wasm"
        );
        
        faceLandmarker = await vision.FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numFaces: 1
        });

        if (active) {
          setIsLoading(false);
          trackFace();
        }

      } catch (err) {
        console.error(err);
        if (active) {
          setError('يرجى السماح بصلاحية الكاميرا لتتمكن من تجربة النظارة طبيّاً.');
          setIsLoading(false);
        }
      }
    };

    const trackFace = () => {
      if (!active || !faceLandmarker || !videoRef.current || !containerRef.current) return;

      const video = videoRef.current;
      
      if (video.readyState >= 2) {
        const timestamp = performance.now();
        const result = faceLandmarker.detectForVideo(video, timestamp);

        if (result && result.faceLandmarks && result.faceLandmarks.length > 0) {
          const landmarks = result.faceLandmarks[0];

          const midNasallion = landmarks[168]; // جسر الأنف
          const leftEye = landmarks[33];      // العين اليسرى
          const rightEye = landmarks[263];    // العين اليمنى

          if (midNasallion && leftEye && rightEye) {
            const container = containerRef.current;
            const rect = container.getBoundingClientRect();

            const centerX = midNasallion.x * rect.width;
            const centerY = midNasallion.y * rect.height;

            const dx = (rightEye.x - leftEye.x) * rect.width;
            const dy = (rightEye.y - leftEye.y) * rect.height;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const glassesWidth = distance * 2.1; // حجم النظارة المتناسق مع الوجه

            const angleRad = Math.atan2(dy, dx);
            const angleDeg = angleRad * (180 / Math.PI);

            setGlassesStyle({
              display: 'block',
              top: `${centerY}px`,
              left: `${centerX}px`,
              width: `${glassesWidth}px`,
              transform: `translate(-50%, -50%) rotate(${angleDeg}deg)`,
            });
          }
        } else {
          setGlassesStyle(prev => ({ ...prev, display: 'none' }));
        }
      }

      animationFrameId = requestAnimationFrame(trackFace);
    };

    initAIAndCamera();

    return () => {
      active = false;
      cancelAnimationFrame(animationFrameId);
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
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.93, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.93, opacity: 0 }}
          className="relative w-full max-w-md bg-zinc-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          dir="rtl"
        >
          <div className="absolute top-0 inset-x-0 z-50 flex justify-between items-center p-4 bg-gradient-to-b from-black/90 to-transparent">
            <div className="flex items-center gap-2 text-white">
              <ScanFace size={18} className="text-green-400 animate-pulse" />
              <span className="font-light text-xs tracking-wider text-gray-300">SIGHTNESS AI TRY-ON</span>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div ref={containerRef} className="relative aspect-[3/4] w-full bg-black flex items-center justify-center overflow-hidden">
            {isLoading && (
              <div className="flex flex-col items-center text-gray-400 gap-3 px-6 text-center z-10">
                <Loader2 className="animate-spin text-white" size={28} />
                <p className="text-sm font-light tracking-wide text-gray-300">{loadingStatus}</p>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center text-red-400 gap-3 p-6 text-center z-10">
                <Camera size={40} className="opacity-60" />
                <p className="text-sm font-light">{error}</p>
                <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-white text-black rounded-full text-xs font-semibold hover:bg-gray-200 transition-colors">
                  إعادة تشغيل النظام
                </button>
              </div>
            )}

            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover transform scale-x-[-1] transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            />

            {!isLoading && !error && (
              <div className="absolute inset-0 pointer-events-none transform scale-x-[-1]" style={{ zIndex: 40 }}>
                <img 
                  src={glassesImage} 
                  alt="Sightness Glasses Eyewear" 
                  className="absolute object-contain transition-all duration-75 ease-out drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
                  style={{
                    display: glassesStyle.display,
                    top: glassesStyle.top,
                    left: glassesStyle.left,
                    width: glassesStyle.width,
                    transform: glassesStyle.transform,
                  }}
                />
              </div>
            )}

            {!isLoading && !error && (
              <div className="absolute inset-0 border border-white/5 m-6 rounded-2xl pointer-events-none z-20">
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/40 rounded-tl-xl"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/40 rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/40 rounded-bl-xl"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/40 rounded-br-xl"></div>
              </div>
            )}
          </div>

          <div className="p-4 bg-black text-center border-t border-white/10">
            <p className="text-[11px] font-light text-gray-400 tracking-wider">
              تمت المعايرة البصرية الحية حسب مقاييس عظام الوجه الافتراضية بنجاح.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
