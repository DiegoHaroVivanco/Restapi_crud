require('dotenv').config()
module.exports = {
    app:{
        // si no encuentra la variable de entorno
        // se le asigna el puerto 4000
        port: process.env.PORT || 4000
        
    },
    jwt:{
        secret: process.env.JET_SECRET || 'palabraSecret@'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DB || 'prueba'
    }
}