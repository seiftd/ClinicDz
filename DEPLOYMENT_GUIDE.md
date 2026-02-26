# Railway Deployment Guide (Backend)

## 1. Setup Railway Project
1. Go to [Railway.app](https://railway.app)
2. Create a new project
3. Add a **PostgreSQL** database service
4. Add a **GitHub Repo** service (connect your repo)

## 2. Configure Backend Service
1. In Railway, go to your repo service settings.
2. Set **Root Directory** to `backend`.
3. Set **Build Command**: `npm run build`
4. Set **Start Command**: `npm start`

## 3. Environment Variables
Add these variables in Railway:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | (Auto-filled by Railway PostgreSQL) |
| `JWT_SECRET` | Generate a strong secret |
| `NODE_ENV` | `production` |
| `PORT` | `3000` (Railway sets this automatically) |
| `FRONTEND_URL` | `https://your-netlify-app.netlify.app` |

## 4. Database Migration
After deployment, run the migration command in Railway CLI or add it to the start command:
```bash
npx prisma migrate deploy
```
Or update the start command to:
```bash
npx prisma migrate deploy && node dist/server.js
```

---

# Netlify Deployment Guide (Frontend)

## 1. Setup Netlify Site
1. Go to [Netlify](https://netlify.com)
2. "Add new site" -> "Import an existing project"
3. Connect GitHub repo.

## 2. Build Settings
| Setting | Value |
|---------|-------|
| **Base directory** | `/` (root) |
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |

## 3. Environment Variables
Add these in Netlify Site Settings:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://your-railway-backend-url.up.railway.app` |

## 4. Redirects
Ensure `public/_redirects` exists with:
```
/* /index.html 200
```
This handles client-side routing.
