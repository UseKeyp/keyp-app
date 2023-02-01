# Welcome to Keyp App

> Keyp app, oauth2 server, and API. Built with RedwoodJS

## Usage 📖

We use Yarn as our package manager:

```bash
yarn install
```

Now start the app. This command injects necessary environment variables. See docs/environment for help.

```bash
./dev.sh
```

Your browser should open automatically to `http://localhost:3000` to see the web app. The Fastify server which serves the backend functions is on `http://localhost:3001`.

## Graphql Playground

Access the Graphql playground at http://localhost:3001/graphql

## Storybook

The Storybook server can be started with `yarn rw storybook`

## Postgres Setup

Eventually you'll need a local database. See docs for [Local Postgres Setup](https://redwoodjs.com/docs/local-postgres-setup). After you've set up postgres, update your `.env` file, using `.template.env` as an example, and then run `yarn rw prisma migrate dev`.

## Ngrok it to the web

```bash
# Example
ngrok http --host-header=rewrite 10.61.141.234:3000
```

## Create OAuth Client

To quickly create an test oauth client app you can run `yarn rw prisma studio` and create a new `OIDC` object with the following data:

```js
client_id: "a08dd22e-e05c-4314-ae7c-cda1af389a34",
type: 7,
payload: {"tos_uri":"https://juicebox.com/tos","logo_uri":"https://juicebox.com/logo.png","client_id":"a08dd22e-e05c-4314-ae7c-cda1af389a34","client_uri":"https://juicebox.com","policy_uri":"https://juicebox.com/policy","client_name":"Juicebox","redirect_uris":["http://0.0.0.0:8910/redirect/oauth2_server_redwood"]}
```

## Getting Started

- [Tutorial](https://redwoodjs.com/tutorial/welcome-to-redwood): getting started and complete overview guide.
- [Docs](https://redwoodjs.com/docs/introduction): using the Redwood Router, handling assets and files, list of command-line tools, and more.
- [Redwood Community](https://community.redwoodjs.com): get help, share tips and tricks, and collaborate on everything about RedwoodJS.


## Additional Documentation

- Torus [/docs/Torus.md](/docs/Torus.md)
- Devops + Going to Production [/docs/Devops.md](/docs/Devops.md)
- NFTs and IPFS [/docs/NFTs + IPFS.md](/docs/NFTs + IPFS.md)
