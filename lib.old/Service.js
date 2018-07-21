const uuid = require('uuid')
const BusEvent = require('./BusEvent')

class Service extends BusEvent {
  constructor () {
    super()
    this.uuid = uuid.v4()
    this.createdAt = Date.now()
  }
  setName (value) {
    this.name = `${value}-${this.type}`
    return super.setName()
  }
  setHandler (value) {
    this.handler = value.bind(this)
    return this
  }
  async initialize (params) {
    try {
      await super.initialize().catch(err => { throw err })
      if (this.name === false) { throw new Error('name is mandatory') }
      if (this.handler === false) { throw new Error('handler is mandatory') }
      if (this.receiver === false) { throw new Error('receiver is mandatory') }
      if (this.sender === false) { throw new Error('sender is mandatory') }
      if (this.publisher === false) { throw new Error('publisher is mandatory') }
      return { initialized: true }
    } catch (e) {
      return Promise.reject(e)
    }
  }
  async execute (params) {
    const starttime = Date.now()
    try {
      const result = await this.handler(params).catch(err => { throw err })
      const endtime = Date.now()
      const message = {
        name: this.name,
        event: this.EventSuccess,
        exectime: starttime - endtime,
        result
      }
      this.publisher.publish(message.event, message)
      return result
    } catch (e) {
      const endtime = Date.now()
      const message = {
        name: this.name,
        event: this.EventError,
        exectime: starttime - endtime,
        error: e.message
      }
      this.publisher.publish(message.event, message)
      return Promise.reject(e)
    }
  }
}

Service.prototype.name = false
Service.prototype.handler = false

module.exports = Service
