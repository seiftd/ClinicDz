# Clinix DZ Deployment Guide

## Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local dev)

## Local Development
1. Install dependencies: `npm install`
2. Setup Database: `npx prisma db push`
3. Start Server: `npm run dev`
4. Access at `http://localhost:3000`

## Production Deployment (VPS)

1. Clone the repository to your VPS (Hetzner/OVH).
2. Create a `.env` file with production secrets:
   ```env
   DATABASE_URL="postgresql://postgres:password@db:5432/clinix"
   JWT_SECRET="your-super-secret-key"
   ```
3. Run with Docker Compose:
   ```bash
   docker-compose up -d --build
   ```

## Database Migration
For production, switch the `provider` in `prisma/schema.prisma` to `postgresql`.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Then run migrations:
```bash
docker-compose exec app npx prisma migrate deploy
```

## Offline Support
The app uses a Service Worker to cache static assets. For data persistence offline, we use IndexedDB.
To enable full offline mode:
1. Ensure HTTPS is enabled (required for Service Workers).
2. The app automatically caches visited pages.

## Backup
- Database backups are stored in the `postgres_data` volume.
- Set up a cron job to dump the database daily:
  ```bash
  docker-compose exec db pg_dump -U postgres clinix > backup_$(date +%F).sql
  ```
