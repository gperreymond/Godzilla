var util = require('util')
var Rabbus = require('rabbus')
var rabbot = require('rabbot')

function Sender (name = 'send-rec') {
  Rabbus.Sender.call(this, rabbot, {
    exchange: `${name}.exchange`,
    routingKey: `${name}.key`
  })
}

util.inherits(Sender, Rabbus.Sender)

module.exports = Sender
