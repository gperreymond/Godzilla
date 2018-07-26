const { expect } = require('chai')
const mockery = require('mockery')

const { Godzilla } = require('..')

class MockResolve {
  async getInstance () {
    return {
      mockery: true,
      async start () { return {} }
    }
  }
}

class MockReject {
  async getInstance () {
    return Promise.reject(new Error('This error is in test'))
  }
}

class MockStartReject {
  async getInstance () {
    return {
      mockery: true,
      async start () { return Promise.reject(new Error('This error is in test')) }
    }
  }
}

describe('[unit] Godzilla', () => {
  beforeEach(() => {
    mockery.disable()
    mockery.deregisterAll()
  })
  it('should failed to start, because Logger is in error', async () => {
    try {
      mockery.registerMock('..', { Logger: MockReject, Bus: MockResolve, Http: MockResolve })
      mockery.enable({ useCleanCache: true, warnOnReplace: false, warnOnUnregistered: false })
      const godzilla = new Godzilla()
      await godzilla.listen().catch(err => { throw err })
      expect(true).to.equal(false)
    } catch (e) {
      expect(e.message).to.equal('This error is in test')
    }
  })
  it('should failed to start, because Bus is in error', async () => {
    try {
      mockery.registerMock('..', { Logger: MockResolve, Bus: MockReject, Http: MockResolve })
      mockery.enable({ useCleanCache: true, warnOnReplace: false, warnOnUnregistered: false })
      const godzilla = new Godzilla()
      await godzilla.listen().catch(err => { throw err })
      expect(true).to.equal(false)
    } catch (e) {
      expect(e.message).to.equal('This error is in test')
    }
  })
  it('should failed to start, because Http is in error', async () => {
    try {
      mockery.registerMock('..', { Logger: MockResolve, Bus: MockResolve, Http: MockReject })
      mockery.enable({ useCleanCache: true, warnOnReplace: false, warnOnUnregistered: false })
      const godzilla = new Godzilla()
      await godzilla.listen().catch(err => { throw err })
      expect(true).to.equal(false)
    } catch (e) {
      expect(e.message).to.equal('This error is in test')
    }
  })
  it('should failed to start, because Http has failed to start', async () => {
    try {
      mockery.registerMock('..', { Logger: MockResolve, Bus: MockResolve, Http: MockStartReject })
      mockery.enable({ useCleanCache: true, warnOnReplace: false, warnOnUnregistered: false })
      const godzilla = new Godzilla()
      await godzilla.listen().catch(err => { throw err })
      expect(true).to.equal(false)
    } catch (e) {
      expect(e.message).to.equal('This error is in test')
    }
  })
  it('should start', async () => {
    try {
      mockery.registerMock('..', { Logger: MockResolve, Bus: MockResolve, Http: MockResolve })
      mockery.enable({ useCleanCache: true, warnOnReplace: false, warnOnUnregistered: false })
      const godzilla = new Godzilla()
      const res = await godzilla.listen().catch(err => { throw err })
      expect(res.ready).to.equal(true)
    } catch (e) {
      expect(e).to.equal(null)
    }
  })
})
