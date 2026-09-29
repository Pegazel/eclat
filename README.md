# ÉCLAT — Site local

Site e-commerce de démonstration pour la marque de puzzles 3D lumineux ÉCLAT.

## Pré-requis

- Node.js 22 (LTS recommandé) ;
- npm 10 ou plus récent.

## Lancer le site en local

```sh
# Depuis le dossier du projet
npm install
npm run dev
```

Vite lance le site sur **http://localhost:8080**. Le port est volontairement fixe afin de simplifier les démonstrations et les liens locaux.

## Dossier interactif

La page **[Le Projet](/projet)** rassemble les huit blocs du projet ÉCLAT :

1. Veilles et justification ;
2. Identité de marque ;
3. Collection, coûts et modèle de pricing ;
4. Production visuelle et vidéo ;
5. Agents et automatisations IA ;
6. Site e-commerce ;
7. Événement (chapitre en attente des éléments à venir) ;
8. Mini-jeux interactifs.

Les veilles sont consultables par onglets, les produits par sélecteur et simulateur, les agents et le parcours e-commerce par étapes, et la médiathèque comprend les **76 visuels** et **5 vidéos** fournis.

Les documents sources sont disponibles depuis la section **Annexes** de cette page et sont également stockés sous `public/dossier/livrables/`.

## Vérifier avant une démo

```sh
npm run build
npm test
npm run lint
```

## Stack

- Vite + React + TypeScript ;
- React Router ;
- Tailwind CSS + shadcn/ui ;
- Vitest.

## Mise en ligne permanente

Le projet est configuré pour **Vercel** :

1. importer le dépôt GitHub dans Vercel ;
2. conserver la commande de build `npm run build` et le dossier de sortie `dist` ;
3. déclencher les déploiements de production depuis la branche `main`.

Le fichier `vercel.json` assure la compatibilité des routes React (notamment `/projet`) et ajoute des en-têtes HTTP de sécurité. Une fois le dépôt connecté, chaque mise à jour validée sur `main` déclenchera un nouveau déploiement.
