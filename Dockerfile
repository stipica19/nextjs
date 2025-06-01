# 1️⃣ Koristimo zvanični Node.js image baziran na Alpine Linuxu
FROM node:22-alpine AS builder

# 2️⃣ Postavljamo radni direktorijum unutar kontejnera
WORKDIR /app

# 3️⃣ Kopiramo package.json i package-lock.json
COPY package.json package-lock.json ./

# 4️⃣ Instaliramo samo production dependencije
RUN npm ci --omit=dev

# 5️⃣ Kopiramo sve ostale fajlove u kontejner
COPY . .


# 6️⃣ Gradimo Next.js aplikaciju
RUN npm run build

# 7️⃣ Novi image samo sa potrebnim fajlovima
FROM node:22-alpine AS runner
WORKDIR /app

# 8️⃣ Kopiramo package.json i package-lock.json iz `builder` faze
COPY --from=builder /app/package.json /app/package-lock.json ./

# 9️⃣ Instaliramo production zavisnosti ponovo u "runner" fazi
RUN npm ci --omit=dev

# 🔟 Kopiramo samo potrebne fajlove za produkciju
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public

# 1️⃣1️⃣ Podešavamo varijable za optimizaciju memorije
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=256"

# 1️⃣2️⃣ Expose port 3000
EXPOSE 3000

# 1️⃣3️⃣ Pokrećemo aplikaciju pomoću `next start`
CMD ["node", "./node_modules/next/dist/bin/next", "start", "-p", "3000"]
