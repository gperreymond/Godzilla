module.exports.breaker = {
  name: 'ServiceSystemHello',
  timeout: 300, // if our function takes longer than 300ms, trigger a failure
  errorThresholdPercentage: 20, // when 20% of requests fail, trip the circuit
  resetTimeout: 5000 // after 5 seconds, try again.
}

module.exports.fallback = () => {
  return {fallback: true}
}

module.exports.route = {
  method: 'GET',
  path: '/hello',
  handler: require('./handler')
}
