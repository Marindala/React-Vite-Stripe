/* impor express = require ('express'); */
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import Stripe from "stripe";
import cors from "cors";

import { VITE_API_KEY } from "import.meta.env";
const app = express();

const stripe = new Stripe(VITE_API_KEY);

// Middleware para habilitar CORS
/*  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });  */

app.use(cors({ origin: "http://127.0.0.1:5173" })); //para que acepte la info del front

app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Gaming Keyboard",
      payment_method: id,
      confirm: true, //confirm the payment at the same time
    });

    console.log(payment);

    return res.status(200).json({ message: "Successful Payment" });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.raw.message }); //in objects error
  }
});
// Lógica para procesar el pago

// Si todo está bien, envía una respuesta JSON
/*    return res.json({ message: "Pago exitoso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Hubo un error en el servidor" });
  }
}); */

app.listen(3001, () => {
  console.log("Server on port", 3001);
});

/* El error in server que estás viendo indica que estás utilizando la sintaxis require en un archivo que está siendo tratado como un módulo ES (ECMAScript) debido a la configuración en el archivo package.json. A partir de ECMAScript 6 (ES6), se introdujo una nueva forma de importar y exportar módulos usando las palabras clave import y export, en lugar de require y module.exports utilizados en CommonJS. */
