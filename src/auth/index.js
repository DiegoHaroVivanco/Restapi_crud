const jwt = require('jsonwebtoken')
const  config = require('../config')
const secret = config.jwt.secret


const asignarToken = (data) =>{
    return jwt.sign(data, secret) // enviamos el token
}

module.exports ={
    asignarToken
}