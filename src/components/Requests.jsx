import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);

  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests)
    return (
      <h1 className="font-bold text-2xl text-indigo-700 animate-pulse mt-16 text-center">
        Loading your incoming connections...
      </h1>
    );
  if (requests.length === 0)
    return (
      <h1 className="flex justify-center font-extrabold text-2xl text-indigo-700 mt-16">
        No Requests Found – Your network is waiting!
      </h1>
    );

  return (
    <div className="my-14 text-center">
      <h1 className="text-3xl font-extrabold mb-8 text-indigo-700 drop-shadow">
        Connection Requests
      </h1>
      {requests.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

        return (
          <div
            key={request._id}
            className="flex p-6 border rounded-2xl bg-white w-full max-w-2xl m-auto mb-8 shadow-2xl hover:scale-[1.03] hover:shadow-indigo-200 transition-all duration-300"
          >
            <div>
              <img
                className="w-24 h-24 rounded-full border-4 border-indigo-400 ring-4 ring-indigo-100 object-cover shadow-xl"
                src={photoUrl}
                alt={firstName}
              />
            </div>

            <div className="text-left mx-6 flex-1">
              <h2 className="font-bold text-2xl text-indigo-800 tracking-tight">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p className="text-sm text-indigo-500 mt-1">
                  {age} | {gender}
                </p>
              )}
              <p className="text-gray-600 mt-2 leading-relaxed">{about}</p>

              <div className="mt-6 flex gap-6">
                <button
                  onClick={() => reviewRequest("rejected", request._id)}
                  className="px-7 py-2 rounded-full bg-red-100 text-red-600 font-semibold shadow hover:bg-red-200 hover:text-white hover:bg-gradient-to-r hover:from-red-400 hover:to-pink-500 border-2 border-red-300 transition-all duration-200"
                >
                  Reject
                </button>
                <button
                  onClick={() => reviewRequest("accepted", request._id)}
                  className="px-7 py-2 rounded-full bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transform hover:-translate-y-1 transition-all duration-200"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;

//perpexity