import { useEffect, useState } from "react";
// import "./yasser.css";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from 'react-router-dom';
import Header from '../landingpage/Header';
import Footer from '../landingpage/Footer';

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  useEffect(() => {
    fetch("http://localhost:8000/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/create-payment-intent/"+id, {
      method: "POST",
      body: JSON.stringify({}),
    })
      .then(async (result) => {
        if (result.status === 400) {
          setErrorMessage("Sorry, tickets are sold out.");
          return;
        }
        const { clientSecret } = await result.json();
        setClientSecret(clientSecret);
      })
      .catch(error => console.error('Error creating payment intent:', error));
  }, [id]);

  return (
    <>
    <Header/>
       <h1>React Stripe and the Payment Element</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {clientSecret && stripePromise && !errorMessage && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
      <Footer/>
    </>
  );
}

export default Payment;
