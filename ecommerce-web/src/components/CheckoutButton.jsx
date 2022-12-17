import React from "react";
import { publicRequest } from "../requestMethods";
import { useSelector, useDispatch } from "react-redux";

const CheckoutButton = ({ products }) => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);

  const handleCheckOut = () => {
    // create a chekcout session in stripe
    publicRequest
      .post("/payment/create-checkout-session", { products })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));

    // create a order to database
    publicRequest
      .post(
        "/order",
        { userID: user.others._id, products: products, amount: cart.total },
        {
          headers: {
            token: "Bearer " + user.accessToken,
          },
        }
      )
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.response.data, user.others._id));
  };

  return (
    <div className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
      <button type="button" onClick={() => handleCheckOut()}>
        Check Out
      </button>
    </div>
  );
};

export default CheckoutButton;
