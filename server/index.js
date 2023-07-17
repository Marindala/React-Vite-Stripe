/* impor express = require ('express'); */
import express from 'express';
import stripe  from 'stripe';
import  cors from 'cors';

const app = express()

app.listen(3001, () =>{
    console.log("Server on port", 3001)
})

/* El error in server que estás viendo indica que estás utilizando la sintaxis require en un archivo que está siendo tratado como un módulo ES (ECMAScript) debido a la configuración en el archivo package.json. A partir de ECMAScript 6 (ES6), se introdujo una nueva forma de importar y exportar módulos usando las palabras clave import y export, en lugar de require y module.exports utilizados en CommonJS. */