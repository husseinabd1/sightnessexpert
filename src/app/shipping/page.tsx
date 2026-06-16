import { Metadata } from 'next';
import { Navbar, Footer } from '@/components';

export const metadata: Metadata = {
  title: 'Shipping Policy - Sightness Expert',
  description: 'Shipping and delivery information for Sightness Expert orders.',
};

export default function ShippingPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-20 bg-black text-white">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-light tracking-tighter mb-8">Shipping Policy</h1>
          
          <div className="space-y-8 text-gray-400 font-light">
            <section>
              <h2 className="text-xl text-white font-light mb-4">1. Delivery Areas</h2>
              <p className="leading-relaxed">
                We currently deliver to all major cities in Iraq. For international orders, please 
                contact us directly to arrange shipping.
              </p>
            </section>

            <section>
              <h2 className="text-xl text-white font-light mb-4">2. Processing Time</h2>
              <p className="leading-relaxed">
                Orders are processed within 1-2 business days. You will receive a confirmation 
                message once your order has been shipped.
              </p>
            </section>

            <section>
              <h2 className="text-xl text-white font-light mb-4">3. Delivery Time</h2>
              <p className="leading-relaxed">
                Delivery within Baghdad: 1-2 business days.<br />
                Delivery to other provinces: 2-5 business days.<br />
                Delivery times may vary based on location and local conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl text-white font-light mb-4">4. Shipping Fees</h2>
              <p className="leading-relaxed">
                We offer free shipping on all orders. There are no additional shipping charges.
              </p>
            </section>

            <section>
              <h2 className="text-xl text-white font-light mb-4">5. Tracking</h2>
              <p className="leading-relaxed">
                Once your order is shipped, we will provide tracking information through WhatsApp 
                so you can monitor your delivery status.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
