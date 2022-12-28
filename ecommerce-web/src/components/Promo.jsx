import React from "react";
import { Link } from "react-router-dom";

const Promo = () => {
  return (
    <div className="bg-white">
      <div className="relative bg-gray-900">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            src="https://assets.hermes.com/is/image/hermesedito/P_169_PICNIC?fit=wrap%2C0&wid=923"
            alt="2023"
            className="w-full h-full object-center object-cover"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />

        <div className="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">Spring-summer 2023</h1>
          <p className="mt-4 text-xl text-white">
            A dance in the desert, where the daylight gives way to the acid-bright shades of dusk. Colors speed by with
            the passing hours, coursing over agile and ethereal looks inhabited by lightness.
          </p>
          <Link
            to="/products/all"
            className="mt-8 inline-block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            Shop Collection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Promo;
