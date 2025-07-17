import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

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

  if (!connections) return <h1>Loading...</h1>;
  if (connections.length === 0) return <h1>No Connection Found</h1>;

  return (
    <div className='my-14 text-center'>
      <h1 className='text-2xl font-bold mb-4'>Connections</h1>
      {connections.map((connection) => {

        const {firstName, lastName, photoUrl, age, gender, about} = connection;

        return (
            <div key={connection._id} className='flex  p-4 border rounded-lg bg-base-300 w-1/2 m-auto'>

               <div>
                 <img className='w-20 h-20 rounded-full' src={photoUrl} alt="" />
               </div>

               <div className='text-left mx-4'>
                <h2 className=' font-bold text-xl'>

                    {firstName + " " + lastName}
                </h2>
                {
                    age && gender && <p>
                    {age + " " + gender}
                </p>
                }
                <p>
                    {about}
                </p>

               </div>

            </div>
        )
      })}
    </div> 
  );
};

export default Connections;
