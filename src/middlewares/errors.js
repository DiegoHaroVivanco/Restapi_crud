const error = (message, code)=>{
    let e = new Error(message)
    if(code)// si existe el codigo
        e.statusCode = code
    return e

}

module.exports = error