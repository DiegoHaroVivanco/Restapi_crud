const express = require('express')
const config = require('./config')
const morgan = require('morgan')
const clientes = require('./modulos/clientes/rutas')
const error = require('./red/errors')

const app = express()

// Middleware
app.use(morgan('dev')) // lo utilizo en el entorno de desarrollo
app.use(express.json()) // para que reconozca los obj json
app.use(express.urlencoded({extended:true}))

// config
app.set('port', config.app.port)

// rutas
app.use('/api/clientes', clientes)

app.use(error)

module.exports = app
