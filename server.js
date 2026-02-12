const express = require('express');
const path = require('path');
const app = express();

/**
 * Configuration Google Cloud Run :
 * L'application DOIT écouter sur le port défini par la variable d'environnement PORT.
 */
const PORT = process.env.PORT || 8080;

/**
 * VÉRIFICATION SANTÉ (Health Check)
 * Indispensable pour que Cloud Run considère le conteneur comme opérationnel.
 */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

/**
 * Service des fichiers statiques
 * L'application est servie de manière autonome depuis le conteneur.
 */
app.use(express.static(__dirname));

/**
 * Gestion du Single Page Application (SPA)
 * Toutes les routes non-API sont redirigées vers l'index.html.
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * Démarrage du serveur
 * Important : on bind sur '0.0.0.0' pour Cloud Run.
 */
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur Pastis 12/12 opérationnel sur le port ${PORT}`);
});