# portfolio2

# Configuration

## Variables d'environnement

1. Copiez le fichier `.env.example` en `.env.local` :
```bash
cp .env.example .env.local
```

2. Remplissez les variables dans `.env.local` avec vos valeurs :
- `NEXTAUTH_SECRET` : Générez une clé secrète avec `openssl rand -base64 32`
- `NEXTAUTH_URL` : URL de votre site en production
- `ADMIN_USERNAME` : Nom d'utilisateur pour l'accès admin
- `ADMIN_PASSWORD` : Mot de passe pour l'accès admin
- `PLAUSIBLE_API_KEY` : Clé API de votre compte Plausible
- `PLAUSIBLE_SITE_ID` : ID de votre site dans Plausible
- `POSTGRES_URL` : URL de connexion à votre base de données Postgres

3. Pour Vercel, ajoutez ces variables dans les paramètres du projet :
- Allez dans Settings > Environment Variables
- Ajoutez chaque variable de `.env.local`

## Déploiement

1. Assurez-vous que toutes les variables d'environnement sont configurées dans Vercel
2. Poussez vos changements sur GitHub
3. Vercel déploiera automatiquement votre application

## Sécurité

- Ne jamais commiter de fichiers `.env` ou contenant des secrets
- Utilisez toujours des variables d'environnement pour les informations sensibles
- Changez immédiatement tout secret qui aurait été exposé
