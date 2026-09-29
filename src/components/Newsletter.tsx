import { Mail } from "lucide-react";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-warm mb-6">
            <Mail className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Rejoignez l'aventure ÉCLAT
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Inscrivez-vous pour recevoir nos nouveautés, offres exclusives et 
            inspirations créatives directement dans votre boîte mail.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-full border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <button 
              type="submit"
              className="bg-gradient-warm text-primary-foreground px-8 py-4 rounded-full font-bold hover:opacity-90 transition-opacity shadow-lg whitespace-nowrap"
            >
              S'inscrire
            </button>
          </form>

          <p className="text-sm text-muted-foreground mt-4">
            En vous inscrivant, vous acceptez notre politique de confidentialité. 
            Pas de spam, promis ! ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
