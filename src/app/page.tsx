import { Navbar, Hero, FeaturedProducts, Footer } from '@/components';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <FeaturedProducts />
      
      {/* Premium Features Section */}
      <section className="py-20 px-4 bg-white/2 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Premium Quality',
                description: 'Meticulously crafted products with attention to every detail',
              },
              {
                title: 'Luxury Experience',
                description: 'Curated shopping experience with white-glove service',
              },
              {
                title: 'Exclusive Designs',
                description: 'Limited edition collections from premium designers',
              },
            ].map((feature, i) => (
              <div key={i} className="p-8 border border-white/10 rounded-lg hover:border-white transition-colors">
                <h3 className="text-lg font-semibold mb-2 tracking-wide">{feature.title}</h3>
                <p className="text-gray-400 font-light text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
