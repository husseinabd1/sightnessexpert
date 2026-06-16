import { Metadata } from 'next';
import { Navbar, Footer } from '@/components';

export const metadata: Metadata = {
  title: 'Privacy Policy - Sightness Expert',
  description: 'Privacy policy and DMCA information for Sightness Expert.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-20 bg-black text-white">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-light tracking-tighter mb-8">Privacy Policy</h1>
          
          <div className="space-y-8 text-gray-400 font-light">
            <section>
              <h2 className="text-xl text-white font-light mb-4">1. Information We Collect</h2>
              <p className="leading-relaxed">
                We collect information that you provide directly to us, including your name, email address, 
                phone number, shipping address, and payment information when you make a purchase.
              </p>
            </section>

            <section>
              <h2 className="text-xl text-white font-light mb-4">2. How We Use Your Information</h2>
              <p className="leading-relaxed">
                We use the information we collect to process your orders, communicate with you about your 
                purchases, improve our products and services, and send you marketing communications (with your consent).
              </p>
            </section>

            <section>
              <h2 className="text-xl text-white font-light mb-4">3. Information Sharing</h2>
              <p className="leading-relaxed">
                We do not sell or rent your personal information to third parties. We may share your 
                information with service providers who assist us in operating our business.
              </p>
            </section>

            <section>
              <h2 className="text-xl text-white font-light mb-4">4. DMCA Notice</h2>
              <p className="leading-relaxed">
                If you believe that your copyrighted work has been copied in a way that constitutes 
                copyright infringement, please contact us at sightnessexpert@gmail.com.
              </p>
            </section>

            <section>
              <h2 className="text-xl text-white font-light mb-4">5. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at 
                sightnessexpert@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
