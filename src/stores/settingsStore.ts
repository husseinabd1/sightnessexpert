'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreSettings {
  whatsappNumber: string;
  storeName: string;
  currency: string;
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
        whatsappNumber: '964',
        storeName: 'Sightness Expert',
        currency: 'USD',
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
