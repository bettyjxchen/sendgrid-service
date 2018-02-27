"use strict";
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    _id: Joi.objectId(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required()
}
module.exports = Joi.object().keys(schema).options({ stripUnknown: true })

