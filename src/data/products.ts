import puzzleChateau from "@/assets/puzzle-chateau.png";
import puzzleLicorne from "@/assets/puzzle-licorne.png";
import puzzleCabane from "@/assets/puzzle-cabane.png";
import puzzleBateauPirate from "@/assets/puzzle-bateau-pirate.png";
import puzzleCars from "@/assets/puzzle-cars.png";
import puzzleDinosaure from "@/assets/puzzle-dinosaure.png";
import puzzleTrain from "@/assets/puzzle-train.png";
import puzzleMysteryVan from "@/assets/puzzle-mystery-van.png";

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  pieces: number;
  price: number;
  difficulty: "Débutant" | "Intermédiaire" | "Avancé";
  time: string;
  theme: string;
  description: string;
  features: string[];
  dimensions: string;
  age: string;
  materials: string[];
}

export const products: Product[] = [
  {
    id: "chateau-enchante",
    name: "Le Château Enchanté",
    subtitle: "Le Monde Merveilleux",
    image: puzzleChateau,
    pieces: 150,
    price: 44.90,
    difficulty: "Intermédiaire",
    time: "4-6h",
    theme: "Magie",
    description: "Plongez dans un univers féérique avec ce magnifique château illuminé. Une fois assemblé, il s'illumine d'une douce lumière dorée qui transforme votre intérieur en conte de fées. Parfait pour créer une ambiance magique dans une chambre d'enfant ou un salon.",
    features: [
      "LED intégrées longue durée (50 000h)",
      "3 intensités lumineuses",
      "Mode veilleuse avec minuterie",
      "Compatible piles ou USB"
    ],
    dimensions: "25 x 18 x 30 cm",
    age: "8+",
    materials: ["Bois de tilleul FSC", "LED basse consommation", "Finition vernis alimentaire"]
  },
  {
    id: "licorne-magique",
    name: "La Licorne Magique",
    subtitle: "Le Royaume Féérique",
    image: puzzleLicorne,
    pieces: 90,
    price: 39.90,
    difficulty: "Débutant",
    time: "2-3h",
    theme: "Magie",
    description: "Cette adorable licorne scintillante ravira les petits et les grands rêveurs. Son éclairage multicolore crée une atmosphère enchantée, idéale pour accompagner les doux rêves des enfants. Un premier puzzle 3D parfait pour les débutants.",
    features: [
      "LED RGB avec 7 couleurs",
      "Mode arc-en-ciel automatique",
      "Bouton tactile intégré",
      "Fonctionne avec 3 piles AAA"
    ],
    dimensions: "15 x 12 x 22 cm",
    age: "6+",
    materials: ["Bois de tilleul FSC", "LED RGB", "Peinture écologique"]
  },
  {
    id: "cabane-pecheur",
    name: "Cabane du Pêcheur",
    subtitle: "Le Port Illuminé",
    image: puzzleCabane,
    pieces: 125,
    price: 44.90,
    difficulty: "Intermédiaire",
    time: "3-4h",
    theme: "Nature",
    description: "Évadez-vous au bord de l'eau avec cette charmante cabane de pêcheur. Son éclairage chaleureux évoque les douces soirées d'été au bord du lac. Un modèle apaisant qui apporte une touche de nature et de sérénité à votre décoration.",
    features: [
      "Éclairage blanc chaud",
      "Effet reflet sur l'eau",
      "2 modes d'intensité",
      "Alimentation USB incluse"
    ],
    dimensions: "20 x 15 x 18 cm",
    age: "7+",
    materials: ["Bois de hêtre FSC", "LED blanc chaud", "Finition naturelle"]
  },
  {
    id: "bateau-pirate",
    name: "Le Bateau Pirate",
    subtitle: "L'Aventure des Mers",
    image: puzzleBateauPirate,
    pieces: 180,
    price: 44.90,
    difficulty: "Avancé",
    time: "5-7h",
    theme: "Aventure",
    description: "Partez à l'aventure avec ce majestueux bateau pirate ! Avec ses voiles noires ornées de têtes de mort et son équipage de pirates, ce puzzle 3D illuminé fera rêver tous les aventuriers en herbe. Son éclairage doré évoque les trésors cachés.",
    features: [
      "LED blanc chaud effet trésor",
      "Détails sculptés à la main",
      "Figurine pirate incluse",
      "Fonctionne avec 3 piles AAA ou USB"
    ],
    dimensions: "30 x 12 x 28 cm",
    age: "8+",
    materials: ["Bois de tilleul FSC", "LED blanc chaud", "Finition vernis mat"]
  },
  {
    id: "flash-mcqueen",
    name: "Flash McQueen",
    subtitle: "La Légende de la Course",
    image: puzzleCars,
    pieces: 120,
    price: 42.90,
    difficulty: "Intermédiaire",
    time: "3-5h",
    theme: "Aventure",
    description: "Ka-chow ! Assemblez le célèbre bolide rouge de Radiator Springs. Ce puzzle 3D lumineux capture toute l'énergie et le charisme de Flash McQueen. Ses phares s'illuminent pour un effet spectaculaire digne des plus grandes courses.",
    features: [
      "Phares LED fonctionnels",
      "Détails fidèles au personnage",
      "Roues décoratives amovibles",
      "Alimentation USB incluse"
    ],
    dimensions: "22 x 10 x 12 cm",
    age: "6+",
    materials: ["Bois de tilleul FSC", "LED orange/blanc", "Peinture rouge brillant"]
  },
  {
    id: "dinosaure-rex",
    name: "Rex le Dinosaure",
    subtitle: "Le Monde Préhistorique",
    image: puzzleDinosaure,
    pieces: 160,
    price: 44.90,
    difficulty: "Intermédiaire",
    time: "4-6h",
    theme: "Nature",
    description: "Voyagez dans le temps avec ce T-Rex impressionnant ! Ce puzzle 3D géant et lumineux fascinera les passionnés de dinosaures. Ses LED intégrées créent un effet de bioluminescence magique le long de son corps.",
    features: [
      "LED multicolores le long du corps",
      "Mâchoire articulée",
      "Socle de présentation inclus",
      "3 modes d'éclairage"
    ],
    dimensions: "35 x 15 x 28 cm",
    age: "7+",
    materials: ["Bois de tilleul FSC", "LED RGB", "Finition écologique"]
  },
  {
    id: "train-vapeur",
    name: "Le Train à Vapeur",
    subtitle: "L'Express Magique",
    image: puzzleTrain,
    pieces: 140,
    price: 42.90,
    difficulty: "Intermédiaire",
    time: "4-5h",
    theme: "Aventure",
    description: "Embarquez pour un voyage féérique à bord de ce train à vapeur coloré ! Avec sa locomotive et son wagon illuminés, ce puzzle 3D évoque la magie des voyages d'antan. Un modèle chaleureux et nostalgique.",
    features: [
      "Éclairage blanc chaud cabine",
      "Effet vapeur lumineux",
      "Roues décoratives",
      "Compatible piles ou USB"
    ],
    dimensions: "28 x 8 x 14 cm",
    age: "6+",
    materials: ["Bois de hêtre FSC", "LED blanc chaud", "Peinture colorée non-toxique"]
  },
  {
    id: "mystery-machine",
    name: "Le Mystery Van",
    subtitle: "L'Équipe du Mystère",
    image: puzzleMysteryVan,
    pieces: 110,
    price: 44.90,
    difficulty: "Débutant",
    time: "2-4h",
    theme: "Aventure",
    description: "Résolvez des mystères avec le célèbre van turquoise ! Ce puzzle 3D lumineux recrée fidèlement le véhicule iconique avec ses motifs floraux et ses bagages sur le toit. Parfait pour les fans de mystères et d'aventures.",
    features: [
      "Phares LED fonctionnels",
      "Détails bagages sur le toit",
      "Effet lueur sous le véhicule",
      "Fonctionne avec 3 piles AAA"
    ],
    dimensions: "20 x 10 x 14 cm",
    age: "6+",
    materials: ["Bois de tilleul FSC", "LED blanc", "Peinture turquoise écologique"]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
