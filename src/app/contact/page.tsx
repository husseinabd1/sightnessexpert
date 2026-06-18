'use client';

import { Navbar, Footer } from '@/components';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useSettingsStore } from '@/stores/settingsStore';

const ContactPage = () => {
  const { settings } = useSettingsStore();
  const phoneNumber = settings.whatsappNumber || '+964 770 123 4567';
  const email = settings.email || 'sightnessexpert@gmail.com';

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
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const handleEmailClick = () => {
    const mailtoLink = `mailto:${email}?subject=Message from Sightness Expert Website&body=Hello Sightness Expert Team,%0D%0A%0D%0A`;
    window.open(mailtoLink, '_blank');
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
              {/* Email Section */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Mail size={20} />
                  <h3 className="font-light text-lg">Email</h3>
                </div>
                <p className="text-gray-400 ml-8 text-sm sm:text-base mb-3">{email}</p>
                <button
                  onClick={handleEmailClick}
                  className="ml-8 flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink size={14} />
                  Send Email
                </button>
              </div>

              {/* Phone Section */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Phone size={20} />
                  <h3 className="font-light text-lg">Phone</h3>
                </div>
                <a 
                  href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 ml-8 hover:text-white transition-colors block text-sm sm:text-base"
                >
                  {phoneNumber}
                </a>
              </div>

              {/* Address Section */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin size={20} />
                  <h3 className="font-light text-lg">Address</h3>
                </div>
                <p className="text-gray-400 ml-8 text-sm sm:text-base">Baghdad, Iraq</p>
              </div>

              {/* Hours */}
              <div className="border-t border-white/10 pt-8">
                <h3 className="font-light text-lg mb-4">Business Hours</h3>
                <div className="text-gray-400 space-y-2 text-sm">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
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
