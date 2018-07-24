const { expect } = require('chai')
const mockery = require('mockery')
const uuid = require('uuid')
const config = require('../../../../lib/config')

const context = {
  uuid: uuid.v4(),
  config,
  logger: { info () { } }
}

const Bus = require('../../../../lib/system/Bus')

describe('[unit] Bus', () => {
  beforeEach(() => {
    mockery.disable()
    mockery.deregisterAll()
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
