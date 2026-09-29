import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PuzzlePieces from "@/components/PuzzlePieces";
import { getProductById, products } from "@/data/products";
import { ArrowLeft, Clock, Puzzle, Star, Sparkles, Package, Ruler, Users, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { add } = useCart();
  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="min-h-screen bg-background relative">
        <PuzzlePieces />
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Produit non trouvé</h1>
            <p className="text-muted-foreground mb-8">Le produit que vous recherchez n'existe pas.</p>
            <Link 
              to="/boutique" 
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors"
            >
              Retour à la boutique
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const difficultyColor = {
    "Débutant": "text-nature bg-nature/10",
    "Intermédiaire": "text-secondary bg-secondary/10",
    "Avancé": "text-fairy bg-fairy/10"
  };

  // Get related products (same theme, excluding current)
  const relatedProducts = products
    .filter(p => p.theme === product.theme && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background relative">
      <PuzzlePieces />
      <Header />
      
      <main className="pt-24">
        {/* Breadcrumb */}
        <div className="container mx-auto px-6 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour
          </button>
        </div>

        {/* Product Hero */}
        <section className="py-8 md:py-16">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Product Image */}
              <div className="relative group">
                <div className="aspect-square rounded-3xl overflow-hidden bg-muted shadow-2xl">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Decorative glow */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-primary/20 rounded-full blur-3xl" />
                
                {/* Floating badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-gradient-warm text-primary-foreground text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-slide-up">
                    <Puzzle className="w-4 h-4" />
                    {product.pieces} pièces
                  </span>
                  <span className="bg-card text-foreground text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-slide-up" style={{ animationDelay: "100ms" }}>
                    <Clock className="w-4 h-4 text-secondary" />
                    {product.time}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div className="animate-slide-up">
                  <span className="text-primary font-medium">{product.subtitle}</span>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mt-2">
                    {product.name}
                  </h1>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 animate-slide-up" style={{ animationDelay: "100ms" }}>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                    ))}
                  </div>
                  <span className="text-muted-foreground">(127 avis)</span>
                </div>

                {/* Price */}
                <div className="animate-slide-up" style={{ animationDelay: "150ms" }}>
                  <span className="text-4xl font-extrabold text-gradient-warm">
                    {product.price.toFixed(2)} €
                  </span>
                </div>

                {/* Difficulty & Theme badges */}
                <div className="flex flex-wrap gap-3 animate-slide-up" style={{ animationDelay: "200ms" }}>
                  <span className={`px-4 py-2 rounded-full font-semibold text-sm ${difficultyColor[product.difficulty]}`}>
                    {product.difficulty}
                  </span>
                  <span className="px-4 py-2 rounded-full font-semibold text-sm bg-primary/10 text-primary">
                    {product.theme}
                  </span>
                  <span className="px-4 py-2 rounded-full font-semibold text-sm bg-muted text-foreground flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {product.age}
                  </span>
                </div>

                {/* Description */}
                <p className="text-lg text-muted-foreground leading-relaxed animate-slide-up" style={{ animationDelay: "250ms" }}>
                  {product.description}
                </p>

                {/* Features */}
                <div className="space-y-3 animate-slide-up" style={{ animationDelay: "300ms" }}>
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    Caractéristiques
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-border animate-slide-up" style={{ animationDelay: "350ms" }}>
                  <div className="text-center">
                    <Ruler className="w-6 h-6 mx-auto text-secondary mb-2" />
                    <p className="text-sm text-muted-foreground">Dimensions</p>
                    <p className="font-bold text-foreground">{product.dimensions}</p>
                  </div>
                  <div className="text-center">
                    <Package className="w-6 h-6 mx-auto text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Pièces</p>
                    <p className="font-bold text-foreground">{product.pieces}</p>
                  </div>
                  <div className="text-center">
                    <Leaf className="w-6 h-6 mx-auto text-nature mb-2" />
                    <p className="text-sm text-muted-foreground">Éco-conçu</p>
                    <p className="font-bold text-foreground">FSC</p>
                  </div>
                </div>

                {/* Materials */}
                <div className="animate-slide-up" style={{ animationDelay: "400ms" }}>
                  <h3 className="font-bold text-foreground mb-3">Matériaux</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map((material, i) => (
                      <span key={i} className="bg-muted px-3 py-1.5 rounded-full text-sm text-foreground">
                        {material}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-slide-up" style={{ animationDelay: "450ms" }}>
                  <Button
                    onClick={() => {
                      add({ id: product.id, name: product.name, price: product.price, image: product.image });
                      toast.success(`${product.name} ajouté au panier`, {
                        action: { label: "Voir le panier", onClick: () => navigate("/panier") },
                      });
                    }}
                    className="flex-1 bg-gradient-warm text-primary-foreground px-8 py-6 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    Ajouter au panier
                  </Button>
                  <Button variant="outline" className="px-8 py-6 rounded-full font-bold text-lg border-2 hover:bg-muted transition-all duration-300 hover:scale-105">
                    ♥ Favoris
                  </Button>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-4 pt-4 animate-slide-up" style={{ animationDelay: "500ms" }}>
                  {['🇫🇷 Made in France', '↩️ Retours 30j'].map((badge) => (
                    <span key={badge} className="text-sm text-muted-foreground bg-card px-3 py-1.5 rounded-full border border-border">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 bg-muted">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-extrabold text-foreground mb-8 text-center">
                Vous aimerez aussi
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <Link 
                    key={relatedProduct.id}
                    to={`/produit/${relatedProduct.id}`}
                    className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border"
                  >
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-primary font-medium text-sm">{relatedProduct.subtitle}</span>
                      <h3 className="text-xl font-bold text-foreground mt-1">{relatedProduct.name}</h3>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-2xl font-extrabold text-gradient-warm">
                          {relatedProduct.price.toFixed(2)} €
                        </span>
                        <span className="text-primary font-semibold group-hover:translate-x-1 transition-transform">
                          Voir →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
