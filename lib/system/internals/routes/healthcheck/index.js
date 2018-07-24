const config = require('../../../../config')

const handler = async (request) => {
  try {
    return {
      alive: true,
      commit: `${config.github}/${config.commit}`,
      memory: process.memoryUsage().rss / (1024 * 1024)
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
