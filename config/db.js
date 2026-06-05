const mysql = require('mysql2/promise'); //Acceso motor DB
require('dotenv').config(); //Acceso al archivo .env

//Pool de conexiones => número definido de conexiones disponibles
const pool = mysql.createPool({
    host: process.env.DB_HOST, //Host de la base de datos
    user: process.env.DB_USER, //Usuario de la base de datos
    password: process.env.DB_PASSWORD, //Contraseña de la base de datos
    database: process.env.DB_NAME, //Nombre de la base de datos
    port: process.env.DB_PORT, //Puerto de la base de datos
    waitForConnections: true, //Esperar a que haya conexiones disponibles
    connectionLimit: 10, //Número máximo de conexiones
    queueLimit: 0, //Número máximo de conexiones en espera (0 = sin límite)
    timezone: "-05:00"
});

//inicilizar la conexión atravez de una funcion anónima 
(async() =>{
  try{
    //Await ... getConnection() puede tomar un tiempo idetermindado en ejecutarse
    const conexion = await pool.getConnection(); 
    console.log(`conexion al server y mysql correcto`);
    conexion.release();
  }catch(error){
    console.error(`Error en la conexion con Mysql: ${error.message}`)
  }
})();


module.exports = pool; 