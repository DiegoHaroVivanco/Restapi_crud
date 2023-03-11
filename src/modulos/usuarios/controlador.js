const TABLA = 'usuarios' // tabla a la que quiero acceder
const auth = require('../autenticacion')

module.exports = (dbInjected)=>{

    let db = dbInjected
    if(!db){ // no existe la db o está corrupta
        db = require('../../DB/mysql')
    }

    function todos(){
        return db.todaData(TABLA)
    }
    
    function unaData(id){
        return db.unaData(TABLA, id)
    }
    
    async function agregar(body){
        const usuario = {
            id: body.id,
            nombre: body.nombre,
            activo: body.activo
        }
        // cuando se ejecute "agregar", devuelve por parametro, el id donde fue agregado el registro
        const respuesta = await db.agregar(TABLA, usuario)
        let insertId = 0
        if(body.id == 0){
            insertId = respuesta.insertId
        }else{ // ya existe el id en la tabla
            insertId = body.id
        }
        let respuesta2 = ''
        if(body.usuario || body.password){
             respuesta2 = await auth.agregar({
                id: insertId,
                usuario: body.usuario,
                password: body.password
            })
        }
        return respuesta2

    }
    
    function eliminar(body){
        return db.eliminar(TABLA, body)
    
    }
        
    return{
        todos,
        unaData,
        agregar,
        eliminar
    }
        
}

