import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import logoEclat from "@/assets/logo-eclat.png";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { count } = useCart();

  const cartIcon = (
    <Link to="/panier" aria-label="Panier" className="relative p-2 text-foreground hover:text-primary transition-colors">
      <ShoppingBag size={26} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{count}</span>
      )}
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoEclat} alt="ÉCLAT" className="h-14 sm:h-20 w-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link to="/boutique" className="text-foreground/80 hover:text-primary font-semibold transition-colors">Boutique</Link>
            </li>
            <li>
              <Link to="/la-marque" className="text-foreground/80 hover:text-primary font-semibold transition-colors">La Marque</Link>
            </li>
            <li>
              <Link to="/projet" className="text-foreground/80 hover:text-primary font-semibold transition-colors">Le Projet</Link>
            </li>
            <li>
              <Link to="/contact" className="text-foreground/80 hover:text-primary font-semibold transition-colors">Contact</Link>
            </li>
          </ul>

          {/* Desktop CTA + cart */}
          <div className="hidden md:flex items-center gap-4">
            {cartIcon}
            <Link 
              to="/boutique"
              className="bg-gradient-warm text-primary-foreground px-6 py-2.5 rounded-full font-bold hover:opacity-90 transition-opacity shadow-lg"
            >
              Découvrir
            </Link>
          </div>

          {/* Mobile cart + menu */}
          <div className="md:hidden flex items-center gap-1">
            {cartIcon}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-4 pb-4">
            <li>
              <Link 
                to="/boutique" 
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-foreground/80 hover:text-primary font-semibold transition-colors"
              >
                Boutique
              </Link>
            </li>
            <li>
              <Link 
                to="/la-marque" 
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-foreground/80 hover:text-primary font-semibold transition-colors"
              >
                La Marque
              </Link>
            </li>
            <li>
              <Link 
                to="/projet" 
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-foreground/80 hover:text-primary font-semibold transition-colors"
              >
                Le Projet
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-foreground/80 hover:text-primary font-semibold transition-colors"
              >
                Contact
              </Link>
            </li>
            <li className="pt-2">
              <Link 
                to="/boutique"
                onClick={() => setIsMenuOpen(false)}
                className="inline-block bg-gradient-warm text-primary-foreground px-6 py-2.5 rounded-full font-bold hover:opacity-90 transition-opacity shadow-lg"
              >
                Découvrir
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
