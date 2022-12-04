import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutButton from "../components/CheckoutButton";
import { Elements } from "@stripe/react-stripe-js";

const Payment = () => {

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.post("/payment/create-checkout-session");
    } catch (err) {
      console.log(err);
    }
  };

  const ProductDisplay = () => (
    <section>
      <div className="product">
        <img src="https://i.imgur.com/EHyR2nP.png" alt="The cover of Stubborn Attachments" />
        <div className="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <form>
        <button type="submit" onClick={() => handleCheckout()}>
          Checkout
        </button>
      </form>
    </section>
  );

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
    }
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay />;
};

export default Payment;