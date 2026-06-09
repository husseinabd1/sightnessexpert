'use client';

import { Navbar, Footer } from '@/components';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-20 bg-black text-white">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Contact us today.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'hello@sightnessexpert.com',
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  value: '+1 (555) 123-4567',
                },
                {
                  icon: MapPin,
                  label: 'Address',
                  value: 'New York, NY 10001, USA',
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i}>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon size={20} />
                      <h3 className="font-light text-lg">{item.label}</h3>
                    </div>
                    <p className="text-gray-400 ml-8">{item.value}</p>
                  </div>
                );
              })}

              {/* Hours */}
              <div className="border-t border-white/10 pt-8">
                <h3 className="font-light text-lg mb-4">Business Hours</h3>
                <div className="text-gray-400 space-y-2 text-sm">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="lg:col-span-2 bg-white/5 p-8 rounded-lg border border-white/10"
            >
              {submitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 bg-green-400/20 border border-green-400/50 text-green-400 px-4 py-3 rounded-lg text-sm"
                >
                  Thank you for your message! We'll get back to you soon.
                </motion.div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:border-white outline-none transition-colors"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:border-white outline-none transition-colors"
                  required
                />
              </div>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:border-white outline-none transition-colors mb-6"
                required
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={6}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:border-white outline-none transition-colors mb-6 resize-none"
                required
              />

              <button
                type="submit"
                className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                <Send size={18} />
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
