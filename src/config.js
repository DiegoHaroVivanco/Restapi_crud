require('dotenv').config()
module.exports = {
    app:{
        // si no encuentra la variable de entorno
        // se le asigna el puerto 4000
        port: process.env.PORT || 4000
        
    }
}