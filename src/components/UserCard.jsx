import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {

    const {_id, firstName, lastName, photoUrl, age, gender, about} = user;

    const dispatch = useDispatch();

    const handleSendRequest = async(status, userId) => {
      try{

        const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {
          withCredentials: true,
        });

        dispatch(removeUserFromFeed(userId));
      }
      catch(err) {
        console.log(err);
        
      }
    }
    
  return (
   <div className="card bg-base-300 w-96 shadow-xl">
  <figure>
 <img
  src={user?.photoUrl}
  alt={user?.firstName || "User"}
  onError={(e) => {
    e.target.onerror = null; // Prevent infinite loop if fallback also fails
    e.target.src = "https://i.postimg.cc/BbqKRr6y/Whats-App-Image-2025-04-10-at-05-19-40-8c12eb1d.jpg";
  }}
  className="w-32 h-32 object-cover rounded-full mx-auto"
/>


  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " +  lastName}</h2>
    
        {
            age && gender && <p>
                {age + " " + gender}
            </p>
        }
    
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button
      onClick={() => handleSendRequest("ignored", _id)}
      className="btn btn-warning">Ignore</button>
      <button 
      onClick={() => handleSendRequest("interested", _id)}
      className="btn btn-primary">Interested</button>

    </div>
  </div>
</div>
  )
}

export default UserCard
