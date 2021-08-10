# Redwood

> **WARNING:** RedwoodJS software has not reached a stable version 1.0 and should not be considered suitable for production use. In the "make it work; make it right; make it fast" paradigm, Redwood is in the later stages of the "make it work" phase.

## Getting Started

- [Tutorial](https://redwoodjs.com/tutorial/welcome-to-redwood): getting started and complete overview guide.
- [Docs](https://redwoodjs.com/docs/introduction): using the Redwood Router, handling assets and files, list of command-line tools, and more.
- [Redwood Community](https://community.redwoodjs.com): get help, share tips and tricks, and collaborate on everything about RedwoodJS.

### Setup

##### Dependencies
1. `nvm`
2. Node version 14, because that's what redwood uses. Try `nvm install 14`, then `nvm use 14`.
3. 

We use Yarn as our package manager. To get the dependencies installed, just do this in the root directory:

```terminal
yarn install
```

### Fire it up

```terminal
yarn redwood dev
```

Your browser should open automatically to `http://localhost:8910` to see the web app. Lambda functions run on `http://localhost:8911` and are also proxied to `http://localhost:8910/.redwood/functions/*`.

### Local Postgres Setup

See docs for [Local Postgres Setup](https://redwoodjs.com/docs/local-postgres-setup)

After you've set up postgres, run `yarn rw prisma migrate dev`

### Docker

Images are built via Github Action. To build the images locally:

```bash
# web
docker build . -t pi0neerpat/treasure-chess-redwood-web-main -f web/Dockerfile \
--build-arg NODE_ENV=development \
--build-arg RUNTIME_ENV=local


# api
docker build . -t pi0neerpat/treasure-chess-redwood-web-main -f api/Dockerfile \
--build-arg NODE_ENV=development \
--build-arg RUNTIME_ENV=local \
--build-arg DATABASE_URL=<MY_DATABASE_URL>
```

Run an image locally:

```bash
# Authenticate
docker login https://ghcr.io -u USERNAME -p GITHUB_PAT

# Pull the images (web and api)
docker pull ghcr.io/pi0neerpat/treasure-chess-redwood-web-main:latest
docker pull ghcr.io/pi0neerpat/treasure-chess-redwood-api-main:latest

# Run
docker-compose up

# Alternatively, run a single image
docker run -it --rm \
       -p 8910:8910 \
       ghcr.io/pi0neerpat/treasure-chess-redwood-api-main:latest
```
