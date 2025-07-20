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
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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


   const handleSignup = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        emailId,
        password,
      }, {withCredentials: true});

      dispatch(addUser(res.data.data));
      navigate("/profile");
      
    } catch (err) {
      setError(err?.response?.data || "Something went wrong")
      // console.log(err);
    }
  };




  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">{
            isLoginForm ? "Login" : "SignUp"
            }
          </h2>
          <div>

{
  !isLoginForm && (
    <>
     <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">First Name </span>
              </div>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>




             <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">Last Name </span>
              </div>
              <input
                value={lastName}
                onChange={(e) => setLastName   (e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
    </>
  )
}


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
            onClick={isLoginForm ? handleLogin : handleSignup}
            className="btn btn-primary">
              {
            isLoginForm ? "Login" : "SignUp"
            }
            </button>
          </div>

            <p 
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}>

              {
                isLoginForm ? "New User? SignUp Here"  : "Existing User? Login Here"
              }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
