# Dexia Backend

Ce dossier contient l’API Node.js Express pour la gestion de la base de films et du système de recommandation.

## Démarrage

1. Installer les dépendances :
   ```powershell
   cd backend
   npm install
   ```
2. Lancer le serveur :
   ```powershell
   npm start
   ```

## Structure
- `src/app.js` : point d’entrée du serveur
- `src/controllers/` : logique des routes
- `src/models/` : modèles de données
- `src/routes/` : définition des routes
- `src/services/` : logique métier (recommandation)
- `database.sqlite` : base de données SQLite

## Configuration
Les variables d’environnement peuvent être placées dans `.env` si besoin.
