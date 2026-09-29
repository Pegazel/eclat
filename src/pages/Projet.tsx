import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  ClipboardCheck,
  Download,
  ExternalLink,
  FileSearch,
  FileText,
  Film,
  Gamepad2,
  Gift,
  ImageIcon,
  Lightbulb,
  Maximize2,
  Package,
  Palette,
  Puzzle,
  Rocket,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Store,
  Target,
  TriangleAlert,
  Users,
  X,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PuzzlePieces from "@/components/PuzzlePieces";
import { projectMedia, projectVideos, type ProjectMedia } from "@/data/projectMedia";
import { agentPrompts } from "@/data/agentPrompts";
import { additionalDocuments, addedProductVideos, campaignMedia, campaignVideos, eventMedia, eventVideos, iaMedia } from "@/data/projectAdditions";

const chapters = [
  { id: "veille", label: "01 · Veilles", icon: Lightbulb },
  { id: "identite", label: "02 · Identité", icon: Palette },
  { id: "collection", label: "03 · Collection", icon: Package },
  { id: "production", label: "04 · Production", icon: Film },
  { id: "agents", label: "05 · Agents IA", icon: Bot },
  { id: "ia-experience", label: "05 bis · IA créative", icon: Sparkles },
  { id: "commerce", label: "06 · E-commerce", icon: Store },
  { id: "campagnes", label: "06 bis · Campagnes", icon: ImageIcon },
  { id: "evenement", label: "07 · Événement", icon: CalendarDays },
  { id: "experiences", label: "08 · Mini-jeux", icon: Gamepad2 },
] as const;

const researchPanels = [
  {
    id: "marche",
    label: "Marché",
    title: "Le marché français est dynamique, mais le prix reste l'arbitre.",
    lead: "La veille sectorielle couvre la taille du marché, les tendances, les cibles, les comportements, les circuits et la saisonnalité du jeu et jouet en France.",
    metrics: [
      ["4,7 Md€", "marché français jeux & jouets · 2025"],
      ["+7,1 %", "croissance en valeur, meilleure progression depuis 2000"],
      ["1,1 Md€", "jeux de société et puzzles en France"],
      ["+35 %", "croissance jeux & puzzles, la supercatégorie la plus dynamique"],
      ["51 %", "des ventes annuelles au T4"],
      ["42 %", "parts des spécialistes et multi-spécialistes"],
    ],
    points: [
      "Le prix moyen d'un jouet reste à 18 € : un prix premium doit donc être rendu concret par la sécurité, la qualité, la durée d'usage et le service.",
      "Le sans-écran, le made in France, le jeu en famille et le besoin de collection créent un terrain cohérent pour un puzzle lumineux à construire.",
      "La seconde main atteint 378 M€ et 7,3 % du marché : pièces disponibles, garantie et SAV sont des arguments de différenciation, pas de simples détails techniques.",
      "Les 6–12 ans reçoivent 44 % des achats ; les parents 35–44 ans décident, les grands-parents pèsent environ 20 % des achats et le kidulte désaisonnalise le secteur.",
      "66 % des acheteurs passent encore par un magasin de jouets, contre 53 % par le web : la démonstration et le conseil en rayon restent déterminants.",
    ],
    source: "Veille sectorielle & marché · Circana, FFJP / FCJPE, Appinio, Ecomaison, OpinionWay, INSEE et La Revue du Jouet.",
  },
  {
    id: "concurrence",
    label: "Concurrence",
    title: "Un espace entre le kit importé et le bois premium.",
    lead: "La cartographie compare les puzzles 3D lumineux directs et les alternatives qui occupent déjà la chambre d'enfant : veilleuses, constructions, maquettes et jouets bois fabriqués en France.",
    metrics: [
      ["16–26 €", "CubicFun · carton / mousse, dès 8 ans"],
      ["19,99 €", "kits bois DIY type Kidzly, origine peu documentée"],
      ["34–38 €", "Ravensburger Night Edition, plastique, 10–12 ans+"],
      ["47–50 €", "Robotime / Rolife, bois, LED, 14 ans+"],
      ["69 €+", "lampe bois française, sans puzzle"],
      ["39,90–44,90 €", "zone ÉCLAT publiée"],
    ],
    points: [
      "Robotime apporte une finition bois et des LED, mais cible surtout les ados / adultes, avec des montages de 3 à 4 heures et des thèmes de monuments ou de Book Nooks.",
      "Ravensburger apporte une marque puzzle reconnue et des pièces numérotées, mais ses modèles lumineux sont en plastique, souvent à partir de 10–12 ans et centrés sur les monuments.",
      "CubicFun occupe le cadeau d'entrée de gamme avec un catalogue très large ; les matières, les piles à prévoir et l'univers touristique limitent son territoire enfant imaginaire.",
      "Vilac, Janod et Kipli portent la légitimité française ; ils ne réunissent pas, dans les relevés, le puzzle 3D lumineux et l'univers narratif dès 6 ans.",
      "L'opportunité ÉCLAT est le croisement : bois + lumière + 6–10 ans + imaginaire + fabrication française documentée.",
    ],
    source: "Veille concurrentielle · relevés ÉCLAT auprès de Nature & Découvertes, Golemites, Galaxus, Fnac, Kidzly, Puzzido et Puzzfever.",
  },
  {
    id: "reglementaire",
    label: "Réglementaire",
    title: "La conformité est une preuve de marque, pas une annexe.",
    lead: "La veille qualifie ÉCLAT comme un jouet électrique. Elle couvre les essais, la documentation, le marquage, les allégations, les piles, le tri et l'horizon 2030.",
    metrics: [
      ["EN 71-1", "mécanique : arêtes, éclats, petites pièces"],
      ["EN 71-2", "inflammabilité"],
      ["EN 71-3", "migration d'éléments chimiques"],
      ["EN IEC 62115", "sécurité des jouets électriques"],
      ["10 ans", "conservation du dossier technique"],
      ["2030", "passeport numérique produit et nouveau règlement jouets"],
    ],
    points: [
      "Le vocabulaire retenu est « jouet qui s'illumine » : le terme « veilleuse » rapproche le produit d'une catégorie de luminaire qui n'est pas celle d'un jouet électrique.",
      "Avant lancement : essais en laboratoire accrédité, analyse de risques, déclaration UE, marquage CE, notice et avertissements français, identification fabricant, référence de type / lot et fiche GPSR en ligne.",
      "Le « Made in France » doit être documenté (dernière transformation substantielle, bois, LED, piles, assemblage) et sécurisé au besoin par une demande d'information aux Douanes.",
      "Les formulations « éco-conçu », « durable » ou « LED longue durée » doivent être retirées ou appuyées par une preuve précise, chiffrée et conservée au dossier.",
      "À intégrer : étiquetage piles, Triman / Info-tri, adhésion REP et préparation du passeport numérique produit à horizon 2030.",
    ],
    source: "Veille réglementaire · EUR-Lex, DGE, DGCCRF, AFNOR, Intertek, AGEC, GPSR et règlement piles / batteries.",
  },
  {
    id: "lancement",
    label: "Décisions",
    title: "Cinq décisions reliées à une donnée de veille.",
    lead: "Le dossier de justification relie le produit, la cible, le prix, le canal et le discours à une donnée sectorielle, concurrentielle ou réglementaire plutôt qu'à une intuition seule.",
    metrics: [
      ["6–10 ans", "entrée d'âge peu occupée par les concurrents lumineux"],
      ["39–45 €", "zone de prix visée entre import et bois premium"],
      ["Spécialistes", "premier canal, puis e-commerce direct"],
      ["Avant Noël", "référencement au printemps, visibilité à l'automne"],
      ["5 décisions", "produit, cible, prix, canal, discours"],
      ["4 risques", "prix, discours, entrée d'un acteur français, canal"],
    ],
    points: [
      "Produit : puzzle 3D lumineux en bois, pensé pour l'enfant et prolongé par une lumière de chambre, sans créer un usage entièrement inédit.",
      "Cible : enfant utilisateur ; parent décideur ; grand-parent financeur cadeau. Le discours s'adapte aux motivations de chacun.",
      "Canal : les spécialistes peuvent expliquer la valeur, démontrer le produit et défendre une preuve de conformité face à une offre d'occasion moins chère.",
      "Risque prix : le supplément doit être adossé à des preuves vérifiables — conformité, origine documentée, durée mesurée, SAV — plutôt qu'à un récit seul.",
      "Risque discours : corriger les allégations et les visuels avant impression du packaging ; anticiper les contraintes plutôt que repousser le lancement à 2030.",
    ],
    source: "Justification du lancement · synthèse croisée des trois veilles du Bloc 1.",
  },
] as const;

const launchDecisions = [
  ["Produit", "Puzzle 3D lumineux en bois", "Segment jeux & puzzles +35 % ; double usage déjà validé ; âge 6 ans peu occupé."],
  ["Cible", "Enfant 6–10 ans, parents et grands-parents", "44 % des achats destinés aux 6–12 ans ; environ 20 % par les grands-parents."],
  ["Prix", "39,90 à 44,90 € TTC", "Entre l'entrée lumineuse 16–26 € et le bois premium importé 47–50 €."],
  ["Canal", "Spécialistes puis e-commerce direct", "42 % de parts et +11 % en valeur pour les spécialistes ; le conseil en rayon valorise la preuve."],
  ["Discours", "Jouet qui s'illumine", "Allégations précises et prouvées ; conformité et origine visibles avant diffusion."],
] as const;

const complianceStages = [
  {
    id: "avant",
    label: "Avant lancement",
    title: "Rendre le produit démontrable",
    tasks: ["Essais EN 71-1, EN 71-2, EN 71-3 et EN IEC 62115.", "Dossier technique, analyse de risques, déclaration UE et marquage CE.", "Notice, avertissements et identification fabricant en français.", "Validation de l'origine et des allégations avant packaging.", "Licence ou retrait des visuels évoquant des marques tierces."],
  },
  {
    id: "lancement",
    label: "Au lancement",
    title: "Faire correspondre site, boîte et logistique",
    tasks: ["Fiches produit conformes GPSR et informations fabricant en ligne.", "Preuve mesurée de la durée des LED avant toute promesse chiffrée.", "Règles piles, Triman / Info-tri et filière REP à confirmer.", "Livraison offerte dès 59 € alignée sur tous les supports.", "SAV et pièces de rechange intégrés à la promesse de qualité."],
  },
  {
    id: "2030",
    label: "Horizon 2030",
    title: "Préparer la transition réglementaire",
    tasks: ["Passeport numérique produit accessible par QR code.", "Restrictions chimiques renforcées : PFAS et perturbateurs endocriniens.", "Mise à jour du dossier de conformité et des certificats selon le nouveau règlement.", "Traçabilité documentaire durable des fournisseurs et composants."],
  },
] as const;

