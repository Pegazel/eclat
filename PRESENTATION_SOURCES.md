# ÉCLAT — Dossier « Le Projet » : sources et intégration

> **Périmètre de l’intégration** : la mise à jour porte uniquement sur la route `/projet`, ses données dédiées et les ressources statiques de son dossier. Les autres pages de la boutique n’ont pas été modifiées.

## Objectif de la page

La page **Le Projet** est conçue comme une soutenance interactive : elle permet de comprendre le fil conducteur d’ÉCLAT, de visualiser les créations, de consulter les films et d’ouvrir les livrables de référence sans quitter le site.

Le fil narratif est organisé selon les blocs du projet :

| Chapitre de la page | Ce qui est présenté | Ressources associées |
| --- | --- | --- |
| 01 · Veilles | Marché, concurrence, réglementation et justification des décisions | 4 PPTX du Bloc 1 |
| 02 · Identité | Brandboard, logos, moodboard, cibles et ton de marque | Brandboard, logos PNG/SVG, moodboard et DOCX du Bloc 2 |
| 03 · Collection | 8 concepts, rendus 3D, pricing et modèle d’économie unitaire | PDF, DOCX, XLSX et visuels du Bloc 3 |
| 04 · Production | Médiathèque filtrable, packaging, boutique, goodies, égéries et 8 films produits | 76 visuels et 8 vidéos du Bloc 4 |
| 05 · Agents IA | 5 agents : veille, SAV, contenu, stock et pilotage | `Les5agents.docx` |
| 05 bis · IA créative | La Fabrique à Mondes et l’univers Luciole | 10 visuels d’intégration IA |
| 06 · E-commerce | Le parcours du site, de la découverte à la commande simulée | Le site ÉCLAT existant |
| 06 bis · Campagnes | Affichage, PLV, boutique, social media, Reels et sources de fabrication | Dossier `CAMPAGNES` |
| 07 · Événement | « Trouver la dernière pièce du puzzle » : concept, parcours famille, budget, scénographies et films | Bloc 7 |
| 08 · Mini-jeux | Deux expériences ludiques, leurs liens et leurs archives de code | Bloc 8 |
| Annexes | Documents, modèles de calcul et archives de code à ouvrir ou télécharger | 18 supports de référence |

## Ressources effectivement intégrées

### Bloc 1 — Veilles et justification

- **4 présentations PPTX** : justification du lancement, veille concurrentielle, veille sectorielle & marché et veille réglementaire.
- Les conclusions utiles à la lecture de la soutenance sont résumées dans la page ; les présentations restent accessibles dans les annexes.

### Bloc 2 — Identité de marque

- Brandboard PDF et document de positionnement.
- Moodboard et **4 déclinaisons de logo** présentés dans la page.
- Le logo original vectoriel SVG est conservé en annexe pour un téléchargement de production.

### Bloc 3 — Collection produit

- **8 concepts** de collection : 5 références cœur et 3 explorations.
- 7 rendus de conception 3D, 8 visuels de collection et les fiches produit PDF.
- Justification des prix, modèle de coûts et classeur de pricing consultables.

### Bloc 4 — Production visuelle et vidéo

- Les **76 visuels fournis** sont présents dans la médiathèque : identité, conception 3D, collection, boutique, campagne égérie, goodies, mises en situation et packaging.
- Les **8 films produits** sont regroupés dans le lecteur du chapitre Production.
- Les images affichées sont des renditions WebP optimisées ; elles ne remplacent pas les originaux fournis.

### Bloc 5 — Agents IA

- Le document des 5 agents est exposé dans les annexes.
- La page rend chaque rôle sélectionnable et présente ses missions, déclencheurs, données, livrables et valeur opérationnelle.

### Intégration IA — La Fabrique à Mondes

- **10 visuels** sont regroupés dans le chapitre **05 bis · IA créative** et dans le filtre de médiathèque **IA · Fabrique des mondes**.
- Le chapitre explicite le parcours : dessin enfant → transformation en univers-puzzle → projection ou mur interactif.
- Les visuels Luciole sont également consultables individuellement en grand format.

### Bloc 6 — Site e-commerce

- Le parcours de la boutique existante est documenté sans modifier les autres routes.
- La page indique explicitement qu’il s’agit d’un démonstrateur sans paiement réel.

### Campagnes

