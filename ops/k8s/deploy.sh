#!/bin/bash
set -e

# =============================================================================
# Algofox Kubernetes Deployment Script (All-in-One)
# =============================================================================
# Installs:
# 1. NGINX Ingress Controller
# 2. KEDA (Kubernetes Event-driven Autoscaling)
# 3. Algofox App + DB + Redis
# 4. Judge0 + Worker (Autoscaled) + DB + Redis
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

install_keda() {
    log_info " installing/checking KEDA..."
    if ! kubectl get ns keda >/dev/null 2>&1; then
        helm repo add kedacore https://kedacore.github.io/charts
        helm repo update
        helm install keda kedacore/keda --namespace keda --create-namespace
        log_success "KEDA installed."
    else
        log_info "KEDA already exists."
    fi
}

deploy_app() {
    log_info "Deploying Algofox Stack..."
    kubectl apply -k "$(dirname "$0")/base"
    log_success "Manifests applied."
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

wait_for_pods() {
    log_info "Waiting for pods to be ready..."
    kubectl wait -n algofox --for=condition=ready pod --all --timeout=300s || true
}

main() {
    check_tools
    install_ingress
    install_keda

    # Wait a bit for CRDs to be established
    sleep 5

    deploy_app

    wait_for_db
    setup_db
    wait_for_pods

    echo ""
    log_success "Deployment Complete!"
    echo "URL: http://algofox.test (Ensure 127.0.0.1 algofox.test is in /etc/hosts)"
    echo "Monitor scaling: kubectl get hpa -n algofox"
    echo "Monitor KEDA: kubectl get scaledobject -n algofox"
}

main
