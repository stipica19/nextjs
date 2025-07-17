# Multi-stage build za Next.js 15+ - optimizovano za local build
FROM node:22-alpine AS base

# Instaliramo potrebne pakete
RUN apk add --no-cache libc6-compat

# Postavljamo radni direktorijum
WORKDIR /app

# Dependencies faza
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --frozen-lockfile

# Builder faza
FROM base AS builder
COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile

COPY . .

# Optimizacija za build - može biti više memorije lokalno
ARG NODE_OPTIONS="--max-old-space-size=512"
ENV NODE_OPTIONS=$NODE_OPTIONS
ENV NEXT_TELEMETRY_DISABLED=1

# Gradimo aplikaciju sa standalone output
RUN npm run build

# Production faza - minimalna veličina za server
FROM node:22-alpine AS runner
WORKDIR /app

# Kreiramo non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Kopiramo production dependencies
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules

# Kopiramo build rezultate
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Prebacujemo se na non-root user
USER nextjs

# Environment varijable za produkciju na serveru
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=384"
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (res) => process.exit(res.statusCode === 200 ? 0 : 1))"

# Pokretanje aplikacije
CMD ["./node_modules/.bin/next", "start"]