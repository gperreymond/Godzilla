const Hoek = require('hoek')

class Logger {
  constructor (context) {
    this.config = context.config
  }
  async getInstance () {
    try {
      Hoek.assert(this.config, 'Config is mandatory')
      const { createLogger, format, transports } = require('winston')
      const ignoreTest = format((info, opts) => {
        if (this.config.env === 'test') { return false }
        return info
      })
      const instance = createLogger({
        level: this.config.logger.level,
        format: format.json(),
        transports: []
      })
      if (this.config.env === 'development' || this.config.env === 'test') {
        instance.add(new transports.Console({
          format: format.combine(
            ignoreTest(),
            format.colorize(),
            format.simple()
          )
        }))
      }
      instance.info('system logger instance')
      return instance
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

module.exports = Logger
