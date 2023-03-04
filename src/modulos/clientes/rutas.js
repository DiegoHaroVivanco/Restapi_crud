const express = require('express')

const respuesta = require('../../red/respuestas')
const controlador = require('./controlador')

const router = express.Router()

router.get('/', todos) // separo las rutas de la funcionalidad
router.get('/:id', unElem)

router.put('/', eliminar)

async function todos (req, res,next){
    try {
        const items = await controlador.todos()
        respuesta.succes(req, res, items, 200)
    } catch (error) {   
        next(error) // se unifica el error con la funcion next(), esto nos estaría redirigiendo a la prox ruta
                    // utilizando la funcion error que está en el archivo app.js, y este nos lleva a la carpeta red/ errores
                    // y ahí se organiza el error, para enviarlo a travez de las respuestas unificadas (archivo respuestas.js)

    }

}

async function unElem (req, res,next){
    try {
        const items = await controlador.unaData(req.params.id)
        respuesta.succes(req, res, items, 200)
        
    } catch (error) {
        next(error)        
    }

}

async function eliminar (req, res, next){
    try {
        const items = await controlador.eliminar(req.body)
        respuesta.succes(req, res, 'Se elimino el item', 200)
        
    } catch (error) {
        // respuesta.error(req, res, error, 500)
        next(error)        
    }

}

module.exports = router