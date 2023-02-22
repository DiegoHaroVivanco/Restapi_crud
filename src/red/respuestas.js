exports.succes = (req, res, mensaje= '', status = 200) =>{
    // si el status no viene, por defecto va a ser 200
    res.status(status).send({
        error: false,
        status: status,
        body: mensaje
    })
} 

exports.error = (req, res, mensaje='Error interno', status = 500) =>{

    res.status(status).send({
        error: true,
        status: status,
        body: mensaje
    })
} 