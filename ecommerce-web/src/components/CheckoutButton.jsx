import React from "react";
import { publicRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CheckoutButton = ({ products }) => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);

  const handleCheckOut = () => {
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
        .then((res) => {
          // create a chekcout session in stripe
          publicRequest
            .post("/payment/create-checkout-session", { products })
            .then((res) => {
              if (res.data.url) {
                window.location.href = res.data.url;
              }
            })
            .catch((err) => console.log(err.message));
        })
        .catch((err) => console.log(err.response));
    }
  };

  return (
    <div>
      <button
        className="w-full bg-gray-600 text-center border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
        type="button"
        onClick={() => handleCheckOut()}
      >
        Check Out
      </button>
    </div>
  );
};

export default CheckoutButton;
