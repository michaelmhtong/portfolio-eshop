import { useEffect, useState } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  useEffect(() => {
    fetch("/api/payment/config", { mode: "cors" }).then(async (r) => {
      const { publishableKey } = await r.json();
      console.log(publishableKey);
    });
  }, []);

  return <div>React Stripe and the payment element</div>;
};

export default Payment;
