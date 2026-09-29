import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PuzzlePieces from "@/components/PuzzlePieces";
import { useCart, shippingCost } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, CreditCard } from "lucide-react";

const steps = ["Panier", "Livraison", "Paiement", "Confirmation"];

const Commande = () => {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [method, setMethod] = useState<"standard" | "express">("standard");
  const [info, setInfo] = useState({ email: "", firstName: "", lastName: "", address: "", zip: "", city: "", phone: "" });

  if (items.length === 0) return <Navigate to="/panier" replace />;

  const shipping = shippingCost(subtotal, method);
  const total = subtotal + shipping;
  const set = (k: keyof typeof info) => (e: React.ChangeEvent<HTMLInputElement>) => setInfo({ ...info, [k]: e.target.value });

  const pay = (e: React.FormEvent) => {
    e.preventDefault();
    const order = {
      number: "ECL-" + Math.floor(100000 + Math.random() * 900000),
      email: info.email, name: info.firstName, total, items,
    };
    sessionStorage.setItem("eclat-last-order", JSON.stringify(order));
    clear();
    navigate("/confirmation");
  };

  return (
    <div className="min-h-screen bg-background relative">
      <PuzzlePieces />
      <Header />
      <main className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Stepper */}
          <ol className="flex items-center justify-center gap-2 sm:gap-4 mb-10 flex-wrap">
            {steps.map((s, i) => {
              const active = i <= step;
              return (
                <li key={s} className="flex items-center gap-2">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${active ? "bg-gradient-warm text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{i + 1}</span>
                  <span className={`font-semibold text-sm ${active ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
                  {i < steps.length - 1 && <span className="w-6 sm:w-10 h-0.5 bg-border" />}
                </li>
              );
            })}
          </ol>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-card rounded-3xl p-6 sm:p-8 shadow-lg border border-border">
              {step === 1 ? (
                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-5">
                  <h2 className="text-2xl font-extrabold text-foreground">Informations de livraison</h2>
                  <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={info.email} onChange={set("email")} /></div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><Label htmlFor="fn">Prénom</Label><Input id="fn" required value={info.firstName} onChange={set("firstName")} /></div>
                    <div><Label htmlFor="ln">Nom</Label><Input id="ln" required value={info.lastName} onChange={set("lastName")} /></div>
                  </div>
                  <div><Label htmlFor="ad">Adresse</Label><Input id="ad" required value={info.address} onChange={set("address")} /></div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><Label htmlFor="zip">Code postal</Label><Input id="zip" required pattern="[0-9]{5}" value={info.zip} onChange={set("zip")} /></div>
                    <div><Label htmlFor="city">Ville</Label><Input id="city" required value={info.city} onChange={set("city")} /></div>
                  </div>
                  <div><Label htmlFor="ph">Téléphone</Label><Input id="ph" type="tel" value={info.phone} onChange={set("phone")} /></div>

                  <h3 className="text-lg font-bold text-foreground pt-2">Mode de livraison</h3>
                  {([
                    ["standard", "Colissimo standard (3-5 jours)", shippingCost(subtotal, "standard")],
                    ["express", "Express (24-48h)", shippingCost(subtotal, "express")],
                  ] as const).map(([val, label, price]) => (
                    <label key={val} className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer ${method === val ? "border-primary bg-primary/5" : "border-border"}`}>
                      <span className="flex items-center gap-3">
                        <input type="radio" name="ship" checked={method === val} onChange={() => setMethod(val)} className="accent-primary" />
                        <span className="font-semibold text-foreground">{label}</span>
                      </span>
                      <span className="font-bold text-foreground">{price === 0 ? "Offerte" : `${price.toFixed(2)} €`}</span>
                    </label>
                  ))}
                  <div className="flex justify-between items-center pt-4">
                    <Link to="/panier" className="text-primary font-semibold">← Retour au panier</Link>
                    <Button type="submit" className="bg-gradient-warm text-primary-foreground px-8 py-6 rounded-full font-bold">Continuer vers le paiement</Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={pay} className="space-y-5">
                  <h2 className="text-2xl font-extrabold text-foreground flex items-center gap-2"><CreditCard className="w-6 h-6 text-primary" /> Paiement</h2>
                  <div className="bg-muted rounded-2xl p-4 text-sm text-muted-foreground">
                    Livraison à <strong className="text-foreground">{info.firstName} {info.lastName}</strong>, {info.address}, {info.zip} {info.city}
                  </div>
                  <div><Label htmlFor="card">Numéro de carte</Label><Input id="card" required inputMode="numeric" placeholder="1234 5678 9012 3456" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label htmlFor="exp">Expiration</Label><Input id="exp" required placeholder="MM/AA" /></div>
                    <div><Label htmlFor="cvc">CVC</Label><Input id="cvc" required placeholder="123" /></div>
                  </div>
                  <label className="flex items-start gap-2 text-sm text-muted-foreground">
                    <input type="checkbox" required className="mt-1 accent-primary" />
                    <span>J'accepte les <Link to="/cgv" className="text-primary underline">conditions générales de vente</Link></span>
                  </label>
                  <div className="flex justify-between items-center pt-4">
                    <button type="button" onClick={() => setStep(1)} className="text-primary font-semibold">← Modifier la livraison</button>
                    <Button type="submit" className="bg-gradient-warm text-primary-foreground px-8 py-6 rounded-full font-bold">
                      <Lock className="w-4 h-4 mr-2" /> Payer {total.toFixed(2)} €
                    </Button>
                  </div>
                </form>
              )}
            </div>

            <aside className="bg-card rounded-3xl p-6 shadow-lg border border-border h-fit space-y-4">
              <h2 className="text-xl font-bold text-foreground">Votre commande</h2>
              {items.map((i) => (
                <div key={i.id} className="flex items-center gap-3">
                  <div className="relative">
                    <img src={i.image} alt={i.name} className="w-14 h-14 rounded-lg object-cover" />
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{i.quantity}</span>
                  </div>
                  <span className="flex-1 text-sm font-semibold text-foreground">{i.name}</span>
                  <span className="text-sm font-bold text-foreground">{(i.price * i.quantity).toFixed(2)} €</span>
                </div>
              ))}
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-muted-foreground"><span>Sous-total</span><span>{subtotal.toFixed(2)} €</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Livraison</span><span>{shipping === 0 ? "Offerte" : `${shipping.toFixed(2)} €`}</span></div>
                <div className="flex justify-between text-xl font-extrabold text-foreground"><span>Total TTC</span><span>{total.toFixed(2)} €</span></div>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Lock className="w-3 h-3" /> Paiement 100% sécurisé</p>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Commande;
