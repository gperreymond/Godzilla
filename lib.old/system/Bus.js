const rabbot = require('rabbot')

class Bus {
  constructor (context) {
    this.uuid = context.uuid
    this.options = context.config.rabbitmq
    this.logger = context.logger
    this.options.replyQueue = `response.queue.${this.uuid}`
  }
  async getInstance (options) {
    await rabbot.configure({ connection: this.options }).catch(err => { return Promise.reject(err) })
    this.logger.info('system bus instance')
    return rabbot
  }
}

module.exports = Bus
