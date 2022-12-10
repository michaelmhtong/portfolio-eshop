import React from "react";
import { useState } from "react";
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();

  const handleRegister = () => {
    register(dispatch, { email, password, firstName, lastName });
  };

  return (
    <div>
      <h1>Create an Account</h1>
      <h2>Sign up and you’ll be able to manage your account, track orders, save products and access easier returns</h2>
      <input
        id="first-name"
        name="firstName"
        type="string"
        required
        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        placeholder="First Name"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        id="last-name"
        name="lastName"
        type="string"
        required
        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        placeholder="Last Name"
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        id="email-address"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        placeholder="Email address"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="password"
        required
        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <select className="select w-full max-w-xs">
        <option disabled selected>
          Choose Gender
        </option>
        <option>Male</option>
        <option>Female</option>
        <option>Prefer not to say</option>
      </select>
      <h3>By creating your account, you agree to our Terms and Conditions.</h3>
      <button className="btn" onClick={handleRegister}>
        CREATE ACCOUNT
      </button>
    </div>
  );
};

export default Register;
