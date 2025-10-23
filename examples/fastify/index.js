require('bare-node-runtime/global')

const fastify = require('fastify', {
  with: { imports: 'bare-node-runtime/imports' }
})({
  logger: true
})

fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' })
})

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
})
