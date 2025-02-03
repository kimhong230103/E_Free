# Setup
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-slim as base
WORKDIR /src
RUN corepack enable && corepack prepare pnpm@latest --activate

# Dependencies
FROM base as dependencies
# COPY package.json pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm fetch

# Build
FROM dependencies as build
COPY . .
RUN pnpm install
RUN pnpm run build

# Run
FROM base
COPY --from=build /src/.output /src/.output
CMD ["node", ".output/server/index.mjs"]