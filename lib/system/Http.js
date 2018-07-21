const Hapi = require('hapi')

class Http {
  constructor (context) {
    this.uuid = context.uuid
    this.config = context.config
    this.logger = context.logger
  }
  async getInstance () {
    const server = Hapi.server({
      host: this.config.http.host,
      port: this.config.http.port
    })
    this.logger.info('system http instance')
    return server
  }
}

module.exports = Http
