FROM node:lts-alpine
ARG NEXT_PUBLIC_STRAPI_API_URL
ARG NEXT_PUBLIC_STORAGE_HOST
ARG SITE_NAME
ARG SITE_URL
ENV NEXT_PUBLIC_STRAPI_API_URL ${NEXT_PUBLIC_STRAPI_API_URL}
ENV NEXT_PUBLIC_STORAGE_HOST ${NEXT_PUBLIC_STORAGE_HOST}
ENV SITE_NAME ${SITE_NAME}
ENV SITE_URL ${SITE_URL}
ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]