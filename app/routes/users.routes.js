
'use strict'

const router = require('express').Router()
const usersController = require('../controllers/users.controller')
//---------Filters-----//
const validateBody = require('../filters/validate.body')
const disallowId = require('../filters/crud.filters').disallowId
//---------Models-----//
const User = require('../models/user')

module.exports = router

//---------Users Routes-----//
router.get('/', usersController.readAll)
router.get('/:id([0-9a-fA-F]{24})', usersController.readById)
router.post('/register', validateBody(User), disallowId, usersController.register)
