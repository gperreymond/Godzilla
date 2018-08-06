module.exports.breaker = {
  name: 'ServiceSystemHello',
  timeout: 500, // if our function takes longer than 500ms, trigger a failure
  errorThresholdPercentage: 50, // when 50% of requests fail, trip the circuit
  resetTimeout: 3000, // after 3 seconds, try again.
  maxFailures: 3
}

module.exports.fallback = () => {
  return {fallback: true}
}

module.exports.route = {
  method: 'GET',
  path: '/hello',
  handler: require('./handler')
}
