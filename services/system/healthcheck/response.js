const Joi = require('joi')

module.exports = Joi.object().keys({
  alive: Joi.boolean().required(),
  env: Joi.string().required(),
  version: Joi.string().required(),
  commit: Joi.string().required(),
  memory: Joi.number().required().min(0)
})
