const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');

/**
 * @route GET /api/blog/latest
 * @desc Récupère les derniers articles du blog
 * @access Public
 */
router.get('/latest', blogController.getLatestPosts);

module.exports = router;
