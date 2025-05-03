# Architecture du Backend MDMC Music Ads

## 1. Structure des modèles de données

### Modèle User
```
- username (String, unique)
- email (String, unique)
- password (String, hashé)
- role (String: admin/user)
- resetPasswordToken (String)
- resetPasswordExpire (Date)
- lastLogin (Date)
- createdAt (Date)
```

### Modèle MarketingIntegration
```
- type (String: google_analytics, gtm, google_ads, meta_pixel, tiktok_pixel)
- accountId (String)
- trackingId (String)
- active (Boolean)
- configuration (Object)
- createdAt (Date)
- updatedAt (Date)
```

### Modèle WordPressConnection
```
- siteUrl (String)
- username (String)
- applicationPassword (String, crypté)
- lastSync (Date)
- syncFrequency (String: manual, daily, weekly)
- categories (Array)
- status (String: connected, disconnected, error)
- createdAt (Date)
- updatedAt (Date)
```

### Modèle WordPressPost
```
- wpId (Number)
- title (String)
- content (String)
- excerpt (String)
- slug (String)
- featuredImage (String)
- categories (Array)
- tags (Array)
- status (String)
- publishedDate (Date)
- syncedAt (Date)
```

### Modèle LandingPage
```
- title (String)
- slug (String, unique)
- template (String)
- sections (Array of Objects)
- styles (Object)
- seo (Object)
- marketingPixels (Array)
- status (String: draft, published)
- createdAt (Date)
- updatedAt (Date)
- publishedAt (Date)
```

### Modèle LandingPageTemplate
```
- name (String)
- description (String)
- thumbnail (String)
- sections (Array)
- defaultStyles (Object)
- category (String)
- createdAt (Date)
```

### Modèle ChatbotConfig
```
- apiKey (String, crypté)
- contextData (Object)
- documentationVersion (String)
- active (Boolean)
- createdAt (Date)
- updatedAt (Date)
```

## 2. Structure des contrôleurs

### AuthController
- register
- login
- logout
- getMe
- updatePassword
- forgotPassword
- resetPassword

### UserController
- getUsers
- getUser
- createUser
- updateUser
- deleteUser

### MarketingController
- getIntegrations
- getIntegration
- createIntegration
- updateIntegration
- deleteIntegration
- testIntegration

### WordPressController
- connect
- disconnect
- getConnectionStatus
- updateConnectionSettings
- syncPosts
- getPosts
- getPost
- deletePost

### LandingPageController
- getTemplates
- getTemplate
- getLandingPages
- getLandingPage
- createLandingPage
- updateLandingPage
- publishLandingPage
- unpublishLandingPage
- deleteLandingPage
- previewLandingPage

### ChatbotController
- getConfig
- updateConfig
- sendMessage
- getDocumentation

## 3. Structure des routes

### Routes d'authentification (/api/auth)
- POST /register
- POST /login
- GET /logout
- GET /me
- PUT /updatepassword
- POST /forgotpassword
- PUT /resetpassword/:resettoken

### Routes utilisateurs (/api/users)
- GET /
- GET /:id
- POST /
- PUT /:id
- DELETE /:id

### Routes d'intégrations marketing (/api/marketing)
- GET /
- GET /:id
- POST /
- PUT /:id
- DELETE /:id
- POST /:id/test

### Routes WordPress (/api/wordpress)
- POST /connect
- POST /disconnect
- GET /status
- PUT /settings
- POST /sync
- GET /posts
- GET /posts/:id
- DELETE /posts/:id

### Routes de landing pages (/api/landing-pages)
- GET /templates
- GET /templates/:id
- GET /
- GET /:id
- POST /
- PUT /:id
- POST /:id/publish
- POST /:id/unpublish
- DELETE /:id
- GET /:id/preview

### Routes du chatbot (/api/chatbot)
- GET /config
- PUT /config
- POST /message
- GET /documentation

## 4. Middleware

### Authentication
- protect (vérification du JWT)
- authorize (vérification des rôles)

### Error Handling
- errorHandler (gestion centralisée des erreurs)

### Logging
- logger (journalisation des requêtes)

## 5. Services

### EmailService
- sendPasswordResetEmail
- sendPasswordChangeNotification

### EncryptionService
- encrypt
- decrypt

### WordPressService
- authenticateWithWordPress
- fetchPosts
- fetchMedia

### GeminiService
- generateResponse
- getDocumentation

## 6. Configuration du déploiement

### Variables d'environnement
- PORT
- NODE_ENV
- MONGODB_URI
- JWT_SECRET
- JWT_EXPIRE
- EMAIL_HOST
- EMAIL_PORT
- EMAIL_USER
- EMAIL_PASSWORD
- EMAIL_FROM
- NOTIFICATION_EMAIL
- ENCRYPTION_KEY

### Scripts de déploiement
- start
- dev
- seed (données initiales)
