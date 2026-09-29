import puzzleChateau from "@/assets/puzzle-chateau.png";
import { Sparkles, Star, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden pt-24">
      {/* Colorful background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse animation-delay-400" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-fairy/20 rounded-full blur-3xl animate-pulse animation-delay-600" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/15 rounded-full blur-3xl animate-pulse animation-delay-200" />
      </div>

      {/* Floating stars */}
      {[...Array(8)].map((_, i) => (
        <Star
          key={i}
          className="absolute text-accent/40 animate-sparkle-float"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: `${16 + (i % 3) * 8}px`,
            animationDelay: `${i * 0.5}s`,
          }}
          fill="currentColor"
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)]">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 animate-rainbow-glow">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm text-foreground/80 font-medium">
                Puzzles 3D Lumineux Made in France
              </span>
              <Wand2 className="w-4 h-4 text-secondary animate-puzzle-wiggle" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground leading-relaxed">
              Illuminez
              <span className="text-gradient-warm block animate-color-shift">votre imaginaire</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Découvrez l'univers enchanté d'ÉCLAT : des puzzles 3D en bois qui se transforment 
              en lampes d'ambiance magiques. <span className="text-primary font-semibold">Construisez, illuminez, rêvez.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <Link to="/boutique" className="group relative bg-gradient-warm text-primary-foreground px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden text-center">
                <span className="relative z-10">Découvrir la collection</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
              </Link>
              <a href="#notre-histoire" className="group border-2 border-foreground/20 text-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-muted hover:border-primary/40 transition-all duration-300 hover:scale-105 text-center">
                <span className="group-hover:text-primary transition-colors">Notre histoire</span>
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-6 justify-center lg:justify-start">
              {['🇫🇷 Made in France', '✨ LED longue durée', '🌿 Éco-conçu'].map((badge, i) => (
                <span
                  key={badge}
                  className="text-sm text-muted-foreground bg-card/50 px-3 py-1.5 rounded-full border border-border animate-slide-up"
                  style={{ animationDelay: `${600 + i * 100}ms` }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Hero Image - Château Enchanté */}
          <div className="relative animate-slide-up animation-delay-200">
            <div className="relative animate-float">
              {/* Rainbow glow behind image */}
              <div className="absolute inset-0 -z-10 animate-rainbow-glow rounded-2xl scale-105" />
              
              <img 
                src={puzzleChateau} 
                alt="Puzzle 3D Château Enchanté illuminé" 
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
              
              {/* Magical glow effect */}
              <div className="absolute inset-0 -z-10 animate-glow">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gradient-to-t from-primary/30 via-accent/20 to-transparent rounded-full blur-3xl" />
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-8 -right-4 w-20 h-20 bg-fairy/30 rounded-full blur-2xl animate-sparkle" />
            <div className="absolute -bottom-4 -left-8 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-sparkle animation-delay-400" />
            <div className="absolute top-1/4 -right-12 w-16 h-16 bg-accent/25 rounded-full blur-2xl animate-puzzle-bounce" />
            
            {/* Sparkle icons */}
            <Sparkles className="absolute top-4 right-8 w-8 h-8 text-accent animate-sparkle-float" />
            <Star className="absolute bottom-8 left-4 w-6 h-6 text-fairy animate-sparkle-float animation-delay-200" fill="currentColor" />
            <Sparkles className="absolute top-1/2 -left-4 w-5 h-5 text-secondary animate-sparkle-float animation-delay-400" />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
