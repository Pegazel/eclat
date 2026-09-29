import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PuzzlePieces from "@/components/PuzzlePieces";

const CGV = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <PuzzlePieces />
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 bg-muted relative overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4">
              Conditions Générales <span className="text-primary">de Vente</span>
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="space-y-8">

              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Article 1 - Objet</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les présentes Conditions Générales de Vente (CGV) régissent les ventes de puzzles lumineux 3D 
                  effectuées par la société ÉCLAT SAS auprès de consommateurs via le site www.eclat-puzzles.fr. 
                  Toute commande implique l'acceptation sans réserve des présentes CGV.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Article 2 - Produits</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les produits proposés à la vente sont décrits avec la plus grande exactitude possible. 
                  Les photographies illustrant les produits n'entrent pas dans le champ contractuel. 
                  En cas d'erreur ou d'omission, la responsabilité de ÉCLAT SAS ne saurait être engagée.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Article 3 - Prix</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Les prix sont indiqués en euros TTC (toutes taxes comprises). ÉCLAT SAS se réserve le droit 
                  de modifier ses prix à tout moment, étant entendu que le prix figurant sur le site le jour 
                  de la commande sera le seul applicable.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Les frais de livraison sont indiqués avant validation de la commande et facturés en supplément 
                  du prix des produits, sauf offre promotionnelle.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Article 4 - Commande</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Pour passer commande, l'acheteur sélectionne les produits souhaités, les ajoute au panier, 
                  puis valide sa commande après avoir pris connaissance des CGV et des informations de livraison.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Un email de confirmation récapitulant la commande est envoyé à l'acheteur. La vente est conclue 
                  dès réception du paiement intégral.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Article 5 - Paiement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Le paiement s'effectue en ligne par carte bancaire (Visa, Mastercard) via une plateforme 
                  de paiement sécurisée. Le débit est effectué au moment de la validation de la commande.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Article 6 - Livraison</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Les produits sont livrés à l'adresse indiquée par l'acheteur lors de la commande. 
                  Les délais de livraison sont donnés à titre indicatif et varient selon le mode de livraison choisi.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  En cas de retard de livraison supérieur à 7 jours, l'acheteur peut annuler sa commande 
                  et obtenir un remboursement intégral.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Article 7 - Droit de rétractation</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Conformément à l'article L221-18 du Code de la consommation, l'acheteur dispose d'un délai 
                  de 14 jours à compter de la réception du produit pour exercer son droit de rétractation, 
                  sans avoir à justifier de motifs ni à payer de pénalités.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Le produit doit être retourné dans son emballage d'origine, complet et en parfait état. 
                  Les frais de retour sont à la charge de l'acheteur.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Article 8 - Garanties</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Les produits bénéficient de la garantie légale de conformité (articles L217-4 à L217-14 
                  du Code de la consommation) et de la garantie contre les vices cachés (articles 1641 à 1649 
                  du Code civil).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  En cas de défaut de conformité ou de vice caché, l'acheteur peut demander la réparation, 
                  le remplacement ou le remboursement du produit.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Article 9 - Service client</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Pour toute question ou réclamation, notre service client est disponible :<br />
                  - Par email : contact@eclat-puzzles.fr<br />
                  - Par téléphone : 01 23 45 67 89 (du lundi au vendredi, 9h-18h)<br />
                  - Par courrier : ÉCLAT SAS, 12 Rue de l'Atelier, 75011 Paris
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Article 10 - Médiation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  En cas de litige, le consommateur peut recourir gratuitement au service de médiation 
                  de la consommation. Les coordonnées du médiateur seront communiquées sur simple demande 
                  auprès de notre service client.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Article 11 - Droit applicable</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les présentes CGV sont soumises au droit français. En cas de litige, et après tentative 
                  de résolution amiable, les tribunaux français seront seuls compétents.
                </p>
              </div>

              <p className="text-sm text-muted-foreground text-center pt-8">
                Dernière mise à jour : Janvier 2024
              </p>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CGV;
