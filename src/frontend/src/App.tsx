import AboutSection from "@/components/AboutSection";
import CartDrawer from "@/components/CartDrawer";
import FeaturedCollections from "@/components/FeaturedCollections";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ProductCatalog from "@/components/ProductCatalog";
import { MensSection, WomensSection } from "@/components/ProductSections";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main>
          <HeroSection />
          <FeaturedCollections />
          <MensSection />
          <WomensSection />
          <ProductCatalog />
          <AboutSection />
        </main>

        <Footer />

        {/* Cart Drawer (portal) */}
        <CartDrawer />

        {/* Toast notifications */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className:
              "bg-charcoal-light border border-border text-foreground font-body",
          }}
        />
      </div>
    </CartProvider>
  );
}
