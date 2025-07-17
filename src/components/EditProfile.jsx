import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const EditProfile = ({user}) => {

    const dispatch = useDispatch();

const [firstName, setFirstName] = useState(user?.firstName || "");
const [lastName, setLastName] = useState(user?.lastName || "");
const [age, setAge] = useState(user?.age || "");
const [gender, setGender] = useState(user?.gender || "");
const [about, setAbout] = useState(user?.about || "");
const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");

const [error, setError] = useState("")

const [showToast, setShowToast] = useState(false)


const saveProfile = async() => {

    setError("");

    try{

        const res = await axios.patch(BASE_URL + "/profile/edit", {firstName,lastName, age,about, gender,photoUrl}, {withCredentials:true})

        dispatch(addUser(res?.data?.data))
        setShowToast(true);

        const i = setTimeout(() => {
           
            setShowToast(false)
        }, 3000);

    }
    catch(err) {
        setError(err.response.data)
    }

}



  return (

    <>
    
   <div className='flex justify-center my-10 gap-10'>
    <div className="flex justify-center ">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          <div>
            <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text"> First Name </span>
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
                <span className="label-text">Last Name</span>
              </div>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>


  <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>



              <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text"> About</span>
              </div>
              <input
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>




              <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <input
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>




            <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">PhotoUrl</span>
              </div>
              <input
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
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

            onClick={saveProfile}
            className="btn btn-primary">Save Profile</button>
          </div>
        </div>
      </div>
    </div>

    <UserCard user={{firstName, lastName, photoUrl, age, gender, about}} />
   
   </div>

   {
    showToast && (
        <div className="toast toast-top toast-end">
  
  <div className="alert alert-success">
    <span>User Update successfully.</span>
  </div>
</div>
    )
   }
    </>
  )
}

export default EditProfile
