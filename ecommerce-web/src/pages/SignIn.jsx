import React from "react";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import Register from "../components/Register";

const SignIn = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:py-8 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Login or create an account</h1>
        <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-10 sm:gap-x-20 md:grid-cols-2 md:gap-y-0 lg:gap-x-32">
          <section>
            <Login />
          </section>
          <section>
            <Register />
          </section>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
