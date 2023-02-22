const express = require('express')

const respuesta = require('../../red/respuestas')


const router = express.Router()


router.get('/', (req, res)=>{
    respuesta.succes(req, res, 'todo joya', 200)

})

module.exports = router