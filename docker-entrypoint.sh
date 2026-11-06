#!/bin/sh
set -e

DB_PATH="${DATABASE_PATH:-/app/data/budget.db}"
export DATABASE_PATH="$DB_PATH"

mkdir -p "$(dirname "$DB_PATH")"

echo "Pushing database schema..."
npx drizzle-kit push 2>&1 | tail -5 || true

echo "Seeding default data..."
npx tsx scripts/seed.ts 2>&1 | tail -5 || true

echo "Starting server on port ${PORT:-3000}..."
exec npx next start -H 0.0.0.0 -p "${PORT:-3000}"