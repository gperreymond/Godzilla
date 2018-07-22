const { expect } = require('chai')
const mockery = require('mockery')
const uuid = require('uuid')
const config = require('../../../../lib/config')
const packages = require('../../../../package.json')

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
      const http = new Http(context)
      const instance = await http.getInstance()
      expect(instance.version).to.equal(packages.dependencies.hapi)
    } catch (e) {
      expect(e).to.equal(null)
    }
  })
})