const brandVoices = [
  {
    id: "enfant",
    label: "À l'enfant",
    title: "Conte, aventure et émerveillement.",
    text: "Des phrases simples, joyeuses, qui invitent à imaginer et valorisent la réussite plutôt que la difficulté.",
    quotes: ["Pièce après pièce, ton château prend vie… et s'illumine !", "Ta licorne veille sur tes rêves toute la nuit."],
  },
  {
    id: "parent",
    label: "Au parent",
    title: "Chaleur, bienveillance et réassurance.",
    text: "Le site, les réseaux, les emails et le SAV mettent en avant le temps partagé, la déconnexion des écrans et la fierté de l'enfant.",
    quotes: ["Un moment à construire ensemble, une lumière pour s'endormir sereinement.", "Éteignez les écrans, allumez leur imagination."],
  },
  {
    id: "cadeau",
    label: "Au proche qui offre",
    title: "Le cadeau qui fait briller les yeux.",
    text: "Grands-parents, parrains, marraines et amis cherchent un cadeau mémorable, qui ne finira pas oublié dans un placard.",
    quotes: ["Un cadeau à construire, à allumer et à garder.", "Une histoire lumineuse à offrir pour Noël, un anniversaire ou une fête."],
  },
] as const;

type ProductConcept = {
  id: string;
  name: string;
  universe: string;
  price: string;
  level: string;
  age: string;
  duration: string;
  dimensions: string;
  pieces: number;
  material: string;
  light: string;
  features: string[];
  description: string;
  image: string;
  status: "coeur" | "exploration";
  caution?: string;
};

const productConcepts: ProductConcept[] = [
  { id: "licorne", name: "La Licorne Magique", universe: "Le Royaume Féérique", price: "39,90 €", level: "Débutant", age: "Dès 6 ans", duration: "2–3 h", dimensions: "15 × 12 × 22 cm", pieces: 90, material: "Bois de tilleul FSC · LED RGB", light: "7 couleurs · bouton tactile · 3 piles AAA", features: ["Mode arc-en-ciel", "Premier puzzle accessible", "Ambiance enchantée"], description: "Une licorne scintillante imaginée comme porte d'entrée de la collection et premier puzzle 3D pour les débutants.", image: "/dossier/media/collection-exploratoire/licorne.webp", status: "coeur" },
  { id: "cabane", name: "La Cabane du Pêcheur", universe: "Le Port Illuminé", price: "44,90 €", level: "Intermédiaire", age: "Dès 7 ans", duration: "3–4 h", dimensions: "20 × 15 × 18 cm", pieces: 125, material: "Bois de hêtre FSC · LED blanc chaud", light: "2 intensités · alimentation USB", features: ["Effet reflet sur l'eau", "Finition naturelle", "Univers apaisant"], description: "Une scène au bord de l'eau pensée pour créer une touche de nature et de sérénité dans une chambre ou un salon.", image: "/dossier/media/collection-exploratoire/cabane-de-pecheur.webp", status: "coeur" },
  { id: "train", name: "Le Train à Vapeur", universe: "L'Express Magique", price: "42,90 €", level: "Intermédiaire", age: "Dès 6 ans", duration: "4–5 h", dimensions: "28 × 8 × 14 cm", pieces: 140, material: "Bois de hêtre FSC · LED blanc chaud", light: "Cabine illuminée · effet vapeur · piles ou USB", features: ["Locomotive et wagon", "Roues décoratives", "Voyage féérique"], description: "Un modèle chaleureux et nostalgique, autour de la locomotive, du wagon illuminé et de la magie des voyages d'antan.", image: "/dossier/media/collection-exploratoire/train-a-vapeur.webp", status: "coeur" },
  { id: "chateau", name: "Le Château Enchanté", universe: "Le Monde Merveilleux", price: "44,90 €", level: "Intermédiaire", age: "Dès 8 ans", duration: "4–6 h", dimensions: "25 × 18 × 30 cm", pieces: 150, material: "Bois de tilleul FSC · LED", light: "3 intensités · minuterie · piles ou USB", features: ["Lumière dorée", "Ambiance conte de fées", "Finition vernis alimentaire"], description: "Le modèle féérique de la collection : une construction qui devient un point lumineux dans la chambre et prolonge l'histoire après le montage.", image: "/dossier/media/collection-exploratoire/chateau-enchante.webp", status: "coeur" },
  { id: "bateau", name: "Le Bateau Pirate", universe: "L'Aventure des Mers", price: "44,90 €", level: "Avancé", age: "Dès 8 ans", duration: "5–7 h", dimensions: "30 × 12 × 28 cm", pieces: 180, material: "Bois de tilleul FSC · LED blanc chaud", light: "Effet trésor · piles ou USB", features: ["Voiles et détails sculptés", "Figurine pirate", "Finition vernis mat"], description: "Le modèle le plus ambitieux de la collection cœur, conçu autour de l'aventure, du trésor et de la fierté d'un grand montage.", image: "/dossier/media/collection-exploratoire/bateau-pirate.webp", status: "coeur" },
  { id: "cars", name: "Voiture de course", universe: "La Légende de la Course", price: "42,90 €", level: "Intermédiaire", age: "Dès 6 ans", duration: "3–5 h", dimensions: "22 × 10 × 12 cm", pieces: 120, material: "Bois de tilleul FSC · LED orange / blanc", light: "Phares fonctionnels · USB", features: ["Roues décoratives", "Phares LED", "Peinture rouge brillante"], description: "Piste exploratoire autour de la course et des phares lumineux, incluse dans les travaux de collection et de packaging.", image: "/dossier/media/collection-exploratoire/cars.webp", status: "exploration", caution: "Concept exploratoire : toute évocation d'un personnage ou d'une marque tierce nécessite une licence avant diffusion commerciale." },
  { id: "dino", name: "Rex le Dinosaure", universe: "Le Monde Préhistorique", price: "44,90 €", level: "Intermédiaire", age: "Dès 7 ans", duration: "4–6 h", dimensions: "35 × 15 × 28 cm", pieces: 160, material: "Bois de tilleul FSC · LED RGB", light: "3 modes · effet bioluminescent", features: ["Mâchoire articulée", "Socle de présentation", "LED le long du corps"], description: "Une exploration préhistorique autour de la construction, de la présentation et d'un effet lumineux spectaculaire.", image: "/dossier/media/collection-exploratoire/dinosaure-2.webp", status: "exploration" },
  { id: "van", name: "Le Mystery Van", universe: "L'Équipe du Mystère", price: "44,90 €", level: "Débutant", age: "Dès 6 ans", duration: "2–4 h", dimensions: "20 × 10 × 14 cm", pieces: 110, material: "Bois de tilleul FSC · LED blanc", light: "Phares · lueur sous véhicule · 3 piles AAA", features: ["Bagages sur le toit", "Motifs floraux", "Peinture turquoise"], description: "Une piste de collection axée sur le mystère et l'aventure, visualisée dans les rendus produit et la campagne.", image: "/dossier/media/collection-exploratoire/van-scooby-doo.webp", status: "exploration", caution: "Concept exploratoire : toute référence visuelle à une franchise tierce doit être licenciée ou retirée avant commercialisation." },
];

type CostModel = {
  price: number;
  wood: number;
  led: number;
  finish: number;
  assembly: number;
  box: number;
  rep: number;
  prep: number;
};

const costModels: Record<string, CostModel> = {
  licorne: { price: 39.9, wood: 2.5, led: 2.7, finish: 0.5, assembly: 2.2, box: 1.6, rep: 1.7, prep: 1.2 },
  cabane: { price: 44.9, wood: 3.3, led: 2.6, finish: 0.6, assembly: 2.5, box: 1.7, rep: 1.9, prep: 1.3 },
  train: { price: 42.9, wood: 3.7, led: 2.8, finish: 0.7, assembly: 2.7, box: 1.8, rep: 2, prep: 1.3 },
  chateau: { price: 44.9, wood: 4, led: 3, finish: 0.7, assembly: 2.9, box: 2, rep: 2.2, prep: 1.3 },
  bateau: { price: 44.9, wood: 4.7, led: 3, finish: 0.8, assembly: 3.1, box: 2.2, rep: 2.4, prep: 1.4 },
};

const agents = [
  { id: "veille", title: "Radar Tendances", role: "Veille", icon: Lightbulb, color: "bg-secondary/30 text-foreground", mission: "Surveiller concurrents, prix, nouveautés, avis clients et tendances déco / cadeaux.", trigger: "Chaque lundi matin et à la sortie d'un produit concurrent.", data: "Sites concurrents, Amazon, TikTok, Pinterest, Google Trends et avis clients.", output: "Rapport hebdomadaire : tendances, écarts de prix et idées de nouveaux modèles.", value: "Choisir les futurs modèles à partir de données réelles sans y passer des heures.", prompt: agentPrompts.veille },
  { id: "montage", title: "Assistant Montage", role: "Service client", icon: Users, color: "bg-fairy/30 text-foreground", mission: "Répondre 24 h / 24 sur le montage, les pièces manquantes, les LED et le suivi de colis.", trigger: "Email, chat du site ou message Instagram entrant.", data: "FAQ, notices, base de commandes et suivi transporteur.", output: "Réponse personnalisée, ticket SAV ou demande de pièce de remplacement.", value: "Réduire la frustration, les retours et les avis négatifs d'un client bloqué.", prompt: agentPrompts.montage },
  { id: "studio", title: "Studio Lumière", role: "Marketing", icon: Sparkles, color: "bg-primary/15 text-foreground", mission: "Créer et planifier time-lapses, allumages, idées cadeaux, posts et emails.", trigger: "Calendrier éditorial, nouveau produit, tendance repérée ou photo client.", data: "Catalogue, photos, vidéos, statistiques des posts et avis clients.", output: "Posts, légendes, hashtags, emails et bilan de performance.", value: "Publier régulièrement sur un produit très visuel sans grosse équipe.", prompt: agentPrompts.studio },
  { id: "stock", title: "Gardien du Stock", role: "Approvisionnement", icon: Package, color: "bg-nature/15 text-foreground", mission: "Suivre kits et composants (LED, piles, câbles, plaques) et anticiper les pics cadeaux.", trigger: "Chaque commande et franchissement d'un seuil minimum.", data: "Ventes, stock, délais fournisseurs et historique saisonnier.", output: "Alertes de rupture, prévisions et brouillons de bons de commande.", value: "Éviter rupture et surstock, surtout à Noël, Saint-Valentin et Fête des pères.", prompt: agentPrompts.stock },
  { id: "finance", title: "Tableau de Bord", role: "Finance", icon: BarChart3, color: "bg-muted text-foreground", mission: "Suivre CA, marge par modèle, acquisition, retours et trésorerie.", trigger: "Chaque fin de semaine et de mois.", data: "Ventes, dépenses publicitaires, coûts fournisseurs et remboursements.", output: "Tableau de bord et trois recommandations de pilotage.", value: "Prendre des décisions sur des chiffres plutôt qu'à l'intuition.", prompt: agentPrompts.finance },
] as const;

const automations = [
  ["Commande passée", "Confirmation client, stock mis à jour, vente enregistrée. Si seuil bas : alerte et brouillon de commande fournisseur."],
  ["Colis livré + 3 jours", "Email d'aide au montage avec le lien vers la notice vidéo."],
  ["Colis livré + 10 jours", "Demande d'avis et de photo du puzzle illuminé ; les contenus partent au Studio Lumière."],
  ["Pièce manquante", "Réponse SAV, envoi de la pièce, mise à jour du stock et alerte qualité si le défaut se répète."],
  ["Tendance détectée", "Proposition de contenu ou de promotion en lien avec le signal observé."],
  ["Fin de mois", "Rapport Finance au fondateur avec recommandations de pilotage."],
] as const;


