# Setup
ARG NODE_VERSION=21.7.3
FROM node:${NODE_VERSION}-slim as base
ARG PORT=3000
WORKDIR /src

# Install dependencies and build
FROM base as build
COPY --link package.json package-lock.json .
RUN npm install --force
COPY --link . .
RUN npm run build

# Run the application
FROM base
ENV PORT=$PORT
# ENV NODE_ENV=production
COPY --from=build /src/.output /src/.output
EXPOSE $PORT
CMD ["node", ".output/server/index.mjs"]