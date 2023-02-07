import { ForbiddenError } from '@redwoodjs/graphql-server'

import { getBusinessMetrics } from 'src/lib/metrics'

export const metrics = async ({ password }) => {
  if (password !== process.env.DATA_ACCESS_PASSWORD)
    throw new ForbiddenError("You don't have access to do that.")
  const metrics = await getBusinessMetrics()
  return metrics
}
