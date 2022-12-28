import React from "react";
import { toast } from "react-toastify";

const handleSumbit = (e) => {
  e.preventDefault();
  toast.success("Subscription successful");
};

const Newsletter = () => {
  return (
    <div className="bg-[#f6f1eb]">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-4 lg:py-8 lg:px-8">
        <div className="px-6 py-6 rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center">
          <div className="xl:w-0 xl:flex-1">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Want product news and updates?</h2>
            <p className="mt-3 max-w-3xl text-lg leading-6 text-gray-00">
              Sign up for our newsletter to stay up to date.
            </p>
          </div>
          <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            <form className="sm:flex" onSubmit={handleSumbit}>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                required
                className="w-full border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-600 focus:ring-white rounded-md"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent shadow text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
              >
                Notify me
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
