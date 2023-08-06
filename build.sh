#!/bin/bash

# Source the environment variables from .env file
if [ -f .env.development ]; then
    export $(cat .env.development | grep -v '^#' | xargs)
fi

# Docker build command with all the ARG values
docker build \
    --build-arg NEXT_PUBLIC_STRAPI_API_URL=${NEXT_PUBLIC_STRAPI_API_URL} \
    --build-arg NEXT_PUBLIC_STORAGE_HOST=${NEXT_PUBLIC_STORAGE_HOST} \
    --build-arg NEXT_PUBLIC_SITE_NAME=${NEXT_PUBLIC_SITE_NAME} \
    --build-arg NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    --build-arg NEXT_PUBLIC_CA_PUB=${NEXT_PUBLIC_CA_PUB} \
    --build-arg NEXT_PUBLIC_PAGE_SIZE=${NEXT_PUBLIC_PAGE_SIZE} \
    -t ghcr.io/valuable-promo/frontend:dev .
