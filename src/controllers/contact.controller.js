const brevoService = require('../services/brevo.service');

/**
 * Gère la soumission du formulaire de contact
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction next d'Express
 */
const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    
    // Validation des données
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont obligatoires'
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
    
    // Ajout du contact à la liste Brevo
    await brevoService.addContactToGeneralList({ name, email, message });
    
    // Envoi de l'email de confirmation
    await brevoService.sendContactConfirmationEmail({ name, email });
    
    // Réponse au client
    res.status(200).json({
      success: true,
      message: 'Votre message a été envoyé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire de contact:', error);
    next(error);
  }
};

module.exports = {
  submitContactForm
};
