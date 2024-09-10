'use client';
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const openSignup = () => {
    router.push('/signup');
  };
  const OnLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Signup success", response.data);
      router.push("/profile");

    } catch (error:any) {
      console.log("Login failed", error.message);
      
      toast.error(error.message);
  }finally {
      setLoading(false);
  }
  };
  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0) {
        setButtonDisabled(false);
    } else {
        setButtonDisabled(true);
    }
}, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white">
      <h1 className="text-2xl font-semibold mb-4 text-white">{loading ? "Processing" : "Login"}</h1>
      {/* <hr className="w-full my-4 border-gray-400" /> */}
      
      <div className="w-full max-w-xs">
        
        <label htmlFor="email" className="block text-left mb-2">
          Email
        </label>
        <input
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />


        <label htmlFor="password" className="block text-left mb-2">
          Password
        </label>
        <input
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        
        <div className="flex justify-between mt-4">
          <button 
            onClick={OnLogin}
            className="w-full py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-t-gray-500 hover:bg-gray-500 hover:text-gray-950 mr-2">
            Login
          </button>
          <button 
            onClick={openSignup}
            className="w-full py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-t-gray-500 hover:bg-gray-500 hover:text-gray-950">
            Register
          </button>  
        </div>
        
      </div>
    </div>
  );
}
