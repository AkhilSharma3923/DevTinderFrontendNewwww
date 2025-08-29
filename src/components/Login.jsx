import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("priya.verma@example.com");
  const [password, setPassword] = useState("passWord@456");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="card w-full max-w-md bg-gray-800 shadow-2xl rounded-xl overflow-hidden border border-gray-700 hover:border-amber-500 transition-all duration-300">
        <div className="card-body p-8">
          {/* Premium Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-amber-400">
              {isLoginForm ? "Welcome to DevTinder" : "Join Our Elite Network"}
            </h2>
            <p className="text-gray-400 mt-2">
              {isLoginForm
                ? "Access your exclusive developer network"
                : "Begin your premium experience today"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert bg-red-900/50 border border-red-700 text-red-200 rounded-lg mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Signup Fields */}
          {!isLoginForm && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text font-medium text-gray-300">
                      First Name
                    </span>
                  </label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    placeholder="John"
                    className="input bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-full focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text font-medium text-gray-300">
                      Last Name
                    </span>
                  </label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    placeholder="Doe"
                    className="input bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-full focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Auth Fields */}
          <div className="space-y-4 mt-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-300">
                  Email
                </span>
              </label>
              <input
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                type="email"
                placeholder="your@email.com"
                className="input bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-full focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-300">
                  Password
                </span>
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="input bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-full focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <button
              onClick={isLoginForm ? handleLogin : handleSignup}
              className="btn w-full py-3 px-6 rounded-lg bg-gradient-to-r from-amber-600 to-amber-800 border-none text-white hover:from-amber-700 hover:to-amber-900 shadow-lg hover:shadow-amber-500/20 transition-all duration-300 flex items-center justify-center"
            >
              {isLoginForm ? "Unlock Access" : "Get Started"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Toggle Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              {isLoginForm ? "Not a member yet?" : "Already have access?"}
              <button
                onClick={() => {
                  setIsLoginForm((value) => !value);
                  setError("");
                }}
                className="ml-2 font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                {isLoginForm ? "Join Now" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

//deepseek