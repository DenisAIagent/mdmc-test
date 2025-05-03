
# Fichier: mdmcv4-backend/.env

MONGODB_URI=

# Fichier: mdmcv4-backend/.gitignore

.env
node_modules
# autres lignes...

# Fichier: .env
# Configuration de l'environnement pour l'application MDMCv4 Backend

# Environnement Node.js ('development' pour le développement, 'production' pour le déploiement)
NODE_ENV=development

# Port sur lequel le serveur backend écoutera
PORT=5000

# === Connexion à la Base de Données MongoDB ===
# Ceci est la chaîne de connexion complète fournie par MongoDB Atlas.
# REMPLACEZ <VOTRE_VRAI_MOT_DE_PASSE_ICI> par votre mot de passe réel.
# REMPLACEZ <NOM_DE_VOTRE_DB_ICI> par le nom de votre base de données (ex: mdmc_db).
MONGODB_URI=mongodb+srv=mongodb+srv://mdmc_dev_user:mongodb+srv://mdmc_dev_user:hck7rNVQd2v89iNa@mdmc-dev-cluster.ikigtp3.mongodb.net/?retryWrites=true&w=majority&appName=mdmc-dev-cluster

# === Configuration CORS ===
# L'URL de votre application frontend (ex: http://localhost:3000 pendant le développement)
# Important pour que le navigateur autorise les requêtes depuis votre frontend vers ce backend.
FRONTEND_URL=http://localhost:3000

# === Configuration JWT (pour l'Authentification - à ajouter plus tard) ===
# Une chaîne de caractères longue, aléatoire et secrète pour signer les tokens JWT.
# Vous pouvez générer une chaîne sécurisée (ex: avec openssl rand -base64 32)
JWT_SECRET=<faUOuJUumwAMDFiz8klABaLnfWH3boHrsIug3AVb7Hc=>

# Durée de validité des tokens JWT (ex: '30d' pour 30 jours, '1h' pour 1 heure)
JWT_EXPIRE=30d

# === Autres Clés API (si nécessaire) ===
# Exemple:
# AUTRE_SERVICE_API_KEY=xxxxxxxxxxxxxxxxxxxx