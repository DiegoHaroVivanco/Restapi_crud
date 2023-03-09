const db = require('../../DB/mysql')

const TABLA = 'clientes' // tabla a la que quiero acceder


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
    
    function agregar(body){
        return db.agregar(TABLA, body)
    
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

