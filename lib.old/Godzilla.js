const util = require('util')
const EventEmitter = require('events').EventEmitter
const uuid = require('uuid')
const express = require('@feathersjs/express')

const config = require('./config')

const internals = {}
internals.start = async (context) => {
  try {
    // configure a middleware for 404s and the error handler
    context.http.use(express.notFound())
    context.http.use(express.errorHandler({ logger: context.logger.error }))
    // start http gateway
    const gateway = context.http.listen(context.options.http.port, context.options.http.host)
    gateway.on('listening', () => {
      context.logger.info('godzilla is listening')
      context.emit('ready')
      return {ready: true}
    })
  } catch (e) {
    return Promise.reject(e)
  }
}

class Godzilla {
  constructor (options) {
    this.uuid = uuid.v4()
    this.createdAt = Date.now()
    this.options = config
    EventEmitter.call(this)
  }
  setOptions (value = {}) {
    this.options = Object.assign(this.options, value)
    return this
  }
  async listen () {
    try {
      const Logger = require('./system/Logger')
      const Http = require('./system/Http')
      this.logger = await new Logger(this).getInstance().catch(err => { throw err })
      this.http = await new Http(this).getInstance().catch(err => { throw err })
      await internals.start(this).catch(err => { throw err })
    } catch (e) {
      this.emit('error', e)
    }
  }
}

Godzilla.prototype.options = false
Godzilla.prototype.logger = false
Godzilla.prototype.http = false
Godzilla.prototype.bus = false

util.inherits(Godzilla, EventEmitter)

module.exports = Godzilla
