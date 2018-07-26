const { expect } = require('chai')
const mockery = require('mockery')
const uuid = require('uuid')
const config = require('../../config')

const context = {
  uuid: uuid.v4(),
  config,
  logger: { info () { } }
}

const { Http } = require('../..')

describe('[unit] Http', () => {
  beforeEach(() => {
    mockery.disable()
    mockery.deregisterAll()
  })
  it('should failed to initialize because no config found', async () => {
    try {
      const http = new Http({})
      await http.getInstance()
      expect(true).to.equal(false)
    } catch (e) {
      expect(e.message).to.equal('Config is mandatory')
    }
  })
  it('should initialized and return healthcheck', async () => {
    try {
      const http = new Http(context)
      const instance = await http.getInstance()
      const res = await instance.inject('/hc').catch(err => { throw err })
      expect(res.result.alive).to.equal(true)
      expect(res.result.env).to.equal('test')
    } catch (e) {
      expect(e).to.equal(null)
    }
  })
})
