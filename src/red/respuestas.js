exports.succes = (req, res, mensaje, status) =>{
    // si el status no viene, por defecto va a ser 200
    const statusCode = status || 200
    const msjOk = mensaje || ''
    
    res.status(status).send({
        error: false,
        status: statusCode,
        body: msjOk
    })
} 

exports.error = (req, res, mensaje, status) =>{
    const statusCode = status || 500
    const msjError = mensaje || 'Error interno'
    res.status(status).send({
        error: true,
        status: statusCode,
        body: msjError
    })
} 