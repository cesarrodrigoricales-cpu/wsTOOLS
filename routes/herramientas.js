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
router.put('/',async(req,res)=>{
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