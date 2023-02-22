const db = require('../../DB/mysql')

const TABLA = 'clientes' // tabla a la que quiero acceder

function todos(){
    return db.todaData(TABLA)
}


module.exports = {
    todos
}

