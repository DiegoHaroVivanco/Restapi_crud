const express = require('express')

const respuesta = require('../../red/respuestas')
const controlador = require('./controlador')

const router = express.Router()


router.get('/', (req, res)=>{
    const todos = controlador.todos()
    respuesta.succes(req, res, todos, 200)

})

module.exports = router