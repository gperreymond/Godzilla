const util = require('util')
const EventEmitter = require('events').EventEmitter
const uuid = require('uuid')

class Godzilla {
  constructor () {
    this.uuid = uuid.v4()
    this.starttime = Date.now()
    EventEmitter.call(this)
  }
}

util.inherits(Godzilla, EventEmitter)

module.exports = Godzilla
