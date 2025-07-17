import React from 'react'

const UserCard = ({user}) => {

    const {firstName, lastName, photoUrl, age, gender, about} = user;
    
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
      <button className="btn btn-warning">Ignore</button>
      <button className="btn btn-primary">Interested</button>

    </div>
  </div>
</div>
  )
}

export default UserCard
