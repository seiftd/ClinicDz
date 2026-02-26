# Security Best Practices Checklist

## Backend
- [x] **Helmet**: Secure HTTP headers enabled.
- [x] **Rate Limiting**: 100 requests per 15min per IP.
- [x] **CORS**: Restricted to specific origins (Frontend URL).
- [x] **Compression**: Gzip enabled for performance.
- [x] **JWT**: Secure token signing with expiration (7 days).
- [x] **Bcrypt**: Password hashing enabled.
- [x] **Input Validation**: Basic checks in place (expand with Zod for all routes).
- [x] **Error Handling**: Global error handler prevents stack trace leaks.

## Frontend
- [x] **Environment Variables**: API URL is not hardcoded.
- [x] **HTTPS**: Enforced by Netlify.
- [x] **XSS Protection**: React escapes content by default.

## Deployment
- [ ] **Database**: Use SSL connection for PostgreSQL (default in Railway).
- [ ] **Secrets**: Never commit `.env` files.
- [ ] **Monitoring**: Set up error tracking (Sentry) and uptime monitoring.
