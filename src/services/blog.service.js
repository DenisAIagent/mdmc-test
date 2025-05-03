const axios = require('axios');
const NodeCache = require('node-cache');
const config = require('../config/env');

// Initialisation du cache
const cache = new NodeCache({ stdTTL: config.CACHE_TTL });

/**
 * Récupère les derniers articles du blog WordPress
 * @param {Number} count - Nombre d'articles à récupérer (par défaut 3)
 * @returns {Promise} - Promesse résolue avec les articles formatés
 */
const getLatestPosts = async (count = 3) => {
  try {
    // Vérifier si les données sont en cache
    const cacheKey = `latest_posts_${count}`;
    const cachedPosts = cache.get(cacheKey);
    
    if (cachedPosts) {
      console.log('Récupération des articles depuis le cache');
      return cachedPosts;
    }
    
    // Si pas en cache, faire la requête à l'API WordPress
    console.log('Récupération des articles depuis l\'API WordPress');
    const response = await axios.get(`${config.WORDPRESS_API_URL}/posts`, {
      params: {
        per_page: count,
        _embed: 'true' // Pour inclure les médias et auteurs
      }
    });
    
    // Formater les données
    const formattedPosts = response.data.map(post => {
      // Récupérer l'image mise en avant si disponible
      let featuredImage = null;
      if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
        const media = post._embedded['wp:featuredmedia'][0];
        featuredImage = {
          thumbnail: media.media_details.sizes.thumbnail ? media.media_details.sizes.thumbnail.source_url : null,
          medium: media.media_details.sizes.medium ? media.media_details.sizes.medium.source_url : null,
          large: media.media_details.sizes.large ? media.media_details.sizes.large.source_url : null,
          full: media.source_url
        };
      }
      
      // Récupérer l'auteur si disponible
      let author = null;
      if (post._embedded && post._embedded.author && post._embedded.author[0]) {
        author = {
          id: post._embedded.author[0].id,
          name: post._embedded.author[0].name,
          avatar: post._embedded.author[0].avatar_urls ? post._embedded.author[0].avatar_urls['96'] : null
        };
      }
      
      // Récupérer les catégories si disponibles
      let categories = [];
      if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0]) {
        categories = post._embedded['wp:term'][0].map(cat => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug
        }));
      }
      
      // Formater la date
      const date = new Date(post.date);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      
      // Retourner l'article formaté
      return {
        id: post.id,
        title: post.title.rendered,
        excerpt: post.excerpt.rendered,
        content: post.content.rendered,
        date: formattedDate,
        link: post.link,
        slug: post.slug,
        featuredImage,
        author,
        categories
      };
    });
    
    // Mettre en cache les résultats
    cache.set(cacheKey, formattedPosts);
    
    return formattedPosts;
  } catch (error) {
    console.error('Erreur lors de la récupération des articles du blog:', error);
    throw error;
  }
};

module.exports = {
  getLatestPosts
};
