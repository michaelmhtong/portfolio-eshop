import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const AdyenSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getOrder = async () => {
      try {
        dispatch(clearCart()); // delete cart items
      } catch (err) {
        console.log(err);
      }
    };
    getOrder();
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto text-center py-20 px-4 sm:px-6 lg:py-40 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Payment Successful</span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <div className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-400 hover:hover:bg-gray-900">
              <Link to="/">Back to Home page</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdyenSuccess;
