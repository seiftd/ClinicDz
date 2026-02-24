# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

# Build Frontend
RUN npm run build

# Build Backend (Simple tsc)
RUN npx tsc server.ts --esModuleInterop --outDir dist-server

# Production Stage
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (including tsx)
RUN npm install

COPY --from=builder /app/dist ./dist
COPY server.ts ./

# Generate Prisma Client
RUN npx prisma generate

EXPOSE 3000

CMD ["npx", "tsx", "server.ts"]
