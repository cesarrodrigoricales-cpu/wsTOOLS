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