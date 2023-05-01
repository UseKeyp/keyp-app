const errorHandler = (error, request, reply) => {
  const statusCode = error.statusCode || 500;
  const errorName = error.error || 'Server Error';
  const message = error.message || 'An unexpected error occurred';

  reply.status(statusCode).send({
    statusCode,
    error: errorName,
    message,
  });
};

const configureFastify = async (fastify, options) => {
  if (options.side === 'api') {
    fastify.log.info({ custom: { options } }, 'Configuring api side')

    await fastify.register(import('@fastify/rate-limit'), {
      max: 100,
      timeWindow: '1 minute',
    })

    fastify.setErrorHandler(errorHandler);
  }

  if (options.side === 'web') {
    fastify.log.info({ custom: { options } }, 'Configuring web side')

    fastify.setErrorHandler(errorHandler);
  }

  return fastify
}

module.exports = { configureFastify }
