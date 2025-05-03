const express = require('express');
const {
  getTemplates,
  getTemplate,
  getLandingPages,
  getLandingPage,
  createLandingPage,
  updateLandingPage,
  publishLandingPage,
  unpublishLandingPage,
  deleteLandingPage,
  previewLandingPage
} = require('../controllers/landingPage');

const router = express.Router();

// Importer les middleware de protection et d'autorisation
const { protect, authorize } = require('../middleware/auth');

// Appliquer la protection et l'autorisation à toutes les routes
router.use(protect);
router.use(authorize('admin'));

// Routes pour les templates de landing page
router.get('/templates', getTemplates);
router.get('/templates/:id', getTemplate);

// Routes pour les landing pages
router.route('/')
  .get(getLandingPages)
  .post(createLandingPage);

router.route('/:id')
  .get(getLandingPage)
  .put(updateLandingPage)
  .delete(deleteLandingPage);

router.post('/:id/publish', publishLandingPage);
router.post('/:id/unpublish', unpublishLandingPage);
router.get('/:id/preview', previewLandingPage);

module.exports = router;
