const blogService = require('../services/blog.service');

/**
 * Récupère les derniers articles du blog
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction next d'Express
 */
const getLatestPosts = async (req, res, next) => {
  try {
    // Récupérer le nombre d'articles demandé (par défaut 3)
    const count = req.query.count ? parseInt(req.query.count) : 3;
    
    // Limiter le nombre d'articles à 10 maximum pour éviter les abus
    const limitedCount = Math.min(count, 10);
    
    // Récupérer les articles via le service
    const posts = await blogService.getLatestPosts(limitedCount);
    
    // Réponse au client
    res.status(200).json({
      success: true,
      count: posts.length,
      posts
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles du blog:', error);
    
    // Si l'erreur vient de l'API WordPress, renvoyer une réponse appropriée
    if (error.response && error.response.status) {
      return res.status(error.response.status).json({
        success: false,
        message: 'Erreur lors de la récupération des articles du blog',
        error: error.response.data || error.message
      });
    }
    
    next(error);
  }
};

module.exports = {
  getLatestPosts
};
