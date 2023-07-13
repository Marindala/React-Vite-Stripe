//import { useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "bootswatch/dist/flatly/bootstrap.min.css";
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
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      //puedes recibir un error o  paymentMethod
      type: "card", //tipo tarjeta
      card: elements.getElement(CardElement), //de todos los elements de stripe obtengo o llamo a CardElement
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <img
        src="https://w7.pngwing.com/pngs/976/260/png-transparent-computer-keyboard-bg-teclado-gaming-r-force-macbook-pro-membrane-keyboard-gaming-keypad-force-de-laplace-computer-keyboard-computer-input-device.png"
        alt="Corsair Gaming Keyboard RGB"
        className="img-fluid"
      />
      <CardElement />
      <button>Buy</button>
    </form>
  );
};

function App() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <div className="container p-4">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <CheckoutForm />
            </div>
          </div>
        </div>
      </Elements>
    </>
  );
}

export default App;
