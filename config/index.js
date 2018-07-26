const path = require('path')
const nconf = require('nconf')
nconf.argv().env().file({ file: 'nconf.json' })

let config = {
  env: process.env.NODE_ENV,
  version: require('../package.json').version,
  github: nconf.get('APP_GITHUB') || 'https://github.com/gperreymond/Godzilla/commit',
  commit: nconf.get('APP_LAST_COMMIT') || 'development',
  root: path.resolve(__dirname, '../..'),
  http: {
    host: nconf.get('APP_HOST') || '0.0.0.0',
    port: nconf.get('APP_PORT') || 21974
  },
  logger: {
    level: 'debug'
  },
  rabbitmq: {
    host: nconf.get('APP_RABBITMQ_HOST') || 'localhost',
    port: nconf.get('APP_RABBITMQ_PORT') || 5672,
    user: nconf.get('APP_RABBITMQ_USER') || 'infra',
    pass: nconf.get('APP_RABBITMQ_PASS') || 'infra',
    vhost: nconf.get('APP_RABBITMQ_VHOST') || '/'
  }
}

module.exports = config
