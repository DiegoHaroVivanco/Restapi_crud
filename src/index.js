const app = require('./app.js')

app.listen(app.get('port'), ()=>{
    console.log("Servidor escuchando en el puerto", app.get("port"))
    console.log('\x1b[34m%s\x1b[0m', 'Acceder desde [Ctrl + Clic ] ==>','\x1b[32m\x1b[0m',` http://localhost:${app.get("port")} \r`);
})