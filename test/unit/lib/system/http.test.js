const { expect } = require('chai')
const mockery = require('mockery')
const uuid = require('uuid')
const config = require('../../../../lib/config')

const context = {
  uuid: uuid.v4(),
  config,
  logger: { info () { } }
}

const Http = require('../../../../lib/system/Http')

describe('[unit] Http', () => {
  beforeEach(() => {
    mockery.disable()
    mockery.deregisterAll()
  })
  it('should initialized', async () => {
    try {
      mockery.registerMock('hapi', {
        server () { return { mockery: true } }
      })
      mockery.enable({ useCleanCache: true, warnOnReplace: false, warnOnUnregistered: false })
      const http = new Http(context)
      const instance = await http.getInstance()
      expect(instance.mockery).to.equal(true)
    } catch (e) {
      expect(e).to.equal(null)
    }
  })
})
