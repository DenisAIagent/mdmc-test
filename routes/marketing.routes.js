const express = require('express');
const {
  getIntegrations,
  getIntegration,
  createIntegration,
  updateIntegration,
  deleteIntegration,
  testIntegration
} = require('../controllers/marketing');

const router = express.Router();

// Importer les middleware de protection et d'autorisation
const { protect, authorize } = require('../middleware/auth');

// Appliquer la protection et l'autorisation à toutes les routes
router.use(protect);
router.use(authorize('admin'));

// Routes pour les intégrations marketing
router.route('/')
  .get(getIntegrations)
  .post(createIntegration);

router.route('/:id')
  .get(getIntegration)
  .put(updateIntegration)
  .delete(deleteIntegration);

router.route('/:id/test')
  .post(testIntegration);

module.exports = router;
