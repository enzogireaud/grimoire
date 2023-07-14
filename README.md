Structure du dossier :

controllers : Contient la logique métier des opérations crud ainsi que de la connexion/authentification

images: Dossier de récupérations des images envoyées avec la method post et récupérées grâce à multer

middleware: Dossier contenant les configurations des dépendances bcrypt/jswbt concernant l'authentification et multer concernant le stockage des images

models: Contient le modèle de données attendues par la base de données pour les objets concernés (Book / User)

routes: Contient les routes du projet, associé à leur verbe d'action http selon leur fonction, certaines requirent une authentification ou un traitement de fichier avec multer

app : Setup de base pour la connexion à la base de données avec mongoose, spécifications des headers, appel des routes pour fournir l'URI complet

server: Fichier setup pour faire fonctionner le serveur express sur le port souhaité

Pour lancer le setup :
npm install
Remplacer l'url de connexion par sa propre BDD dans App.js
nodemon server

Puis switch côté frontend
npm start / npm run dev
