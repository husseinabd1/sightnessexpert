'use client';

import { useLocalAdminStore } from '@/stores/adminStore';
import { Bell, Menu, User } from 'lucide-react';

interface AdminNavbarProps {
  onMenuClick?: () => void;
}

export default function AdminNavbar({ onMenuClick }: AdminNavbarProps = {}) {
  const { logout } = useLocalAdminStore();

  return (
    <header className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-white/10 z-20">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>

        <h1 className="hidden md:block text-xl font-light tracking-wide">
          Admin Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="text-right">
              <p className="text-sm font-light">admin</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <User size={20} />
            </div>
          </div>

          <button
            onClick={logout}
            className="px-3 py-1.5 text-xs bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg hover:bg-red-600/30 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
