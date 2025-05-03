const SibApiV3Sdk = require('sib-api-v3-sdk');
const config = require('../config/env');

// Configuration du client Brevo (anciennement Sendinblue)
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = config.BREVO_API_KEY;

// Initialisation des API
const contactsApi = new SibApiV3Sdk.ContactsApi();
const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * Ajoute un contact à la liste générale
 * @param {Object} contactData - Données du contact
 * @returns {Promise} - Promesse résolue avec la réponse de l'API
 */
const addContactToGeneralList = async (contactData) => {
  try {
    const { name, email, message } = contactData;
    
    // Création de l'objet contact pour Brevo
    const createContact = {
      email,
      attributes: {
        FIRSTNAME: name.split(' ')[0],
        LASTNAME: name.split(' ').slice(1).join(' ') || '',
        MESSAGE: message || ''
      },
      listIds: [parseInt(config.BREVO_CONTACT_LIST_ID)],
      updateEnabled: true // Met à jour le contact s'il existe déjà
    };
    
    // Appel à l'API Brevo
    const result = await contactsApi.createContact(createContact);
    console.log('Contact ajouté avec succès à la liste générale:', result);
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du contact à la liste générale:', error);
    throw error;
  }
};

/**
 * Ajoute un utilisateur du simulateur à la liste dédiée
 * @param {Object} userData - Données de l'utilisateur du simulateur
 * @returns {Promise} - Promesse résolue avec la réponse de l'API
 */
const addUserToSimulatorList = async (userData) => {
  try {
    const { artistName, email, platform, budget, country, views, cpv, reach } = userData;
    
    // Création de l'objet contact pour Brevo
    const createContact = {
      email,
      attributes: {
        FIRSTNAME: artistName.split(' ')[0],
        LASTNAME: artistName.split(' ').slice(1).join(' ') || '',
        PLATFORM: platform || '',
        BUDGET: budget ? budget.toString() : '',
        COUNTRY: country || '',
        VIEWS: views || '',
        CPV: cpv || '',
        REACH: reach || ''
      },
      listIds: [parseInt(config.BREVO_SIMULATOR_LIST_ID)],
      updateEnabled: true // Met à jour le contact s'il existe déjà
    };
    
    // Appel à l'API Brevo
    const result = await contactsApi.createContact(createContact);
    console.log('Utilisateur ajouté avec succès à la liste du simulateur:', result);
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur à la liste du simulateur:', error);
    throw error;
  }
};

/**
 * Envoie un email de confirmation après soumission du formulaire de contact
 * @param {Object} contactData - Données du contact
 * @returns {Promise} - Promesse résolue avec la réponse de l'API
 */
const sendContactConfirmationEmail = async (contactData) => {
  try {
    const { name, email } = contactData;
    
    // Configuration de l'email
    const sendSmtpEmail = {
      to: [{ email, name }],
      sender: { email: config.SENDER_EMAIL, name: 'MDMC Music Ads' },
      subject: 'Merci pour votre message - MDMC Music Ads',
      htmlContent: `
        <html>
          <body>
            <h1>Merci pour votre message, ${name}!</h1>
            <p>Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais.</p>
            <p>L'équipe MDMC Music Ads</p>
          </body>
        </html>
      `,
      replyTo: { email: config.ADMIN_EMAIL, name: 'MDMC Support' }
    };
    
    // Envoi de l'email
    const result = await emailApi.sendTransacEmail(sendSmtpEmail);
    console.log('Email de confirmation envoyé avec succès:', result);
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de confirmation:', error);
    throw error;
  }
};

/**
 * Envoie un email de confirmation après utilisation du simulateur
 * @param {Object} userData - Données de l'utilisateur du simulateur
 * @returns {Promise} - Promesse résolue avec la réponse de l'API
 */
const sendSimulatorResultsEmail = async (userData) => {
  try {
    const { artistName, email, platform, budget, country, views, cpv, reach } = userData;
    
    // Configuration de l'email
    const sendSmtpEmail = {
      to: [{ email, name: artistName }],
      sender: { email: config.SENDER_EMAIL, name: 'MDMC Music Ads' },
      subject: 'Vos résultats de simulation - MDMC Music Ads',
      htmlContent: `
        <html>
          <body>
            <h1>Résultats de votre simulation, ${artistName}!</h1>
            <p>Voici un récapitulatif de votre simulation :</p>
            <ul>
              <li><strong>Plateforme :</strong> ${platform}</li>
              <li><strong>Budget :</strong> ${budget} €</li>
              <li><strong>Région cible :</strong> ${country}</li>
              <li><strong>Vues estimées :</strong> ${views}</li>
              <li><strong>Coût par vue (CPV) :</strong> ${cpv}</li>
              <li><strong>Portée potentielle :</strong> ${reach}</li>
            </ul>
            <p>Pour discuter de ces résultats et obtenir une stratégie personnalisée, <a href="https://calendly.com/mdmc/consultation">prenez rendez-vous avec un expert</a>.</p>
            <p>L'équipe MDMC Music Ads</p>
          </body>
        </html>
      `,
      replyTo: { email: config.ADMIN_EMAIL, name: 'MDMC Support' }
    };
    
    // Envoi de l'email
    const result = await emailApi.sendTransacEmail(sendSmtpEmail);
    console.log('Email de résultats du simulateur envoyé avec succès:', result);
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de résultats du simulateur:', error);
    throw error;
  }
};

module.exports = {
  addContactToGeneralList,
  addUserToSimulatorList,
  sendContactConfirmationEmail,
  sendSimulatorResultsEmail
};
