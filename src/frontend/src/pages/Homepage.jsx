import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import FeaturesSection from '@/components/FeaturesSection';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <StatsSection />
      <FeaturesSection />
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Kenyan Beekeeping?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of beekeepers, investors, and environmental champions building a sustainable future through our marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/wallet-login">
              <Button size="lg" className="bg-background text-secondary font-semibold px-8 py-3 hover:bg-background/90">
                Connect Wallet
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="border-background text-primary-foreground hover:bg-background hover:text-secondary font-semibold px-8 py-3">
                Explore Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;