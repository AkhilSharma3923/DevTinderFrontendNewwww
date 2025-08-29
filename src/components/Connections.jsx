import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';

const Connections = () => {
  const connections = useSelector((store) => store.connection); // ✅ fix here
  const dispatch = useDispatch();

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  // UI Copy tweaks for more "high-selling" appeal
  if (!connections) 
    return (
      <h1 className="font-bold text-2xl text-indigo-700 animate-pulse mt-20 text-center">
        Loading your exclusive network...
      </h1>
    );
  
  if (connections.length === 0) 
    return (
      <h1 className="font-extrabold text-3xl text-indigo-700 mt-20 text-center">
        No Connections Yet – Unlock your networking potential!
      </h1>
    );

  return (
    <div className="my-14 text-center">
      <h1 className="text-3xl font-extrabold mb-8 text-indigo-700 drop-shadow">
        Connections
      </h1>
      {connections.map((connection) => {

        const {_id, firstName, lastName, photoUrl, age, gender, about} = connection;

        return (
          <div 
            key={_id} 
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
              {
                age && gender && <p className="text-sm text-indigo-500 mt-1">
                  {age} | {gender}
                </p>
              }
              <p className="text-gray-600 mt-2 leading-relaxed">
                {about}
              </p>

              <Link
              to={"/chat/" + _id}
              className='mt-2 bg-purple-400 px-7 py-3 rounded-md text-black'>Chat</Link>
            </div>
          </div>
        )
      })}
    </div> 
  );
};

export default Connections;


// perpexity