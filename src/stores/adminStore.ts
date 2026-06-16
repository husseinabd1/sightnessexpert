'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Default admin credentials (user can change password later)
const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'admin123',
};

interface AdminCredentials {
  username: string;
  password: string;
}

interface LocalAdminStore {
  isLoggedIn: boolean;
  credentials: AdminCredentials;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  changePassword: (newPassword: string) => void;
}

export const useLocalAdminStore = create<LocalAdminStore>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      credentials: DEFAULT_ADMIN,

      login: (username, password) => {
        const { credentials } = get();
        if (username === credentials.username && password === credentials.password) {
          set({ isLoggedIn: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ isLoggedIn: false });
      },

      changePassword: (newPassword) => {
        set((state) => ({
          credentials: { ...state.credentials, password: newPassword },
        }));
      },
    }),
    {
      name: 'local-admin-auth',
    }
  )
);
