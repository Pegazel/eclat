import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PuzzlePieces from "@/components/PuzzlePieces";
import ambianceBoutique from "@/assets/ambiance-boutique.png";
import logoEclat from "@/assets/logo-eclat.png";
import { Heart, Leaf, MapPin, Sparkles, Award, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "Chaque puzzle est créé avec amour et attention aux détails.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Leaf,
    title: "Éco-responsable",
    description: "Matériaux durables et packaging recyclable.",
    color: "text-nature",
    bgColor: "bg-nature/10",
  },
  {
    icon: MapPin,
    title: "Made in France",
    description: "Conception et fabrication 100% française.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Sparkles,
    title: "Magie",
    description: "Transformez vos puzzles en œuvres lumineuses.",
    color: "text-fairy",
    bgColor: "bg-fairy/10",
  },
];

const timeline = [
  {
    year: "2020",
    title: "L'idée naît",
    description: "Dans un petit atelier, l'idée de combiner puzzle et lumière émerge.",
  },
  {
    year: "2021",
    title: "Premier prototype",
    description: "Le Château Enchanté, notre premier puzzle lumineux, voit le jour.",
  },
  {
    year: "2022",
    title: "Lancement officiel",
    description: "ÉCLAT ouvre sa boutique et rencontre ses premiers fans.",
  },
  {
    year: "2024",
    title: "Expansion",
    description: "Plus de 25 modèles et 50 000 familles enchantées.",
  },
];

const LaMarque = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <PuzzlePieces />
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-fairy/5" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Notre Histoire
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight">
                  L'Art de Créer
                  <span className="text-primary block">des Moments Magiques</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Née d'une passion pour l'artisanat et l'émerveillement, ÉCLAT transforme 
                  le simple jeu de puzzle en une véritable expérience sensorielle. Chaque pièce 
                  est pensée pour raconter une histoire, chaque lumière pour créer une ambiance unique.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Dans notre atelier français, nous assemblons avec soin des matériaux nobles 
                  et durables, pour que chaque création devienne un héritage à transmettre.
                </p>
              </div>

              <div className="relative">
                <img
                  src={ambianceBoutique}
                  alt="Atelier ÉCLAT"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-fairy/20 rounded-full blur-3xl" />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                Nos <span className="text-primary">Valeurs</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ce qui nous anime au quotidien et guide chacune de nos créations.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-2xl border border-border hover:shadow-lg transition-shadow"
                >
                  <div className={`w-14 h-14 ${value.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                    <value.icon className={`w-7 h-7 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                Notre <span className="text-secondary">Parcours</span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                      {item.year}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-6">
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              <div>
                <Award className="w-12 h-12 text-primary-foreground mx-auto mb-4" />
                <span className="text-4xl font-extrabold text-primary-foreground block">100%</span>
                <span className="text-primary-foreground/80">Made in France</span>
              </div>
              <div>
                <Users className="w-12 h-12 text-primary-foreground mx-auto mb-4" />
                <span className="text-4xl font-extrabold text-primary-foreground block">50 000+</span>
                <span className="text-primary-foreground/80">Familles enchantées</span>
              </div>
              <div>
                <Sparkles className="w-12 h-12 text-primary-foreground mx-auto mb-4" />
                <span className="text-4xl font-extrabold text-primary-foreground block">25+</span>
                <span className="text-primary-foreground/80">Modèles uniques</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LaMarque;
