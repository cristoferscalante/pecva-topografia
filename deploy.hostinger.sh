#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/pecva-topography"
DEPLOY_DIR="$APP_DIR/.deploy"
REPO_DIR="$DEPLOY_DIR/repo"
REPO_URL="https://github.com/cristoferscalante/pecva-topografia.git"
BRANCH="${1:-main}"

mkdir -p "$DEPLOY_DIR"

if [ ! -d "$REPO_DIR/.git" ]; then
  git clone --branch "$BRANCH" --depth 1 "$REPO_URL" "$REPO_DIR"
else
  git -C "$REPO_DIR" fetch origin "$BRANCH"
  git -C "$REPO_DIR" checkout -B "$BRANCH" "origin/$BRANCH"
fi

# Sync repo contents into the app directory without replacing the deployment cache folder.
( cd "$REPO_DIR" && tar --exclude=.git --exclude=.deploy -cf - . ) | ( cd "$APP_DIR" && tar -xf - )

# Keep Docker builds compatible with the current pnpm policy on the VPS.
if grep -q 'pnpm install --frozen-lockfile' "$APP_DIR/Dockerfile"; then
  sed -i 's/pnpm install --frozen-lockfile/pnpm install --frozen-lockfile --ignore-scripts/' "$APP_DIR/Dockerfile"
fi

mkdir -p "$APP_DIR/app/api/health"
cat > "$APP_DIR/app/api/health/route.ts" <<'EOF'
export async function GET() {
  return Response.json(
    {
      ok: true,
      service: "topography-website-design",
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  )
}
EOF

cat > "$APP_DIR/docker-compose.hostinger.yml" <<'EOF'
services:
  topography-web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: topography-web-hostinger
    ports:
      - "3002:3000"
    environment:
      NODE_ENV: production
      PORT: 3000
      HOSTNAME: 0.0.0.0
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "-q", "-O", "-", "http://127.0.0.1:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s
EOF

cat > "$APP_DIR/docker-compose.hostinger.private.yml" <<'EOF'
services:
  topography-web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: topography-web-hostinger-private
    ports:
      - "127.0.0.1:3002:3000"
    environment:
      NODE_ENV: production
      PORT: 3000
      HOSTNAME: 0.0.0.0
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "-q", "-O", "-", "http://127.0.0.1:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s
EOF

cd "$APP_DIR"
docker compose -f docker-compose.hostinger.yml up -d --build
docker compose -f docker-compose.hostinger.yml ps
