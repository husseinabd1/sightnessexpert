'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  const links = {
    shop: [
      { label: 'Products', href: '/shop' },
      { label: 'Categories', href: '/categories' },
      { label: 'Sale', href: '/shop?filter=sale' },
      { label: 'New Arrivals', href: '/shop?sort=newest' },
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Career', href: '/career' },
      { label: 'Press', href: '/press' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Shipping Policy', href: '/shipping' },
      { label: 'Return Policy', href: '/returns' },
    ],
    social: [
      { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
      { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
      { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
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
    <footer className="bg-black border-t border-white/10">
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
              Subscribe to our newsletter for exclusive offers and new collections.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-white/20 px-4 py-3 text-sm focus:border-white outline-none transition-colors"
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
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {/* Shop Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold mb-6 tracking-wider">SHOP</h4>
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

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold mb-6 tracking-wider">COMPANY</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
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

          {/* Legal Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold mb-6 tracking-wider">LEGAL</h4>
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

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold mb-6 tracking-wider">CONTACT</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@sightnessexpert.com"
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail size={16} />
                  hello@sightnessexpert.com
                </a>
              </li>
              <li className="text-sm text-gray-400">
                Available Monday - Friday<br />
                9:00 AM - 6:00 PM EST
              </li>
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
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © 2024 Sightness Expert. All rights reserved.
          </p>

          {/* Social Links */}
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
