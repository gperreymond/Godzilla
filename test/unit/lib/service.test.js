const { expect } = require('chai')
const mockery = require('mockery')

const Service = require('../../../lib/Service')

const handlerSuccess = async (params) => {
  return params
}

const handlerFail = async (params) => {
  return Promise.reject(new Error('service failed in test.'))
}

describe('[unit] Service', () => {
  beforeEach(() => {
    mockery.disable()
    mockery.deregisterAll()
  })
  it('should return fallback results', async () => {
    try {
      const service = new Service('test')
      service.setHandler(handlerFail)
      service.setFallback({fallback: true})
      service.create()
      expect(service.name).to.equal('test')
      expect(service.fallback.fallback).to.equal(true)
      const result = await service.execute({label: 'test'}).catch(err => { throw err })
      expect(result.fallback).to.equal(true)
    } catch (e) {
      expect(e).to.equal(null)
    }
  })
  it('should return results', async () => {
    try {
      const service = new Service('test')
      service.setHandler(handlerSuccess)
      service.setFallback({fallback: true})
      service.create()
      expect(service.name).to.equal('test')
      expect(service.fallback.fallback).to.equal(true)
      const result = await service.execute({label: 'test'}).catch(err => { throw err })
      expect(result.label).to.equal('test')
    } catch (e) {
      expect(e).to.equal(null)
    }
  })
})
