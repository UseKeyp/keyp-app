# Encrypted Jwks

Production and staging jwks generated 2/9/23

### Production deployment

When hosting the app in a production environment, the jwks.js file must be decrypted and placed in `api/src/lib/jwks`, before the app is built. For example, here is the build command for provider Render.com:

```bash
yarn && node tasks/environment/setupJwks && yarn rw build api
```

### Usage

The jwks will be decrypted automatically when running `./api.sh` or `./dev.sh`.

To manually decrypt run `node tasks/environment/setupJwks`

### Update jwks

1. Generate a new jwks file

```
npx oauth2-server-redwood
```

2. Place the output in `/api/src/lib/jwks`

3. Encrypt using `node tasks/environment/encrypt`
