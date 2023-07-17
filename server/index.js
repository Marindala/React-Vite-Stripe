/* impor express = require ('express'); */
import express from 'express';
import stripe  from 'stripe';
import  cors from 'cors';

const app = express()

// Middleware para habilitar CORS
/* app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  }); */

app.use(cors({ origin: "http://127.0.0.1:5173" }));//para que acepte la info del front
app.use(express.json());

app.listen(3001, () =>{
    console.log("Server on port", 3001)
})

/* El error in server que estás viendo indica que estás utilizando la sintaxis require en un archivo que está siendo tratado como un módulo ES (ECMAScript) debido a la configuración en el archivo package.json. A partir de ECMAScript 6 (ES6), se introdujo una nueva forma de importar y exportar módulos usando las palabras clave import y export, en lugar de require y module.exports utilizados en CommonJS. */