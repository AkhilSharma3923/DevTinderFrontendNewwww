import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {}, 
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      {/* Profile Image */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 flex justify-center items-center">
          <img 
            className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
            src={photoUrl || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt={`${firstName} ${lastName}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
            }}
          />
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {firstName} {lastName}
        </h2>

        {/* Age/Gender Badges */}
        {(age || gender) && (
          <div className="flex justify-center gap-2 mb-4">
            {age && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {age} years
              </span>
            )}
            {gender && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {gender}
              </span>
            )}
          </div>
        )}

        {/* About Section */}
        <p className="text-gray-600 mb-6 italic">
          {about || "No description provided"}
        </p>

        {/* Action Buttons - FUNCTIONALITY REMAINS EXACTLY THE SAME */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleSendRequest("ignore", _id)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Ignore
          </button>
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;