const commerceJourney = [
  { id: "decouvrir", label: "Découvrir", title: "Accueil & univers de marque", text: "La page d'accueil introduit la promesse « La magie prend forme », l'univers visuel, les bénéfices du sans-écran et les portes d'entrée vers la collection.", href: "/", cta: "Voir l'accueil" },
  { id: "choisir", label: "Choisir", title: "Boutique & filtres", text: "La boutique permet de parcourir les modèles, de filtrer par univers et de basculer entre les références avant d'ouvrir chaque fiche produit.", href: "/boutique", cta: "Explorer la boutique" },
  { id: "comprendre", label: "Comprendre", title: "Fiche produit", text: "Chaque fiche expose l'univers, le prix, les caractéristiques, le montage et l'appel à l'action. Le dossier projet complète ensuite ces pages par la preuve prix, réglementation et collection.", href: "/produit/licorne-magique", cta: "Ouvrir une fiche" },
  { id: "acheter", label: "Acheter", title: "Panier & commande", text: "Le parcours ajoute le produit au panier, calcule le récapitulatif et conduit à une maquette de commande. Il s'agit d'un démonstrateur : aucun paiement réel ni aucune collecte de carte n'est activé.", href: "/panier", cta: "Tester le panier" },
  { id: "rassurer", label: "Rassurer", title: "Livraison, FAQ & informations", text: "Les pages Livraison, FAQ, CGV, mentions légales et contact structurent la réassurance. Elles doivent rester alignées avec les règles de livraison, la conformité et les promesses réellement prouvées.", href: "/livraison", cta: "Voir la livraison" },
] as const;

const documents = [
  { label: "Justification du lancement", type: "PPTX", href: "/dossier/livrables/01-justification-lancement.pptx", block: "Bloc 1" },
  { label: "Veille concurrentielle", type: "PPTX", href: "/dossier/livrables/02-veille-concurrentielle.pptx", block: "Bloc 1" },
  { label: "Veille sectorielle & marché", type: "PPTX", href: "/dossier/livrables/03-veille-marche.pptx", block: "Bloc 1" },
  { label: "Veille réglementaire", type: "PPTX", href: "/dossier/livrables/04-veille-reglementaire.pptx", block: "Bloc 1" },
  { label: "Brandboard", type: "PDF", href: "/dossier/livrables/05-brandboard.pdf", block: "Bloc 2" },
  { label: "Positionnement de marque", type: "DOCX", href: "/dossier/livrables/06-positionnement-marque.docx", block: "Bloc 2" },
  { label: "Fiches produits", type: "PDF", href: "/dossier/livrables/07-fiches-produits.pdf", block: "Bloc 3" },
  { label: "Prix, coûts & marges", type: "DOCX", href: "/dossier/livrables/08-pricing-marges.docx", block: "Bloc 3" },
  { label: "Modèle de pricing", type: "XLSX", href: "/dossier/livrables/09-modele-pricing.xlsx", block: "Bloc 3" },
  { label: "Les 5 agents IA", type: "DOCX", href: "/dossier/livrables/10-agents-ia.docx", block: "Bloc 5" },
] as const;

const currentEventMedia = [eventMedia[1], eventMedia[3], eventMedia[5], eventMedia[7]];
const eventHeroMedia = eventMedia[9];
const galleryCampaignMedia = campaignMedia.filter((item) => item.category !== "Campagne · Sources éditables");
const allProjectMedia = [...projectMedia, ...iaMedia, ...galleryCampaignMedia];
const totalDisplayedVisuals = allProjectMedia.length + currentEventMedia.length + 1;
const allProductionVideos = [...projectVideos, ...addedProductVideos];
const allDocuments = [...documents, ...additionalDocuments].filter((document) => document.type !== "PSD");
const agentsReference = documents.find((document) => document.href === "/dossier/livrables/10-agents-ia.docx");
const eventBudgetReference = additionalDocuments.find((document) => document.href === "/dossier/livrables/14-evenement-budget.xlsx");

const aiExperienceSteps = [
  { number: "01", title: "L’enfant crée son univers", text: "L’enfant est invité à dessiner son univers sur une feuille de papier : il est l’auteur du point de départ." },
  { number: "02", title: "L’IA transforme le dessin", text: "Le dessin est numérisé puis adapté à une représentation sous forme de puzzle, en conservant ses principaux éléments graphiques." },
  { number: "03", title: "Le dessin devient interactif", text: "Le résultat rejoint un écran ou une projection : l’enfant peut alors reconstituer son univers en positionnant les pièces du puzzle." },
] as const;

const eventSequence = [
  { number: "01", duration: "7 min", title: "Réveiller les constellations", text: "Un jeu virtuel collaboratif révèle un indice lumineux. L’écran rassemble la famille au lieu de l’isoler." },
  { number: "02", duration: "12 min", title: "Suivre le fil de lumière", text: "Le labyrinthe de panneaux-puzzles et de découpes de bois transforme la recherche en exploration guidée et accessible." },
  { number: "03", duration: "3 min", title: "Garder l’éclat vivant", text: "Une transition calme donne du poids à la pièce trouvée avant l’entrée dans la salle finale." },
  { number: "04", duration: "8 min", title: "L’éclat collectif", text: "Chaque famille pose sa pièce : une zone de l’installation s’illumine et la ville retrouve progressivement sa lumière." },
] as const;

const scrollToChapter = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
const formatEuro = (value: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);

const SectionIntro = ({ number, eyebrow, title, children }: { number: string; eyebrow: string; title: string; children?: React.ReactNode }) => (
  <div className="max-w-4xl mb-10">
    <div className="flex items-center gap-3 mb-3">
      <span className="inline-flex h-10 min-w-10 items-center justify-center whitespace-nowrap rounded-xl bg-primary px-3 text-sm font-extrabold text-primary-foreground">{number}</span>
      <span className="text-primary font-bold uppercase tracking-[0.18em] text-xs">{eyebrow}</span>
    </div>
    <h2 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight">{title}</h2>
    {children}
  </div>
);

