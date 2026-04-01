#!/bin/bash
# start-app.sh - Automates starting DB and Redis before building the app

echo "🚀 Starting Database and Redis dependencies..."
docker compose up -d postgres redis

echo "⏳ Waiting for Database to be healthy..."
while [ "$(docker inspect -f '{{.State.Health.Status}}' algofox-postgres)" != "healthy" ]; do
    printf "."
    sleep 1
done
echo -e "\n✅ Database is healthy!"

echo "📦 Building and starting the App..."
docker compose up -d --build app

echo "✨ All services are up!"
docker compose ps
