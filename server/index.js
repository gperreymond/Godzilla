const { Godzilla } = require('../lib')

const godzilla = new Godzilla()
godzilla.listen()
  .then(() => {
    console.log('Godzilla is ready')
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
