const mysql = require('mysql')
const config = require('../config')
const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let conexion;

const conexMysql= ()=>{
    conexion = mysql.createConnection(dbconfig)
    conexion.connect((err) =>{
        if(err){
            console.log('[error db]', err)
            setTimeout(conexMysql, 200) // deespues de un tiempo, vuelva a internar la conexion
        }else
            console.log('DB conectada');
            
    })
    conexion.on('error', error =>{
        console.log('error db', error)
        if(error.code === 'PROTROCOL_CONNECTION_LOST'){ // Si se perdió la conexión, que intente conectarse de nuevo
            conexMysql();
        }else
            throw error; // lanzo el error
    })

}

conexMysql();

const prueba = {
    id: 1,
    nombre: 'lio',
    edad: 36
}

const todaData = (tabla) =>{
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla}`, (error, result)=>{
            if(error){
                return reject(error)
            }else
                resolve(result)
        })
    })
}

const unaData = (tabla, id) =>{

}

const agregar = (tabla, data) =>{

}

const eliminar = (tabla, id) =>{

}

module.exports = {
    todaData,
    unaData,
    agregar,
    eliminar
}