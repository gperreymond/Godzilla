function timedFunction (ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      resolve({world: ms})
    }, ms)
    if (typeof timer.unref === 'function') {
      timer.unref()
    }
  })
}

module.exports = async (request, h) => {
  try {
    const failure = Math.random()
    const exectime = Math.floor(Math.random() * (520 - 100 + 1)) + 100
    if (failure <= 0.05) { throw new Error('random failure') }
    return timedFunction(exectime)
  } catch (e) {
    return Promise.reject(e)
  }
}
