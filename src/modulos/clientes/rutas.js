const express = require('express')

const respuesta = require('../../red/respuestas')
const controlador = require('./controlador')

const router = express.Router()


router.get('/', (req, res)=>{
    const todos = controlador.todos()
    .then((items)=>{
        respuesta.succes(req, res, items, 200)
    })

})

module.exports = router