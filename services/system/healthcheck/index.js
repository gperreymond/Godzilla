module.exports.route = {
  method: 'GET',
  path: '/hc',
  handler: require('./handler')
}

module.exports.response = require('./response')
