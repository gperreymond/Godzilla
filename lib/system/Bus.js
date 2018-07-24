class Bus {
  constructor (context) {
    this.uuid = context.uuid
    this.config = context.config
    this.logger = context.logger
    this.config.rabbitmq.replyQueue = `response.queue.${this.uuid}`
  }
  async getInstance () {
    const rabbot = require('rabbot')
    await rabbot.configure({ connection: this.config.rabbitmq }).catch(err => { return Promise.reject(err) })
    this.logger.info('system bus instance')
    return rabbot
  }
}

module.exports = Bus
