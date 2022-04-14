# ==
# Base
FROM node:14 as base

WORKDIR /app

ARG ENVIRONMENT
ENV ENVIRONMENT=$ENVIRONMENT

COPY package.json package.json
COPY yarn.lock yarn.lock

COPY redwood.toml redwood.toml
COPY graphql.config.js graphql.config.js

COPY packages packages
COPY api/package.json api/package.json
COPY web/package.json web/package.json
COPY lerna.json lerna.json

RUN yarn install --frozen-lockfile

# ==
# Build
FROM base as build

COPY yarn.lock yarn.lock
COPY api api
COPY packages packages

RUN yarn build-packages && yarn rw build api

# ==
# Serve
FROM node:14 as serve

WORKDIR /app

COPY --from=build /app/api/package.json /app/api/package.json
# Necessary for installing our local lerna packages
COPY --from=build /app/yarn.lock /app/yarn.lock
# Only install necessary dependencies
# RUN yarn install --cwd "api" --production && \
RUN yarn install  --production && \
  yarn global add @redwoodjs/api-server @redwoodjs/internal
# Add back any dev dependencies you still need
RUN yarn add dotenv

COPY tasks/environment/ tasks/environment/
COPY .env.dev.js.enc .
COPY .env.sandbox.js.enc .
COPY .env.staging.js.enc .
COPY .env.prod.js.enc .
COPY serve-api.sh .


COPY --from=build /app/api/dist /app/api/dist
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build /app/api/db /app/api/db
COPY --from=build /app/packages /app/packages
COPY --from=build /app/redwood.toml /app/redwood.toml

RUN ["apt-get", "update"]
RUN ["apt", "install", "-y", "libnss3"]

# Expose RedwoodJS api port
EXPOSE 8911

# Entrypoint to @redwoodjs/api-server binary
ENTRYPOINT ["./serve-api.sh"]
