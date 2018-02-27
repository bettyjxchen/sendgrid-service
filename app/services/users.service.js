'use strict'

const User = require('../models/user')
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    readAll: _readAll,
    readById: _readById,
    register: _register,
}

function _readAll() {
    return conn.db().collection('users').find().toArray()
        .then(users => {
            for (let i = 0; i < users.length; i++) {
                let user = users[i]
                user._id = user._id.toString() // convert ObjectId back to string
            }
            return users
        })
}

function _readById(id) {
    return conn.db().collection('users').findOne({ _id: new ObjectId(id) })
        .then(user => {
            user._id = user._id.toString() // convert ObjectId back to string
            return user
        })
}

function _register(model) {
    let doc = {
        fullName: `${model.firstName} ${model.lastName}`,
        username: model.username,
        password: model.password,
        email: model.email,
        dateCreated: new Date(),
    }
    return conn.db().collection('users').insert(doc)
        .then(result =>result.insertedIds[0].toString())
}

