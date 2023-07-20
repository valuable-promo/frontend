FROM node:lts-alpine as base

# Prod dependencies
FROM base AS prodDeps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --link package.json package-lock.json ./
RUN npm ci --omit=dev

# Build dependencies
FROM base AS buildDeps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --link package.json package-lock.json ./
RUN npm ci

# Rebuild the source code
FROM base AS builder
ARG NEXT_PUBLIC_STRAPI_API_URL
ARG NEXT_PUBLIC_STORAGE_HOST
ARG NEXT_PUBLIC_SITE_NAME
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_CA_PUB
ENV NEXT_PUBLIC_STRAPI_API_URL ${NEXT_PUBLIC_STRAPI_API_URL}
ENV NEXT_PUBLIC_STORAGE_HOST ${NEXT_PUBLIC_STORAGE_HOST}
ENV NEXT_PUBLIC_SITE_NAME ${NEXT_PUBLIC_SITE_NAME}
ENV NEXT_PUBLIC_SITE_URL ${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_CA_PUB ${NEXT_PUBLIC_CA_PUB}
ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /app
COPY --from=buildDeps --link /app/node_modules ./node_modules
COPY --link  . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
COPY --link  . .
COPY --from=prodDeps --link /app/node_modules ./node_modules
COPY --from=builder --link /app/public ./public
COPY --from=builder --link /app/.next ./.next
RUN chown -R node:node /app
USER node
EXPOSE 3000
CMD ["npm", "run", "start"]