'use strict'

const responses = require('../models/responses');
const usersService = require('../services/users.service')
const emailsService = require('../services/emails.service')
const apiPrefix = '/api/users'
const crypto = require('crypto')

module.exports = {
    readAll: _readAll,
    readById: _readById,
    register: _register,
}

function _readAll(req, res) {
    usersService.readAll()
        .then(users => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = users
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _readById(req, res) {
    usersService.readById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).send(new responses.ErrorResponse("Item not found."))
            }
            const responseModel = new responses.ItemResponse()
            responseModel.item = user
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _register(req, res) {
    usersService.register(req.model)
        .then(id => {
            //elements of email from user registration
            let toEmail= req.model.email
            let fullName = `${req.model.firstName} ${req.model.lastName}`
            let keyInEmail = crypto.randomBytes(32).toString('hex')
            //call email sendgrid service
            emailsService.sendRegistrationEmailConfirmation(toEmail, fullName, id, keyInEmail)

            let responseModel = new responses.ItemResponse()
            responseModel.item = id
            res.status(201)
                .location(`${apiPrefix}/${responseModel.item}`)
                .json(responseModel)
        })
        .catch(err => {
            console.log(err)
            if (err.code == 11000) {
                _catchIdError(res)
            } else {
                res.status(500).send(new responses.ErrorResponse(err))
            }
        })
}

function _catchIdError(res) {
    res.status(400).json(
        {
            name: "ValidationError",
            details: [{
                message: "Each user must have a unique user name and email."
            }]
        }
    )
}



