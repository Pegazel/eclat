import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PuzzlePieces from "@/components/PuzzlePieces";
import { useCart, shippingCost, SHIPPING_FREE_FROM } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Panier = () => {
  const { items, update, remove, subtotal } = useCart();
  const navigate = useNavigate();
  const shipping = shippingCost(subtotal);
  const remaining = SHIPPING_FREE_FROM - subtotal;

  return (
    <div className="min-h-screen bg-background relative">
      <PuzzlePieces />
      <Header />
      <main className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-8">
            Mon <span className="text-gradient-warm">Panier</span>
          </h1>

          {items.length === 0 ? (
            <div className="bg-card rounded-3xl p-12 text-center shadow-lg border border-border">
              <ShoppingBag className="w-16 h-16 mx-auto text-primary mb-4" />
              <p className="text-xl font-bold text-foreground mb-2">Votre panier est vide</p>
              <p className="text-muted-foreground mb-6">Découvrez nos puzzles lumineux magiques ✨</p>
              <Link to="/boutique" className="inline-block bg-gradient-warm text-primary-foreground px-8 py-3 rounded-full font-bold shadow-lg">
                Aller à la boutique
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {remaining > 0 ? (
                  <div className="bg-secondary/10 text-foreground rounded-2xl p-4 flex items-center gap-3">
                    <Truck className="w-5 h-5 text-secondary" />
                    Plus que <strong>{remaining.toFixed(2)} €</strong> pour la livraison offerte !
                  </div>
                ) : (
                  <div className="bg-nature/10 text-foreground rounded-2xl p-4 flex items-center gap-3">
                    <Truck className="w-5 h-5 text-nature" /> Livraison standard offerte 🎉
                  </div>
                )}
                {items.map((item) => (
                  <div key={item.id} className="bg-card rounded-2xl p-4 flex gap-4 items-center shadow border border-border">
                    <Link to={`/produit/${item.id}`}>
                      <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/produit/${item.id}`} className="font-bold text-foreground hover:text-primary">{item.name}</Link>
                      <p className="text-muted-foreground text-sm">{item.price.toFixed(2)} €</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button aria-label="Diminuer" onClick={() => update(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20"><Minus className="w-4 h-4" /></button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button aria-label="Augmenter" onClick={() => update(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20"><Plus className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-foreground">{(item.price * item.quantity).toFixed(2)} €</p>
                      <button aria-label="Supprimer" onClick={() => remove(item.id)} className="mt-2 text-muted-foreground hover:text-destructive"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="bg-card rounded-3xl p-6 shadow-lg border border-border h-fit space-y-3">
                <h2 className="text-xl font-bold text-foreground mb-2">Récapitulatif</h2>
                <div className="flex justify-between text-muted-foreground"><span>Sous-total</span><span>{subtotal.toFixed(2)} €</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Livraison</span><span>{shipping === 0 ? "Offerte" : `${shipping.toFixed(2)} €`}</span></div>
                <div className="flex justify-between text-xl font-extrabold text-foreground border-t border-border pt-3"><span>Total</span><span>{(subtotal + shipping).toFixed(2)} €</span></div>
                <Button onClick={() => navigate("/commande")} className="w-full bg-gradient-warm text-primary-foreground py-6 rounded-full font-bold text-lg shadow-lg">
                  Passer commande
                </Button>
                <Link to="/boutique" className="block text-center text-primary font-semibold text-sm">← Continuer mes achats</Link>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Panier;
