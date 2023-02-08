#!/bin/bash -ve

# NOTE: Requires binaries. Install with:
# yarn global add @redwoodjs/api-server @redwoodjs/internal prisma
ls -la api/dist
ls -la api/dist/functions
ls -la api/dist/functions/oauth
ls -la api/dist/functions/oauth/jwks
ls -la /opt/render/project/src/api/dist/functions/oauth/jwks/

pwd
$(node tasks/environment/setupEnv)
prisma migrate deploy --schema ./api/db/schema.prisma
rw-server api
