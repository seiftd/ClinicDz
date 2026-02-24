# Clinix DZ - Clinic Management SaaS

A comprehensive, offline-first Clinic Management System designed for Algeria and North Africa.

## Features

- **Multi-Role Auth**: Admin, Doctor, Secretary.
- **Patient Management**: Complete profiles, medical history.
- **Appointments**: Calendar view, scheduling.
- **Billing**: Algerian invoice format, thermal printing support.
- **Localization**: English, French, Arabic (with RTL support).
- **Offline Support**: PWA enabled.
- **Analytics**: Revenue and patient growth charts.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, Prisma ORM
- **Database**: PostgreSQL (Production), SQLite (Dev)
- **Deployment**: Docker, Docker Compose

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Database**
   ```bash
   npx prisma db push
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:3000`.

## Default Credentials

- **Email**: admin@clinix.dz (You need to register first via API or UI)
- **Password**: password123

## Deployment

See `DEPLOYMENT.md` for detailed instructions on deploying to a VPS.
