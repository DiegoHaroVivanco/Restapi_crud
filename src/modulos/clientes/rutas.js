const express = require('express')
const { agregar } = require('../../DB/mysql')

const respuesta = require('../../red/respuestas')
const controlador = require('./controlador')

const router = express.Router()

router.get('/', todos) // separo las rutas de la funcionalidad
router.get('/:id', unElem)
router.put('/', eliminar)
router.post('/', agregarItem)

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

async function agregarItem (req, res, next){
    try {
        const items = await controlador.agregar(req.body)
        if(req.body.id === 0){ // = 0 es que es nuevo y se tiene que agregar
            mensaje = 'Item guardado exitosamente'
        }else{ 
            mensaje = 'Item actualizado con exito'
        }
        respuesta.succes(req, res, mensaje, 201)
        
    } catch (error) {
        // respuesta.error(req, res, error, 500)
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