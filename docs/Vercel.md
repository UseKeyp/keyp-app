# Vercel

Vercel only builds sandbox using the `Ignored Build Step` setting with `bash -c 'if [[$VERCEL_GIT_COMMIT_REF == "sandbox"]]; then exit 1; fi'``

# Other Resources

## Serverless considerations

The built api must be <50MB for Vercel. Use these commands to check the current size of `/zipped/graphql.zip`

```bash
yarn rw build api && \
yarn zip-it-and-ship-it api/dist/functions/ zipped
```
