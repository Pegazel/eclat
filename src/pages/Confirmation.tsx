import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PuzzlePieces from "@/components/PuzzlePieces";
import { CheckCircle2, Sparkles } from "lucide-react";

const Confirmation = () => {
  let order: { number: string; email: string; name: string; total: number } | null = null;
  try { order = JSON.parse(sessionStorage.getItem("eclat-last-order") || "null"); } catch { /* ignore */ }

  return (
    <div className="min-h-screen bg-background relative">
      <PuzzlePieces />
      <Header />
      <main className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <div className="bg-card rounded-3xl p-8 sm:p-12 text-center shadow-2xl border border-border">
            <CheckCircle2 className="w-20 h-20 mx-auto text-nature mb-4 animate-bounce" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
              Merci{order?.name ? ` ${order.name}` : ""} ! <Sparkles className="inline w-8 h-8 text-accent" />
            </h1>
            <p className="text-lg text-muted-foreground mb-6">Votre commande a bien été enregistrée. La magie est en route !</p>
            {order && (
              <div className="bg-muted rounded-2xl p-6 mb-8 space-y-2 text-left">
                <div className="flex justify-between"><span className="text-muted-foreground">N° de commande</span><strong className="text-foreground">{order.number}</strong></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Total payé</span><strong className="text-foreground">{order.total.toFixed(2)} €</strong></div>
                <p className="text-sm text-muted-foreground pt-2">Un email de confirmation a été envoyé à <strong className="text-foreground">{order.email}</strong>.</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/boutique" className="bg-gradient-warm text-primary-foreground px-8 py-3 rounded-full font-bold shadow-lg">Continuer mes achats</Link>
              <Link to="/" className="border-2 border-primary text-primary px-8 py-3 rounded-full font-bold">Retour à l'accueil</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Confirmation;
