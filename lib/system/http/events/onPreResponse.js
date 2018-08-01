const handler = async (request, h) => {
  var response = request.response
  if (!response.isBoom) {
    return h.continue
  }
  if (response.data) {
    response.output.payload.validation = response.data
  }
  return response
}

module.exports = handler
