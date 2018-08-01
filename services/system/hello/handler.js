function sleep (delay) {
  var start = new Date().getTime()
  while (new Date().getTime() < start + delay);
}

module.exports = async (request) => {
  try {
    const action = Math.random()
    const exectime = Math.floor(Math.random() * (2000 - 100 + 1)) + 100
    if (action <= 0.1) { throw new Error('random failure') }
    sleep(exectime)
    return { world: exectime }
  } catch (e) {
    console.log(e)
    return Promise.reject(e)
  }
}
