"use client";

import React, { useState } from "react";
import api from "../../servies/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
function SignUp() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router =useRouter()
const [error,setError] =useState({})
  const handleChange = (e) => {
 
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    setError({})
  };
const handleSubmit = async () => {
  let newErrors = {};

  if (!userData.name.trim()) {
    newErrors.name = "Name is required";
  }

  if (!userData.email.trim()) {
    newErrors.email = "Email is required";
  } else {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(userData.email)) {
      newErrors.email = "Email is not valid";
    }
  }

  if (!userData.password.trim()) {
    newErrors.password = "Password is required";
  }

  if (Object.keys(newErrors).length > 0) {
    setError(newErrors);
    return;
  }

  setError({});

  try {
    const response = await api.post("/api/auth/register", userData);

    toast.success(response.data.message);

    router.push("/login");
  } catch (err) {
    console.log(err);

    toast.error(
      err.response?.data?.message || "Something went wrong"
    );
  }
};
  return (
    <div className="w-screen h-screen flex items-center justify-center p-5 bg-gray-100">
      <div className="border border-gray-300 p-6 rounded-lg shadow-md bg-white w-96">
        <h1 className="text-2xl font-bold text-center mb-5">Sign Up</h1>

        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500"
          />
          {error.name && (
  <p className="text-red-500 text-sm mt-1">{error.name}</p>
)}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500"
          />
          {error.email && (
  <p className="text-red-500 text-sm mt-1">{error.email}</p>
)}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500"
          />
                  {error.password && (
  <p className="text-red-500 text-sm mt-1">{error.password}</p>
)}
        </div>

        <button  onClick={handleSubmit} className="w-full cursor-pointer bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignUp;