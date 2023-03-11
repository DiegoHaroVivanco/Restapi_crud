const jwt = require('jsonwebtoken')
const config = require('../config')
const secret = config.jwt.secret
const err = require('../middlewares/errors')

const asignarToken = (data) =>  jwt.sign(data, secret)// enviamos el token


const verificarToken = (token) => jwt.verify(token, secret)

const chequearToken = {
    confirmarToken: (req, id) =>{
        const decodificado = decodificarCabecera(req)
        // podria preguntar si el id que me envian es = al id del usuario y con esto podria hacer que solo si tiene ese Id haga cosas
        if(decodificado.id != id)
            throw err("No se tienen los privilegios", 401)
    }
}

const obtenerToken = (autorizacion)=>{
    if(!autorizacion) // si no envían la autorizacion
        throw err('No se recibio el token', 401)

    if(autorizacion.indexOf('Bearer') === -1 ) // si en la cabecera no viene el contenido
        throw err('Formato invalido', 401)

    let token = autorizacion.replace('Bearer ', '')
    return token

}


const decodificarCabecera = (req)=>{
    const autorizacion = req.headers.authorization || '' // si no viene nada en la cabecera, asignamos vacío.
    const token = obtenerToken(autorizacion) // cuando ya obtengo el toke, lo puedo decodificar
    const decodificado = verificarToken(token)
    
    req.user = decodificado
    return decodificado
}



module.exports ={
    asignarToken,
    chequearToken
}