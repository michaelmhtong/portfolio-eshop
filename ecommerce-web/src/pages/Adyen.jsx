import React, { useState, useEffect, useRef } from "react";
import { publicRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import AdyenCheckout from "@adyen/adyen-web";
import "@adyen/adyen-web/dist/adyen.css";

const Adyen = () => {
  const cart = useSelector((state) => state.cart);

  const paymentContainer = useRef(null);
  const [payment, setPayment] = useState({
    config: {
      storePaymentMethod: true,
      paymentMethodsConfiguration: {
        ideal: {
          showImage: true,
        },
        card: {
          hasHolderName: true,
          holderNameRequired: true,
          name: "Credit or debit card",
          amount: {
            value: cart.total * 100,
            currency: "EUR",
          },
        },
      },
      locale: "en_US",
      showPayButton: true,
      clientKey: "test_N33EWZV6NZBVZLWBWJHUCFZAWUEAKIGY",
      environment: "test",
    },
  });

  useEffect(() => {
    initiateCheckout();
    // getPaymentDataStore();
  }, []);
  console.log(payment);

  const initiateCheckout = async () => {
    const response = await publicRequest.post(
      "/adyenpayment/sessions",
      { cart },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const [res, status] = [response.data[0], response.status];
    if (status >= 300) {
      throw new Error(res);
    }
    setPayment({ ...payment, session: res });
  };


  useEffect(() => {
    const { config, session } = payment;

    if (!session || !paymentContainer.current) {
      // initiateCheckout is not finished yet.
      return;
    }

    const createCheckout = async () => {
      const checkout = await AdyenCheckout({
        ...config,
        session,
        onPaymentCompleted: (response, _component) =>
        console.log(response),
          // navigate(getRedirectUrl(response.resultCode), { replace: true }),
        onError: (error, _component) => {
          console.error(error);
          // navigate(`/status/error?reason=${error.message}`, { replace: true });
        },
      });

      if (paymentContainer.current) {
        checkout.create("dropin").mount(paymentContainer.current);
      }
    };

    createCheckout();
  }, [payment]);

  return (
    <div id="payment-page">
      <div className="payment-container">
        <div ref={paymentContainer} className="payment"></div>
      </div>
    </div>
  );
};

export default Adyen;
