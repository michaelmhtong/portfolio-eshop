import React from "react";
import { useState } from "react";
import { register } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Register = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await register(dispatch, { email, password, firstName, lastName });
    setMessage(result);
    setIsLoading(false);
  };

  // check the validation of email
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  // check the validation of password
  const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  useEffect(() => {
    const result = PW_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  return (
    <div>
      <h1>Create an Account</h1>
      <h2>Sign up and you’ll be able to manage your account, track orders, save products and access easier returns</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="username">Username:</label>
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
          aria-invalid={validEmail ? "false" : "true"}
          onChange={(e) => setEmail(e.target.value)}
        />
        {email && !validEmail ? <p id="emailnote">Please enter a valid email address</p> : null}

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="password"
          required
          className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Password"
          aria-invalid={validPassword ? "false" : "true"}
          onChange={(e) => setPassword(e.target.value)}
        />
        {password && !validPassword ? (
          <div>
            <div>Your password does not match our requirements</div>
            <ul id="pwdnote">
              <li>Minimum 8 characters</li>
              <li>1 uppercase letter</li>
              <li>1 lowercase letter</li>
              <li>1 number</li>
              <li>1 special character</li>
            </ul>
          </div>
        ) : null}

        <h3>By creating your account, you agree to our Terms and Conditions.</h3>
        {message && <div>{message}</div>}
        <button className="btn" disabled={!validEmail || !validPassword || isLoading}>
          {isLoading ? <div>PROCESSING</div> : <div>CREATE ACCOUNT</div>}
        </button>
      </form>
    </div>
  );
};

export default Register;
