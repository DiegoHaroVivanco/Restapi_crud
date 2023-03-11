const express = require('express')
const { agregar } = require('../../DB/mysql')

const respuesta = require('../../red/respuestas')
const controlador = require('./index')

const router = express.Router()

// router.get('/', todos) // separo las rutas de la funcionalidad
router.get('/login', login)


async function login (req, res,next){
    try {
        const token = await controlador.login(req.body.usuario, req.body.password)
        respuesta.succes(req, res, token, 200)
        
    } catch (error) {
        next(error)        
    }

}


module.exports = router