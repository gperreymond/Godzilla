const { expect } = require('chai')
const mockery = require('mockery')

const Service = require('../../../lib/Service')

const handlerSuccess = async (params) => {
  return params
}

describe('[unit] Service', () => {
  beforeEach(() => {
    mockery.disable()
    mockery.deregisterAll()
  })
  it('should successfully execute', async () => {
    try {
      const service = new Service('test')
      service.setHandler(handlerSuccess)
      service.setFallback({test: true})
      service.create()
      const result = await service.execute({label: 'test'}).catch(err => { throw err })
      expect(service.name).to.equal('test')
      expect(service.fallback.test).to.equal(true)
      expect(result.label).to.equal('test')
    } catch (e) {
      expect(e).to.equal(null)
    }
  })
})
