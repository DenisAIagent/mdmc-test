const express = require('express');
const {
  getConfig,
  updateConfig,
  sendMessage,
  getDocumentation
} = require('../controllers/chatbot');

const router = express.Router();

// Importer les middleware de protection et d'autorisation
const { protect, authorize } = require('../middleware/auth');

// Appliquer la protection et l'autorisation à toutes les routes
router.use(protect);
router.use(authorize('admin'));

// Routes pour le chatbot
router.route('/config')
  .get(getConfig)
  .put(updateConfig);

router.post('/message', sendMessage);
router.get('/documentation', getDocumentation);

module.exports = router;
