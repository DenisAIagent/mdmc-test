const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

/**
 * @route POST /api/contact/submit
 * @desc Soumet un formulaire de contact
 * @access Public
 */
router.post('/submit', contactController.submitContactForm);

module.exports = router;
