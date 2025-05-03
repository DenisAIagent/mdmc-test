// ----- Début du code COMPLET et MIS À JOUR pour app.js (avec écoute sur 0.0.0.0) -----

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Actif
const helmet = require('helmet'); // Actif
const morgan = require('morgan'); // Actif

// === Import Routes ===
// On importe SEULEMENT reviewRoutes pour ce test
// const authRoutes = require('../routes/auth.routes');
// const userRoutes = require('../routes/user.routes');
// const marketingRoutes = require('../routes/marketing.routes');
// const wordpressRoutes = require('../routes/wordpress.routes');
// const landingPageRoutes = require('../routes/landingPage.routes');
const reviewRoutes = require('../routes/reviews.routes'); // <<< DÉCOMMENTÉ POUR TESTER
// const chatbotRoutes = require('../routes/chatbot.routes');
const artistRoutes = require('../routes/artists'); // Added for Artists (Vérifiez si ../ ou ./ est correct)
const smartLinkRoutes = require('../routes/smartLinkRoutes'); // <<< LIGNE AJOUTÉE ICI (SmartLinks)

// Initialize express app
const app = express();

// === Middleware ===
// Remarque : app.use(helmet()) est commenté pour les tests précédents, vous pouvez le réactiver si nécessaire
// app.use(helmet()); // Actif
app.use(morgan('dev')); // Actif
app.use(cors()); // Permet toutes les origines pour le test
app.use(express.json()); // Actif
app.use(express.urlencoded({ extended: true })); // Actif

// ++++++++++++++++++++++++++++++++++++
// +++ ROUTE DE TEST REVENUE SUR /api +++
app.get('/api/ping', (req, res) => res.status(200).send('pong (avec middleware base + /api)')); // Message modifié
// ++++++++++++++++++++++++++++++++++++

// === Utilisation des Routes ===
// On utilise SEULEMENT reviewRoutes pour ce test
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/marketing', marketingRoutes);
// app.use('/api/wordpress', wordpressRoutes);
// app.use('/api/landing-pages', landingPageRoutes);
app.use('/api/reviews', reviewRoutes); // <<< DÉCOMMENTÉ POUR TESTER
// app.use('/api/chatbot', chatbotRoutes);
app.use('/api/v1/artists', artistRoutes); // Added for Artists: Monte les routes pour les artistes
app.use('/api/v1/smartlinks', smartLinkRoutes); // <<< LIGNE AJOUTÉE ICI (SmartLinks)

// Health check endpoint (gardé)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'MDMC Backend API is running' });
});

// Error handling middleware (gardés)
// Middleware gestionnaire d'erreurs personnalisé (doit être APRÈS les routes)
app.use((err, req, res, next) => {
  console.error("Error Middleware Catch:", err); // Log l'erreur pour le débogage côté serveur

  const statusCode = err.statusCode || 500;
  let message = err.message || 'Une erreur est survenue sur le serveur';

  const errorDetails = process.env.NODE_ENV === 'development' ? { name: err.name, message: message, stack: err.stack } : { message: message };

  res.status(statusCode).json({
      success: false,
      error: errorDetails
  });
});


// Middleware 404 (gardé)
// Doit être placé tout à la fin, après toutes les routes valides
app.use((req, res, next) => {
    res.status(404).json({
      // Format JSON cohérent avec le error handler général
      success: false,
      error: { message: `Ressource non trouvée sur l'URL ${req.originalUrl}` }
    });
});


// Connect to MongoDB and start server (gardé)
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Erreur: La variable d\'environnement MONGODB_URI n\'est pas définie.');
    process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connecté à MongoDB');
    // Modification ici pour ajouter l'hôte '0.0.0.0'
    app.listen(PORT, '0.0.0.0', () => {
      // J'ai aussi corrigé le message de log pour utiliser les backticks (`) et ${}
      console.log(`Serveur démarré sur le port ${PORT} (host 0.0.0.0) en mode ${process.env.NODE_ENV || 'non défini'}`);
    });
  })
  .catch((err) => {
    console.error('Échec de la connexion à MongoDB', err);
    process.exit(1);
  });

module.exports = app;

// ----- Fin du code COMPLET et MIS À JOUR pour app.js -----
