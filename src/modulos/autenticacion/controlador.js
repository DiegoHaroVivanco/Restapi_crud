const TABLA = 'auth' // tabla a la que quiero acceder
const bcrypt = require('bcrypt')

module.exports = (dbInjected)=>{

    let db = dbInjected
    if(!db){ // no existe la db o está corrupta
        db = require('../../DB/mysql')
    }

    // function todos(){
    //     return db.todaData(TABLA)
    // }
    
    // function unaData(id){
    //     return db.unaData(TABLA, id)
    // }
    
    async function agregar(data){
        const authData = {
            id: data.id
        }
        if(data.usuario)
            authData.usuario = data.usuario

        if(data.password)
            // ciframos 5 veces, la contraseña
            authData.password = await bcrypt.hash(data.password.toString(), 5) // .toString(), para estar seguros que le pasamos una cadena

        return db.agregar(TABLA, authData)
    
    }
    
    // function eliminar(body){
    //     return db.eliminar(TABLA, body)
    
    // }
        
    return{
        agregar,

    }
        
}

