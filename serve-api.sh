#!/bin/bash -ve

# NOTE: Requires binaries. Install with:
# yarn global add @redwoodjs/api-server @redwoodjs/internal prisma
pwd
ls -la api/dist/lib/jwks
$(node tasks/environment/setupEnv)
prisma migrate deploy --schema ./api/db/schema.prisma
rw-server api
