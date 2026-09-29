import { Link } from "react-router-dom";
import { products } from "@/data/products";

// Only show first 3 products for showcase
const showcaseProducts = products.slice(0, 3);

const ProductShowcase = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider bg-primary/10 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Notre Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mt-6 mb-4">
            Puzzles <span className="text-gradient-warm">Phares</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez nos créations les plus enchantées, prêtes à illuminer votre intérieur.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {showcaseProducts.map((product, index) => (
            <Link 
              to={`/produit/${product.id}`}
              key={product.id}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up opacity-0 hover:scale-105 block"
              style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }}
            >
              {/* Colorful top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-fairy" />
              
              <div className="aspect-square overflow-hidden bg-muted relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Hover glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="absolute top-4 right-4">
                <span className="bg-gradient-warm text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {product.pieces} pièces
                </span>
              </div>

              <div className="p-6">
                <span className="text-secondary font-medium text-sm">{product.subtitle}</span>
                <h3 className="text-xl font-bold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-extrabold text-gradient-warm">
                    {product.price.toFixed(2)} €
                  </span>
                  <span className="group/btn relative bg-gradient-warm text-primary-foreground px-5 py-2 rounded-full font-bold text-sm overflow-hidden transition-transform hover:scale-105">
                    <span className="relative z-10">Voir le produit</span>
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-300 skew-x-12" />
                  </span>
                </div>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-t from-accent/30 to-transparent rounded-full blur-3xl" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/boutique" className="group relative border-2 border-primary text-primary px-8 py-3 rounded-full font-bold overflow-hidden transition-all duration-300 hover:scale-105 inline-block">
            <span className="relative z-10 group-hover:text-primary-foreground transition-colors">Voir toute la collection</span>
            <div className="absolute inset-0 bg-gradient-warm translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
