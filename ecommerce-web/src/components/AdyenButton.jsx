import React from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdyenButton = () => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.cart.products);

  const handleAdyenCheckOut = () => {
    if (user === null) {
      toast.error("Please sign in to continue");
    } else {
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
        .catch((err) => console.log(err.response));
    }
  };
  console.log(products.length === 0);

  return (
    <Link to={`/adyen-checkout`}>
      <button
        className={`w-full bg-gray-600 text-center border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 ${products.length} === 0 ? "cursor-not-allowed" : ""}`}
        type="button"
        onClick={() => handleAdyenCheckOut()}
        disabled={products.length === 0}
      >
        Checkout with Adyen
      </button>
    </Link>
  );
};

export default AdyenButton;
