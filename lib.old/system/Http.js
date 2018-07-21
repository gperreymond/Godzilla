const path = require('path')
process.env.NODE_CONFIG_DIR = path.resolve(__dirname, '../../lib/config/')
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const feathers = require('@feathersjs/feathers')
const express = require('@feathersjs/express')
const configuration = require('@feathersjs/configuration')

class Http {
  constructor (context) {
    this.uuid = context.uuid
    this.options = context.options.http
    this.logger = context.logger
  }
  async getInstance (options) {
    // configure feathers
    const instance = express(feathers())
    instance.configure(configuration())
    // turn on JSON parser for REST services
    instance.use(express.json())
    // turn on URL-encoded parser for REST services
    instance.use(express.urlencoded({extended: true}))
    // enable the REST provider for services.
    instance.configure(express.rest())
    // all configured correctly
    this.logger.info('system http instance')
    return instance
  }
}

module.exports = Http
