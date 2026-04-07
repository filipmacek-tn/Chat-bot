#!/usr/bin/env sh
set -e
cp .env.example .env || true
docker compose up -d --build
