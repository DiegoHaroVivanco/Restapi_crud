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
            return error ? reject(error) : resolve(result) 

        })
    })
}

const unaData = (tabla, id) =>{
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (error, result)=>{
            return error ? reject(error) : resolve(result) 
        })
    })
}

const insertar = (tabla, data) =>{

    return new Promise((resolve, reject) =>{
        conexion.query(`INSERT INTO ${tabla} SET ?`,data, (error, result)=>{
            return error ? reject(error) : resolve(result) 
        })
    })
}

const actualizar = (tabla, data) =>{

    return new Promise((resolve, reject) =>{
        conexion.query(`UPDATE ${tabla} SET ? WHERE id = ?`,[data, data.id], (error, result)=>{
            return error ? reject(error) : resolve(result) 
        })
    })
}

const agregar = (tabla, data) =>{
    // si la data existe y es un nuevo registro
    if(data && data.id == 0){
        return insertar(tabla, data)
    }else{ // se tiene que actualizar el registro que estaba guardado
        return actualizar(tabla, data)
    }
}

const eliminar = (tabla, data) =>{

    return new Promise((resolve, reject) =>{
        conexion.query(`DELETE FROM ${tabla} WHERE id = ?`,data.id, (error, result)=>{
            return error ? reject(error) : resolve(result) 
        })
    })
}


module.exports = {
    todaData,
    unaData,
    agregar,
    eliminar
}