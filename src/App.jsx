import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "bootswatch/dist/flatly/bootstrap.min.css";
import axios from "axios";
import "./App.css";




 const url = "http://localhost:3001/api/checkout"; // 
 


const stripePromise = loadStripe(
  "pk_test_51NTVWGLzLbrIDt2zcA1sj5gjWOi9qY7AicLOx0Ig311DdLvKJiXANQM4ngtla9dawvpKNaJjhj8efHMD9V8TEx1S00Rtxr4SJ5"
); //key public in front

const CheckoutForm = () => {
  //stripe cards test //number card for test

  //Hook return conection with stripe
  const stripe = useStripe();
  const elements = useElements(); //hook que accede a los elements de stripe//manipula lo que viene de stripe
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //desde el objeto stripe creo un nuevo metodo de pago
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      //puedes recibir un error o  paymentMethod
      type: "card", //tipo tarjeta
      card: elements.getElement(CardElement), //de todos los elements de stripe obtengo o llamo a CardElement
    });
    setLoading(true);

    if (!error) {
      const { id } = paymentMethod; //extraigo el id de paymentMethod //id:"pm_1NUfI2LzLbrIDt2zr7jg7MeC" obtengo ese id por consola...visualizar...
      try {
        const {data} = await axios.post(  //solo quiero la propiedad data del  objeto
          `${url}`,
          {
            id, //envio id y monto total(amount)
            amount: 10000, //cents //100 dólares
          }
        );
     
        console.log(data);
        //console.log(data);

        elements.getElement(CardElement).clear(); //en cada evento se limpia el input de la card
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  console.log(!stripe || loading);

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <img
        src="https://i.pinimg.com/originals/d6/94/09/d694096518e1a580f18c228e19717c86.png"
        alt="Corsair Gaming Keyboard RGB"
        className="img-fluid"
      />
       <h3 className="text-center my-2">Price: 100$</h3>
      <div className="form-group">
        <CardElement className="form-control" />
      </div>

      <button disabled={!stripe} className="btn btn-success">
      {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          "Buy"
        )}
        
        </button> {/* si stripe no está disponible se desactiva */}
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