- Les visuels de la **campagne d’affichage**, de la **campagne boutique** et de la **campagne social media** sont visibles dans leur propre chapitre et dans la médiathèque filtrable.
- Le Reels « Construction du Bateau Pirate » est lisible directement dans la page.
- Le document de légendes Instagram est téléchargeable.
- Les **8 PSD** (affiche, diplôme, flyer, formats Google Ads et Post 2) sont conservés dans l’archive de livraison, mais ne sont plus rendus publics dans les annexes ni la médiathèque.

### Bloc 7 — Événement de lancement

- Le placeholder initial a été remplacé par le chapitre complet **« Trouver la dernière pièce du puzzle »**.
- Il présente la promesse, les hypothèses de fréquentation, le déroulé de mission en 4 séquences, une sélection de 5 visuels actuels de scénographie, les 3 films et les documents du bloc.
- Les fichiers DOCX du parcours client, PPTX de lancement et XLSX du budget sont téléchargeables.

### Bloc 8 — Mini-jeux

- Les deux mini-jeux restent disponibles via leurs liens publics : **Réveille l’Éclat** et **La Chambre ÉCLAT**.
- Les deux archives ZIP de code source ont été décompressées pour analyser leur contenu, puis sont conservées comme téléchargements dans les annexes.
- Le document d’origine contenant les liens des mini-jeux est également accessible.

## Organisation technique

| Élément | Rôle |
| --- | --- |
| `src/pages/Projet.tsx` | Composition de la seule page enrichie : narration, chapitres, lecteurs, galeries, sources et interactions |
| `src/data/projectMedia.ts` | Banque média déjà présente pour les blocs 2 à 4 |
| `src/data/projectAdditions.ts` | Données ajoutées pour IA, événement, campagnes, vidéos complémentaires et documents |
| `public/dossier/media/` | Rendus WebP optimisés affichés dans la page |
| `public/dossier/videos/` | 12 vidéos consultables dans les lecteurs dédiés |
| `public/dossier/livrables/` | 18 documents et archives publics téléchargeables ; les PSD restent uniquement dans l’archive de livraison |

## Chiffres de contrôle

| Élément | Total exposé dans `/projet` |
| --- | ---: |
| Visuels consultables | 110 |
| Vidéos intégrées | 12 |
| Agents IA | 5 |
| Concepts produits | 8 |
| Mini-jeux | 2 |
| Supports de référence téléchargeables | 18 |
| Sources Photoshop publiques | 0 |

## Notes de lecture et limites

- Les chiffres de marché, prix et marges affichés sur `/projet` sont des synthèses des livrables fournis, datés de septembre 2026.
- Le modèle de coûts est présenté comme un **pré-chiffrage pédagogique** à confirmer par devis industriels, logistiques et tests.
- Les concepts exploratoires pouvant évoquer une marque tierce restent des éléments de travail : ils doivent être licenciés ou retirés avant une diffusion commerciale.
- Les fichiers PSD restent présents dans l’archive de livraison pour la traçabilité, mais ils sont retirés de l’interface publique afin de ne pas alourdir les annexes de présentation.


## Révision de présentation — 29 septembre 2026

- Les **5 prompts de programmation complets** sont désormais visibles directement dans le chapitre **05 · Agents IA**. Un agent est sélectionné à la fois afin de conserver une lecture claire ; le DOCX original reste accessible depuis ce même chapitre.
- La partie **05 bis · IA créative** distingue explicitement **deux activations événementielles** : **La Fabrique à Mondes** (dessin → puzzle interactif) et **Luciole** (médiation narrative et lumineuse du parcours).
- Le visuel de budget de l’événement est devenu un **lien direct vers le fichier XLSX**, sans étape intermédiaire.
- Le bloc éditorial « Les 8 sources Photoshop sont conservées » a été retiré de la campagne. Les PSD sont conservés dans l’archive livrée, mais ne sont plus affichés dans les annexes ni dans la médiathèque publique.
- Les puces de chapitres acceptent désormais correctement les numéros longs comme **05 bis** et **06 bis** ; la navigation se répartit sur plusieurs lignes lorsque nécessaire, sans débordement horizontal.
- Les visuels de tête de page, de commerce, d’IA et d’événement ont été différenciés afin de limiter les répétitions dans la lecture du dossier.
- Les anciens visuels d’événement et l’aperçu image du budget ont été retirés de la médiathèque générale ; le budget reste disponible uniquement via son lien XLSX direct.
