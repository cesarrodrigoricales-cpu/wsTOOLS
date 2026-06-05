//Este archivo contendra toda la logica para operar con los datos -> db
const express = require('express');
const router = express.Router();
const db = require('../config/db');

//utilizando express (framework JS) vamos a utilizar metodos de acceso
//locahost:3000/herramientas 
//req = requiere  =solicitud 
//res = response = respuesta (JSON)
router.get('/',async(req,res)=>{
    try{
      const query = 'SELECT * FROM herramientas';

      //Deserialización, el primer valor 
      //el metodo query devuelve una MATRIZ 
      //DB.QUERY = [ [REGISTROS....] , [INFO_QUERY...] ]
      const [rows] = await db.query(query);

      res.json({
        succes:true,
        data: rows
      });
    }catch(e){
      //¿Por que 500? -> error generado del lado servidor 
      res.status(500).json({
        succes:false, 
        message:`error en la comunicacion al servidor`,
        error: e.message
      })
    }
})

//buscador
//http://IP:3000/api/herramientas/1 
router.get('/:id',async(req,res)=>{
    try{
      const query = 'SELECT * FROM herramientas WHERE idherramienta = ?';

      //Deserialización, el primer valor 
      //el metodo query devuelve una MATRIZ 
      //DB.QUERY = [ [REGISTROS....] , [INFO_QUERY...] ]
      const [rows] = await db.query(query, [req.params.id,]);

      //es necesario validar si existen datos
      if(rows.length === 0){
        return res.status(404).json({
          succes: false,
          message: 'No encontrado'
        })
      }
      
      res.json({
        succes:true,
        data: rows[0]
      });
    }catch(e){
      //¿Por que 500? -> error generado del lado servidor 
      res.status(500).json({
        succes:false, 
        message:`error en la comunicacion al servidor`,
        error: e.message
      })
    }
})

//registrar
router.post('/',async(req,res)=>{
    try{
      //Consulta esperada
      const query = 'insert into herramientas (nombre,marca,descripcion,condicion,tipo) VALUES (?,?,?,?,?)'
      
      //Obtener los datos... deserializar objeto. Se debe respetar el orden+nombre de los ATRIBUTOS
      const {nombre,marca,descripcion,condicion,tipo} = req.body;


      //El WS tiene que tener capacidad de validar 
      if(!nombre || nombre == ""){
         return res.status(400).json({
          succes: false,
          message:'Se requiere el nombre'
         });
      }
      
       if(!marca|| marca == ""){
         return res.status(400).json({
          succes: false,
          message:'Se requiere la marca'
         });
      }

       if(!descripcion || descripcion == ""){
         return res.status(400).json({
          succes: false,
          message:'Se requiere la descripcion'
         });
      }
       if(!condicion || condicion == ""){
         return res.status(400).json({
          succes: false,
          message:'Se requiere la condicion'
         });
      }
       if(!tipo || tipo == ""){
         return res.status(400).json({
          succes: false,
          message:'Se requiere el Tipo'
         });
      }
      
      /*
      EXAMPLE DE TODAS LAS CONDICIONES DE UN IF  sin necesidad de varios 
     if(condiciones){
        const campos = []
        if(campoA = ""){campos.push("")}
        if(campoA = ""){campos.push("")}
        if(campoA = ""){campos.push("")}
        if(campoA = ""){campos.push("")}
        if(campoA = ""){campos.push("")}
        if(campoA = ""){campos.push("")}
     }*/

      //Datos requeridos para los comodines (example)
      /*const values = [
        nombres,
        marca,
        descripcion,
        condicion,
        tipo
      ]*/


      //Ejecutar la consulta (si o si tener esto o el algoritmo se queda pensando)
      const [result] = await db.query(query,[nombre,marca,descripcion,condicion,tipo])

      //informar la ejecucion de la operacion 
      res.status(201).json({
        succes: true,
        message: 'herramienta registrada correctamente',
        id: result.insertId
      })


    }catch(e){
      //¿Por que 500? -> error generado del lado servidor 
      res.status(500).json({
        succes:false, 
        message:`error en la comunicacion al servidor`,
        error: e.message
      })
    }
})

//actualizar
router.put('/:id',async(req,res)=>{
    try{
      //Consulta esperada
      const query = `
      UPDATE herramientas SET 
        nombre = ?,
        marca = ?,
        descripcion = ?,
        condicion = ?, 
        tipo = ? 
      WHERE idherramienta = ?`;

      //¿Existe el ID que solicitan actualizar? 
      const [resultHerramientas] = await db.query("SELECT * FROM herramientas WHERE idherramienta = ?",[req.params.id])
      
      if(resultHerramientas.length == 0){
       return res.status(404).json({
        success:false,
        message: 'no encontramos la herramienta con el ID indicado'
       });
      }

      //Obtener los datos... deserializar objeto. Se debe respetar el orden+nombre de los ATRIBUTOS
      const {nombre,marca,descripcion,condicion,tipo} = req.body;


      //El WS tiene que tener capacidad de validar 
      if(!nombre || nombre == ""){
         return res.status(400).json({
          succes: false,
          message:'Se requiere el nombre'
         });
      }
      
       if(!marca|| marca == ""){
         return res.status(400).json({
          succes: false,
          message:'Se requiere la marca'
         });
      }

       if(!descripcion || descripcion == ""){
         return res.status(400).json({
          succes: false,
          message:'Se requiere la descripcion'
         });
      }
       if(!condicion || condicion == ""){
         return res.status(400).json({
          succes: false,
          message:'Se requiere la condicion'
         });
      }
       if(!tipo || tipo == ""){
         return res.status(400).json({
          succes: false,
          message:'Se requiere el Tipo'
         });
      }
      
      //Actualizamos el registro => EXISTE + TRAE DATOS 
      const values = [
        nombre,
        marca,
        descripcion,
        condicion,
        tipo,
        req.params.id
      ];
      const [result] = await db.query(query,values);
      res.json({
        success: true,
        message: 'Actualizado correctamente'
      });

    }catch(e){
      //¿Por que 500? -> error generado del lado servidor 
      res.status(500).json({
        succes:false, 
        message:`error en la comunicacion al servidor`,
        error: e.message
      })
    }
})

//eliminar fisicamente
router.delete('/',async(req,res)=>{
    try{

    }catch(e){
      //¿Por que 500? -> error generado del lado servidor 
      res.status(500).json({
        succes:false, 
        message:`error en la comunicacion al servidor`,
        error: e.message
      })
    }
})

module.exports = router;