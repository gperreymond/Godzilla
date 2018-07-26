const { expect } = require('chai')
const mockery = require('mockery')
const uuid = require('uuid')
const config = require('../../../config')

const context = {
  uuid: uuid.v4(),
  config,
  logger: { info () { } }
}

const { Bus } = require('../..')

describe('[unit] Bus', () => {
  beforeEach(() => {
    mockery.disable()
    mockery.deregisterAll()
  })
  it('should failed to initialize because no config found', async () => {
    try {
      const bus = new Bus({})
      await bus.getInstance()
      expect(true).to.equal(false)
    } catch (e) {
      expect(e.message).to.equal('Config is mandatory')
    }
  })
  it('should failed to initialize because bus configure failed', async () => {
    try {
      mockery.registerMock('rabbot', {
        mockery: true,
        async configure () { return Promise.reject(new Error('This error is in test')) }
      })
      mockery.enable({ useCleanCache: true, warnOnReplace: false, warnOnUnregistered: false })
      const bus = new Bus(context)
      await bus.getInstance()
      expect(true).to.equal(false)
    } catch (e) {
      expect(e.message).to.equal('This error is in test')
    }
  })
  it('should initialized', async () => {
    try {
      mockery.registerMock('rabbot', {
        mockery: true,
        async configure () { }
      })
      mockery.enable({ useCleanCache: true, warnOnReplace: false, warnOnUnregistered: false })
      const bus = new Bus(context)
      const instance = await bus.getInstance()
      expect(instance.mockery).to.equal(true)
    } catch (e) {
      expect(e).to.equal(null)
    }
  })
})
