// routes/artists.js (Correction de la casse)

const express = require('express');
const {
  createArtist,
  getAllArtists,
  getArtistBySlug,
  updateArtist,
  deleteArtist
  // Assurez-vous que les noms ici correspondent EXACTEMENT à ceux exportés dans ArtistController.js
} = require('./controllers/ArtistController'); // <<< CASE CORRIGÉE ICI (Majuscules A et C)

// Importer les middlewares de protection (si/quand vous les aurez)
// const { protect, authorize } = require('../middleware/auth'); // Exemple

const router = express.Router();

// Définition des routes pour la ressource "artists"

// Route pour la racine ('/') de cette ressource (correspondra à /api/v1/artists)
router.route('/')
  .post(/* protect, authorize('admin'), */ createArtist)
  .get(getAllArtists);

// Route pour les opérations sur un artiste spécifique via son slug ('/:artistSlug')
router.route('/:artistSlug')
  .get(getArtistBySlug)
  .put(/* protect, authorize('admin'), */ updateArtist)
  .delete(/* protect, authorize('admin'), */ deleteArtist);

module.exports = router;
