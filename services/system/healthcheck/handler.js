const config = require('../../../config')

module.exports = async (request) => {
  try {
    return {
      alive: true,
      env: config.env,
      version: config.version,
      commit: `${config.github}/${config.commit}`,
      memory: process.memoryUsage().rss / (1024 * 1024)
    }
  } catch (e) {
    return Promise.reject(e)
  }
}
