import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
function FinishSignup({ tempID }) {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [err,setError] =useState("")
  const {setAuth} = useContext(AuthContext)
  const handleSubmit = async (e) => {
    e.preventDefault();
    //to verify
    try {
      const response = await axios.post('http:api link', JSON.stringify({
        tempID,
        otp,
        password,
      }),
      {
        headers:{'Content-Type':'application/json'},
        withCredentials : true
    
      });
 ////after submit empty input
      setOtp("")
      setPassword("")
///if sucseess/fail indicate user
    response.data.success? alert('Signup completed! You can now log in.'):alert('Signup failed. Please try again.');
     
    
    ///here you have to set to state
      const accesstoken = response?.data?.accessToken;
      const roles=response?.data?.roles
      setAuth({roles,accesstoken,userName,password})
      //here you can Navigate as  after this 
   

    } catch (error) {
      //handling errors 
      if (!err?.response) {
        setErrMsg('No Server Response');
    } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
    } else {
        setErrMsg('Registration Failed')
    }
    }
  };

  return (
   
      <div className="flex items-center justify-center min-h-screen bg-yellow-400">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Complete Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 mb-2">OTP</label>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
          >
            Finish Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default FinishSignup;
