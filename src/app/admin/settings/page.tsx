'use client';

import { motion } from 'framer-motion';
import { Phone, Save, CheckCircle, Store, MessageCircle } from 'lucide-react';
import { useSettingsStore } from '@/stores/settingsStore';
import { useState } from 'react';

export default function SettingsPage() {
  const { settings, updateWhatsappNumber, updateSettings } = useSettingsStore();
  const [whatsapp, setWhatsapp] = useState(settings.whatsappNumber);
  const [storeName, setStoreName] = useState(settings.storeName);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateWhatsappNumber(whatsapp);
    updateSettings({ storeName });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-light tracking-wide mb-2">Settings</h1>
        <p className="text-gray-400">Manage your store settings and WhatsApp configuration.</p>
      </motion.div>

      {/* Success Message */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-3 bg-green-400/10 border border-green-400/30 rounded-lg p-4"
        >
          <CheckCircle size={20} className="text-green-400" />
          <span className="text-green-400 text-sm">Settings saved successfully!</span>
        </motion.div>
      )}

      {/* WhatsApp Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 border border-white/10 rounded-lg p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <MessageCircle size={20} className="text-green-400" />
          </div>
          <div>
            <h2 className="text-lg font-light">WhatsApp Settings</h2>
            <p className="text-sm text-gray-400">Orders will be sent to this number</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">WhatsApp Number</label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="964xxxxxxxxxx"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Enter the number with country code (without + or 00). Example: 964xxxxxxxxxx
            </p>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Store Name</label>
            <div className="relative">
              <Store size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Store name"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Save size={18} />
            Save Settings
          </button>
        </form>
      </motion.div>

      {/* Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 border border-white/10 rounded-lg p-6"
      >
        <h2 className="text-lg font-light mb-4">WhatsApp Preview</h2>
        <p className="text-sm text-gray-400 mb-3">
          When a customer places an order, a message will be sent to:
        </p>
        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <MessageCircle size={24} className="text-green-400" />
          <div>
            <p className="text-green-400 font-medium">+{whatsapp || 'Not set'}</p>
            <p className="text-xs text-gray-500">WhatsApp Business</p>
          </div>
        </div>
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-sm text-green-400 hover:text-green-300 transition-colors"
        >
          Test WhatsApp Connection →
        </a>
      </motion.div>
    </div>
  );
}
