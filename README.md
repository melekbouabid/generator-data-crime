# Generator Data Crime

## Description
Generator Data Crime est une application React + Vite qui genere un jeu de donnees criminologiques fictif au format JSON ou CSV.

L application cree automatiquement des profils de personnes avec des informations sociales, economiques, familiales, medicales et judiciaires. Elle est utile pour tester des dashboards, des pipelines data et des projets d analyse sans utiliser de donnees reelles.

## Regles de generation implementees
- 50% des personnes ont commis un crime et 50% n ont pas commis de crime.
- La colonne country est toujours fixee a Tunisie.
- Correlations fortes entre type de crime et features:
  - Vol -> profil economique precaire et emploi instable.
  - Crimes violents / meurtre en serie -> troubles psychologiques plus frequents et parents separes ou divorces.

## Stack technique
- React
- Vite
- JavaScript

## Lancer le projet
```bash
npm install
npm run dev
```

## Build production
```bash
npm run build
npm run preview
```