const Projet = () => {
  const [researchTab, setResearchTab] = useState("marche");
  const [complianceTab, setComplianceTab] = useState("avant");
  const [brandVoice, setBrandVoice] = useState("enfant");
  const [collectionFilter, setCollectionFilter] = useState<"tous" | "coeur" | "exploration">("tous");
  const [selectedProductId, setSelectedProductId] = useState("licorne");
  const [freeShipping, setFreeShipping] = useState(false);
  const [activeMediaCategory, setActiveMediaCategory] = useState("Tous");
  const [activeMedia, setActiveMedia] = useState<ProjectMedia | null>(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [selectedAgentId, setSelectedAgentId] = useState("veille");
  const [commerceStepId, setCommerceStepId] = useState("decouvrir");
  const [showDocuments, setShowDocuments] = useState(true);
  const [selectedEventVideoIndex, setSelectedEventVideoIndex] = useState(0);

  const research = researchPanels.find((panel) => panel.id === researchTab) ?? researchPanels[0];
  const compliance = complianceStages.find((stage) => stage.id === complianceTab) ?? complianceStages[0];
  const voice = brandVoices.find((item) => item.id === brandVoice) ?? brandVoices[0];
  const selectedProduct = productConcepts.find((product) => product.id === selectedProductId) ?? productConcepts[0];
  const selectedAgent = agents.find((agent) => agent.id === selectedAgentId) ?? agents[0];
  const commerceStep = commerceJourney.find((step) => step.id === commerceStepId) ?? commerceJourney[0];
  const productCost = costModels[selectedProduct.id];
  const collection = productConcepts.filter((product) => collectionFilter === "tous" || product.status === collectionFilter);
  const mediaCategories = ["Tous", ...Array.from(new Set(allProjectMedia.map((item) => item.category)))];
  const visibleMedia = useMemo(() => activeMediaCategory === "Tous" ? allProjectMedia : allProjectMedia.filter((item) => item.category === activeMediaCategory), [activeMediaCategory]);
  const selectedVideo = allProductionVideos[selectedVideoIndex] ?? allProductionVideos[0];
  const selectedEventVideo = eventVideos[selectedEventVideoIndex] ?? eventVideos[0];

  const unitMetrics = productCost ? (() => {
    const revenueHT = productCost.price / 1.2;
    const cogs = productCost.wood + productCost.led + productCost.finish + productCost.assembly + productCost.box + productCost.rep;
    const payment = productCost.price * 0.015 + 0.25;
    const sav = revenueHT * 0.02;
    const contribution = revenueHT - cogs - payment - productCost.prep - sav;
    const effectiveContribution = contribution - (freeShipping ? 4.9 : 0);
    return { revenueHT, cogs, payment, sav, contribution, effectiveContribution, rate: effectiveContribution / revenueHT };
  })() : null;

  useEffect(() => {
    if (!activeMedia) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveMedia(null);
    };
    window.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeMedia]);

  const modalIndex = activeMedia ? visibleMedia.findIndex((item) => item.src === activeMedia.src) : -1;
  const hasModalNavigation = modalIndex >= 0 && visibleMedia.length > 1;
  const openAdjacentMedia = (direction: number) => {
    if (modalIndex < 0 || visibleMedia.length === 0) return;
    setActiveMedia(visibleMedia[(modalIndex + direction + visibleMedia.length) % visibleMedia.length]);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <PuzzlePieces />
      <Header />
      <main className="pt-24">
        <section className="relative overflow-hidden min-h-[680px] flex items-center bg-foreground">
          <img src="/dossier/media/mise-en-situation/en-famille.webp" alt="Famille réunie autour d’un puzzle ÉCLAT" className="absolute inset-0 w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/40" />
          <div className="absolute -right-24 -bottom-32 w-[34rem] h-[34rem] rounded-full bg-primary/35 blur-3xl" />
          <div className="container mx-auto px-6 py-20 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-2 text-sm font-bold text-primary-foreground mb-7">
                <Sparkles className="w-4 h-4 text-secondary" />
                Dossier interactif intégral · ÉCLAT
              </div>
              <p className="text-secondary font-bold text-sm uppercase tracking-[0.22em] mb-4">La magie prend forme</p>
              <h1 className="text-5xl md:text-7xl font-extrabold text-primary-foreground leading-[0.96] mb-7">Tout le projet ÉCLAT, <span className="text-primary">à explorer plutôt qu'à survoler.</span></h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-3xl">Cette page rassemble les veilles, les décisions, l'identité, les 8 concepts produits, le modèle économique, la banque créative complète, les activations IA, l’événement de lancement, les campagnes, les mini-jeux et tous les livrables fournis.</p>
              <div className="flex flex-col sm:flex-row gap-4 mt-9">
                <button type="button" onClick={() => scrollToChapter("veille")} className="inline-flex items-center justify-center gap-2 bg-gradient-warm px-7 py-4 rounded-full font-bold text-primary-foreground shadow-xl hover:scale-[1.02] transition-transform">Commencer l'exploration <ArrowRight className="w-5 h-5" /></button>
                <button type="button" onClick={() => scrollToChapter("production")} className="inline-flex items-center justify-center gap-2 border border-primary-foreground/35 bg-primary-foreground/10 px-7 py-4 rounded-full font-bold text-primary-foreground hover:bg-primary-foreground/20 transition-colors">Ouvrir la médiathèque <ImageIcon className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-7 gap-3 mt-14 max-w-7xl">
              {[["4", "veilles"], ["8", "concepts produits"], [String(totalDisplayedVisuals), "visuels"], [String(allProductionVideos.length + eventVideos.length + campaignVideos.length), "vidéos"], ["5", "agents IA"], ["1", "site e-commerce"], ["2", "mini-jeux"]].map(([value, label]) => <div key={label} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 backdrop-blur-sm p-4"><span className="block text-3xl font-extrabold text-primary-foreground">{value}</span><span className="text-sm text-primary-foreground/70">{label}</span></div>)}
            </div>
          </div>
        </section>

        <nav aria-label="Chapitres du dossier" className="sticky top-[88px] z-40 border-b border-border bg-background/95 shadow-sm backdrop-blur-md">
          <div className="container mx-auto flex flex-wrap gap-2 px-4 py-3 sm:px-6">
            {chapters.map((chapter) => <button key={chapter.id} type="button" onClick={() => scrollToChapter(chapter.id)} className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-xs font-bold text-foreground transition-colors hover:bg-primary/10 hover:text-primary sm:px-4 sm:text-sm"><chapter.icon className="w-4 h-4" />{chapter.label}</button>)}
            <button type="button" onClick={() => scrollToChapter("livrables")} className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-border px-3 py-2 text-xs font-bold text-muted-foreground transition-colors hover:bg-muted sm:px-4 sm:text-sm"><BookOpen className="w-4 h-4" />Annexes</button>
          </div>
        </nav>

        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
              <div>
                <p className="text-primary font-bold uppercase tracking-[0.18em] text-xs mb-4">Le fil conducteur</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-5">Transformer un moment de construction en un souvenir lumineux.</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">ÉCLAT relie un produit, un univers narratif, une stratégie de lancement et des expériences de marque. La boutique donne à voir l'offre ; ce dossier montre le raisonnement, les hypothèses, les tests et toutes les créations qui composent le projet.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[{ icon: Target, title: "Cible", text: "Enfant 6–10 ans ; parents et grands-parents décideurs." }, { icon: Puzzle, title: "Promesse", text: "Construire, illuminer, rêver — sans écran." }, { icon: BarChart3, title: "Prix", text: "39,90 € à 44,90 € TTC selon le modèle." }, { icon: Rocket, title: "Canal", text: "Spécialistes d'abord, e-commerce direct en relais." }].map((item) => <div key={item.title} className="bg-card rounded-2xl border border-border p-5 shadow-sm"><item.icon className="w-6 h-6 text-primary mb-3" /><h3 className="font-extrabold text-foreground">{item.title}</h3><p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.text}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="veille" className="scroll-mt-36 py-20">
          <div className="container mx-auto px-6">
            <SectionIntro number="01" eyebrow="Veilles & justification" title="Les données, les comparaisons et les décisions réunies."><p className="text-lg text-muted-foreground mt-4 leading-relaxed">Quatre lectures complémentaires — marché, concurrence, réglementation et justification du lancement — peuvent être parcourues ici. Les présentations complètes restent disponibles dans les annexes.</p></SectionIntro>
            <div className="flex flex-wrap gap-2 mb-7" role="tablist" aria-label="Explorer les veilles">
              {researchPanels.map((panel) => <button key={panel.id} type="button" role="tab" aria-selected={research.id === panel.id} onClick={() => setResearchTab(panel.id)} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${research.id === panel.id ? "bg-primary text-primary-foreground" : "bg-card text-foreground border border-border hover:bg-primary/10"}`}>{panel.label}</button>)}
            </div>
            <article className="rounded-3xl bg-card border border-border shadow-sm overflow-hidden">
              <div className="p-7 md:p-9 border-b border-border bg-muted/60">
                <p className="text-primary font-bold uppercase tracking-[0.14em] text-xs">Veille active · {research.label}</p>
                <h3 className="text-3xl font-extrabold text-foreground mt-2">{research.title}</h3>
                <p className="text-muted-foreground leading-relaxed mt-4 max-w-4xl">{research.lead}</p>
              </div>
              <div className="p-7 md:p-9">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {research.metrics.map(([value, label]) => <div key={`${value}-${label}`} className="rounded-2xl border border-border bg-background p-5"><strong className="block text-3xl font-extrabold text-primary">{value}</strong><span className="text-sm text-muted-foreground leading-relaxed block mt-2">{label}</span></div>)}
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                  {research.points.map((point) => <div key={point} className="flex gap-3 rounded-2xl bg-muted p-5"><Check className="w-5 h-5 text-nature shrink-0 mt-0.5" /><p className="text-muted-foreground leading-relaxed">{point}</p></div>)}
                </div>
                <p className="text-sm text-muted-foreground italic mt-7 border-t border-border pt-5">{research.source}</p>
              </div>
            </article>

            <div className="mt-10 grid xl:grid-cols-[1.1fr_0.9fr] gap-8">
              <article className="rounded-3xl bg-foreground text-primary-foreground p-7 md:p-9 shadow-xl">
                <div className="flex items-start justify-between gap-4"><div><p className="text-secondary font-bold uppercase tracking-[0.14em] text-xs">Matrice de décision</p><h3 className="text-3xl font-extrabold mt-2">Du constat à l'action.</h3></div><Target className="w-9 h-9 text-primary shrink-0" /></div>
                <div className="mt-7 space-y-3">{launchDecisions.map(([decision, choice, proof]) => <div key={decision} className="rounded-2xl bg-primary-foreground/10 p-4"><div className="flex flex-wrap justify-between gap-2"><span className="font-extrabold text-secondary">{decision}</span><span className="font-bold">{choice}</span></div><p className="text-sm text-primary-foreground/75 leading-relaxed mt-2">{proof}</p></div>)}</div>
              </article>
              <article className="rounded-3xl border border-primary/25 bg-primary/5 p-7 md:p-9">
                <p className="text-primary font-bold uppercase tracking-[0.14em] text-xs">Contrôle de lancement</p>
                <h3 className="text-3xl font-extrabold text-foreground mt-2">La conformité, étape par étape.</h3>
                <div className="flex flex-wrap gap-2 mt-6">{complianceStages.map((stage) => <button key={stage.id} type="button" onClick={() => setComplianceTab(stage.id)} className={`px-4 py-2 rounded-full text-sm font-bold ${compliance.id === stage.id ? "bg-primary text-primary-foreground" : "bg-card text-foreground border border-border hover:bg-primary/10"}`}>{stage.label}</button>)}</div>
                <div className="mt-6 rounded-2xl bg-card border border-border p-5"><h4 className="font-extrabold text-xl text-foreground">{compliance.title}</h4><ul className="mt-4 space-y-3">{compliance.tasks.map((task) => <li key={task} className="flex gap-3 text-sm text-muted-foreground leading-relaxed"><ClipboardCheck className="w-5 h-5 text-primary shrink-0" />{task}</li>)}</ul></div>
              </article>
            </div>
          </div>
        </section>

        <section id="identite" className="scroll-mt-36 py-20 bg-muted">
          <div className="container mx-auto px-6">
            <SectionIntro number="02" eyebrow="Identité de marque" title="Une identité douce, graphique et rassurante."><p className="text-lg text-muted-foreground mt-4 leading-relaxed">Le brandboard, les déclinaisons du logo, le moodboard, les cibles, les personas et les exemples de ton sont regroupés pour rendre la marque utilisable dans tous les supports.</p></SectionIntro>
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-stretch">
              <div className="bg-card rounded-3xl p-7 border border-border">
                <p className="text-primary font-bold uppercase tracking-[0.14em] text-xs">Système de marque</p>
                <h3 className="text-3xl font-extrabold text-foreground mt-2">ÉCLAT · La magie prend forme.</h3>
                <div className="grid grid-cols-2 gap-3 mt-7">{projectMedia.filter((item) => item.category === "Identité" && !item.title.toLowerCase().includes("moodboard")).map((item) => <button type="button" key={item.src} onClick={() => setActiveMedia(item)} className="group rounded-2xl border border-border bg-muted p-3 hover:border-primary/40"><img src={item.src} alt={item.alt} loading="lazy" className="h-24 w-full object-contain group-hover:scale-105 transition-transform" /><span className="text-xs font-bold text-foreground block mt-2">{item.title}</span></button>)}</div>
                <div className="grid grid-cols-5 gap-2 mt-7" aria-label="Palette de la marque">{["#ef9b5b", "#eda2a2", "#e87c67", "#8ecfd6", "#889f92"].map((color) => <span key={color} className="h-10 rounded-xl border border-black/5" style={{ backgroundColor: color }} title={color} />)}</div>
                <p className="text-sm text-muted-foreground mt-4">Palette : orange lumineux, rose doux, corail, bleu ciel et vert sauge. Typographies du brandboard : Arial Black et Arial.</p>
              </div>
              <button type="button" onClick={() => { const moodboard = projectMedia.find((item) => item.title.toLowerCase().includes("moodboard")); if (moodboard) setActiveMedia(moodboard); }} className="relative text-left rounded-3xl overflow-hidden shadow-xl min-h-[420px] group"><img src="/dossier/brand/moodboard.webp" alt="Moodboard d'inspiration ÉCLAT" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7"><p className="text-primary-foreground/70 text-sm font-bold uppercase tracking-[0.16em]">Moodboard · cliquer pour agrandir</p><p className="text-primary-foreground text-3xl font-extrabold mt-1">Lumière chaude, aventure et émerveillement.</p></div></button>
            </div>
            <div className="grid md:grid-cols-3 gap-5 mt-8">{[{ icon: Users, title: "L'enfant", text: "6–10 ans ; aime châteaux, licornes, dragons, chevaliers et aventure. Fier de construire seul ou avec un proche ; l'objet lumineux rassure au coucher." }, { icon: Target, title: "Le parent", text: "28–45 ans ; cherche une activité calme, créative et sans écran, avec un bénéfice de partage, de motricité fine et de fierté." }, { icon: Gift, title: "Le proche qui offre", text: "Grand-parent, parrain, marraine ou ami : cherche un cadeau original pour Noël, un anniversaire ou une fête, avec une vraie valeur émotionnelle." }].map((item) => <article key={item.title} className="bg-card rounded-2xl border border-border p-6"><item.icon className="w-7 h-7 text-primary mb-3" /><h3 className="font-extrabold text-xl text-foreground">{item.title}</h3><p className="text-muted-foreground mt-2 leading-relaxed">{item.text}</p></article>)}</div>
            <div className="mt-8 rounded-3xl bg-foreground text-primary-foreground p-7 md:p-9">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5"><div><p className="text-secondary font-bold uppercase tracking-[0.14em] text-xs">Le ton de marque</p><h3 className="text-3xl font-extrabold mt-2">Une même promesse, trois interlocuteurs.</h3></div><div className="flex flex-wrap gap-2">{brandVoices.map((item) => <button key={item.id} type="button" onClick={() => setBrandVoice(item.id)} className={`px-4 py-2 rounded-full text-sm font-bold ${voice.id === item.id ? "bg-primary text-primary-foreground" : "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"}`}>{item.label}</button>)}</div></div>
              <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-7 mt-7"><div><h4 className="text-xl font-extrabold">{voice.title}</h4><p className="text-primary-foreground/75 leading-relaxed mt-3">{voice.text}</p><p className="text-sm text-primary-foreground/60 mt-5">À éviter : le ton trop commercial, trop technique ou qui insiste sur la difficulté. ÉCLAT parle d'aventure et de réussite.</p></div><div className="grid gap-3">{voice.quotes.map((quote) => <blockquote key={quote} className="rounded-2xl bg-primary-foreground/10 p-5 text-lg font-bold leading-relaxed">« {quote} »</blockquote>)}</div></div>
            </div>
          </div>
        </section>

        <section id="collection" className="scroll-mt-36 py-20">
          <div className="container mx-auto px-6">
            <SectionIntro number="03" eyebrow="Collection, prix & économie unitaire" title="Les 8 concepts produits, les modèles 3D et le pré-chiffrage détaillé."><p className="text-lg text-muted-foreground mt-4 leading-relaxed">La collection présente les cinq modèles cœur du modèle économique, ainsi que trois pistes créatives exploratoires. Le simulateur de contribution rend les hypothèses du fichier de pricing lisibles et modifiables.</p></SectionIntro>
            <div className="grid md:grid-cols-3 gap-5 mb-8"><article className="rounded-3xl bg-primary text-primary-foreground p-7"><span className="text-sm font-bold uppercase tracking-[0.14em]">Prix public</span><strong className="block text-4xl font-extrabold mt-3">39,90–44,90 €</strong><p className="mt-2 text-primary-foreground/80">Fourchette TTC publiée.</p></article><article className="rounded-3xl bg-secondary/30 p-7 border border-secondary/40"><span className="text-sm font-bold uppercase tracking-[0.14em] text-foreground">Coût rendu estimé</span><strong className="block text-4xl text-foreground font-extrabold mt-3">11,20–16,20 €</strong><p className="mt-2 text-muted-foreground">Composants, finition, QA, boîte et entrée stock / REP sur les cinq modèles cœur.</p></article><article className="rounded-3xl bg-nature/15 p-7 border border-nature/25"><span className="text-sm font-bold uppercase tracking-[0.14em] text-foreground">Contribution D2C</span><strong className="block text-4xl text-foreground font-extrabold mt-3">48,5–58,4 %</strong><p className="mt-2 text-muted-foreground">Avant acquisition, salaires, outils, frais fixes et impôts.</p></article></div>
            <div className="rounded-3xl border border-primary/25 bg-primary/5 p-6 mb-10 flex gap-4"><TriangleAlert className="w-7 h-7 text-primary shrink-0" /><p className="text-muted-foreground leading-relaxed"><strong className="text-foreground">Règle de modèle :</strong> la livraison est offerte à partir de <strong className="text-foreground">59 €</strong>. L'offrir sur une commande unitaire diminue la contribution de 13 à 15 points selon le SKU. Les coûts restent des hypothèses de pré-chiffrage à remplacer par des devis, et non des coûts industriels définitifs.</p></div>

            <div className="flex flex-wrap gap-2 mb-7">{[["tous", "Tous les concepts"], ["coeur", "5 modèles cœur"], ["exploration", "Pistes exploratoires"]].map(([id, label]) => <button key={id} type="button" onClick={() => setCollectionFilter(id as "tous" | "coeur" | "exploration")} className={`px-4 py-2 rounded-full text-sm font-bold ${collectionFilter === id ? "bg-primary text-primary-foreground" : "bg-card text-foreground border border-border hover:bg-primary/10"}`}>{label}</button>)}</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{collection.map((product) => <button key={product.id} type="button" onClick={() => setSelectedProductId(product.id)} className={`text-left rounded-2xl overflow-hidden border bg-card shadow-sm hover:shadow-xl transition-all ${selectedProduct.id === product.id ? "border-primary ring-2 ring-primary/20" : "border-border"}`}><img src={product.image} alt={product.name} loading="lazy" className="aspect-square w-full object-cover" /><div className="p-4"><div className="flex gap-2 justify-between items-start"><p className="text-xs text-primary font-bold uppercase tracking-[0.1em]">{product.universe}</p>{product.status === "exploration" && <span className="text-[10px] font-bold rounded-full bg-secondary/30 px-2 py-1">Exploration</span>}</div><h3 className="font-extrabold text-foreground mt-1">{product.name}</h3><div className="flex justify-between mt-4 text-sm"><span className="font-bold text-primary">{product.price}</span><span className="text-muted-foreground">{product.pieces} pièces</span></div></div></button>)}</div>

            <div className="mt-10 grid xl:grid-cols-[0.95fr_1.05fr] gap-8">
              <article className="rounded-3xl overflow-hidden bg-card border border-border shadow-sm"><img src={selectedProduct.image} alt={selectedProduct.name} className="w-full aspect-[16/10] object-cover" /><div className="p-7"><div className="flex flex-wrap gap-2 justify-between"><span className="text-primary font-bold text-sm uppercase tracking-[0.12em]">{selectedProduct.universe}</span><span className="font-bold text-primary">{selectedProduct.price}</span></div><h3 className="text-3xl font-extrabold text-foreground mt-2">{selectedProduct.name}</h3><p className="text-muted-foreground leading-relaxed mt-3">{selectedProduct.description}</p><div className="grid grid-cols-2 gap-3 mt-6 text-sm">{[["Niveau", selectedProduct.level], ["Âge", selectedProduct.age], ["Durée", selectedProduct.duration], ["Format", `${selectedProduct.pieces} pièces`], ["Dimensions", selectedProduct.dimensions], ["Éclairage", selectedProduct.light]].map(([label, value]) => <div key={label} className="rounded-xl bg-muted p-3"><span className="block text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">{label}</span><span className="block font-bold text-foreground mt-1">{value}</span></div>)}</div><div className="mt-5 flex flex-wrap gap-2">{selectedProduct.features.map((feature) => <span key={feature} className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-foreground">{feature}</span>)}</div>{selectedProduct.caution && <div className="mt-5 rounded-xl bg-secondary/20 border border-secondary/40 p-4 text-sm text-foreground leading-relaxed"><ShieldAlert className="w-5 h-5 text-primary inline mr-2 align-text-bottom" />{selectedProduct.caution}</div>}</div></article>
              <article className="rounded-3xl bg-foreground text-primary-foreground p-7 md:p-8 shadow-xl"><p className="text-secondary font-bold uppercase tracking-[0.14em] text-xs">Simulateur de contribution D2C</p>{productCost && unitMetrics ? <><h3 className="text-3xl font-extrabold mt-2">{selectedProduct.name}</h3><p className="text-primary-foreground/70 leading-relaxed mt-3">Lecture pédagogique de la feuille <strong>Unit_Economics</strong> : TVA 20 %, paiement 1,5 % + 0,25 €, provision SAV 2 %, préparation et coût rendu estimés.</p><label className="flex items-center justify-between gap-4 mt-6 rounded-2xl bg-primary-foreground/10 p-4 cursor-pointer"><span><strong className="block">Livraison offerte à l'unité</strong><span className="text-sm text-primary-foreground/65">Compare l'exception à la règle « offerte dès 59 € ».</span></span><input type="checkbox" checked={freeShipping} onChange={(event) => setFreeShipping(event.target.checked)} className="h-5 w-5 accent-primary" /></label><div className="grid grid-cols-2 gap-3 mt-5">{[["Prix public TTC", formatEuro(productCost.price)], ["CA HT", formatEuro(unitMetrics.revenueHT)], ["Coût rendu", formatEuro(unitMetrics.cogs)], ["Contribution", formatEuro(unitMetrics.effectiveContribution)], ["Marge contribution", `${(unitMetrics.rate * 100).toFixed(1)} %`], ["Livraison", freeShipping ? "– 4,90 €" : "Dès 59 €"]].map(([label, value]) => <div key={label} className="rounded-xl bg-primary-foreground/10 p-4"><span className="text-xs text-primary-foreground/65 uppercase tracking-[0.08em] font-bold">{label}</span><strong className="block text-xl mt-1">{value}</strong></div>)}</div><div className="mt-6"><p className="font-bold">Décomposition du coût rendu</p><div className="grid sm:grid-cols-2 gap-2 mt-3 text-sm text-primary-foreground/75">{[["Bois / découpe", productCost.wood], ["LED / alimentation", productCost.led], ["Finition", productCost.finish], ["Assemblage / QA", productCost.assembly], ["Boîte / notice", productCost.box], ["Entrée stock / REP", productCost.rep], ["Paiement", unitMetrics.payment], ["Préparation", productCost.prep], ["Provision SAV", unitMetrics.sav]].map(([label, value]) => <div key={String(label)} className="flex justify-between rounded-lg bg-primary-foreground/5 px-3 py-2"><span>{label}</span><span className="font-bold">{formatEuro(Number(value))}</span></div>)}</div></div></> : <div className="mt-6 rounded-2xl bg-primary-foreground/10 p-5"><p className="font-bold">Pas de pré-chiffrage associé</p><p className="text-primary-foreground/75 mt-2 leading-relaxed">Cette piste figure dans le travail créatif, mais le modèle économique fourni ne couvre que les cinq références cœur.</p></div>}</article>
            </div>

            <div className="mt-12"><div className="flex items-end justify-between gap-4 mb-5"><div><p className="text-primary font-bold text-sm uppercase tracking-[0.16em]">Conception</p><h3 className="text-3xl font-extrabold text-foreground">Les 7 modèles 3D fournis.</h3></div><span className="hidden sm:inline-flex items-center gap-2 text-muted-foreground text-sm font-bold"><Maximize2 className="w-4 h-4" />Cliquer pour agrandir</span></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{projectMedia.filter((item) => item.category === "Conception 3D").map((model) => <button type="button" key={model.src} onClick={() => setActiveMedia(model)} className="group rounded-2xl overflow-hidden bg-muted border border-border text-left hover:shadow-lg"><img src={model.src} alt={model.alt} loading="lazy" className="aspect-[4/3] w-full object-cover group-hover:scale-105 transition-transform duration-500" /><span className="px-4 py-3 font-bold text-foreground block">{model.title}</span></button>)}</div></div>
          </div>
        </section>

        <section id="production" className="scroll-mt-36 py-20 bg-muted">
          <div className="container mx-auto px-6">
            <SectionIntro number="04" eyebrow="Production visuelle & vidéo" title="Toute la banque créative, filtrable et consultable."><p className="text-lg text-muted-foreground mt-4 leading-relaxed">Les visuels fournis sont tous présents : identité, modèles 3D, concepts produits, boutique, campagne égérie, goodies, mises en situation, packaging, activation IA, événement et campagnes. Les films produits sont regroupés dans le lecteur ci-dessous ; les vidéos de campagne et d’événement figurent dans leurs chapitres respectifs.</p></SectionIntro>
            <div className="flex flex-wrap gap-2 mb-7" role="group" aria-label="Filtrer les visuels">{mediaCategories.map((category) => <button type="button" key={category} onClick={() => setActiveMediaCategory(category)} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeMediaCategory === category ? "bg-primary text-primary-foreground" : "bg-card text-foreground border border-border hover:bg-primary/10"}`}>{category}</button>)}</div>
            <p className="text-sm text-muted-foreground mb-5"><strong className="text-foreground">{visibleMedia.length} visuel{visibleMedia.length > 1 ? "s" : ""}</strong> affiché{visibleMedia.length > 1 ? "s" : ""} · cliquer sur une image pour l'afficher en grand.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">{visibleMedia.map((item) => <button type="button" key={item.src} onClick={() => setActiveMedia(item)} className="group text-left rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"><div className="aspect-[4/3] overflow-hidden bg-muted"><img src={item.src} alt={item.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div><span className="p-4 flex items-center justify-between gap-3"><span><span className="text-xs uppercase tracking-[0.11em] font-bold text-primary block">{item.category}</span><span className="font-extrabold text-foreground block mt-1">{item.title}</span></span><Maximize2 className="w-5 h-5 text-secondary shrink-0" /></span></button>)}</div>

            <div className="mt-12 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 rounded-3xl overflow-hidden bg-foreground shadow-xl">
              <div className="p-5 md:p-7"><video key={selectedVideo.src} controls preload="metadata" className="w-full aspect-video bg-black rounded-2xl" playsInline><source src={selectedVideo.src} type="video/mp4" />Votre navigateur ne prend pas en charge la vidéo.</video><p className="text-secondary text-sm font-bold uppercase tracking-[0.14em] mt-5">Vidéo sélectionnée</p><h3 className="text-2xl font-extrabold text-primary-foreground mt-1">{selectedVideo.title}</h3><p className="text-primary-foreground/65 text-sm mt-2">Montage original fourni dans le Bloc 4.</p></div>
              <div className="p-5 md:p-7 bg-primary-foreground/5"><p className="text-secondary font-bold uppercase tracking-[0.14em] text-xs">Les {allProductionVideos.length} films produits</p><div className="mt-4 space-y-2">{allProductionVideos.map((video, index) => <button key={video.src} type="button" onClick={() => setSelectedVideoIndex(index)} className={`w-full text-left rounded-xl px-4 py-3 flex items-center gap-3 ${selectedVideoIndex === index ? "bg-primary text-primary-foreground" : "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"}`}><CirclePlay className="w-5 h-5 shrink-0" /><span className="font-bold text-sm">{video.title}</span></button>)}</div></div>
            </div>
          </div>
        </section>

        <section id="agents" className="scroll-mt-36 py-20">
          <div className="container mx-auto px-6">
            <SectionIntro number="05" eyebrow="Agents & automatisations IA" title="Cinq agents, un parcours client complet."><p className="text-lg text-muted-foreground mt-4 leading-relaxed">Les agents font circuler les signaux du marché jusqu'au pilotage : comprendre, attirer, vendre, livrer, fidéliser et décider. Le schéma ci-dessous rend chaque rôle consultable sans réduire le contenu du livrable original.</p></SectionIntro>
            <div className="grid xl:grid-cols-[0.75fr_1.25fr] gap-8">
              <div className="grid sm:grid-cols-2 xl:grid-cols-1 gap-3">{agents.map((agent) => <button key={agent.id} type="button" onClick={() => setSelectedAgentId(agent.id)} className={`text-left rounded-2xl border p-5 transition-all ${selectedAgent.id === agent.id ? "border-primary bg-primary/10 shadow-sm" : "border-border bg-card hover:border-primary/35"}`}><div className="flex items-center gap-3"><span className={`w-11 h-11 rounded-xl ${agent.color} flex items-center justify-center`}><agent.icon className="w-5 h-5" /></span><span><span className="text-xs font-bold uppercase tracking-[0.1em] text-primary block">{agent.role}</span><span className="font-extrabold text-foreground block mt-1">{agent.title}</span></span></div></button>)}</div>
              <article className="rounded-3xl border border-border bg-card p-7 shadow-sm md:p-9">
                <div className="flex items-start gap-4"><span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${selectedAgent.color}`}><selectedAgent.icon className="w-7 h-7" /></span><div><p className="text-primary font-bold uppercase tracking-[0.14em] text-xs">{selectedAgent.role}</p><h3 className="text-3xl font-extrabold text-foreground mt-1">{selectedAgent.title}</h3></div></div>
                <div className="mt-7 grid gap-4 md:grid-cols-2">{[["Mission", selectedAgent.mission], ["Déclencheur", selectedAgent.trigger], ["Données", selectedAgent.data], ["Produit", selectedAgent.output]].map(([label, text]) => <div key={label} className="rounded-2xl bg-muted p-5"><p className="font-extrabold text-foreground">{label}</p><p className="text-muted-foreground leading-relaxed mt-2">{text}</p></div>)}</div>
                <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/10 p-5"><p className="font-extrabold text-foreground">Valeur pour ÉCLAT</p><p className="text-muted-foreground leading-relaxed mt-2">{selectedAgent.value}</p></div>
                <details open className="mt-5 overflow-hidden rounded-2xl border border-border bg-foreground text-primary-foreground">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-extrabold [&::-webkit-details-marker]:hidden"><span><span className="block text-xs uppercase tracking-[0.14em] text-secondary">Prompt de programmation</span><span className="mt-1 block text-lg">Voir le prompt complet de {selectedAgent.title}</span></span><ChevronDown className="h-5 w-5 shrink-0 text-secondary" /></summary>
                  <div className="border-t border-primary-foreground/15 p-5"><p className="mb-4 text-sm leading-relaxed text-primary-foreground/70">Transcription du prompt opérationnel fourni : ce cadre précise le rôle, les informations disponibles, les règles de sécurité et le format de sortie attendu.</p><pre className="max-h-[34rem] overflow-y-auto whitespace-pre-wrap break-words rounded-xl bg-black/20 p-5 font-mono text-xs leading-relaxed text-primary-foreground/90 md:text-sm">{selectedAgent.prompt}</pre></div>
                </details>
                {agentsReference && <a href={agentsReference.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 font-extrabold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10">Ouvrir le livrable original · {agentsReference.type} <Download className="h-4 w-4 text-primary" /></a>}
              </article>
            </div>
            <div className="mt-10 rounded-3xl bg-foreground text-primary-foreground p-7 md:p-9"><div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"><div><p className="text-secondary font-bold text-sm uppercase tracking-[0.15em]">Les enchaînements prioritaires</p><h3 className="text-3xl font-extrabold mt-2">De la commande au réachat, sans perdre le fil.</h3></div><Bot className="w-16 h-16 text-primary shrink-0" /></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">{automations.map(([trigger, action], index) => <div key={trigger} className="rounded-2xl bg-primary-foreground/10 p-4 text-primary-foreground/85 text-sm leading-relaxed"><span className="inline-flex w-7 h-7 rounded-full bg-primary text-primary-foreground justify-center items-center font-extrabold mr-2">{index + 1}</span><strong>{trigger}</strong><p className="mt-2 text-primary-foreground/75">{action}</p></div>)}</div><p className="text-sm text-primary-foreground/60 mt-6">Pour les déclencheurs temps réel, le document prévoit une connexion de la boutique à un outil d'automatisation tel que Make ou Zapier.</p></div>
          </div>
        </section>

        <section id="ia-experience" className="scroll-mt-36 py-20 bg-gradient-hero">
          <div className="container mx-auto px-6">
            <SectionIntro number="05 bis" eyebrow="Intégration de l’IA dans l’expérience" title="Deux activations IA distinctes, proposées pendant l’événement."><p className="text-lg text-muted-foreground mt-4 leading-relaxed">Cette partie ne présente pas une seule animation : elle distingue bien deux activations complémentaires prévues lors de l’événement. <strong>La Fabrique à Mondes</strong> transforme le dessin de l’enfant en univers-puzzle ; <strong>Luciole</strong> est une médiation lumineuse et narrative qui accompagne les familles dans l’expérience. Les 10 visuels fournis rendent compte de ces deux dispositifs.</p></SectionIntro>

            <div className="grid xl:grid-cols-[1.15fr_0.85fr] gap-8 items-stretch">
              <button type="button" onClick={() => setActiveMedia(iaMedia[3])} className="relative min-h-[440px] overflow-hidden rounded-3xl text-left group shadow-xl">
                <img src={iaMedia[3].src} alt={iaMedia[3].alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7"><p className="text-secondary font-bold uppercase tracking-[0.14em] text-xs">Activation 01 · cliquer pour agrandir</p><h3 className="text-3xl font-extrabold text-primary-foreground mt-2">La Fabrique à Mondes : chaque dessin devient une pièce du Mur des Mondes.</h3></div>
              </button>
              <button type="button" onClick={() => setActiveMedia(iaMedia[4])} className="relative min-h-[440px] overflow-hidden rounded-3xl text-left group shadow-xl">
                <img src={iaMedia[4].src} alt={iaMedia[4].alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7"><p className="text-secondary font-bold uppercase tracking-[0.14em] text-xs">Activation 02 · cliquer pour agrandir</p><h3 className="text-3xl font-extrabold text-primary-foreground mt-2">Luciole : une présence lumineuse pour guider, raconter et faire participer.</h3></div>
              </button>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2"><article className="rounded-3xl border border-border bg-card p-7 shadow-sm"><p className="text-primary font-bold uppercase tracking-[0.14em] text-xs">Activation 01 · La Fabrique à Mondes</p><h3 className="mt-2 text-2xl font-extrabold text-foreground">Créer son propre univers, puis le reconstituer.</h3><p className="mt-3 leading-relaxed text-muted-foreground">L’enfant dessine un monde ; l’IA interprète les formes et les couleurs pour en faire un puzzle projeté ou tactile. L’enfant retrouve ensuite son idée initiale dans une œuvre à compléter avec les autres participants.</p></article><article className="rounded-3xl border border-border bg-card p-7 shadow-sm"><p className="text-primary font-bold uppercase tracking-[0.14em] text-xs">Activation 02 · Luciole</p><h3 className="mt-2 text-2xl font-extrabold text-foreground">Accompagner la mission par une narration lumineuse.</h3><p className="mt-3 leading-relaxed text-muted-foreground">Luciole donne une présence sensible au parcours : elle accueille, encourage, échange avec les enfants, puis oriente la famille vers les prochaines étapes de la mission et son souvenir final.</p></article></div>

            <div className="mt-10"><p className="text-primary font-bold uppercase tracking-[0.14em] text-xs mb-4">Déroulé de la Fabrique à Mondes</p><div className="grid gap-4 lg:grid-cols-3">{aiExperienceSteps.map((step) => <article key={step.number} className="rounded-2xl border border-border bg-card p-6 shadow-sm"><div className="flex gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-extrabold">{step.number}</span><div><h3 className="text-xl font-extrabold text-foreground">{step.title}</h3><p className="text-muted-foreground leading-relaxed mt-2">{step.text}</p></div></div></article>)}</div></div>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{iaMedia.filter((item) => item !== iaMedia[3] && item !== iaMedia[4]).map((item) => <button type="button" key={item.src} onClick={() => setActiveMedia(item)} className="group overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"><div className="aspect-[4/3] overflow-hidden bg-muted"><img src={item.src} alt={item.alt} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" /></div><span className="p-4 block"><span className="text-xs font-bold uppercase tracking-[0.1em] text-primary">IA · Activation</span><span className="mt-1 block font-extrabold text-foreground">{item.title}</span></span></button>)}</div>

            <div className="mt-8 rounded-3xl border border-primary/25 bg-primary/10 p-6 md:p-7 flex gap-4"><Sparkles className="w-8 h-8 text-primary shrink-0" /><div><h3 className="text-xl font-extrabold text-foreground">Trois usages de l’IA, une même promesse de marque</h3><p className="text-muted-foreground leading-relaxed mt-2">Les agents IA structurent les coulisses de la marque — veille, SAV, contenu, stock et pilotage — tandis que les deux activations événementielles donnent à l’IA une place visible pour le public : <strong>Fabrique à Mondes</strong> pour créer, <strong>Luciole</strong> pour guider et raconter. Le résultat reste cohérent avec ÉCLAT : partir d’une pièce, construire ensemble et faire apparaître de la lumière.</p></div></div>
          </div>
        </section>

        <section id="commerce" className="scroll-mt-36 py-20 bg-muted">
          <div className="container mx-auto px-6">
            <SectionIntro number="06" eyebrow="Site e-commerce" title="La boutique ÉCLAT est aussi un bloc de projet à part entière."><p className="text-lg text-muted-foreground mt-4 leading-relaxed">Le site e-commerce traduit l'identité, la collection, le prix et les éléments de réassurance en un parcours concret. Il permet de tester l'expérience de la découverte jusqu'à la commande, tout en laissant les paiements hors périmètre du démonstrateur.</p></SectionIntro>
            <div className="grid xl:grid-cols-[0.82fr_1.18fr] gap-8">
              <div className="grid sm:grid-cols-2 xl:grid-cols-1 gap-3">{commerceJourney.map((step, index) => <button key={step.id} type="button" onClick={() => setCommerceStepId(step.id)} className={`text-left rounded-2xl border p-5 transition-all ${commerceStep.id === step.id ? "border-primary bg-primary/10 shadow-sm" : "border-border bg-card hover:border-primary/35"}`}><span className="text-xs font-bold text-primary uppercase tracking-[0.1em]">Étape {index + 1} · {step.label}</span><span className="font-extrabold text-foreground text-lg block mt-1">{step.title}</span></button>)}</div>
              <article className="rounded-3xl bg-card border border-border overflow-hidden shadow-sm"><img src="/dossier/media/boutique/boutique-v2.webp" alt="Projection de la boutique ÉCLAT" loading="lazy" className="w-full aspect-[16/8] object-cover" /><div className="p-7 md:p-9"><p className="text-primary font-bold uppercase tracking-[0.14em] text-xs">Parcours sélectionné · {commerceStep.label}</p><h3 className="text-3xl font-extrabold text-foreground mt-2">{commerceStep.title}</h3><p className="text-muted-foreground leading-relaxed mt-4">{commerceStep.text}</p><Link to={commerceStep.href} className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-extrabold text-primary-foreground hover:brightness-105">{commerceStep.cta}<ArrowRight className="w-5 h-5" /></Link></div></article>
            </div>
            <div className="grid md:grid-cols-3 gap-5 mt-8">{[{ icon: Store, title: "Commerce lisible", text: "Accueil, boutique, fiches produit, panier, commande, FAQ, livraison et pages légales sont reliés en un parcours cohérent." }, { icon: SlidersHorizontal, title: "Navigation active", text: "Les filtres de boutique, l'ajout au panier et le récapitulatif de commande rendent la proposition testable, au-delà d'une simple page vitrine." }, { icon: ShieldCheck, title: "Démonstrateur responsable", text: "Le site n'encaisse pas de paiement réel. Avant toute commercialisation, les conditions, allégations, stocks, livraison et conformité doivent être finalisés." }].map((item) => <article key={item.title} className="rounded-2xl border border-border bg-card p-6"><item.icon className="w-7 h-7 text-primary mb-3" /><h3 className="font-extrabold text-xl text-foreground">{item.title}</h3><p className="text-muted-foreground leading-relaxed mt-2">{item.text}</p></article>)}</div>
          </div>
        </section>

        <section id="campagnes" className="scroll-mt-36 py-20">
          <div className="container mx-auto px-6">
            <SectionIntro number="06 bis" eyebrow="Campagnes de communication" title="Faire vivre ÉCLAT de l’affiche au fil social."><p className="text-lg text-muted-foreground mt-4 leading-relaxed">Les campagnes fournies déclinent le même territoire lumineux sur l’affichage, en boutique, en format social et dans des gabarits publicitaires. Chaque support est archivé ici avec ses visuels de diffusion et, lorsqu’il existe, son fichier Photoshop éditable.</p></SectionIntro>

            <div className="grid md:grid-cols-3 gap-5 mb-10">{[{ icon: ImageIcon, title: "Affichage", text: "Une affiche mise en situation pour donner une présence urbaine à la promesse ÉCLAT." }, { icon: Store, title: "Boutique & goodies", text: "Carte, flyer, stickers et tote bag : des objets qui prolongent l’univers à chaque point de contact." }, { icon: Film, title: "Social media", text: "Carrousels, posts communautaires et Reels organisent un rythme de contenus autour de la construction, de la fierté et de la lumière." }].map((item) => <article key={item.title} className="rounded-2xl border border-border bg-card p-6"><item.icon className="w-7 h-7 text-primary mb-3" /><h3 className="font-extrabold text-xl text-foreground">{item.title}</h3><p className="text-muted-foreground leading-relaxed mt-2">{item.text}</p></article>)}</div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">{campaignMedia.filter((item) => item.category !== "Campagne · Sources éditables").map((item) => <button type="button" key={item.src} onClick={() => setActiveMedia(item)} className="group overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"><div className="aspect-[4/3] overflow-hidden bg-muted"><img src={item.src} alt={item.alt} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" /></div><span className="p-4 block"><span className="text-xs font-bold uppercase tracking-[0.1em] text-primary">{item.category.replace("Campagne · ", "")}</span><span className="mt-1 block font-extrabold text-foreground">{item.title}</span></span></button>)}</div>

            <div className="mt-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 rounded-3xl overflow-hidden bg-foreground shadow-xl">
              <div className="p-5 md:p-7"><video controls preload="metadata" className="w-full aspect-video bg-black rounded-2xl" playsInline><source src={campaignVideos[0].src} type="video/mp4" />Votre navigateur ne prend pas en charge la vidéo.</video><p className="text-secondary text-sm font-bold uppercase tracking-[0.14em] mt-5">Post 5 · Reels</p><h3 className="text-2xl font-extrabold text-primary-foreground mt-1">Construction du Bateau Pirate en time-lapse</h3><p className="text-primary-foreground/70 text-sm leading-relaxed mt-2">La campagne social media fournit le film, les publications statiques et le document de légendes. Le fil narratif associe moment créatif, fierté de l’enfant, partage en famille et objet déco.</p></div>
              <div className="p-6 md:p-7 bg-primary-foreground/5 flex flex-col justify-center"><p className="text-secondary font-bold uppercase tracking-[0.14em] text-xs">Textes prêts à publier</p><h3 className="text-3xl font-extrabold text-primary-foreground mt-2">Une ligne éditoriale déjà écrite.</h3><p className="text-primary-foreground/70 leading-relaxed mt-4">Le livrable social media contient les 6 descriptions de posts : choix de puzzle, création partagée par la communauté, dimanche en famille, dernière pièce Licorne, montage du Bateau et Licorne déco.</p><a href="/dossier/livrables/18-campagne-social-media-textes.docx" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-extrabold text-primary-foreground hover:brightness-105">Ouvrir les textes de posts <Download className="w-4 h-4" /></a></div>
            </div>
          </div>
        </section>

        <section id="evenement" className="scroll-mt-36 py-20 bg-muted">
          <div className="container mx-auto px-6">
            <SectionIntro number="07" eyebrow="Événement de lancement" title="Trouver la dernière pièce du puzzle."><p className="text-lg text-muted-foreground mt-4 leading-relaxed">L’événement imagine une parenthèse hivernale et lumineuse : les familles résolvent une mission, traversent un labyrinthe et posent leur pièce dans une œuvre collective qui s’illumine au fil de la soirée. Le concept, le parcours client, le budget, les visuels et les trois films de restitution sont réunis ici.</p></SectionIntro>

            <div className="relative overflow-hidden rounded-3xl bg-foreground min-h-[430px] shadow-xl">
              <img src={eventHeroMedia.src} alt={eventHeroMedia.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/85 to-foreground/25" />
              <div className="relative z-10 max-w-3xl p-8 md:p-12"><p className="text-secondary font-bold uppercase tracking-[0.16em] text-sm">Promesse de l’expérience</p><h3 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mt-3 leading-tight">La ville a perdu sa dernière pièce de lumière.</h3><p className="text-primary-foreground/80 text-lg leading-relaxed mt-5">Chaque famille devient gardienne d’un fragment. Elle entre dans un univers de bois, de lanternes et de maquettes lumineuses, puis contribue à rallumer l’ensemble en posant sa pièce dans la salle finale.</p><button type="button" onClick={() => setActiveMedia(eventHeroMedia)} className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-extrabold text-primary-foreground hover:brightness-105">Agrandir le visuel d’univers <Maximize2 className="w-4 h-4" /></button></div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">{[["17 h–22 h", "plage d’ouverture au public"], ["≈ 500", "participants, soit environ 170 familles"], ["30 min", "mission par famille, déplacements inclus"], ["10 vagues", "17 familles en parallèle par créneau" ]].map(([value, label]) => <article key={value} className="rounded-2xl border border-border bg-card p-6"><strong className="block text-3xl font-extrabold text-primary">{value}</strong><p className="text-sm text-muted-foreground mt-2 leading-relaxed">{label}</p></article>)}</div>

            <div className="mt-12"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6"><div><p className="text-primary font-bold uppercase tracking-[0.14em] text-xs">Mission en 4 séquences</p><h3 className="text-3xl font-extrabold text-foreground mt-2">Un parcours calibré pour coopérer, chercher, trouver et illuminer.</h3></div><p className="text-sm font-bold text-muted-foreground">17 familles par vague · toutes les 30 minutes</p></div><div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">{eventSequence.map((step) => <article key={step.number} className="rounded-3xl border border-border bg-card p-6 shadow-sm"><div className="flex items-center justify-between gap-3"><span className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-extrabold">{step.number}</span><span className="text-sm font-bold text-primary">{step.duration}</span></div><h4 className="text-xl font-extrabold text-foreground mt-5">{step.title}</h4><p className="text-muted-foreground leading-relaxed mt-3">{step.text}</p></article>)}</div></div>

            <div className="mt-12 grid xl:grid-cols-[1.15fr_0.85fr] gap-8">
              <div><p className="text-primary font-bold uppercase tracking-[0.14em] text-xs mb-4">Scénographie de l’expérience</p><div className="grid sm:grid-cols-2 gap-5">{currentEventMedia.map((item) => <button type="button" key={item.src} onClick={() => setActiveMedia(item)} className="group overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"><div className="aspect-[16/10] overflow-hidden bg-muted"><img src={item.src} alt={item.alt} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" /></div><span className="p-4 block"><span className="text-xs font-bold uppercase tracking-[0.1em] text-primary">Étape d’activation</span><span className="mt-1 block font-extrabold text-foreground">{item.title}</span></span></button>)}</div></div>
              <div className="space-y-6"><a href={eventBudgetReference?.href ?? "/dossier/livrables/14-evenement-budget.xlsx"} target="_blank" rel="noopener noreferrer" className="group flex aspect-[16/10] w-full flex-col justify-between rounded-3xl border border-border bg-card p-6 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><FileText className="h-6 w-6" /></span><span className="flex items-end justify-between gap-3"><span><span className="block text-xs font-bold uppercase tracking-[0.1em] text-primary">Document direct · XLSX</span><span className="mt-1 block text-xl font-extrabold text-foreground">Télécharger le budget prévisionnel</span><span className="mt-2 block text-sm leading-relaxed text-muted-foreground">Ouvrir le budget, sans passer par une galerie d’images.</span></span><Download className="h-5 w-5 shrink-0 text-secondary" /></span></a><article className="rounded-3xl bg-foreground text-primary-foreground p-7"><p className="text-secondary font-bold uppercase tracking-[0.14em] text-xs">Après la mission</p><h3 className="text-2xl font-extrabold mt-2">Faire durer le souvenir avec justesse.</h3><ul className="mt-5 space-y-3 text-primary-foreground/75 leading-relaxed text-sm"><li><Check className="inline w-4 h-4 text-secondary mr-2 align-text-bottom" />Goûter servi après la salle finale, avec alternatives clairement identifiées.</li><li><Check className="inline w-4 h-4 text-secondary mr-2 align-text-bottom" />Diplôme et petite lampe porte-clé puzzle pour l’enfant ; tote bag ou gourde pour l’adulte.</li><li><Check className="inline w-4 h-4 text-secondary mr-2 align-text-bottom" />Photo et souvenir digital uniquement avec un consentement distinct et explicite.</li></ul></article></div>
            </div>

            <div className="mt-12 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 rounded-3xl overflow-hidden bg-foreground shadow-xl"><div className="p-5 md:p-7"><video key={selectedEventVideo.src} controls preload="metadata" className="w-full aspect-video bg-black rounded-2xl" playsInline><source src={selectedEventVideo.src} type="video/mp4" />Votre navigateur ne prend pas en charge la vidéo.</video><p className="text-secondary text-sm font-bold uppercase tracking-[0.14em] mt-5">Film sélectionné</p><h3 className="text-2xl font-extrabold text-primary-foreground mt-1">{selectedEventVideo.title}</h3><p className="text-primary-foreground/65 text-sm mt-2">Vidéo originale fournie dans le Bloc 7.</p></div><div className="p-5 md:p-7 bg-primary-foreground/5"><p className="text-secondary font-bold uppercase tracking-[0.14em] text-xs">Les 3 films événementiels</p><div className="mt-4 space-y-2">{eventVideos.map((video, index) => <button key={video.src} type="button" onClick={() => setSelectedEventVideoIndex(index)} className={`w-full text-left rounded-xl px-4 py-3 flex items-center gap-3 ${selectedEventVideoIndex === index ? "bg-primary text-primary-foreground" : "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"}`}><CirclePlay className="w-5 h-5 shrink-0" /><span className="font-bold text-sm">{video.title}</span></button>)}</div></div></div>

            <div className="mt-10 rounded-3xl border border-border bg-card p-6 md:p-8"><div className="flex items-center gap-4"><FileSearch className="w-8 h-8 text-primary shrink-0" /><div><p className="text-primary font-bold uppercase tracking-[0.14em] text-xs">Documents de conception</p><h3 className="text-2xl font-extrabold text-foreground mt-1">Parcours client, support de lancement et budget sont consultables.</h3></div></div><div className="grid sm:grid-cols-3 gap-3 mt-7">{additionalDocuments.filter((document) => document.block === "Bloc 7").map((document) => <a key={document.href} href={document.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-2xl bg-muted border border-border p-4 hover:border-primary/40 hover:shadow-sm"><span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-extrabold text-xs">{document.type}</span><span className="flex-1 font-bold text-foreground text-sm leading-snug">{document.label}</span><Download className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-primary" /></a>)}</div></div>
          </div>
        </section>


        <section id="experiences" className="scroll-mt-36 py-20 bg-gradient-hero">
          <div className="container mx-auto px-6">
            <SectionIntro number="08" eyebrow="Mini-jeux interactifs" title="Le projet se prolonge aussi par le jeu."><p className="text-lg text-muted-foreground mt-4 leading-relaxed">Deux mini-jeux développent le territoire ÉCLAT en dehors de la boutique et s’intègrent au lancement : l’un réveille des mondes en reconnectant la lumière, l’autre invite à explorer une chambre enchantée. Les deux codes sources fournis restent accessibles en annexe.</p></SectionIntro>
            <div className="grid lg:grid-cols-2 gap-8"><a href="https://eclat-puzzle.manus.space/" target="_blank" rel="noopener noreferrer" className="group rounded-3xl bg-card border border-border p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"><span className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center"><CirclePlay className="w-7 h-7 text-primary" /></span><p className="text-primary font-bold uppercase tracking-[0.14em] text-sm mt-6">Mini-jeu 01 · puzzle à chemins lumineux</p><h3 className="text-3xl font-extrabold text-foreground mt-2">Réveille l'Éclat</h3><p className="text-muted-foreground leading-relaxed mt-3">Le joueur tourne des fragments pour rétablir le chemin de la lumière à travers cinq mondes illustrés. Le jeu se conclut par un indice qui peut guider la suite du parcours événementiel.</p><span className="inline-flex items-center gap-2 text-primary font-bold mt-6">Ouvrir le mini-jeu <ExternalLink className="w-4 h-4" /></span></a><a href="https://minijeu-eclat.manus.space/" target="_blank" rel="noopener noreferrer" className="group rounded-3xl bg-foreground text-primary-foreground p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"><span className="w-14 h-14 rounded-2xl bg-primary-foreground/15 flex items-center justify-center"><Gamepad2 className="w-7 h-7 text-secondary" /></span><p className="text-secondary font-bold uppercase tracking-[0.14em] text-sm mt-6">Mini-jeu 02 · exploration 3D</p><h3 className="text-3xl font-extrabold mt-2">La Chambre Éclat</h3><p className="text-primary-foreground/75 leading-relaxed mt-3">Une expérience en vue subjective où l’on explore une chambre enchantée, collecte cinq fragments et réveille progressivement le puzzle mural et les lumières de la pièce.</p><span className="inline-flex items-center gap-2 text-secondary font-bold mt-6">Ouvrir le mini-jeu <ExternalLink className="w-4 h-4" /></span></a></div>
            <div className="mt-8 rounded-3xl border border-border bg-card p-6 md:p-7"><div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"><div><p className="text-primary font-bold uppercase tracking-[0.14em] text-xs">Traçabilité technique</p><h3 className="text-2xl font-extrabold text-foreground mt-1">Liens publics et archives des deux mini-jeux.</h3></div><p className="text-sm text-muted-foreground max-w-xl">Les archives sont les sources fournies, décompressées pour l’analyse puis conservées au téléchargement dans le dossier final.</p></div><div className="grid sm:grid-cols-3 gap-3 mt-6">{additionalDocuments.filter((document) => document.block === "Bloc 8").map((document) => <a key={document.href} href={document.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-2xl bg-muted border border-border p-4 hover:border-primary/40 hover:shadow-sm"><span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-extrabold text-xs">{document.type}</span><span className="flex-1 font-bold text-foreground text-sm leading-snug">{document.label}</span><Download className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-primary" /></a>)}</div></div>
          </div>
        </section>

        <section id="livrables" className="scroll-mt-36 py-20 bg-muted"><div className="container mx-auto px-6"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8"><div><p className="text-primary font-bold uppercase tracking-[0.16em] text-xs mb-3">Annexes & traçabilité</p><h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Les {allDocuments.length} supports de référence, au même endroit.</h2><p className="text-muted-foreground mt-3 max-w-3xl leading-relaxed">La page rend les résultats consultables sans remplacer les sources. Documents de travail, fichiers de production, archives de code et livrables originaux restent accessibles pour vérifier le détail, les méthodes, les hypothèses et les références.</p></div><button type="button" onClick={() => setShowDocuments((value) => !value)} className="inline-flex items-center justify-center gap-2 rounded-full bg-card border border-border px-5 py-3 font-bold text-foreground hover:bg-primary/10"><FileText className="w-5 h-5 text-primary" />{showDocuments ? "Masquer les supports" : `Voir les ${allDocuments.length} supports`}<ChevronDown className={`w-4 h-4 transition-transform ${showDocuments ? "rotate-180" : ""}`} /></button></div>{showDocuments && <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{allDocuments.map((document) => <a key={document.href} href={document.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-2xl bg-card border border-border p-4 hover:border-primary/40 hover:shadow-sm"><span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-extrabold text-xs">{document.type}</span><span className="flex-1"><span className="font-bold text-foreground block">{document.label}</span><span className="text-xs text-muted-foreground">{document.block}</span></span><Download className="w-4 h-4 text-muted-foreground group-hover:text-primary" /></a>)}</div>}<div className="mt-8 rounded-3xl border border-border bg-card p-6 md:p-7"><div className="flex gap-4"><FileSearch className="w-8 h-8 text-primary shrink-0" /><div><h3 className="text-xl font-extrabold text-foreground">Méthode et limites affichées</h3><p className="text-muted-foreground leading-relaxed mt-2">Les chiffres de marché et les comparables viennent des veilles datées de septembre 2026. Les coûts unitaires sont des hypothèses pédagogiques de pré-chiffrage à confirmer par devis industriels, logistiques et tests. Les visuels de concepts exploratoires susceptibles d'évoquer une marque tierce sont conservés comme éléments de travail et doivent être licenciés ou retirés avant une commercialisation.</p></div></div></div></div></section>

        <section className="py-20 bg-primary"><div className="container mx-auto px-6 text-center"><Sparkles className="w-10 h-10 text-primary-foreground mx-auto mb-5" /><h2 className="text-4xl md:text-5xl font-extrabold text-primary-foreground">Le projet ÉCLAT est désormais consultable dans son ensemble.</h2><p className="text-primary-foreground/80 text-lg max-w-3xl mx-auto mt-4">Explorer les preuves, jouer avec les scénarios, ouvrir chaque média, puis revenir à la boutique pour voir la marque en situation.</p><div className="flex flex-col sm:flex-row gap-4 justify-center mt-8"><Link to="/boutique" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-foreground text-primary px-7 py-4 font-extrabold shadow-lg">Découvrir la boutique <ArrowRight className="w-5 h-5" /></Link><button type="button" onClick={() => { setShowDocuments(true); scrollToChapter("livrables"); }} className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/40 text-primary-foreground px-7 py-4 font-extrabold hover:bg-primary-foreground/10">Consulter les documents <FileText className="w-5 h-5" /></button></div></div></section>
      </main>
      <Footer />

      {activeMedia && <div role="dialog" aria-modal="true" aria-label={`Agrandissement : ${activeMedia.title}`} className="fixed inset-0 z-[100] bg-black/85 p-4 md:p-8 flex items-center justify-center" onClick={() => setActiveMedia(null)}><div className="relative w-full max-w-6xl max-h-full flex flex-col" onClick={(event) => event.stopPropagation()}><div className="absolute right-2 top-2 z-10 flex gap-2"><button type="button" onClick={() => setActiveMedia(null)} className="w-11 h-11 rounded-full bg-black/70 text-white inline-flex items-center justify-center hover:bg-black" aria-label="Fermer l'image"><X className="w-6 h-6" /></button></div><img src={activeMedia.src} alt={activeMedia.alt} className="max-h-[78vh] w-full object-contain rounded-2xl bg-black" /><div className="mt-3 flex items-center justify-center gap-4 text-white">{hasModalNavigation && <button type="button" onClick={() => openAdjacentMedia(-1)} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-bold hover:bg-white/20"><ChevronLeft className="w-5 h-5" />Précédent</button>}<div className="text-center"><p className="font-extrabold">{activeMedia.title}</p><p className="text-sm text-white/65">{activeMedia.category} · source : {activeMedia.source}</p></div>{hasModalNavigation && <button type="button" onClick={() => openAdjacentMedia(1)} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-bold hover:bg-white/20">Suivant<ChevronRight className="w-5 h-5" /></button>}</div></div></div>}
    </div>
  );
};

export default Projet;
