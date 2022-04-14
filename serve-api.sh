#!/bin/bash -ve

# NOTE: require binaries to be install.
# yarn global add @redwoodjs/api-server @redwoodjs/internal prisma

$(node tasks/environment/setupEnv)
prisma migrate deploy --schema ./api/db/schema.prisma
rw-server api
