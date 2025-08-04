# Vermeil 🥉

Blog lifestyle masculin français moderne construit avec Next.js 15, proposant du contenu premium sur la mode, les soins, le lifestyle et la culture.

![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.7-2D3748?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)

## ✨ Aperçu

Vermeil est une plateforme de contenu dédiée aux hommes français qui cherchent à élever leur style de vie. Le blog propose des articles sur :

-   🎩 **Mode** - Tendances, conseils style, et guides vestimentaires
-   🧴 **Soins** - Routines de soin, produits recommandés, bien-être
-   🏠 **Lifestyle** - Art de vivre, décoration, gastronomie
-   🎭 **Culture** - Arts, littérature, événements culturels

## 🚀 Fonctionnalités

### 📝 Gestion de contenu

-   **Système d'articles** avec sections modulaires et images
-   **Interface d'administration** pour créer, modifier et supprimer du contenu
-   **Catégorisation** intelligente des articles
-   **Articles mis en avant** pour le contenu premium
-   **SEO optimisé** avec méta-descriptions et titres personnalisés

### 👤 Expérience utilisateur

-   **Authentification** via Google OAuth et email/mot de passe
-   **Profils utilisateur** avec avatars personnalisables
-   **Articles favoris** - sauvegarde et gestion des contenus préférés
-   **Système de commentaires** interactif sur chaque article
-   **Design responsive** optimisé pour tous les appareils

### ⚡ Performance et sécurité

-   **Mise en cache intelligente** avec Next.js unstable_cache
-   **Stockage cloud AWS S3** pour les images et médias
-   **Actions serveur sécurisées** avec validation Zod
-   **Base de données PostgreSQL** avec relations optimisées
-   **Gestion des sessions** avec Better Auth

## 🛠 Stack technique

### Backend

-   **Framework** : Next.js 15 avec App Router et React Server Components
-   **Base de données** : PostgreSQL avec Prisma ORM
-   **Authentification** : Better Auth avec adaptateur Prisma
-   **Stockage fichiers** : AWS S3 avec SDK officiel
-   **Email** : Resend pour les notifications transactionnelles

### Frontend

-   **UI Framework** : React 19 avec TypeScript
-   **Styling** : Tailwind CSS 4.1 avec composants personnalisés
-   **Composants** : shadcn/ui avec Radix UI primitives
-   **Formulaires** : React Hook Form avec validation Zod
-   **Icônes** : Lucide React

### Développement

-   **Validation** : Zod pour le typage et la validation des données
-   **Actions** : next-safe-action pour les mutations type-safe
-   **Linting** : ESLint avec configuration Next.js
-   **Build** : pnpm pour la gestion des dépendances

### Structure du projet

```
src/
├── app/                    # Routes Next.js App Router
│   ├── (main)/            # Pages publiques (homepage, articles)
│   ├── admin/             # Interface d'administration
│   ├── auth/              # Pages d'authentification
│   ├── profile/           # Profil utilisateur et articles sauvés
│   └── api/               # API routes
├── components/            # Composants UI réutilisables
├── lib/                   # Utilities et configuration
│   ├── auth.ts           # Configuration Better Auth
│   ├── data/             # Fonctions d'accès aux données
│   └── schemas/          # Schémas de validation Zod
├── utils/                # Utilitaires (S3, etc.)
└── types/                # Définitions TypeScript
```

## 🔐 Authentification et autorisations

### Système d'authentification

-   **Google OAuth** : Connexion rapide avec compte Google
-   **Email/Password** : Authentification traditionnelle avec reset password
-   **Sessions sécurisées** : Stockage en base avec expiration automatique

### Gestion des rôles

-   **Utilisateurs standard** : Lecture, commentaires, favoris
-   **Administrateurs** : Accès complet à l'interface d'administration
-   **Système de bannissement** : Modération avec raisons et durées

## 🎨 Design et UX

### Interface utilisateur

-   **Design moderne** inspiré des magazines lifestyle premium
-   **Typographie soignée** avec hiérarchie claire
-   **Images optimisées** avec lazy loading et formats adaptatifs
-   **Navigation intuitive** avec breadcrumbs et filtres

### Responsive design

-   **Mobile-first** avec adaptation tablette et desktop
-   **Performance optimisée** sur tous les devices
-   **Accessibilité** avec support clavier et lecteurs d'écran
