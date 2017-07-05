const joi = require('joi')

const validators = {
  formatLabel: joi.string().only('log', 'response', 'request-error', 'onPostStart', 'onPostStop'),
  tokenLabel: joi.string(),
  format: joi.alternatives().try(joi.string(), joi.any().valid(false)),
  token: joi.func().maxArity(3),
  options: joi.object({
    colored: joi.boolean().default(false),
    indent: joi.alternatives().try(joi.number(), joi.string()).allow('').default(2),
    stream: joi.object().allow(null),
    plugin: joi.object({
      stream: joi.object().allow(null),
      prettyPrint: joi.boolean(),
      tags: joi.object(),
      allTags: joi.string(),
      instance: joi.object(),
      logEvents: joi.alternatives().try(joi.array().items(joi.string()), joi.any().allow(false, null)),
      mergeHapiLogData: joi.boolean(),
      serializers: joi.object(),
      logPayload: joi.boolean().default(true)
    }).default({
      logPayload: true
    }),
    pino: joi.object({
      safe: joi.boolean(),
      name: joi.string(),
      serializers: joi.object(),
      timestamp: joi.alternatives().try(joi.func(), joi.boolean()),
      slowtime: joi.boolean(),
      extreme: joi.boolean(),
      level: joi.string(),
      levelVal: joi.number(),
      prettyPrint: joi.any(),
      messageKey: joi.string().default('msg'),
      onTerminated: joi.func(),
      enabled: joi.boolean(),
      browser: joi.any()
    }).default({
      messageKey: 'msg'
    })
  }).default({})
}

function validate (type, value) {
  switch (type) {
    case 'options':
      return joi.attempt(value, validators[type])
    case 'format':
    case 'formatLabel':
    case 'token':
    case 'tokenLabel':
      return joi.assert(value, validators[type])
    default:
      return value
  }
}

module.exports = validate