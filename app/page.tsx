import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';

export default function Home() {
  return (
    <div className="-mx-8 -mt-8">
      <HeroSection />
      <AboutSection />
    </div>
  );
}