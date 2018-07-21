const util = require('util')
const EventEmitter = require('events').EventEmitter
const uuid = require('uuid')
const glob = require('glob-promise')

const Logger = require('./system/Logger')
const Bus = require('./system/Bus')
const Http = require('./system/Http')

const registerRoute = params => {
  const route = params.route
  if (!route.config) route.config = {}
  route.config.description = params.description || 'No description'
  route.config.cors = true
  route.config.log = {collect: true}
  return route
}

const start = async (context) => {
  try {
    // register internals routes
    const files = await glob.sync(`${context.config.root}/lib/system/internals/routes/*/index.js`)
    files.map(async filepath => {
      const item = require(filepath)
      await context.http.route(registerRoute(item))
      context.logger.info(`http internal route: ${item.route.method} ${item.route.path}`)
    })
    // start http server
    await context.http.initialize().catch(err => { throw err })
    await context.http.start().catch(err => { throw err })
  } catch (e) {
    return Promise.reject(e)
  }
}

class Godzilla {
  constructor () {
    this.uuid = uuid.v4()
    this.starttime = Date.now()
    this.config = require('./config')
    EventEmitter.call(this)
  }
  async listen () {
    try {
      this.logger = await new Logger(this).getInstance().catch(err => { throw err })
      this.bus = await new Bus(this).getInstance().catch(err => { throw err })
      this.http = await new Http(this).getInstance().catch(err => { throw err })
      await start(this).catch(err => { throw err })
      this.emit('ready')
    } catch (e) {
      this.emit('error', e)
    }
  }
}

util.inherits(Godzilla, EventEmitter)

module.exports = Godzilla
