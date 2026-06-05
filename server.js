//es Necesario desplegar/ejecutar la aplicacion
const express = require('express'); //framework
const cors = require('cors');//Intercambio de recursos entre dominios
require("dotenv").config(); //Sele PORT (valor requerido)

const app = express();
const PORT = process.env.PORT || 3000; 

//Canales de comunicacion - MIDDLEWARES
app.use(cors());
app.use(express.json());

//rutas 
app.use('/api/herramientas',require('./routes/herramientas'));


//Iniciar el servidor
app.listen(PORT,()=>{
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});


module.exports = app;