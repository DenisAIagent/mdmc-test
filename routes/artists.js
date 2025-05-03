// routes/artists.js

const express = require('express');
const {
  createArtist,
  getAllArtists,
  getArtistBySlug,
  updateArtist,
  deleteArtist
} = require('../controllers/artistController'); // Importer les fonctions du contrôleur

// Importer les middlewares de protection (si/quand vous les aurez)
// const { protect, authorize } = require('../middleware/auth'); // Exemple

const router = express.Router();

// Définition des routes pour la ressource "artists"

// Route pour la racine ('/') de cette ressource (correspondra à /api/v1/artists)
router.route('/')
  .post(/* protect, authorize('admin'), */ createArtist) // POST pour créer un artiste (protégé admin)
  .get(getAllArtists);                                  // GET pour lister tous les artistes (public/protégé ?)

// Route pour les opérations sur un artiste spécifique via son slug ('/:artistSlug')
router.route('/:artistSlug')
  .get(getArtistBySlug)                                     // GET pour récupérer un artiste spécifique (public/protégé ?)
  .put(/* protect, authorize('admin'), */ updateArtist)       // PUT pour mettre à jour un artiste (protégé admin)
  .delete(/* protect, authorize('admin'), */ deleteArtist);  // DELETE pour supprimer un artiste (protégé admin)

module.exports = router; // Exporter le routeur configuré