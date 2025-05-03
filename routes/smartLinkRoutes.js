// routes/smartLinkRoutes.js (Correction chemin et casse)

const express = require('express');
const {
  createSmartLink,
  getAllSmartLinks,
  getSmartLinkById,
  updateSmartLinkById,
  deleteSmartLinkById,
  getSmartLinksByArtistSlug,
  getSmartLinkBySlugs
  // Assurez-vous que les noms ici correspondent EXACTEMENT à ceux exportés dans ../controllers/SmartLinkController.js
} = require('../controllers/SmartLinkController'); // <<< CHEMIN ET CASSE CORRIGÉS ICI

// Importer les middlewares de protection (si/quand vous les aurez)
// const { protect, authorize } = require('../middleware/auth'); // Exemple

const router = express.Router();

// --- Routes Principales CRUD (généralement pour l'admin) ---

// Correspondra à /api/v1/smartlinks
router.route('/')
  .post(/* protect, authorize('admin'), */ createSmartLink)
  .get(/* protect, authorize('admin'), */ getAllSmartLinks);

// Correspondra à /api/v1/smartlinks/:id
router.route('/:id')
  .get(/* protect, authorize('admin'), */ getSmartLinkById)
  .put(/* protect, authorize('admin'), */ updateSmartLinkById)
  .delete(/* protect, authorize('admin'), */ deleteSmartLinkById);


// --- Routes spécifiques pour récupérer les données par Slugs (pour frontend/public) ---

// Correspondra à /api/v1/smartlinks/by-artist/:artistSlug
router.route('/by-artist/:artistSlug')
  .get(getSmartLinksByArtistSlug);

// Correspondra à /api/v1/smartlinks/details/:artistSlug/:trackSlug
router.route('/details/:artistSlug/:trackSlug')
  .get(getSmartLinkBySlugs);


module.exports = router;
