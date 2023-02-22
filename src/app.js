const express = require('express')
const config = require('./config')

const clientes = require('./modulos/clientes/rutas')

const app = express()

// config
app.set('port', config.app.port)

// rutas
app.use('/api/clientes', clientes)

module.exports = app
