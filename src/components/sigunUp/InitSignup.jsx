import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function InitSignup({ setTempID }) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    username: '',
    role: 'user'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_Backend_API_URI)
    try {
      const response = await axios.post(`${import.meta.env.VITE_Backend_API_URI}/api/v1/auth/register `, formData);
      console.log(response)
      setTempID(response.data.tempID);
    } catch (error) {
      console.error('Signup failed', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <>
  

<div className="flex items-center justify-center min-h-screen bg-yellow-400">
<div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
  <h2 className="text-2xl font-bold text-center mb-6">Sign Up for an Account</h2>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
      <input
        type="text"
        name="username"
        placeholder="Enter your username"
        value={formData.username}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <div className="mb-6">
      <label htmlFor="role" className="block text-gray-700 mb-2">Role</label>
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
    >
      Start Signup
    </button>
  </form>
  <div className="text-center mt-4">
    <Link to={"/login"} className="text-blue-500 hover:underline">Already have an account? Sign In</Link>
  </div>
</div>
</div>


</>

  );
}

export default InitSignup;
