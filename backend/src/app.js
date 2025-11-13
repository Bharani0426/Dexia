// Point d'entrée principal du serveur Express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Exemple de route racine
app.get('/', (req, res) => {
  res.send('API Backend Dexia opérationnelle');
});

// ...importer et utiliser les routes ici...

app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur le port ${PORT}`);
});
