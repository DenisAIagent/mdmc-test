const express = require('express');
const router = express.Router();
const simulatorController = require('../controllers/simulator.controller');

/**
 * @route POST /api/simulator/submit
 * @desc Soumet les résultats du simulateur
 * @access Public
 */
router.post('/submit', simulatorController.submitSimulatorResults);

module.exports = router;
