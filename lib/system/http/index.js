const Hoek = require('hoek')
const path = require('path')
const glob = require('glob-promise')

const registerRoute = params => {
  const route = params.route
  route.config = Object.assign(route.config || {}, {
    cors: true,
    description: params.description || 'No description',
    log: {collect: true}
  })
  return route
}

class Http {
  constructor (context) {
    this.uuid = context.uuid
    this.config = context.config
    this.logger = context.logger
    this.routes = []
    this.routes.push(path.resolve(__dirname, 'routes/*/index.js'))
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
      // register routes
      this.routes.map(async route => {
        const files = await glob.sync(route)
        files.map(async filepath => {
          const item = require(filepath)
          await instance.route(registerRoute(item))
          this.logger.info(`http internal route: ${item.route.method} ${item.route.path}`)
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
