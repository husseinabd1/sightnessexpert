'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, LogOut, LayoutDashboard, Package, Users, ShoppingCart, Tag, ImageIcon, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const navItems: NavItem[] = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin', label: 'Customers', icon: Users },
    { href: '/admin', label: 'Orders', icon: ShoppingCart },
    { href: '/admin', label: 'Discounts', icon: Tag },
    { href: '/portfolio', label: 'Portfolio', icon: ImageIcon },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white text-black p-2 rounded-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 md:translate-x-0 z-40"
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <Image 
            src="/logo.svg" 
            alt="Sightness Expert"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <div>
            <h1 className="text-lg font-semibold text-black">SE Admin</h1>
            <p className="text-xs text-gray-600">Sightness Expert</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="py-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-6 right-6">
          <button className="w-full flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
