const config = require('../../../../config')

const handler = async (request) => {
  try {
    return {
      alive: true,
      commit: `${config.github}/${config.commit}`
    }
  } catch (e) {
    return Promise.reject(e)
  }
}

module.exports.handler = handler
module.exports.route = {
  method: 'GET',
  path: '/hc',
  handler
}
