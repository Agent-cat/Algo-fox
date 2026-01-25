#!/bin/bash
set -e

# =============================================================================
# Algofox App Deployment Script (DigitalOcean/Managed)
# =============================================================================

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

check_tools() {
    log_info "Checking tools..."
    command -v kubectl >/dev/null 2>&1 || { log_error "kubectl is required"; exit 1; }
    command -v helm >/dev/null 2>&1 || { log_error "helm is required"; exit 1; }
}

install_ingress() {
    log_info " installing/checking NGINX Ingress..."
    if ! kubectl get ns ingress-nginx >/dev/null 2>&1; then
        helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
        helm repo update
        helm install ingress-nginx ingress-nginx/ingress-nginx \
            --namespace ingress-nginx --create-namespace \
            --set controller.publishService.enabled=true
        log_success "NGINX Ingress installed."
    else
        log_info "NGINX Ingress already exists."
    fi
}

deploy_app() {
    log_info "Deploying Algofox Application..."
    kubectl apply -k "$(dirname "$0")/app"
    log_success "App Manifests applied."
}

wait_for_db() {
    log_info "Waiting for PostgreSQL to be ready..."
    kubectl wait -n algofox --for=condition=ready pod -l app=postgres --timeout=300s
}

setup_db() {
    log_info "Syncing Database Schema..."

    # Find a random free port
    local_port=$(shuf -i 10000-65000 -n 1)

    # Start port-forwarding in background
    log_info "Port-forwarding Postgres to localhost:$local_port..."
    kubectl port-forward -n algofox svc/postgres $local_port:5432 > /dev/null 2>&1 &
    pf_pid=$!

    # Wait for connection
    sleep 5

    # helper to run command
    run_prisma() {
        export DATABASE_URL="postgresql://algofox:algofox@localhost:$local_port/algofox"
        if command -v bunx >/dev/null 2>&1; then
            bunx prisma db push
        else
            npx prisma db push
        fi
    }

    if run_prisma; then
        log_success "Database schema synced successfully."
    else
        log_error "Failed to sync database schema."
        kill $pf_pid
        exit 1
    fi

    # Cleanup
    kill $pf_pid

    # Restart app to pick up DB changes immediately
    log_info "Restarting App Deployment..."
    kubectl rollout restart deployment/algofox-app -n algofox
}

main() {
    check_tools
    install_ingress

    deploy_app

    wait_for_db
    setup_db

    echo ""
    log_success "App Deployment Complete!"
}

main
