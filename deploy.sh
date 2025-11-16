#!/bin/bash

# 🔧 KONFIGURACIJA
IMAGE_NAME="nextjs-app"
VERSION="latest"
SERVER_USER="root"                      # Ili drugi user ako ne koristiš root
SERVER_IP="165.22.22.27"             # Npr. 123.45.67.89
SERVER_PATH="/root/"             # Lokacija gdje šalješ fajlove

# 📦 1. Build Docker image lokalno
echo "📦 Building Docker image..."
docker build -t $IMAGE_NAME:$VERSION \
  --build-arg NODE_OPTIONS="--max-old-space-size=512" \
  .

if [ $? -ne 0 ]; then
  echo "❌ Docker build failed!"
  exit 1
fi

# 🗜️ 2. Spakuj image u tar.gz
echo "🗜️ Kreiranje tar arhive..."
docker save $IMAGE_NAME:$VERSION | gzip > $IMAGE_NAME-$VERSION.tar.gz

# 📤 3. Pošalji image i .env fajl na server
echo "📤 Slanje na server..."
scp $IMAGE_NAME-$VERSION.tar.gz .env $SERVER_USER@$SERVER_IP:$SERVER_PATH/

if [ $? -ne 0 ]; then
  echo "❌ SCP transfer failed!"
  exit 1
fi

# 🧹 4. Obriši lokalni tar fajl
rm -f $IMAGE_NAME-$VERSION.tar.gz
echo "🧹 Lokalni tar.gz fajl obrisan."

echo "🎉 Završeno!"
