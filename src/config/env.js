// Fichier: src/config/env.js
// Charge les variables d'environnement depuis le fichier .env
require('dotenv').config();

// Exporte la configuration en lisant les variables d'environnement
// ou en utilisant des valeurs par défaut pour certaines
module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'leads@mdmcmusicads.com',

  // IMPORTANT : La clé API est lue UNIQUEMENT depuis l'environnement (.env)
  // La valeur par défaut écrite en dur a été SUPPRIMÉE pour la sécurité et pour GitHub.
  BREVO_API_KEY: process.env.BREVO_API_KEY,

  // Les autres variables gardent leur valeur par défaut si non définies dans .env
  BREVO_CONTACT_LIST_ID: process.env.BREVO_CONTACT_LIST_ID || '4',
  BREVO_SIMULATOR_LIST_ID: process.env.BREVO_SIMULATOR_LIST_ID || '3',
  SENDER_EMAIL: process.env.SENDER_EMAIL || 'sales@mdmcmusicads.com',
  WORDPRESS_API_URL: process.env.WORDPRESS_API_URL || 'https://blog.mdmcmusicads.com/wp-json/wp/v2',
  FRONTEND_URL: process.env.FRONTEND_URL || 'https://luvxvjsy.manus.space',
  CACHE_TTL: process.env.CACHE_TTL || 300 // 5 minutes in seconds
};