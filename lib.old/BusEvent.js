const Receiver = require('./util/Receiver')
const Sender = require('./util/Sender')
const Publisher = require('./util/Publisher')

class BusEvent {
  setName () {
    this.EventSuccess = `${this.name}.success`
    this.EventError = `${this.name}.error`
    return this
  }
  async initialize () {
    try {
      this.receiver = new Receiver(this.name)
      this.sender = new Sender(this.name)
      this.publisher = new Publisher(this.name)
      return this
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

BusEvent.prototype.receiver = false
BusEvent.prototype.sender = false
BusEvent.prototype.publisher = false

module.exports = BusEvent
