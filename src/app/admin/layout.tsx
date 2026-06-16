'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalAdminStore } from '@/stores/adminStore';
import AdminNavbar from './components/AdminNavbar';
import AdminSidebar from './components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isLoggedIn } = useLocalAdminStore();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center">
          <p className="mb-2">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black text-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar />
        <main className="flex-1 overflow-auto bg-black">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
