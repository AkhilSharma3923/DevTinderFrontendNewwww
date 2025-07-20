import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);

  const dispatch = useDispatch();

  const reviewRequest = async(status, _id) => {
    try{

        const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {
            withCredentials: true,
        });
        dispatch(removeRequest(_id));

    }
    catch(err) {
        console.log(err);
        
    }
  }

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

  if (!requests) return <h1>Loading...</h1>;
  if (requests.length === 0) return <h1 className="flex justify-center">No Requests Found</h1>;

  return (
    <div className="my-14 text-center">
      <h1 className="text-2xl font-bold mb-4">Connection Requests</h1>
      {requests.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={request._id}
            className="flex  p-4 border rounded-lg bg-base-300 w-1/2 m-auto"
          >
            <div>
              <img className="w-20 h-20 rounded-full" src={photoUrl} alt="" />
            </div>

            <div className="text-left mx-4">
              <h2 className=" font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>

              <div className=" mt-4 flex gap-6">
                <button 
                onClick={() => reviewRequest("rejected", request._id)}
                className="btn btn-primary">Reject</button>
                <button 
                onClick={() => reviewRequest("accepted", request._id)}
                className="btn btn-secondary">Accept</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
