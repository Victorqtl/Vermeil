# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

-   `pnpm run dev` - Start development server
-   `pnpm run build` - Build for production
-   `pnpm run start` - Start production server
-   `pnpm run lint` - Run ESLint
-   `pnpx prisma generate` - Generate Prisma client after schema changes
-   `pnpx prisma db push` - Push schema changes to database
-   `pnpx prisma studio` - Open Prisma Studio for database management

## Architecture Overview

**Vermeil** is a French men's lifestyle blog built with Next.js 15, featuring articles about fashion, skincare, lifestyle, and culture. The application uses:

### Tech Stack

-   **Framework**: Next.js 15 with App Router and React 19
-   **Database**: PostgreSQL with Prisma ORM
-   **Authentication**: Better Auth with Google OAuth
-   **File Storage**: AWS S3 for images
-   **Email**: Resend for transactional emails
-   **Styling**: Tailwind CSS
-   **Type Safety**: TypeScript with Zod validation
-   **Server Actions**: next-safe-action for type-safe actions

### Application Structure

#### Route Structure

-   `/(main)` - Public pages (homepage, articles)
-   `/admin` - Admin dashboard for content management
-   `/account` - User profile and saved articles
-   `/auth` - Authentication pages (sign-in, sign-up)

#### Database Models

-   **User**: Authentication with role-based access (admin role for content management)
-   **Article**: Blog posts with slug-based URLs, categories, and featured status
-   **Section**: Article content sections with optional images and links
-   **UserFavorite**: Users can save articles to favorites
-   **Comment**: User comments on articles

#### Authentication & Authorization

-   Uses Better Auth with Prisma adapter
-   Google OAuth integration
-   Role-based access (admin users can access `/admin` routes)
-   Sessions stored in database with proper cleanup

#### File Upload

-   AWS S3 integration for image uploads
-   Configured for article hero images and user avatars
-   Automatic file path generation and metadata handling

### Code Patterns

#### Server Actions

All mutations use `next-safe-action` with two client types:

-   `actionClient` - For public actions
-   `authActionClient` - For authenticated actions (includes user context)

Server actions are organized in `actions/` folders within each route directory.

#### Data Fetching

-   Direct Prisma queries in server components
-   Prisma client generated to `src/generated/prisma/`
-   Database queries use proper relations and cascade deletes

#### Form Handling

-   React Hook Form with Zod resolvers
-   Custom form components in `src/components/ui/`
-   File uploads handled through custom hooks

#### Styling

-   Tailwind CSS with custom components
-   shadcn/ui components in `src/components/ui/`
-   French language interface

### Environment Variables Required

```
DATABASE_URL=
DIRECT_URL=
BETTER_AUTH_SECRET=
NEXT_PUBLIC_APP_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
AWS_REGION=
RESEND_API_KEY=
```

### Key Files

-   `prisma/schema.prisma` - Database schema
-   `src/lib/auth.ts` - Better Auth configuration
-   `src/lib/safe-actions.ts` - Server action clients
-   `src/utils/s3-utils.ts` - AWS S3 utilities
-   `next.config.ts` - Next.js configuration with image optimization

### Development Notes

-   Prisma client is generated to custom path (`src/generated/prisma/`)
-   Images support remote patterns for S3 URLs
-   Server actions have 2MB body size limit for file uploads
-   French language used throughout UI and error messages
