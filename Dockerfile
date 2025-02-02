# 1️⃣ Koristimo zvanični Node.js image baziran na Alpine Linuxu
FROM node:22-alpine AS builder

# 2️⃣ Postavljamo radni direktorijum unutar kontejnera
WORKDIR /app

# 3️⃣ Kopiramo package.json i package-lock.json
COPY package.json package-lock.json ./

# 4️⃣ Instaliramo dependencije
RUN npm install

# 5️⃣ Kopiramo sve fajlove u kontejner
COPY . .
COPY .env .env



# 7️⃣ Kreiramo novi image samo sa potrebnim fajlovima
FROM node:22-alpine AS runner
WORKDIR /app

# 8️⃣ Kopiramo samo potrebne fajlove iz `builder` faze
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/node_modules /app/node_modules

# 9️⃣ Postavljamo port na 3000
EXPOSE 3000

# 🔟 Pokrećemo Next.js aplikaciju u produkcijskom modu
CMD ["npm", "run", "start"]
