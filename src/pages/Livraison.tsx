import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PuzzlePieces from "@/components/PuzzlePieces";
import { Truck, Clock, Package, Euro, MapPin, RefreshCw } from "lucide-react";

const Livraison = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <PuzzlePieces />
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 bg-muted relative overflow-hidden">
          <div className="absolute top-10 right-10 w-24 h-24 bg-nature/10 rounded-full blur-2xl" />
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />

          <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4">
              Livraison & <span className="text-primary">Retours</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur la livraison de vos puzzles
            </p>
          </div>
        </section>

        {/* Delivery Options */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Nos <span className="text-primary">options de livraison</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-card p-8 rounded-2xl border border-border text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Livraison Standard</h3>
                <p className="text-2xl font-bold text-primary mb-2">4,90 €</p>
                <p className="text-muted-foreground">Livraison en 3-5 jours ouvrés</p>
              </div>

              <div className="bg-card p-8 rounded-2xl border-2 border-primary text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                  Populaire
                </div>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Livraison Express</h3>
                <p className="text-2xl font-bold text-secondary mb-2">9,90 €</p>
                <p className="text-muted-foreground">Livraison en 24-48h</p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border text-center">
                <div className="w-16 h-16 bg-nature/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-8 h-8 text-nature" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Point Relais</h3>
                <p className="text-2xl font-bold text-nature mb-2">3,90 €</p>
                <p className="text-muted-foreground">Livraison en 4-6 jours ouvrés</p>
              </div>
            </div>

            <div className="bg-muted rounded-2xl p-8 mt-12 max-w-3xl mx-auto text-center">
              <Euro className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Livraison gratuite dès 59€ d'achat !</h3>
              <p className="text-muted-foreground">Profitez de la livraison offerte pour toute commande supérieure à 59€</p>
            </div>
          </div>
        </section>

        {/* Zones de livraison */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Zones de <span className="text-primary">livraison</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-card p-8 rounded-2xl border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">France Métropolitaine</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Nous livrons dans toute la France métropolitaine. Les délais indiqués sont valables pour les principales villes. 
                  Pour les zones plus reculées, comptez 1-2 jours supplémentaires.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <MapPin className="w-8 h-8 text-secondary" />
                  <h3 className="text-xl font-bold text-foreground">DOM-TOM & International</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  La livraison vers les DOM-TOM et l'international est disponible. Les frais et délais varient selon la destination. 
                  Contactez-nous pour un devis personnalisé.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Retours */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-12">
              <RefreshCw className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Politique de <span className="text-primary">retours</span>
              </h2>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Délai de rétractation</h3>
                <p className="text-muted-foreground">
                  Vous disposez de 14 jours après réception pour retourner votre commande, conformément à la législation en vigueur.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Conditions de retour</h3>
                <p className="text-muted-foreground">
                  Le puzzle doit être retourné dans son emballage d'origine, non ouvert et en parfait état. 
                  Les puzzles ouverts ou assemblés ne peuvent être retournés sauf en cas de défaut.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Procédure de retour</h3>
                <p className="text-muted-foreground">
                  Contactez notre service client pour obtenir un numéro de retour. Les frais de retour sont à la charge du client, 
                  sauf en cas de produit défectueux ou d'erreur de notre part.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Remboursement</h3>
                <p className="text-muted-foreground">
                  Le remboursement est effectué dans un délai de 14 jours après réception et vérification du retour, 
                  via le même mode de paiement que celui utilisé lors de la commande.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Livraison;
