import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PuzzlePieces from "@/components/PuzzlePieces";
import { products } from "@/data/products";
import { useState } from "react";
import { Filter, Clock, Puzzle } from "lucide-react";
import { Link } from "react-router-dom";

const themes = ["Tous", "Magie", "Nature", "Espace"];
const difficulties = ["Tous", "Débutant", "Intermédiaire", "Avancé"];

const Boutique = () => {
  const [selectedTheme, setSelectedTheme] = useState("Tous");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Tous");

  const filteredProducts = products.filter((product) => {
    const matchesTheme = selectedTheme === "Tous" || product.theme === selectedTheme;
    const matchesDifficulty = selectedDifficulty === "Tous" || product.difficulty === selectedDifficulty;
    return matchesTheme && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-background relative">
      <PuzzlePieces />
      <Header />
      
      <main className="pt-24">
        {/* Hero Banner */}
        <section className="py-16 bg-muted relative overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
          
          <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4">
              Notre <span className="text-primary">Collection</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explorez notre gamme de puzzles 3D lumineux et trouvez celui qui illuminera votre intérieur.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-foreground">
                <Filter className="w-5 h-5 text-primary" />
                <span className="font-semibold">Filtrer :</span>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div>
                  <span className="text-sm text-muted-foreground mr-2">Thème :</span>
                  {themes.map((theme) => (
                    <button
                      key={theme}
                      onClick={() => setSelectedTheme(theme)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all mr-2 ${
                        selectedTheme === theme
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground hover:bg-primary/10"
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground mr-2">Difficulté :</span>
                  {difficulties.map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all mr-2 ${
                        selectedDifficulty === diff
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-muted text-foreground hover:bg-secondary/10"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <Link
                  to={`/produit/${product.id}`}
                  key={product.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border block"
                >
                  <div className="aspect-square overflow-hidden bg-muted relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                        <Puzzle className="w-3 h-3" />
                        {product.pieces} pièces
                      </span>
                      <span className="bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {product.time}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-nature font-medium text-sm">{product.subtitle}</span>
                    <h3 className="text-xl font-bold text-foreground mt-1 mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Difficulté : <span className="text-fairy font-semibold">{product.difficulty}</span>
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-extrabold text-primary">
                        {product.price.toFixed(2)} €
                      </span>
                      <span className="bg-primary text-primary-foreground px-5 py-2 rounded-full font-bold text-sm hover:bg-primary/90 transition-colors">
                        Voir le produit
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">Aucun produit ne correspond à vos critères.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Boutique;
