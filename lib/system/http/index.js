const Hoek = require('hoek')
const Boom = require('boom')
const path = require('path')
const glob = require('glob-promise')
const CircuitBreaker = require('opossum')

const registerRoute = async (instance, params) => {
  // declare route
  const route = params.route
  route.config = Object.assign(route.config || {}, {
    cors: true,
    description: params.description || 'No description',
    log: {collect: true}
  })
  // use response contract
  const response = params.response
  if (response) {
    route.config.response = {
      schema: response,
      failAction: async function (request, h, err) {
        return Boom.badData(`Response schema validation failed, ${err.message}`)
      }
    }
  }
  // use circuit breaker
  if (params.breaker) {
    const circuit = new CircuitBreaker(route.handler, params.breaker)
    circuit.on('open', () => {
      console.log(`circuit ${circuit.name} is now open`)
    })
    circuit.on('close', () => {
      console.log(`circuit ${circuit.name} is now close`)
    })
    if (params.fallback) { circuit.fallback(params.fallback) }
    instance.app.circuits[`${route.method.toLowerCase()}::${route.path}`] = circuit
    // override http handler
    route.handler = async (request, h) => {
      const c = request.server.app.circuits[`${request.method}::${request.path}`]
      return c.fire(request)
    }
  }
  return route
}

class Http {
  constructor (context) {
    this.uuid = context.uuid
    this.config = context.config
    this.logger = context.logger
    this.routes = []
    this.routes.push(path.resolve(__dirname, '../../../services/**/index.js'))
  }
  async getInstance () {
    try {
      Hoek.assert(this.config, 'Config is mandatory')
      const Hapi = require('hapi')
      const instance = Hapi.server({
        host: this.config.http.host,
        port: this.config.http.port
      })
      this.logger.info('system http instance')
      // register validation on response
      instance.ext('onPreResponse', require('./events/onPreResponse'))
      // register plugins
      let p = []
      const plugins = await glob.sync(path.resolve(__dirname, './plugins/**/index.js'))
      plugins.map(filepath => {
        const plugin = require(filepath)
        p.push(instance.register(plugin))
        this.logger.info(`http internal plugin: ${plugin.name} ${plugin.version}`)
      })
      await Promise.all(p)
      // register routes
      p = []
      this.routes.map(async route => {
        const files = await glob.sync(route)
        files.map(async filepath => {
          const params = require(filepath)
          const route = await registerRoute(instance, params).catch(err => { throw err })
          await instance.route(route)
          this.logger.info(`http internal route: ${params.route.method} ${params.route.path}`)
        })
      })
      // start http server
      await instance.initialize().catch(err => { throw err })
      return instance
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

module.exports = Http
