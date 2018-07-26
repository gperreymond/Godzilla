const { expect } = require('chai')
const mockery = require('mockery')
const uuid = require('uuid')
const config = require('../../../config')

let context = {
  uuid: uuid.v4(),
  config
}

const { Logger } = require('../..')

describe('[unit] Logger', () => {
  beforeEach(() => {
    mockery.disable()
    mockery.deregisterAll()
  })
  it('should failed to initialize because no config found', async () => {
    try {
      const logger = new Logger({})
      await logger.getInstance()
      expect(true).to.equal(false)
    } catch (e) {
      expect(e.message).to.equal('Config is mandatory')
    }
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
  it('should initialized in "other" env', async () => {
    try {
      context.config.env = 'other'
      const logger = new Logger(context)
      const instance = await logger.getInstance()
      expect(instance.level).to.equal('debug')
    } catch (e) {
      expect(e).to.equal(null)
    }
  })
  it('should initialized in "development" env', async () => {
    try {
      context.config.env = 'development'
      const logger = new Logger(context)
      const instance = await logger.getInstance()
      expect(instance.level).to.equal('debug')
    } catch (e) {
      expect(e).to.equal(null)
    }
  })
})
