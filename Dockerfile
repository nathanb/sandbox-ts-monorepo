FROM node:20-alpine AS base
ARG GITHUB_SHA
ENV NODE_ENV=production
RUN mkdir -p /home/node/app
RUN chown -R node:node /home/node && chmod -R 770 /home/node
WORKDIR /home/node/app

## builds production server-side; but here we don't have a
#  server-side, so we'll just setup platform deps and continue
FROM base AS builder-server
ARG GITHUB_SHA
RUN apk add --no-cache --virtual .build-deps git make python3 g++
USER node:node
WORKDIR /home/node/app
COPY --chown=node:node . .
# RUN npm ci -w web packages/lib-ui packages/lib-shared --omit=dev #skipping for now; this is just an example for dev mode

# builds production client-side
FROM builder-server AS builder-dev
ARG GITHUB_SHA
WORKDIR /home/node/app
USER node:node
ENV NODE_ENV=development
RUN npm ci
ENV GITHUB_SHA=$GITHUB_SHA
RUN npm run build -w apps/web
EXPOSE 3000
CMD ["npm", "run", "dev"]
