import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const submitHandler = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(
      login({ email: enteredEmail, password: enteredPassword })
    );

    if (login.fulfilled.match(resultAction)) {
      navigate("/");
    } else {
      console.error("Login failed:", resultAction.payload);
    }
  };

  return (
    <React.Fragment>
      <section className="max-w-md mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-white mb-4">Login</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="mt-2 text-sm text-gray-300">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </div>
          <div className="mt-2 text-sm text-gray-300">
            <Link
              to="/auth/forgetPassword"
              className="text-blue-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </form>
        {error && (
          <div className="text-red-500 mt-4">{error && <p>{error}</p>}</div>
        )}
      </section>
    </React.Fragment>
  );
};

export default Login;
