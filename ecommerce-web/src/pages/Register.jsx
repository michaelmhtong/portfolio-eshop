import React from "react";

const Register = () => {
  return (
    <div>
      <h1>Create an Account</h1>
      <h2>Sign up and you’ll be able to manage your account, track orders, save products and access easier returns</h2>
      <input placeholder="first name" />
      <input placeholder="last name" />
      <input placeholder="email" />
      <input placeholder="password" />
      <select className="select w-full max-w-xs">
        <option disabled selected>
          Choose Gender
        </option>
        <option>Male</option>
        <option>Female</option>
        <option>Prefer not to say</option>
      </select>
      <h3>By creating your account, you agree to our Terms and Conditions.</h3>
      <button className="btn">CREATE ACCOUNT</button>
    </div>
  );
};

export default Register;
