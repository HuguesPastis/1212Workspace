
const express = require('express');
const path = require('path');
const app = express();

/**
 * Configuration Google Cloud Run :
 * Utilise la variable d'environnement PORT (8080 par défaut).
 */
const PORT = process.env.PORT || 8080;

/**
 * VÉRIFICATION SANTÉ (Health Check)
 * Utilisé par Cloud Run pour vérifier que le conteneur est prêt.
 */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Serveur les fichiers statiques du répertoire racine
app.use(express.static(__dirname));

/**
 * Gestion du SPA : 
 * Redirige toutes les autres requêtes vers index.html.
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * Bind sur 0.0.0.0 pour être accessible depuis l'extérieur du conteneur.
 */
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Le serveur de la Distillerie Pastis 12/12 écoute sur le port ${PORT}`);
});
