import { Metadata } from 'next';
import { Navbar, Footer } from '@/components';

export const metadata: Metadata = {
  title: 'Refund Policy - Sightness Expert',
  description: 'Refund and return policy for Sightness Expert products.',
};

export default function RefundsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-20 bg-black text-white">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-light tracking-tighter mb-8">Refund Policy</h1>
          
          <div className="space-y-8 text-gray-400 font-light">
            <section>
              <h2 className="text-xl text-white font-light mb-4">1. Return Eligibility</h2>
              <p className="leading-relaxed">
                We accept returns within 7 days of delivery. Items must be unused, in their original 
                packaging, and in the same condition as received.
              </p>
            </section>

            <section>
              <h2 className="text-xl text-white font-light mb-4">2. Non-Returnable Items</h2>
              <p className="leading-relaxed">
                Custom-made or personalized items cannot be returned unless defective. Contact lenses 
                that have been opened cannot be returned for hygiene reasons.
              </p>
            </section>

            <section>
              <h2 className="text-xl text-white font-light mb-4">3. Refund Process</h2>
              <p className="leading-relaxed">
                Once we receive your return and inspect the item, we will process your refund within 
                5-7 business days. Refunds will be issued to the original payment method.
              </p>
            </section>

            <section>
              <h2 className="text-xl text-white font-light mb-4">4. Damaged or Defective Items</h2>
              <p className="leading-relaxed">
                If you receive a damaged or defective item, please contact us immediately via WhatsApp 
                with photos of the damage. We will arrange a replacement or full refund at no extra cost.
              </p>
            </section>

            <section>
              <h2 className="text-xl text-white font-light mb-4">5. Contact for Returns</h2>
              <p className="leading-relaxed">
                To initiate a return, please contact us at sightnessexpert@gmail.com or via WhatsApp 
                with your order details.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
