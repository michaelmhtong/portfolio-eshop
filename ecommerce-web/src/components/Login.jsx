import React from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { LockClosedIcon } from "@heroicons/react/20/solid";

const Login = () => {
  let email = null;
  let password = null;
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleEmailChange = (event) => {
    email = event.target.value;
  };

  const handlePasswordChange = (event) => {
    password = event.target.value;
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(email, password);
    login(dispatch, { email, password });
  };

  return (
    <div>
      <div>
        <div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">Check out faster with saved details</p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder="Email address"
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          {error && <div className="text-red-900">Wrong email or password</div>}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <div className="font-medium text-gray-600 hover:text-gray-500">
                Forgot your password?
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={handleClick}
              disabled={isFetching}
            >
              {isFetching ? (
                <div>Processing...</div>
              ) : (
                <div>
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-gray-600 group-hover:text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                  Sign in
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
