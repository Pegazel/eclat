import ambianceBoutique from "@/assets/ambiance-boutique.png";
import { Link } from "react-router-dom";

const BrandStory = () => {
  return (
    <section id="notre-histoire" className="py-20 bg-muted relative overflow-hidden">
      {/* Decorative colored puzzle pieces */}
      <div className="absolute top-10 left-10 w-8 h-8 bg-primary/30 rounded-lg rotate-12" style={{ clipPath: "polygon(0% 25%, 25% 25%, 25% 0%, 75% 0%, 75% 25%, 100% 25%, 100% 75%, 75% 75%, 75% 100%, 25% 100%, 25% 75%, 0% 75%)" }} />
      <div className="absolute top-20 right-16 w-6 h-6 bg-secondary/30 rounded-lg -rotate-12" style={{ clipPath: "polygon(0% 25%, 25% 25%, 25% 0%, 75% 0%, 75% 25%, 100% 25%, 100% 75%, 75% 75%, 75% 100%, 25% 100%, 25% 75%, 0% 75%)" }} />
      <div className="absolute bottom-20 left-20 w-10 h-10 bg-fairy/30 rounded-lg rotate-45" style={{ clipPath: "polygon(0% 25%, 25% 25%, 25% 0%, 75% 0%, 75% 25%, 100% 25%, 100% 75%, 75% 75%, 75% 100%, 25% 100%, 25% 75%, 0% 75%)" }} />
      <div className="absolute bottom-32 right-12 w-7 h-7 bg-nature/30 rounded-lg -rotate-6" style={{ clipPath: "polygon(0% 25%, 25% 25%, 25% 0%, 75% 0%, 75% 25%, 100% 25%, 100% 75%, 75% 75%, 75% 100%, 25% 100%, 25% 75%, 0% 75%)" }} />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={ambianceBoutique} 
                alt="Atelier ÉCLAT" 
                className="w-full h-auto rounded-2xl"
              />
            </div>
            {/* Floating glow */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-primary/20 rounded-full blur-3xl" />
          </div>

          <div className="space-y-6">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Notre Histoire
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground">
              L'Art de Créer
              <span className="text-primary block">des Moments Magiques</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Née d'une passion pour l'artisanat et l'émerveillement, ÉCLAT transforme 
              le simple jeu de puzzle en une véritable expérience sensorielle. Chaque pièce 
              est pensée pour raconter une histoire, chaque lumière pour créer une ambiance unique.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dans notre atelier français, nous assemblons avec soin des matériaux nobles 
              et durables, pour que chaque création devienne un héritage à transmettre.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-card px-6 py-4 rounded-xl border border-border shadow-sm">
                <span className="text-3xl font-extrabold text-primary">100%</span>
                <p className="text-sm text-muted-foreground">Made in France</p>
              </div>
              <div className="bg-card px-6 py-4 rounded-xl border border-border shadow-sm">
                <span className="text-3xl font-extrabold text-secondary">50k+</span>
                <p className="text-sm text-muted-foreground">Familles enchantées</p>
              </div>
              <div className="bg-card px-6 py-4 rounded-xl border border-border shadow-sm">
                <span className="text-3xl font-extrabold text-fairy">25+</span>
                <p className="text-sm text-muted-foreground">Modèles uniques</p>
              </div>
            </div>

            <Link 
              to="/la-marque"
              className="inline-block mt-6 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-lg"
            >
              Découvrir notre univers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
