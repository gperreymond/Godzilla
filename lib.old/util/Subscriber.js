var util = require('util')
var Rabbus = require('rabbus')
var rabbot = require('rabbot')

function Subscriber (name = 'pub-sub') {
  Rabbus.Subscriber.call(this, rabbot, {
    exchange: `${name}.exchange`,
    routingKey: `${name}.key`,
    queue: {
      name: `${name}.queue`,
      noBatch: true
    }
  })
}

util.inherits(Subscriber, Rabbus.Subscriber)

module.exports = Subscriber
