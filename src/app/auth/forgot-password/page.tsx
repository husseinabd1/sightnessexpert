'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light tracking-widest mb-2">SE</h1>
          <h2 className="text-xl font-light mb-2">Sightness Expert</h2>
          <p className="text-gray-400 font-light text-sm">Reset Password</p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6"
          >
            <div className="bg-green-400/20 border border-green-400/50 text-green-400 px-4 py-3 rounded-lg text-sm">
              Password reset instructions have been sent to your email.
            </div>
            <Link
              href="/auth/login"
              className="inline-block text-white hover:text-gray-300 transition-colors text-sm"
            >
              ← Back to Login
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-light mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-sm focus:border-white outline-none transition-colors"
                placeholder="admin@sightnessexpert.com"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Send Reset Link
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-400 mt-8 font-light">
          <Link href="/auth/login" className="text-white hover:text-gray-300 transition-colors">
            ← Back to Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
