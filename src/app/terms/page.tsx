import { Metadata } from 'next';
import { Navbar, Footer } from '@/components';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Sightness Expert',
  description: 'Terms and conditions for using Sightness Expert services.',
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-20 bg-black text-white">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-light tracking-tighter mb-8">Terms & Conditions</h1>
          
          <div className="space-y-8 text-gray-400 font-light">
            <section>
              <h2 className="text-xl text-white font-light mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using Sightness Expert, you accept and agree to be bound by these 
                Terms and Conditions. If you do not agree, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl text-white font-light mb-4">2. Product Information</h2>
              <p className="leading-relaxed">
                We strive to provide accurate product descriptions and images. However, we do not 
                warrant that product descriptions or other content is accurate, complete, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-xl text-white font-light mb-4">3. Pricing</h2>
              <p className="leading-relaxed">
                All prices are listed in USD unless otherwise stated. We reserve the right to change 
                prices at any time without notice. The price charged will be the price at the time of purchase.
              </p>
            </section>

            <section>
              <h2 className="text-xl text-white font-light mb-4">4. Limitation of Liability</h2>
              <p className="leading-relaxed">
                Sightness Expert shall not be liable for any indirect, incidental, special, or 
                consequential damages resulting from the use of our products or services.
              </p>
            </section>

            <section>
              <h2 className="text-xl text-white font-light mb-4">5. Governing Law</h2>
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of Iraq, 
                without regard to its conflict of law provisions.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
