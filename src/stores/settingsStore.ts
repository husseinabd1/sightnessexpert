'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreSettings {
  whatsappNumber: string;
  storeName: string;
  currency: string;
  email: string;
}

interface SettingsStore {
  settings: StoreSettings;
  updateWhatsappNumber: (number: string) => void;
  updateSettings: (settings: Partial<StoreSettings>) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: {
        whatsappNumber: '9647701234567',
        storeName: 'Sightness Expert',
        currency: 'USD',
        email: 'sightnessexpert@gmail.com',
      },

      updateWhatsappNumber: (number) =>
        set((state) => ({
          settings: { ...state.settings, whatsappNumber: number },
        })),

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'store-settings',
    }
  )
);
