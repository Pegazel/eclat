import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PuzzlePieces from "@/components/PuzzlePieces";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <PuzzlePieces />
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 bg-muted relative overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4">
              Mentions <span className="text-primary">Légales</span>
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-lg max-w-none space-y-8">
              
              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Éditeur du site</h2>
                <div className="text-muted-foreground space-y-2">
                  <p><strong className="text-foreground">Raison sociale :</strong> ÉCLAT SAS</p>
                  <p><strong className="text-foreground">Siège social :</strong> 12 Rue de l'Atelier, 75011 Paris, France</p>
                  <p><strong className="text-foreground">Capital social :</strong> 10 000 €</p>
                  <p><strong className="text-foreground">RCS :</strong> Paris B 123 456 789</p>
                  <p><strong className="text-foreground">N° TVA Intracommunautaire :</strong> FR 12 345678901</p>
                  <p><strong className="text-foreground">Directeur de publication :</strong> [Nom du dirigeant]</p>
                  <p><strong className="text-foreground">Email :</strong> contact@eclat-puzzles.fr</p>
                  <p><strong className="text-foreground">Téléphone :</strong> 01 23 45 67 89</p>
                </div>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Hébergement</h2>
                <div className="text-muted-foreground space-y-2">
                  <p><strong className="text-foreground">Hébergeur :</strong> Lovable</p>
                  <p><strong className="text-foreground">Site web :</strong> www.lovable.dev</p>
                </div>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Propriété intellectuelle</h2>
                <p className="text-muted-foreground leading-relaxed">
                  L'ensemble du contenu de ce site (textes, images, vidéos, logos, marques) est protégé par le droit d'auteur 
                  et le droit des marques. Toute reproduction, représentation, modification, publication ou adaptation de tout 
                  ou partie des éléments du site est interdite, sauf autorisation écrite préalable de ÉCLAT SAS.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Protection des données personnelles</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, 
                  vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Pour exercer ces droits, vous pouvez nous contacter à l'adresse : contact@eclat-puzzles.fr
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ce site utilise des cookies pour améliorer votre expérience de navigation et réaliser des statistiques de visites. 
                  Vous pouvez à tout moment modifier vos préférences en matière de cookies via les paramètres de votre navigateur.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Limitation de responsabilité</h2>
                <p className="text-muted-foreground leading-relaxed">
                  ÉCLAT SAS s'efforce d'assurer l'exactitude des informations diffusées sur ce site, mais ne peut garantir 
                  l'exhaustivité ni l'absence d'erreurs. ÉCLAT SAS ne pourra être tenue responsable des dommages directs ou 
                  indirects résultant de l'accès ou de l'utilisation de ce site.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Droit applicable</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français 
                  seront seuls compétents.
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

export default MentionsLegales;
