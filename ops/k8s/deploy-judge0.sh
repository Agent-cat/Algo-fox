#!/bin/bash
set -e

# =============================================================================
# Judge0 Deployment Script (Self-Controlled)
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

deploy_judge0() {
    log_info "Deploying Judge0 Stack..."
    kubectl apply -k "$(dirname "$0")/judge0"
    log_success "Judge0 Manifests applied."
}

wait_for_pods() {
    log_info "Waiting for Judge0 pods..."
    kubectl wait -n algofox --for=condition=ready pod -l app=judge0-server --timeout=600s || log_error "Judge0 Server taking time..."
    kubectl wait -n algofox --for=condition=ready pod -l app=judge0-worker --timeout=600s || log_error "Judge0 Worker taking time (possibly pulling images)..."
}

main() {
    check_tools
    install_keda

    deploy_judge0

    wait_for_pods

    echo ""
    log_success "Judge0 Deployment Complete!"
}

main
