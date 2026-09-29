import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Boutique from "./pages/Boutique";
import ProductDetail from "./pages/ProductDetail";
import LaMarque from "./pages/LaMarque";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Livraison from "./pages/Livraison";
import MentionsLegales from "./pages/MentionsLegales";
import CGV from "./pages/CGV";
import NotFound from "./pages/NotFound";
import Panier from "./pages/Panier";
import Commande from "./pages/Commande";
import Confirmation from "./pages/Confirmation";
import Projet from "./pages/Projet";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/produit/:id" element={<ProductDetail />} />
          <Route path="/la-marque" element={<LaMarque />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/livraison" element={<Livraison />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/commande" element={<Commande />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/projet" element={<Projet />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
