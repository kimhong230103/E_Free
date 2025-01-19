# Setup
ARG NODE_VERSION=21.7.3
FROM node:${NODE_VERSION}-slim as base
ARG PORT=3000
WORKDIR /src

# Build
FROM base as build
COPY --link package.json package-lock.json .
RUN npm install
COPY --link . .
RUN npm run build

# Run
FROM base
ENV PORT=$PORT
# ENV NODE_ENV=production
COPY --from=build /src/.output /src/.output
CMD [ "node", ".output/server/index.mjs" ]

# docker build . -t vicheak/efree-admin-dashboard:1.0.0
# docker run --rm -it -p 3000:3000 --env-file .env.local --name efree-admin-dashboard vicheak/efree-admin-dashboard:1.0.0