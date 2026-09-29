import Header from "@/components/Header";
import PuzzlePieces from "@/components/PuzzlePieces";
import HeroSection from "@/components/HeroSection";
import ReassuranceBanner from "@/components/ReassuranceBanner";
import ProductShowcase from "@/components/ProductShowcase";
import BrandStory from "@/components/BrandStory";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <PuzzlePieces />
      <Header />
      <main>
        <HeroSection />
        <ReassuranceBanner />
        <ProductShowcase />
        <BrandStory />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
