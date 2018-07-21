const { Godzilla } = require('../')

const godzilla = new Godzilla()
godzilla.on('error', err => {
  godzilla.logger.error(err.toString())
  process.exit(0)
})
godzilla.on('ready', () => {
  godzilla.logger.info('godzilla is ready')
})
godzilla.listen()
