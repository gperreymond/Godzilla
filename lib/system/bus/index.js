const Hoek = require('hoek')

class Bus {
  constructor (context) {
    this.uuid = context.uuid
    this.config = context.config
    this.logger = context.logger
  }
  async getInstance () {
    try {
      Hoek.assert(this.config, 'Config is mandatory')
      this.config.rabbitmq.replyQueue = `response.queue.${this.uuid}`
      const rabbot = require('rabbot')
      await rabbot.configure({ connection: this.config.rabbitmq }).catch(err => { throw err })
      this.logger.info('system bus instance')
      return rabbot
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

module.exports = Bus
