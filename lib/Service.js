const uuid = require('uuid')
const CircuitBreakerFactory = require('@bennadel/circuit-breaker').CircuitBreakerFactory

class Service {
  constructor (name) {
    this.uuid = uuid.v4()
    this.name = name
    this.fallback = {}
    this.handler = false
  }
  setHandler (value) {
    this.handler = value
  }
  setFallback (value) {
    this.fallback = value
  }
  create () {
    this.circuitBreaker = CircuitBreakerFactory.create({
      id: this.uuid,
      requestTimeout: 500,
      volumeThreshold: 10,
      // percent (as in 1 failure in 10 responses trips the circuit)
      failureThreshold: 10,
      activeThreshold: 50,
      monitor: function (eventType, eventData) {
        // console.log(eventType, eventData)
      },
      fallback: this.fallback
    })
  }
  execute (params) {
    return this.circuitBreaker.executeMethod(this, 'resolve', [params])
  }
  resolve (params) {
    return this.handler(params)
  }
}

module.exports = Service
