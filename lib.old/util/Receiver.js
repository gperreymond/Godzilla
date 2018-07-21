var util = require('util')
var Rabbus = require('rabbus')
var rabbot = require('rabbot')

function Receiver (name = 'send-rec') {
  Rabbus.Receiver.call(this, rabbot, {
    exchange: `${name}.exchange`,
    routingKey: `${name}.key`,
    queue: {
      name: `${name}.queue`
    }
  })
}

util.inherits(Receiver, Rabbus.Receiver)

module.exports = Receiver
