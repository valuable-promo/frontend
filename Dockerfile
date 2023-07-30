FROM node:lts-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --link package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code
FROM base AS builder
ARG NEXT_PUBLIC_STRAPI_API_URL
ARG NEXT_PUBLIC_STORAGE_HOST
ARG NEXT_PUBLIC_SITE_NAME
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_CA_PUB
ARG NEXT_PUBLIC_PAGE_SIZE
ENV NEXT_PUBLIC_STRAPI_API_URL ${NEXT_PUBLIC_STRAPI_API_URL}
ENV NEXT_PUBLIC_STORAGE_HOST ${NEXT_PUBLIC_STORAGE_HOST}
ENV NEXT_PUBLIC_SITE_NAME ${NEXT_PUBLIC_SITE_NAME}
ENV NEXT_PUBLIC_SITE_URL ${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_CA_PUB ${NEXT_PUBLIC_CA_PUB}
ENV NEXT_PUBLIC_PAGE_SIZE ${NEXT_PUBLIC_PAGE_SIZE}
WORKDIR /app
COPY --from=deps --link /app/node_modules ./node_modules
COPY --link  . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  addgroup --system --gid 1001 nodejs; \
  adduser --system --uid 1001 nextjs
COPY --from=builder --link /app/public ./public
COPY --from=builder --link --chown=1001:1001 /app/.next/standalone ./
COPY --from=builder --link --chown=1001:1001 /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME localhost
CMD ["node", "server.js"]