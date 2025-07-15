import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("priya.verma@example.com");
  const [password, setPassword] = useState("passWord@456");
  const [error, setError] = useState("")
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      }, {withCredentials: true});

      dispatch(addUser(res.data));
      navigate("/");
      
    } catch (err) {
      setError(err?.response?.data || "Something went wrong")
      // console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">Email I </span>
              </div>
              <input
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>

          <p className="text-red-500">
{error}
          </p>
          <div className="card-actions justify-center">
            <button 
            onClick={handleLogin}
            className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
