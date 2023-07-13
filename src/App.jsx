//import { useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js"
import "./App.css";

const stripePromise = loadStripe(
  "pk_test_51NTVWGLzLbrIDt2zcA1sj5gjWOi9qY7AicLOx0Ig311DdLvKJiXANQM4ngtla9dawvpKNaJjhj8efHMD9V8TEx1S00Rtxr4SJ5"
); //key public in front

const CheckoutForm = () => {
  return <form></form>
}

function App() {
  return (
    <>
   <Elements stripe={stripePromise}>
   <CheckoutForm/>
   </Elements>
    </>
  );
}

export default App;
