var util = require('util')
var Rabbus = require('rabbus')
var rabbot = require('rabbot')

function Publisher (name = 'pub-sub') {
  Rabbus.Publisher.call(this, rabbot, {
    exchange: `${name}.exchange`,
    routingKey: `${name}.key`
  })
}

util.inherits(Publisher, Rabbus.Publisher)

module.exports = Publisher
