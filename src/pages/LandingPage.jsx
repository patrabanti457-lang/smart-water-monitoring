import Hero from '@/components/landing/Hero';
import AboutSection from '@/components/landing/AboutSection';
import HowItWorks from '@/components/landing/HowItWorks';
import TechnologySection from '@/components/landing/TechnologySection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-deep-900 text-text-primary">
      <Hero />
      <AboutSection />
      <HowItWorks />
      <TechnologySection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
