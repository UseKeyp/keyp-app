## Docker

### Overview

**Web Docker image:**

- Docker nginx runner
- nginx config from `/web/config/nginx/default.conf`
- Built files end up in `/etc/nginx/conf.d/default.conf`
- Must pass `REDWOOD_API_URL`

**Api Docker image** has 3 distinct steps:

1. Install

- Installs everything.

2. Build

- Inherits everything from previous step and builds the packages and api.

3. Serve

- Inherits build files, scripts, packages, and `.prisma` from build step.
- Installs prod+dev dependencies in `/api/package.json`
- Includes `dotenv` for running `setupEnv.js`
- Includes `react` which is needed for some reason?
- Includes `@redwoodjs/cli` for running `rw serve`?
- Includes `core-js`
- Entrypoint `./serve-api.sh`

### Guid

Images are built via Github Action. To build the images locally:

```bash
# web
docker build . -t pi0neerpat/treasure-chess-web -f web/Dockerfile \
--build-arg NODE_ENV=dev \
--build-arg REDWOOD_API_URL=http://0.0.0.0:8911 \
--build-arg BASIC_AUTH_PASSWORD='pauliemorphy'

# api
docker build . -t pi0neerpat/treasure-chess-api -f api/Dockerfile --build-arg ENVIRONMENT=dev

# both
docker build . -t pi0neerpat/treasure-chess-both \
-f docker/Dockerfile \
--build-arg NODE_ENV=development \
--build-arg RUNTIME_ENV=local
```

Explore

```bash
# Container
docker exec -u 0 -it <containerId> /bin/bash
apt-get update
apt-get install nano

# Image (read-only?)
docker run --rm -it --entrypoint=/bin/bash <imageId>
```

Run an image locally:

Create a `GITHUB_PAT` in your Github "Developer Settings" with permissions `read:packages`

```bash
# Authenticate
docker login https://ghcr.io -u USERNAME -p GITHUB_PAT

# Pull the images (web and api)
docker pull ghcr.io/pi0neerpat/treasure-chess-web:latest
docker pull ghcr.io/pi0neerpat/treasure-chess-api:latest

# Run
docker-compose up

# Alternatively, run a single image
docker run -it --rm \
       -p 8911:8911 \
        pi0neerpat/treasure-chess-api:latest
```

Killing Docker

```bash
# WARNING: may kill other containers on your machine
sudo killall containerd-shim && docker-compose down

sudo netstat -tulpn | grep :8910
# or
sudo lsof -i tcp:8910
sudo kill 1888
sudo kill -9 $(sudo lsof -t -i:8910) && sudo kill -9 $(sudo lsof -t -i:8911)

docker kill CONTAINER
# kill stubborn container
sudo service docker restart
# kill running containers
docker kill $(docker ps -q)
# !!! Remove all containers~!!!
docker rm --force $(docker ps -a -q)

sudo /etc/init.d/docker restart

# Potential fix for this problem
sudo aa-remove-unknown
https://javahowtos.com/guides/124-docker/414-solved-cannot-kill-docker-container-permission-denied.html
```

# Troubleshooting image size

redwood-release-devops example

```
docker run --rm -it --entrypoint=/bin/bash <imageId>

apt-get install ncdu
ncdu
```

## Devops repo

#### `33b`

Start of experiment

container 2.15G
node_modules 2.2G
@redwoodjs 972.1 M
@prisma 229.2 M

#### `0201`

Changed `RUN yarn install --production && yarn global add @redwoodjs/api-server @redwoodjs/internal`

container 1.48G
node_modules 82 M
@redwoodjs 1.8 M
@prisma n/a
/root 208 Kb
/usr/local/share/.cache/yarn 446 M
/usr/lib x86_64-linux-gnu 299 M
/usr/local/share/.config/yarn/global 194 M

## tc repo

#### `dev-b11e2c5`

Start of experiment

Build time 9-11 minutes
container 5.45 G
node_modules 2.2 G
@redwoodjs 144 M
@storybook 192 M
@prisma 428 M
/root/.cache/prisma/master 309 M
/usr/lib x86_64-linux-gnu 303 M
/usr/local/share/.cache/yarn 2.2 G
/usr/local/share/.config/yarn/global n/a

### `87b2`

Using the new --production flag

container 1.48 G
node_modules 37.8 M
@redwoodjs n/a
@storybook n/a
@prisma n/a
/root/.cache/prisma/master n/a
/usr/lib x86_64-linux-gnu 303.5 M
/usr/local/share/.cache/yarn 432 M
/usr/local/share/.config/yarn/global 194.4 M

#### Changed --production flag for second build step

Reduced by 670 M

### Remove `/usr/local/share/.cache/yarn`

UNTESTED

### Remove unused dependencies manually

eg. @storybook

### Use Alpine image

https://github.com/nodejs/docker-node#nodealpine

### Don't install web deps for api
