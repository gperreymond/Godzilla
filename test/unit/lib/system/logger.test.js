const { expect } = require('chai')
const mockery = require('mockery')
const uuid = require('uuid')
const config = require('../../../../lib/config')

const context = {
  uuid: uuid.v4(),
  config
}

const Logger = require('../../../../lib/system/Logger')

describe('[unit] Logger', () => {
  beforeEach(() => {
    mockery.disable()
    mockery.deregisterAll()
  })
  it('should initialized', async () => {
    try {
      const logger = new Logger(context)
      const instance = await logger.getInstance()
      expect(instance.level).to.equal('debug')
    } catch (e) {
      expect(e).to.equal(null)
    }
  })
})
