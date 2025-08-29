import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';

const Premium = () => {

  const [isPremium, setIsPremium] = useState(false)

  const verifyPremoum = async () => {

    const res = await axios.get(BASE_URL + "/premium/verify", {withCredentials: true})

    if(res.data.isPremium){
      setIsPremium(true)
      
    }
  }
  useEffect(() => {
  verifyPremoum();
  }, [])

    const handleBuyClick = async(type) => {

        const order = await axios.post(BASE_URL + "/payment/create", {
            membershipType: type,
        }, {withCredentials: true});


        const {amount, keyId, currency, notes, orderId} = order.data;

         // Open Razorpay Checkout
      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name: 'Dev Tinder',
        description: 'Connect to other developer',
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.firstName +  " " + notes.lastName,
          email: notes.emailId,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
        handler: verifyPremoum
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  return isPremium ? (
    "you are already a premium user "
  )  : (
    <div className="m-10">
      <div className="flex w-full gap-6">
        {/* Silver Membership Card */}
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center p-6">
          <h1 className="text-xl font-bold mb-2">Silver Membership</h1>
          <ul className="list-disc ml-5">
            <li>Chat with other people</li>
            <li>100 connection Requests per day</li>
            <li>Blue Tick</li>
            <li>3 months</li>
          </ul>
          <button
          onClick={() => handleBuyClick('silver')}
          className="btn btn-primary mt-4">Buy Silver</button>
        </div>

        {/* Divider */}
        <div className="divider divider-horizontal">OR</div>

        {/* Gold Membership Card */}
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center p-6">
          <h1 className="text-xl font-bold mb-2">Gold Membership</h1>
          <ul className="list-disc ml-5">
            <li>Chat with other people</li>
            <li>Infinity connection Requests per day</li>
            <li>Blue Tick</li>
            <li>6 months</li>
          </ul>
          <button 
          onClick={() => handleBuyClick('gold')}
          className="btn btn-warning mt-4">Buy Gold</button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
