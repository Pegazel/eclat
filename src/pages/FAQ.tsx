import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PuzzlePieces from "@/components/PuzzlePieces";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Quel âge est recommandé pour les puzzles ÉCLAT ?",
      answer: "Nos puzzles sont conçus pour les enfants à partir de 6 ans, accompagnés d'un adulte. Chaque puzzle indique un niveau de difficulté (Facile, Moyen, Difficile) pour vous aider à choisir celui qui convient le mieux."
    },
    {
      question: "Comment fonctionne l'éclairage LED ?",
      answer: "Chaque puzzle est livré avec un kit LED intégré. Une fois le puzzle assemblé, il suffit de connecter les LED selon les instructions fournies et d'insérer les piles (incluses) pour illuminer votre création."
    },
    {
      question: "Les puzzles sont-ils solides une fois montés ?",
      answer: "Oui ! Nos puzzles 3D en bois s'emboîtent parfaitement et restent stables sans colle. Vous pouvez les exposer fièrement dans la chambre de votre enfant ou ailleurs dans la maison."
    },
    {
      question: "Puis-je offrir un puzzle ÉCLAT en cadeau ?",
      answer: "Absolument ! Nos puzzles sont livrés dans un packaging soigné, parfait pour offrir. Vous pouvez également ajouter un message personnalisé lors de votre commande."
    },
    {
      question: "Que faire si une pièce est manquante ou endommagée ?",
      answer: "Contactez-nous immédiatement via notre formulaire de contact ou par email à contact@eclat-puzzles.fr. Nous vous enverrons les pièces de remplacement gratuitement."
    },
    {
      question: "Les puzzles sont-ils fabriqués en France ?",
      answer: "Oui, tous nos puzzles sont conçus et fabriqués en France, dans notre atelier situé en région parisienne. Nous utilisons du bois issu de forêts gérées durablement."
    },
    {
      question: "Combien de temps faut-il pour assembler un puzzle ?",
      answer: "Le temps d'assemblage varie selon le modèle et le niveau de difficulté. Comptez entre 2 et 4 heures pour un puzzle facile, et jusqu'à 8 heures pour les modèles les plus complexes."
    },
    {
      question: "Proposez-vous des puzzles personnalisés ?",
      answer: "Nous travaillons actuellement sur cette option ! Inscrivez-vous à notre newsletter pour être informé dès que les puzzles personnalisés seront disponibles."
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <PuzzlePieces />
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 bg-muted relative overflow-hidden">
          <div className="absolute top-10 right-10 w-24 h-24 bg-fairy/10 rounded-full blur-2xl" />
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />

          <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4">
              Questions <span className="text-primary">Fréquentes</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Retrouvez ici les réponses aux questions les plus courantes
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card rounded-xl border border-border px-6"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
