#!/bin/bash
# start-app.sh - Automates starting DB and Redis before building the app

echo "🚀 Starting Database and Redis dependencies..."
docker compose up -d postgres redis

echo "⏳ Waiting for Database to be healthy (timeout: 60s)..."
MAX_WAIT=60
COUNTER=0
while [ "$(docker inspect -f '{{.State.Health.Status}}' algofox-postgres 2>/dev/null)" != "healthy" ]; do
    if [ $COUNTER -ge $MAX_WAIT ]; then
        echo -e "\n❌ ERROR: Database timed out after ${MAX_WAIT}s"
        exit 1
    fi
    printf "."
    sleep 1
    ((COUNTER++))
done
echo -e "\n✅ Database is healthy!"

echo "📦 Building and starting the App..."
docker compose up -d --build app

echo "✨ All services are up!"
docker compose ps
