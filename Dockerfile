# Builder
FROM node:lts-alpine as build
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
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install --only=production
ENV PATH /opt/node_modules/.bin:$PATH
COPY . .
RUN npm run build

# Creating final production image
FROM node:lts-alpine
RUN apk add --no-cache vips-dev
WORKDIR /app
COPY --from=build /app ./
ENV PATH /opt/node_modules/.bin:$PATH

RUN chown -R node:node /app
USER node
EXPOSE 3000
CMD ["npm", "run", "start"]