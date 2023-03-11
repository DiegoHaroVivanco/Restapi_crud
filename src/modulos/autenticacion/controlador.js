const TABLA = 'auth' // tabla a la que quiero acceder
const auth = require('../../auth')
const bcrypt = require('bcrypt')

module.exports = (dbInjected)=>{

    let db = dbInjected
    if(!db){ // no existe la db o está corrupta
        db = require('../../DB/mysql')
    }

    async function login(usuario, password){
        const data = await db.query(TABLA, {usuario: usuario})
        if(data) {
            return bcrypt.compare(password, data.password)
            .then(resultado =>{
                if(resultado){
                    // genero el token
                    return auth.asignarToken({...data})
                }else{
                    throw new Error('Información invalida')
                }
            })
        }else{
            throw new Error('Información invalida')
        }

    }

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
    
    return{
        agregar,
        login
    }
        
}

