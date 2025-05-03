const brevoService = require('../services/brevo.service');

/**
 * Gère la soumission des résultats du simulateur
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction next d'Express
 */
const submitSimulatorResults = async (req, res, next) => {
  try {
    const { artistName, email, platform, budget, country, views, cpv, reach } = req.body;
    
    // Validation des données
    if (!artistName || !email || !platform || !budget || !country) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs obligatoires doivent être remplis'
      });
    }
    
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Adresse email invalide'
      });
    }
    
    // Ajout de l'utilisateur à la liste du simulateur
    await brevoService.addUserToSimulatorList({
      artistName,
      email,
      platform,
      budget,
      country,
      views,
      cpv,
      reach
    });
    
    // Envoi de l'email avec les résultats
    await brevoService.sendSimulatorResultsEmail({
      artistName,
      email,
      platform,
      budget,
      country,
      views,
      cpv,
      reach
    });
    
    // Réponse au client
    res.status(200).json({
      success: true,
      message: 'Vos résultats ont été enregistrés et envoyés par email'
    });
  } catch (error) {
    console.error('Erreur lors de la soumission des résultats du simulateur:', error);
    next(error);
  }
};

module.exports = {
  submitSimulatorResults
};
