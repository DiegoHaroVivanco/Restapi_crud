const express = require('express')
const config = require('./config')
const morgan = require('morgan')
const clientes = require('./modulos/clientes/rutas')
const error = require('./red/errors')
const usuarios = require('./modulos/usuarios/rutas')
const auth = require('./modulos/autenticacion/rutas')


const app = express()

// Middleware
app.use(morgan('dev')) // lo utilizo en el entorno de desarrollo
app.use(express.json()) // para que reconozca los obj json
app.use(express.urlencoded({extended:true}))

// config
app.set('port', config.app.port)

// rutas
app.use('/api/clientes', clientes)
app.use('/api/usuarios', usuarios)
app.use('/api/auth', auth)
app.use(error)

module.exports = app
