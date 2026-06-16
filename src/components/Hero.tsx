'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black -z-10" />

      {/* Animated background elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl -z-10"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-10 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-block px-4 py-2 border border-white/30 text-xs tracking-widest font-light hover:border-white transition-colors">
            PREMIUM CREATIVE VISUAL BRAND
          </span>
        </motion.div>

        {/* Logo */}
        <motion.div variants={itemVariants} className="mb-12">
          <Image 
            src="/logo.png" 
            alt="Sightness Expert Logo"
            width={200}
            height={200}
            className="w-48 h-48 mx-auto opacity-90 hover:opacity-100 transition-opacity object-contain"
          />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-extralight tracking-tighter mb-6 leading-tight"
        >
          Sightness Expert
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-300 font-light mb-4 max-w-2xl mx-auto leading-relaxed"
        >
          Eyewear & Contact Lenses
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-gray-400 font-light mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Discover ultra-premium visual products crafted with meticulous attention to detail. Experience luxury redefined.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/shop"
            className="px-10 py-4 bg-white text-black font-semibold text-sm tracking-wider hover:bg-gray-200 transition-colors duration-300"
          >
            Explore Collection
          </Link>
          <Link
            href="/portfolio"
            className="px-10 py-4 border-2 border-white text-white font-semibold text-sm tracking-wider hover:bg-white hover:text-black transition-colors duration-300"
          >
            View Portfolio
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};
