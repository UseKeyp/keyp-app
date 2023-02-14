const configureFastify = async (fastify, options) => {
  if (options.side === 'api') {
    fastify.log.info({ custom: { options } }, 'Configuring api side')

    await fastify.register(import('@fastify/rate-limit'), {
      max: 100,
      timeWindow: '1 minutes',
    })
  }

  if (options.side === 'web') {
    fastify.log.info({ custom: { options } }, 'Configuring web side')
  }

  return fastify
}

module.exports = { configureFastify }
