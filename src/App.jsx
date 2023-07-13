//import { useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./App.css";

const stripePromise = loadStripe(
  "pk_test_51NTVWGLzLbrIDt2zcA1sj5gjWOi9qY7AicLOx0Ig311DdLvKJiXANQM4ngtla9dawvpKNaJjhj8efHMD9V8TEx1S00Rtxr4SJ5"
); //key public in front

const CheckoutForm = () => {
  //stripe cards test //number card for test

  //Hook return conection with stripe
  const stripe = useStripe();
  const elements = useElements(); //hook que accede a los elements de stripe//manipula lo que viene de stripe

  const handleSubmit = async (e) => {
    e.preventDefault();
    //desde el objeto stripe creo un nuevo metodo de pago
    const { error, paymentMethod } = await stripe.createPaymentMethod({ //puedes recibir un error o  paymentMethod
      type: "card", //tipo tarjeta
      card: elements.getElement(CardElement), //de todos los elements de stripe obtengo o llamo a CardElement
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button>Buy</button>
    </form>
  );
};

function App() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </>
  );
}

export default App;
