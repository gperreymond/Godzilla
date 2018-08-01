const uuid = require('uuid')

class Godzilla {
  constructor () {
    this.uuid = uuid.v4()
    this.starttime = Date.now()
    this.config = require('../../config')
  }
  async listen () {
    try {
      const { Logger, Bus, Http } = require('..')
      // initialize sytem logger
      this.logger = await new Logger(this).getInstance().catch(err => { throw err })
      // initialize sytem bus
      this.bus = await new Bus(this).getInstance().catch(err => { throw err })
      // initialize sytem http
      this.http = await new Http(this).getInstance().catch(err => { throw err })
      // add refs bus, logger to the http instance app
      this.http.app.bus = this.bus
      this.http.app.logger = this.logger
      // start the http instance
      await this.http.start().catch(err => { throw err })
      return {ready: true}
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

module.exports = Godzilla
