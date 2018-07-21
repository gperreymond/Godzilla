/* eslint no-useless-constructor: 0 */

const Service = require('./Service')

class Command extends Service {
  constructor () {
    super()
    this.type = 'command'
  }
}

module.exports = Command
