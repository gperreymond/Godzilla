const { Godzilla } = require('../lib')

const godzilla = new Godzilla()
godzilla.listen()
  .then(() => {
    console.log('Godzilla is ready')
  })
  .catch(err => {
    console.log(e)
    process.exit(1)
  })
