import { Puzzle, Leaf, Lightbulb, Heart } from "lucide-react";

const features = [
  {
    icon: Puzzle,
    title: "Fabriqué en France",
    description: "Conception artisanale française",
  },
  {
    icon: Lightbulb,
    title: "LED Longue Durée",
    description: "Éclairage doux et économique",
  },
  {
    icon: Leaf,
    title: "Matériaux Durables",
    description: "Bois éco-responsable certifié",
  },
  {
    icon: Heart,
    title: "Moment Partagé",
    description: "Créez des souvenirs en famille",
  },
];

const ReassuranceBanner = () => {
  return (
    <section className="bg-secondary/30 py-8 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-warm flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReassuranceBanner;
