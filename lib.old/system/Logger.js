const { createLogger, format, transports } = require('winston')

class Logger {
  constructor (context) {
    this.options = context.options
  }
  async getInstance () {
    try {
      const ignoreTest = format((info, opts) => {
        if (this.options.env === 'test') { return false }
        return info
      })
      const instance = createLogger({
        level: this.options.level,
        format: format.json(),
        transports: []
      })
      if (this.options.env === 'development' || this.options.env === 'test') {
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
