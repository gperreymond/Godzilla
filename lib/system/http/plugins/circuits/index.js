const Hoek = require('hoek')

const plugin = {
  name: 'godzilla-circuits',
  version: '1.0.0',
  register: async function (server, options = {}) {
    try {
      Hoek.assert(server, 'Server is mandatory')
      server.app.circuits = {}
      // create circuits status route
      await server.route({
        method: 'GET',
        path: '/status',
        handler: async (request, h) => {
          const c = request.server.app.circuits[`${request.query.method}::${request.query.path}`]
          return c.status.stats
        }
      })
    } catch (error) {
      throw error
    }
  }
}

module.exports = plugin
