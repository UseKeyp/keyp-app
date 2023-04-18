#!/bin/bash -ve

# NOTE: Requires binaries. Install with:
# yarn global add @redwoodjs/api-server @redwoodjs/internal prisma
$(node tasks/environment/setupEnv)
npx prisma migrate deploy --schema ./api/db/schema.prisma
npx rw-server api
