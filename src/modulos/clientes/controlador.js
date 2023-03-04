const db = require('../../DB/mysql')

const TABLA = 'clientes' // tabla a la que quiero acceder

function todos(){
    return db.todaData(TABLA)
}

function unaData(id){
    return db.unaData(TABLA, id)
}

function eliminar(body){
    return db.eliminar(TABLA, body)

}

module.exports = {
    todos,
    unaData,
    eliminar
}

